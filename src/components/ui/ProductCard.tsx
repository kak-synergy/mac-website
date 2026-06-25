import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../../types';
import { asset } from '../../lib/asset';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { toggle, isWishlisted } = useWishlist();
  const { addItem, openCart } = useCart();
  const wishlisted = isWishlisted(product.id);
  const [added, setAdded] = useState(false);
  const [showShades, setShowShades] = useState(false);

  const availableShades = product.shades.filter((s) => s.inStock !== false);
  const hasMultipleShades = availableShades.length > 1;

  const addToCart = (e: React.MouseEvent, shadeIdx?: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;

    const shade = product.shades.length > 0
      ? (() => {
          const s = shadeIdx !== undefined ? product.shades[shadeIdx] : (availableShades[0] ?? product.shades[0]);
          return { id: s.id, name: s.name, hex: s.hex };
        })()
      : null;

    addItem({ productId: product.id, name: product.name, image: product.image, price: product.price, shade, quantity: 1 });
    setAdded(true);
    setShowShades(false);
    openCart();
    setTimeout(() => setAdded(false), 1800);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    if (hasMultipleShades) {
      setShowShades((v) => !v);
    } else {
      addToCart(e);
    }
  };

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

          {/* Quick-add shade picker (appears when product has multiple shades) */}
          {showShades && (
            <div
              className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm p-3"
              onClick={(e) => e.preventDefault()}
            >
              <p className="text-[9px] font-black tracking-widest uppercase text-gray-500 mb-2">Choisir une teinte</p>
              <div className="flex flex-wrap gap-1.5">
                {product.shades.map((shade, i) => {
                  const outOfStock = shade.inStock === false;
                  return (
                    <button
                      key={shade.id}
                      title={shade.name}
                      disabled={outOfStock}
                      onClick={(e) => addToCart(e, i)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${outOfStock ? 'opacity-30 cursor-not-allowed border-gray-200' : 'border-white hover:border-black'}`}
                      style={{ backgroundColor: shade.hex }}
                    />
                  );
                })}
              </div>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowShades(false); }}
                className="mt-2 text-[9px] font-black tracking-widest uppercase text-gray-400 hover:text-black"
              >
                Annuler
              </button>
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

      {/* Top-right action buttons */}
      <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); toggle(product.id); }}
          aria-label={wishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          className="w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart
            size={13}
            className={wishlisted ? 'text-black' : 'text-gray-500'}
            fill={wishlisted ? 'currentColor' : 'none'}
          />
        </button>

        {/* Add to cart */}
        {product.inStock && (
          <button
            onClick={handleCartClick}
            aria-label="Ajouter au panier"
            className={`w-8 h-8 backdrop-blur-sm flex items-center justify-center transition-colors ${added ? 'bg-black text-white' : 'bg-white/90 hover:bg-white text-gray-700 hover:text-black'}`}
          >
            {added ? <Check size={13} /> : <ShoppingBag size={13} />}
          </button>
        )}
      </div>
    </div>
  );
}
