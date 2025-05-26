
import { ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  rating?: number;
}

const ProductCard = ({ title, description, price, features, rating = 5 }: ProductCardProps) => {
  return (
    <div className="rotating-border product-card">
      <div className="relative bg-card p-6 rounded-lg h-full">
        {/* MORE CHOICE Badge */}
        <div className="absolute -top-2 -right-2 more-choice-badge">
          MORE CHOICE
        </div>

        <div className="flex flex-col h-full">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm mb-3">{description}</p>
            
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < rating 
                      ? 'text-barzinho-yellow fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-2">
                ({rating}.0)
              </span>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-foreground mb-2">
                Recursos inclusos:
              </h4>
              <ul className="space-y-1">
                {features.map((feature, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-barzinho-yellow rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
            <div className="text-2xl font-bold text-barzinho-yellow">
              {price}
            </div>
            <button className="bg-barzinho-yellow text-black px-4 py-2 rounded-lg font-semibold hover:bg-barzinho-yellow-light transition-colors duration-300 flex items-center gap-2">
              <ShoppingCart size={16} />
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
