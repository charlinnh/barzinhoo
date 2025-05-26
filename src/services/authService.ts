
interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'super_admin';
  createdAt: string;
}

interface AuthSession {
  token: string;
  admin: AdminUser;
  expiresAt: string;
}

const ADMIN_STORAGE_KEY = 'barzinho_admin_session';
const ADMINS_STORAGE_KEY = 'barzinho_admins';

// Dados de administradores padrão (em produção, usar backend seguro)
const defaultAdmins: AdminUser[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@barzinho.com',
    role: 'super_admin',
    createdAt: new Date().toISOString()
  }
];

export class AuthService {
  static initializeAdmins() {
    if (!localStorage.getItem(ADMINS_STORAGE_KEY)) {
      localStorage.setItem(ADMINS_STORAGE_KEY, JSON.stringify(defaultAdmins));
    }
  }

  static async login(username: string, password: string): Promise<{ success: boolean; session?: AuthSession; error?: string }> {
    // Simular verificação de credenciais (em produção, usar backend seguro)
    const admins: AdminUser[] = JSON.parse(localStorage.getItem(ADMINS_STORAGE_KEY) || '[]');
    const admin = admins.find(a => a.username === username);

    if (!admin || password !== 'admin123') { // Em produção, usar hash de senha
      return { success: false, error: 'Credenciais inválidas' };
    }

    const token = this.generateToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 horas

    const session: AuthSession = {
      token,
      admin,
      expiresAt
    };

    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(session));
    return { success: true, session };
  }

  static logout() {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  }

  static getCurrentSession(): AuthSession | null {
    const sessionData = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!sessionData) return null;

    const session: AuthSession = JSON.parse(sessionData);
    
    // Verificar se a sessão expirou
    if (new Date(session.expiresAt) < new Date()) {
      this.logout();
      return null;
    }

    return session;
  }

  static isAuthenticated(): boolean {
    return this.getCurrentSession() !== null;
  }

  private static generateToken(): string {
    return 'barzinho_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }
}

// Inicializar administradores padrão
AuthService.initializeAdmins();
