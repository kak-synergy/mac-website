import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin } from 'lucide-react';
import type { Order } from '../types';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const order = (location.state as { order?: Order })?.order;

  return (
    <main className="max-w-2xl mx-auto px-4 py-16 text-center">
      <CheckCircle size={56} strokeWidth={1.2} className="mx-auto mb-6 text-black" />
      <p className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-400 mb-2">Commande confirmée</p>
      <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3">
        Merci pour votre commande !
      </h1>
      <p className="text-sm text-gray-600 mb-2">
        Votre commande a bien été enregistrée. Vous recevrez une confirmation par e-mail.
      </p>
      {order && (
        <p className="text-xs font-black tracking-widest text-gray-400 mb-10">N° {order.id}</p>
      )}

      {order && (
        <div className="text-left border border-gray-200 divide-y divide-gray-100 mb-8">
          {/* Delivery address */}
          <div className="p-5 flex items-start gap-4">
            <MapPin size={18} strokeWidth={1.5} className="flex-shrink-0 mt-0.5 text-gray-400" />
            <div>
              <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-1">Livraison à</p>
              <p className="text-sm font-bold">{order.address.firstName} {order.address.lastName}</p>
              <p className="text-xs text-gray-600">{order.address.address}, {order.address.city}</p>
              <p className="text-xs text-gray-600">{order.address.phone}</p>
            </div>
          </div>

          {/* Items */}
          <div className="p-5">
            <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-3">Articles</p>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={`${item.productId}-${item.shade?.id ?? '_'}`} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 flex-shrink-0 overflow-hidden">
                    <img src={item.image} alt="" className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{item.name}</p>
                    {item.shade && <p className="text-[11px] text-gray-500">{item.shade.name} · ×{item.quantity}</p>}
                  </div>
                  <p className="text-xs font-black">{item.price * item.quantity} MAD</p>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="p-5 space-y-1.5">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Sous-total</span>
              <span className="font-bold">{order.subtotal} MAD</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Livraison</span>
              <span className="font-bold">{order.deliveryFee === 0 ? 'Gratuite' : `${order.deliveryFee} MAD`}</span>
            </div>
            <div className="flex justify-between text-sm font-black border-t border-gray-100 pt-2.5 mt-1">
              <span>Total payé</span>
              <span>{order.total} MAD</span>
            </div>
          </div>
        </div>
      )}

      {/* What's next */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left">
        <div className="flex items-start gap-3 border border-gray-200 p-4">
          <Package size={18} strokeWidth={1.5} className="text-gray-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-black tracking-widest uppercase mb-1">Préparation</p>
            <p className="text-xs text-gray-600">Votre commande est prise en charge et sera préparée dans les 24h.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 border border-gray-200 p-4">
          <Truck size={18} strokeWidth={1.5} className="text-gray-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-black tracking-widest uppercase mb-1">Livraison</p>
            <p className="text-xs text-gray-600">Livraison estimée sous 2 à 4 jours ouvrables au Maroc.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/account"
          className="border border-black px-6 py-3 text-[11px] font-black tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
        >
          Suivre ma commande
        </Link>
        <Link
          to="/products"
          className="bg-black text-white px-6 py-3 text-[11px] font-black tracking-widest uppercase hover:bg-gray-800 transition-colors"
        >
          Continuer mes achats
        </Link>
      </div>
    </main>
  );
}
