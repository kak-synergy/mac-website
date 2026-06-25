import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { Product } from '../../types';
import { asset } from '../../lib/asset';
import { useWishlist } from '../../context/WishlistContext';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group relative">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-gray-50 aspect-square">
          <img
            src={asset(product.image)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-black tracking-widest uppercase px-2 py-1">
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="text-xs font-black tracking-widest uppercase">Rupture de stock</span>
            </div>
          )}
        </div>
        <div className="pt-3 pb-1">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">{product.subcategory}</p>
          <h3 className="text-sm font-bold mt-0.5 leading-snug group-hover:underline">{product.name}</h3>
          <p className="text-sm font-black mt-1">{product.price} MAD</p>
          {product.shades.length > 1 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {product.shades.slice(0, 6).map((shade) => (
                <span
                  key={shade.id}
                  title={shade.name}
                  className="w-4 h-4 rounded-full border border-gray-200 flex-shrink-0"
                  style={{ backgroundColor: shade.hex }}
                />
              ))}
              {product.shades.length > 6 && (
                <span className="text-[10px] text-gray-500 self-center">+{product.shades.length - 6}</span>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Wishlist toggle */}
      <button
        onClick={(e) => { e.preventDefault(); toggle(product.id); }}
        aria-label={wishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        <Heart
          size={14}
          className={`transition-colors ${wishlisted ? 'text-black fill-black' : 'text-gray-500'}`}
          fill={wishlisted ? 'currentColor' : 'none'}
        />
      </button>
    </div>
  );
}
