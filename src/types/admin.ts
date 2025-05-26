
export interface User {
  id: string;
  username: string;
  email: string;
  status: 'active' | 'banned' | 'suspended';
  hwid?: string;
  createdAt: string;
  lastLogin?: string;
  keys: string[];
}

export interface Key {
  id: string;
  userId: string;
  cheat: 'TZX' | 'SUSANO.RE' | 'BARZINHO';
  plan: 'Public' | 'Advanced' | 'Private' | 'Private External';
  status: 'active' | 'expired' | 'suspended' | 'blocked';
  createdAt: string;
  expiresAt: string | 'lifetime';
  lastUsed?: string;
  ipAddress?: string;
  hwid?: string;
}

export interface Product {
  id: string;
  name: string;
  cheat: 'TZX' | 'SUSANO.RE' | 'BARZINHO';
  plan: 'Public' | 'Advanced' | 'Private' | 'Private External';
  price: number;
  duration: number | 'lifetime';
  description: string;
  features: string[];
  isActive: boolean;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  action: string;
  adminId: string;
  targetType: 'user' | 'key' | 'product';
  targetId: string;
  details: string;
  ipAddress?: string;
}

export interface AdminStats {
  totalKeys: number;
  activeKeys: number;
  expiredKeys: number;
  totalUsers: number;
  activeUsers: number;
  bannedUsers: number;
  totalSales: number;
  monthlyRevenue: number;
}

export interface DiscordWebhook {
  url: string;
  events: string[];
  isActive: boolean;
}
