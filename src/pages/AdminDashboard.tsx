
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from '../services/authService';
import { DataService } from '../services/dataService';
import { AdminStats } from '../types/admin';
import AdminNavbar from '../components/admin/AdminNavbar';
import StatsCards from '../components/admin/StatsCards';
import { Button } from '../components/ui/button';
import { 
  Users, 
  Key, 
  Package, 
  FileText, 
  Settings,
  Plus
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      setStats(DataService.getStats());
    }
  }, []);

  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Package },
    { id: 'keys', label: 'Keys', icon: Key },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'logs', label: 'Logs', icon: FileText },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-barzinho-dark via-barzinho-gray to-barzinho-dark">
      <AdminNavbar />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-black/20 backdrop-blur-lg border-r border-barzinho-yellow/20 min-h-screen">
          <div className="p-6">
            <h2 className="font-give-glory text-2xl text-barzinho-yellow mb-6">
              Painel Admin
            </h2>
            
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-barzinho-yellow/20 text-barzinho-yellow border border-barzinho-yellow/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <Button className="special-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Ação Rápida
                </Button>
              </div>
              
              {stats && <StatsCards stats={stats} />}
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-dark p-6 rounded-xl border border-barzinho-yellow/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Atividade Recente</h3>
                  <div className="space-y-3">
                    {DataService.getLogs().slice(0, 5).map((log) => (
                      <div key={log.id} className="flex justify-between items-center py-2 border-b border-gray-600/30">
                        <span className="text-gray-300">{log.details}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-dark p-6 rounded-xl border border-barzinho-yellow/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Keys Expirando</h3>
                  <div className="space-y-3">
                    {DataService.getKeys()
                      .filter(key => {
                        if (key.expiresAt === 'lifetime') return false;
                        const expiresIn = new Date(key.expiresAt).getTime() - Date.now();
                        return expiresIn > 0 && expiresIn < 7 * 24 * 60 * 60 * 1000; // 7 dias
                      })
                      .slice(0, 5)
                      .map((key) => (
                        <div key={key.id} className="flex justify-between items-center py-2 border-b border-gray-600/30">
                          <span className="text-gray-300">{key.cheat} - {key.plan}</span>
                          <span className="text-xs text-orange-400">
                            {key.expiresAt !== 'lifetime' && new Date(key.expiresAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'keys' && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-8">Gerenciamento de Keys</h1>
              <p className="text-gray-300">Funcionalidade de keys será implementada aqui.</p>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-8">Gerenciamento de Usuários</h1>
              <p className="text-gray-300">Funcionalidade de usuários será implementada aqui.</p>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-8">Gerenciamento de Produtos</h1>
              <p className="text-gray-300">Funcionalidade de produtos será implementada aqui.</p>
            </div>
          )}

          {activeTab === 'logs' && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-8">Logs do Sistema</h1>
              <p className="text-gray-300">Funcionalidade de logs será implementada aqui.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-8">Configurações</h1>
              <p className="text-gray-300">Configurações do sistema serão implementadas aqui.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
