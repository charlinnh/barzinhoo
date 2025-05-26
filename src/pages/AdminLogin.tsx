
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/authService';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { Shield } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await AuthService.login(username, password);
      
      if (result.success) {
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao painel administrativo",
        });
        navigate('/admin/dashboard');
      } else {
        toast({
          title: "Erro no login",
          description: result.error || "Credenciais inválidas",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-barzinho-dark via-barzinho-gray to-barzinho-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="glass-dark p-8 rounded-xl border border-barzinho-yellow/20">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-barzinho-yellow mx-auto mb-4" />
            <h1 className="font-give-glory text-3xl text-barzinho-yellow mb-2">
              BARZINHO
            </h1>
            <p className="text-gray-300">Painel Administrativo</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">
                Usuário
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-black/20 border-barzinho-yellow/30 text-white"
                placeholder="Digite seu usuário"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/20 border-barzinho-yellow/30 text-white"
                placeholder="Digite sua senha"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full special-button"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            <p>Credenciais padrão:</p>
            <p>Usuário: admin | Senha: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
