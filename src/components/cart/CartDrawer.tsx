import { X, Plus, Minus, ShoppingBag, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart, FREE_DELIVERY_THRESHOLD } from '../../context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal, deliveryFee, total, itemCount } = useCart();

  if (!isOpen) return null;

  const toFreeDelivery = FREE_DELIVERY_THRESHOLD - subtotal;
  const progress = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={closeCart} />
      <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white z-50 flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} strokeWidth={1.5} />
            <h2 className="text-xs font-black tracking-widest uppercase">
              Mon Panier
              {itemCount > 0 && <span className="ml-1.5 text-gray-400 font-bold">({itemCount})</span>}
            </h2>
          </div>
          <button onClick={closeCart} className="hover:opacity-50 transition-opacity p-1 -mr-1" aria-label="Fermer">
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 gap-5 text-center">
            <ShoppingBag size={52} strokeWidth={0.8} className="text-gray-200" />
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-gray-800 mb-1">Votre panier est vide</p>
              <p className="text-xs text-gray-400">Découvrez nos produits et ajoutez vos favoris.</p>
            </div>
            <button
              onClick={closeCart}
              className="text-[10px] font-black tracking-widest uppercase border border-black px-5 py-2.5 hover:bg-black hover:text-white transition-colors"
            >
              Explorer les produits
            </button>
          </div>
        ) : (
          <>
            {/* Free delivery bar */}
            {toFreeDelivery > 0 ? (
              <div className="px-6 py-3 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-1.5 mb-2">
                  <Truck size={12} className="text-gray-500 flex-shrink-0" />
                  <p className="text-[11px] text-gray-600">
                    Plus que <strong>{toFreeDelivery} MAD</strong> pour la livraison gratuite
                  </p>
                </div>
                <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-black transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : (
              <div className="px-6 py-3 border-b border-gray-100 bg-black text-white">
                <p className="text-[11px] font-black tracking-widest uppercase text-center flex items-center justify-center gap-2">
                  <Truck size={12} /> Livraison offerte
                </p>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {items.map((item) => (
                <div key={`${item.productId}-${item.shade?.id ?? '_'}`} className="flex gap-4">
                  <div className="w-[72px] h-[72px] bg-gray-50 flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-black uppercase tracking-wide leading-snug">{item.name}</p>
                    {item.shade && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-2.5 h-2.5 rounded-full border border-gray-200 flex-shrink-0" style={{ backgroundColor: item.shade.hex }} />
                        <span className="text-[11px] text-gray-500">{item.shade.name}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQty(item.productId, item.shade?.id ?? null, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.productId, item.shade?.id ?? null, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                      <p className="text-sm font-black">{(item.price * item.quantity)} MAD</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.shade?.id ?? null)}
                      className="mt-1.5 text-[10px] font-bold tracking-wide text-gray-400 hover:text-black transition-colors underline hover:no-underline"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary + CTA */}
            <div className="px-6 py-5 border-t border-gray-100">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Sous-total</span>
                  <span className="font-bold text-black">{subtotal} MAD</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Livraison</span>
                  <span className="font-bold text-black">{deliveryFee === 0 ? 'Gratuite' : `${deliveryFee} MAD`}</span>
                </div>
                <div className="flex justify-between text-sm font-black border-t border-gray-100 pt-3 mt-1">
                  <span>Total</span>
                  <span>{total} MAD</span>
                </div>
              </div>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="block w-full bg-black text-white py-4 text-[11px] font-black tracking-widest uppercase text-center hover:bg-gray-800 transition-colors"
              >
                Passer la commande
              </Link>
              <button
                onClick={closeCart}
                className="w-full text-center mt-3 text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-black transition-colors underline hover:no-underline"
              >
                Continuer mes achats
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
