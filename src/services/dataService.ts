
import { User, Key, Product, LogEntry, AdminStats, DiscordWebhook } from '../types/admin';

const USERS_STORAGE_KEY = 'barzinho_users';
const KEYS_STORAGE_KEY = 'barzinho_keys';
const PRODUCTS_STORAGE_KEY = 'barzinho_products';
const LOGS_STORAGE_KEY = 'barzinho_logs';
const WEBHOOKS_STORAGE_KEY = 'barzinho_webhooks';

export class DataService {
  // Inicializar dados padrão
  static initialize() {
    if (!localStorage.getItem(PRODUCTS_STORAGE_KEY)) {
      const defaultProducts: Product[] = [
        {
          id: '1',
          name: 'TZX - Público',
          cheat: 'TZX',
          plan: 'Public',
          price: 100,
          duration: 30,
          description: 'Cheat público com funcionalidades essenciais',
          features: ['ESP Básico', 'Aimbot Simples', 'Speed Hack'],
          isActive: true
        },
        {
          id: '2',
          name: 'TZX - Advanced',
          cheat: 'TZX',
          plan: 'Advanced',
          price: 150,
          duration: 30,
          description: 'Cheat avançado com recursos premium',
          features: ['ESP Avançado', 'Aimbot Inteligente', 'God Mode'],
          isActive: true
        }
      ];
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(defaultProducts));
    }

    if (!localStorage.getItem(WEBHOOKS_STORAGE_KEY)) {
      const defaultWebhooks: DiscordWebhook[] = [
        {
          url: '',
          events: ['key_created', 'key_expired', 'user_banned'],
          isActive: false
        }
      ];
      localStorage.setItem(WEBHOOKS_STORAGE_KEY, JSON.stringify(defaultWebhooks));
    }
  }

  // Métodos para Users
  static getUsers(): User[] {
    return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  }

  static saveUsers(users: User[]) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }

  static createUser(userData: Omit<User, 'id' | 'createdAt' | 'keys'>): User {
    const users = this.getUsers();
    const newUser: User = {
      ...userData,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      keys: []
    };
    
    users.push(newUser);
    this.saveUsers(users);
    this.logAction('user_created', 'user', newUser.id, `Usuário ${newUser.username} criado`);
    return newUser;
  }

  static updateUser(userId: string, updates: Partial<User>): boolean {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) return false;
    
    users[userIndex] = { ...users[userIndex], ...updates };
    this.saveUsers(users);
    this.logAction('user_updated', 'user', userId, `Usuário atualizado`);
    return true;
  }

  // Métodos para Keys
  static getKeys(): Key[] {
    return JSON.parse(localStorage.getItem(KEYS_STORAGE_KEY) || '[]');
  }

  static saveKeys(keys: Key[]) {
    localStorage.setItem(KEYS_STORAGE_KEY, JSON.stringify(keys));
  }

  static createKey(keyData: Omit<Key, 'id' | 'createdAt'>): Key {
    const keys = this.getKeys();
    const newKey: Key = {
      ...keyData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };
    
    keys.push(newKey);
    this.saveKeys(keys);
    
    // Atualizar usuário
    this.addKeyToUser(keyData.userId, newKey.id);
    
    this.logAction('key_created', 'key', newKey.id, `Key criada para ${newKey.cheat} - ${newKey.plan}`);
    this.sendWebhookNotification('key_created', newKey);
    return newKey;
  }

  static updateKey(keyId: string, updates: Partial<Key>): boolean {
    const keys = this.getKeys();
    const keyIndex = keys.findIndex(k => k.id === keyId);
    
    if (keyIndex === -1) return false;
    
    keys[keyIndex] = { ...keys[keyIndex], ...updates };
    this.saveKeys(keys);
    this.logAction('key_updated', 'key', keyId, `Key atualizada`);
    return true;
  }

  static deleteKey(keyId: string): boolean {
    const keys = this.getKeys();
    const keyIndex = keys.findIndex(k => k.id === keyId);
    
    if (keyIndex === -1) return false;
    
    const key = keys[keyIndex];
    keys.splice(keyIndex, 1);
    this.saveKeys(keys);
    
    // Remover key do usuário
    this.removeKeyFromUser(key.userId, keyId);
    
    this.logAction('key_deleted', 'key', keyId, `Key deletada`);
    return true;
  }

  // Métodos para Products
  static getProducts(): Product[] {
    return JSON.parse(localStorage.getItem(PRODUCTS_STORAGE_KEY) || '[]');
  }

  static saveProducts(products: Product[]) {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  }

  static updateProduct(productId: string, updates: Partial<Product>): boolean {
    const products = this.getProducts();
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) return false;
    
    products[productIndex] = { ...products[productIndex], ...updates };
    this.saveProducts(products);
    this.logAction('product_updated', 'product', productId, `Produto atualizado`);
    return true;
  }

  // Métodos para Logs
  static getLogs(): LogEntry[] {
    return JSON.parse(localStorage.getItem(LOGS_STORAGE_KEY) || '[]');
  }

  static logAction(action: string, targetType: 'user' | 'key' | 'product', targetId: string, details: string) {
    const logs = this.getLogs();
    const newLog: LogEntry = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      action,
      adminId: 'current_admin', // Em produção, pegar do contexto de auth
      targetType,
      targetId,
      details
    };
    
    logs.unshift(newLog);
    // Manter apenas os últimos 1000 logs
    if (logs.length > 1000) {
      logs.splice(1000);
    }
    
    localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs));
  }

  // Estatísticas
  static getStats(): AdminStats {
    const users = this.getUsers();
    const keys = this.getKeys();
    const products = this.getProducts();
    
    return {
      totalKeys: keys.length,
      activeKeys: keys.filter(k => k.status === 'active').length,
      expiredKeys: keys.filter(k => k.status === 'expired').length,
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      bannedUsers: users.filter(u => u.status === 'banned').length,
      totalSales: keys.length * 100, // Simulado
      monthlyRevenue: keys.filter(k => new Date(k.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length * 100
    };
  }

  // Webhooks
  static sendWebhookNotification(event: string, data: any) {
    const webhooks: DiscordWebhook[] = JSON.parse(localStorage.getItem(WEBHOOKS_STORAGE_KEY) || '[]');
    const activeWebhook = webhooks.find(w => w.isActive && w.events.includes(event));
    
    if (activeWebhook && activeWebhook.url) {
      // Simular envio para Discord (em produção, implementar requisição real)
      console.log(`Discord webhook sent for ${event}:`, data);
    }
  }

  // Métodos auxiliares
  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }

  private static addKeyToUser(userId: string, keyId: string) {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex].keys.push(keyId);
      this.saveUsers(users);
    }
  }

  private static removeKeyFromUser(userId: string, keyId: string) {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex].keys = users[userIndex].keys.filter(k => k !== keyId);
      this.saveUsers(users);
    }
  }
}

// Inicializar dados padrão
DataService.initialize();
