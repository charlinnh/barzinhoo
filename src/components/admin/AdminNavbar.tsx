
import { AuthService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { LogOut, User } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const session = AuthService.getCurrentSession();

  const handleLogout = () => {
    AuthService.logout();
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
    navigate('/admin/login');
  };

  return (
    <nav className="bg-black/20 backdrop-blur-lg border-b border-barzinho-yellow/20 px-8 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="font-give-glory text-2xl text-barzinho-yellow">
            BARZINHO Admin
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <User className="w-4 h-4" />
            <span>{session?.admin.username}</span>
            <span className="text-xs bg-barzinho-yellow/20 px-2 py-1 rounded">
              {session?.admin.role}
            </span>
          </div>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-red-500/30 text-red-400 hover:bg-red-500/20"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
