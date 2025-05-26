
import { Key } from '../types/admin';
import { DataService } from './dataService';

export interface KeyAuthRequest {
  keyId: string;
  hwid: string;
  ipAddress: string;
}

export interface KeyAuthResponse {
  success: boolean;
  key?: {
    id: string;
    cheat: string;
    plan: string;
    status: string;
    expiresAt: string | 'lifetime';
    user: {
      id: string;
      username: string;
      status: string;
    };
  };
  error?: string;
}

export class KeyApiService {
  // Simular endpoint de autenticação de key para loader
  static async authenticateKey(request: KeyAuthRequest): Promise<KeyAuthResponse> {
    const keys = DataService.getKeys();
    const users = DataService.getUsers();
    
    const key = keys.find(k => k.id === request.keyId);
    
    if (!key) {
      return {
        success: false,
        error: 'Key não encontrada'
      };
    }

    const user = users.find(u => u.id === key.userId);
    
    if (!user) {
      return {
        success: false,
        error: 'Usuário não encontrado'
      };
    }

    // Verificar status da key
    if (key.status !== 'active') {
      return {
        success: false,
        error: `Key está ${key.status}`
      };
    }

    // Verificar status do usuário
    if (user.status === 'banned') {
      return {
        success: false,
        error: 'Usuário banido'
      };
    }

    // Verificar expiração
    if (key.expiresAt !== 'lifetime' && new Date(key.expiresAt) < new Date()) {
      // Atualizar status para expirada
      DataService.updateKey(key.id, { status: 'expired' });
      return {
        success: false,
        error: 'Key expirada'
      };
    }

    // Verificar HWID (se já foi usado)
    if (key.hwid && key.hwid !== request.hwid) {
      return {
        success: false,
        error: 'HWID não autorizado'
      };
    }

    // Atualizar dados da key com o uso atual
    DataService.updateKey(key.id, {
      lastUsed: new Date().toISOString(),
      ipAddress: request.ipAddress,
      hwid: request.hwid
    });

    // Atualizar dados do usuário
    DataService.updateUser(user.id, {
      lastLogin: new Date().toISOString(),
      hwid: request.hwid
    });

    DataService.logAction('key_used', 'key', key.id, `Key utilizada - IP: ${request.ipAddress}`);

    return {
      success: true,
      key: {
        id: key.id,
        cheat: key.cheat,
        plan: key.plan,
        status: key.status,
        expiresAt: key.expiresAt,
        user: {
          id: user.id,
          username: user.username,
          status: user.status
        }
      }
    };
  }

  // Simular endpoint para verificar status da key
  static async checkKeyStatus(keyId: string): Promise<KeyAuthResponse> {
    const keys = DataService.getKeys();
    const users = DataService.getUsers();
    
    const key = keys.find(k => k.id === keyId);
    
    if (!key) {
      return {
        success: false,
        error: 'Key não encontrada'
      };
    }

    const user = users.find(u => u.id === key.userId);
    
    if (!user) {
      return {
        success: false,
        error: 'Usuário não encontrado'
      };
    }

    return {
      success: true,
      key: {
        id: key.id,
        cheat: key.cheat,
        plan: key.plan,
        status: key.status,
        expiresAt: key.expiresAt,
        user: {
          id: user.id,
          username: user.username,
          status: user.status
        }
      }
    };
  }
}
