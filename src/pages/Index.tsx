import { useState, useEffect } from 'react';
import MatrixLoading from '../components/MatrixLoading';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { Shield, Zap, Target, Users } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  const products = [
    {
      title: "TZX - Público",
      description: "Cheat público com funcionalidades essenciais para FiveM.",
      price: "R$ 100/mês",
      features: [
        "ESP Básico",
        "Aimbot Simples",
        "Speed Hack",
        "Suporte Básico",
        "Updates Regulares"
      ],
      rating: 4
    },
    {
      title: "TZX - Público Lifetime",
      description: "Versão vitalícia do cheat público TZX.",
      price: "R$ 200",
      features: [
        "ESP Básico",
        "Aimbot Simples",
        "Speed Hack",
        "Suporte Básico",
        "Updates Vitalícios"
      ],
      rating: 4
    },
    {
      title: "TZX - Advanced",
      description: "Cheat avançado com recursos premium para usuários experientes.",
      price: "R$ 150/mês",
      features: [
        "ESP Avançado",
        "Aimbot Inteligente",
        "God Mode",
        "Vehicle ESP",
        "Suporte Prioritário"
      ],
      rating: 5
    },
    {
      title: "TZX - Advanced Lifetime",
      description: "Versão vitalícia do cheat avançado TZX.",
      price: "R$ 250",
      features: [
        "ESP Avançado",
        "Aimbot Inteligente",
        "God Mode",
        "Vehicle ESP",
        "Updates Vitalícios"
      ],
      rating: 5
    },
    {
      title: "TZX - Privado",
      description: "Cheat privado exclusivo com máxima proteção anti-detecção.",
      price: "R$ 650",
      features: [
        "Todos os Recursos Premium",
        "Anti-Ban Avançado",
        "Configuração Personalizada",
        "Suporte VIP 24/7",
        "Acesso Exclusivo"
      ],
      rating: 5
    },
    {
      title: "TZX - Private External",
      description: "Versão externa do cheat privado TZX com proteção máxima.",
      price: "R$ 750",
      features: [
        "Proteção Externa",
        "Anti-Detecção Supremo",
        "Bypass Avançado",
        "Configuração VIP",
        "Suporte Exclusivo"
      ],
      rating: 5
    },
    {
      title: "SUSANO.RE - Privado",
      description: "Cheat privado SUSANO.RE com tecnologia de ponta.",
      price: "R$ 650",
      features: [
        "Engine SUSANO.RE",
        "Anti-Ban Premium",
        "ESP Completo",
        "Aimbot Avançado",
        "Suporte Técnico"
      ],
      rating: 5
    },
    {
      title: "SUSANO.RE - Private External",
      description: "Versão externa do SUSANO.RE com proteção suprema.",
      price: "R$ 750",
      features: [
        "Engine Externa",
        "Proteção Máxima",
        "Bypass Supremo",
        "Configuração Avançada",
        "Suporte VIP"
      ],
      rating: 5
    },
    {
      title: "BARZINHO - Advanced",
      description: "Cheat exclusivo BARZINHO com recursos premium integrados.",
      price: "R$ 140/mês",
      features: [
        "Cheat BARZINHO Exclusivo",
        "Advanced + Premium",
        "Recursos Únicos",
        "Suporte BARZINHO",
        "Updates Frequentes"
      ],
      rating: 5
    },
    {
      title: "BARZINHO - Advanced 3 Meses",
      description: "Pacote trimestral do cheat BARZINHO com desconto especial.",
      price: "R$ 280",
      features: [
        "3 Meses de Acesso",
        "Cheat BARZINHO Completo",
        "Economia de R$ 140",
        "Suporte Incluído",
        "Renovação Automática"
      ],
      rating: 5
    },
    {
      title: "BARZINHO - Private Lifetime",
      description: "Versão privada vitalícia do cheat BARZINHO.",
      price: "R$ 650",
      features: [
        "Acesso Vitalício",
        "Cheat Privado BARZINHO",
        "Recursos Exclusivos",
        "Suporte Premium",
        "Updates Perpétuos"
      ],
      rating: 5
    },
    {
      title: "BARZINHO - Private External",
      description: "Versão externa e privada do BARZINHO com proteção suprema.",
      price: "R$ 750",
      features: [
        "Proteção Externa",
        "BARZINHO Privado",
        "Anti-Detecção Máximo",
        "Configuração VIP",
        "Suporte Exclusivo 24/7"
      ],
      rating: 5
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Proteção anti-detecção avançada"
    },
    {
      icon: Zap,
      title: "Updates Frequentes",
      description: "Sempre compatível com as últimas versões"
    },
    {
      icon: Target,
      title: "Precisão Máxima",
      description: "Performance otimizada para resultados perfeitos"
    },
    {
      icon: Users,
      title: "Suporte 24/7",
      description: "Equipe especializada sempre disponível"
    }
  ];

  if (isLoading) {
    return <MatrixLoading onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-barzinho-dark via-barzinho-gray to-barzinho-dark text-white">
      <Navbar />

      {showContent && (
        <>
          {/* Hero Section */}
          <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
            <div className="text-center fade-in-up">
              <h1 className="font-give-glory text-6xl md:text-8xl lg:text-9xl font-normal text-barzinho-yellow mb-8 drop-shadow-2xl">
                BARZINHO
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                A melhor loja de cheats e bypass para FiveM. 
                Domine os servidores com nossas ferramentas premium e sistema anti-detecção avançado.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 max-w-6xl mx-auto">
                {features.map((feature, index) => (
                  <div key={index} className="glass-dark p-6 rounded-xl text-center">
                    <feature.icon className="w-12 h-12 text-barzinho-yellow mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="special-button text-lg px-8 py-4"
              >
                Ver Produtos
              </button>
            </div>
          </section>

          {/* Products Section */}
          <section id="products" className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-barzinho-yellow mb-6">
                  Nossos Produtos
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Escolha entre nossa seleção premium de cheats TZX, SUSANO.RE e BARZINHO. 
                  Todos os produtos incluem garantia anti-ban e suporte técnico especializado.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <ProductCard key={index} {...product} />
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-barzinho-dark border-t border-barzinho-yellow/20 py-12 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h3 className="font-give-glory text-3xl text-barzinho-yellow mb-4">
                BARZINHO
              </h3>
              <p className="text-gray-400 mb-6">
                A melhor experiência em cheats para FiveM
              </p>
              <div className="flex justify-center gap-8 text-sm text-gray-500">
                <span>© 2024 BARZINHO</span>
                <span>•</span>
                <span>Todos os direitos reservados</span>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Index;
