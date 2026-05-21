import { Link } from 'react-router-dom';
import type { Product } from '../../types';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        <img
          src={product.image}
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
  );
}
