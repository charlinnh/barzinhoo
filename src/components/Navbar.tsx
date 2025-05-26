import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'transform scale-90 mx-auto w-fit rounded-3xl mt-4 bg-black/60 backdrop-blur-xl border border-barzinho-yellow/30' 
          : 'w-full bg-black/20 backdrop-blur-lg'
      }`}
    >
      <div className={`px-6 py-4 ${isScrolled ? 'px-8' : 'max-w-7xl mx-auto'}`}>
        <div className="flex items-center justify-between">
          <div className="font-give-glory text-2xl text-barzinho-yellow">
            BARZINHO
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-barzinho-yellow transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className="text-white hover:text-barzinho-yellow transition-colors"
            >
              Products
            </button>
            <a 
              href="/admin/login"
              className="text-white hover:text-barzinho-yellow transition-colors"
            >
              Dashboard
            </a>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-barzinho-yellow/20">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  scrollToSection('home');
                  setIsMenuOpen(false);
                }}
                className="text-white hover:text-barzinho-yellow transition-colors text-left"
              >
                Home
              </button>
              <button 
                onClick={() => {
                  scrollToSection('products');
                  setIsMenuOpen(false);
                }}
                className="text-white hover:text-barzinho-yellow transition-colors text-left"
              >
                Products
              </button>
              <a 
                href="/admin/login"
                className="text-white hover:text-barzinho-yellow transition-colors text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
