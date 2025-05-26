
import { AdminStats } from '../../types/admin';
import { 
  Users, 
  Key, 
  DollarSign, 
  TrendingUp,
  UserCheck,
  UserX,
  KeyRound,
  Clock
} from 'lucide-react';

interface StatsCardsProps {
  stats: AdminStats;
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  const cards = [
    {
      title: 'Total de Keys',
      value: stats.totalKeys,
      icon: Key,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20'
    },
    {
      title: 'Keys Ativas',
      value: stats.activeKeys,
      icon: KeyRound,
      color: 'text-green-400',
      bgColor: 'bg-green-400/20'
    },
    {
      title: 'Keys Expiradas',
      value: stats.expiredKeys,
      icon: Clock,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/20'
    },
    {
      title: 'Total de Usuários',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/20'
    },
    {
      title: 'Usuários Ativos',
      value: stats.activeUsers,
      icon: UserCheck,
      color: 'text-green-400',
      bgColor: 'bg-green-400/20'
    },
    {
      title: 'Usuários Banidos',
      value: stats.bannedUsers,
      icon: UserX,
      color: 'text-red-400',
      bgColor: 'bg-red-400/20'
    },
    {
      title: 'Receita Mensal',
      value: `R$ ${stats.monthlyRevenue}`,
      icon: DollarSign,
      color: 'text-barzinho-yellow',
      bgColor: 'bg-barzinho-yellow/20'
    },
    {
      title: 'Total de Vendas',
      value: `R$ ${stats.totalSales}`,
      icon: TrendingUp,
      color: 'text-barzinho-yellow',
      bgColor: 'bg-barzinho-yellow/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="glass-dark p-6 rounded-xl border border-barzinho-yellow/20 hover:border-barzinho-yellow/40 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">{card.title}</p>
              <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${card.bgColor}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
