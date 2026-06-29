import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check, X } from 'lucide-react';
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
  const [pickingShade, setPickingShade] = useState(false);

  const doAdd = (e: React.MouseEvent, shade: { id: string; name: string; hex: string } | null) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ productId: product.id, name: product.name, image: product.image, price: product.price, shade, quantity: 1 });
    setAdded(true);
    setPickingShade(false);
    openCart();
    setTimeout(() => setAdded(false), 1800);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    if (product.shades.length <= 1) {
      doAdd(e, product.shades[0] ? { id: product.shades[0].id, name: product.shades[0].name, hex: product.shades[0].hex } : null);
    } else {
      setPickingShade((v) => !v);
    }
  };

  return (
    <div className="group relative flex flex-col">
      {/* Image */}
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden bg-gray-50 aspect-square flex-shrink-0">
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
        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product.id); }}
          aria-label={wishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <Heart size={13} className={wishlisted ? 'text-black' : 'text-gray-500'} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </Link>

      {/* Info */}
      <Link to={`/products/${product.id}`} className="block pt-3 pb-2">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">{product.subcategory}</p>
        <h3 className="text-sm font-bold mt-0.5 leading-snug group-hover:underline">{product.name}</h3>
        <p className="text-sm font-black mt-1">{product.price} MAD</p>
        {product.shades.length > 1 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {product.shades.slice(0, 6).map((shade) => (
              <span key={shade.id} title={shade.name}
                className="w-3.5 h-3.5 rounded-full border border-gray-200 flex-shrink-0"
                style={{ backgroundColor: shade.hex }} />
            ))}
            {product.shades.length > 6 && (
              <span className="text-[10px] text-gray-500 self-center">+{product.shades.length - 6}</span>
            )}
          </div>
        )}
      </Link>

      {/* Shade picker (expands when clicked) */}
      {pickingShade && (
        <div className="border border-gray-200 bg-white p-3 mb-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] font-black tracking-widest uppercase text-gray-500">Choisir une teinte</p>
            <button onClick={(e) => { e.preventDefault(); setPickingShade(false); }} className="text-gray-400 hover:text-black">
              <X size={12} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.shades.map((shade) => {
              const oos = shade.inStock === false;
              return (
                <button
                  key={shade.id}
                  title={shade.name}
                  disabled={oos}
                  onClick={(e) => doAdd(e, { id: shade.id, name: shade.name, hex: shade.hex })}
                  className={`w-6 h-6 rounded-full border-2 transition-transform ${oos ? 'opacity-30 cursor-not-allowed border-gray-200' : 'border-white hover:border-black hover:scale-110'}`}
                  style={{ backgroundColor: shade.hex }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Add to cart button — always visible */}
      <button
        onClick={handleAddClick}
        disabled={!product.inStock}
        className={`w-full flex items-center justify-center gap-2 py-2.5 text-[10px] font-black tracking-widest uppercase transition-colors mt-auto ${
          !product.inStock
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : added
              ? 'bg-black text-white'
              : 'bg-white border border-black text-black hover:bg-black hover:text-white'
        }`}
      >
        {added ? <><Check size={12} /> Ajouté</> : !product.inStock ? 'Indisponible' : <><ShoppingBag size={12} /> Ajouter au panier</>}
      </button>
    </div>
  );
}
