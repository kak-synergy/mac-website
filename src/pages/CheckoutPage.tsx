import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, CreditCard, Truck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import type { Order } from '../types';

type Step = 'delivery' | 'payment' | 'review';

interface DeliveryForm {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
}

const CITIES = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Oujda', 'Meknès', 'Kénitra', 'Autre'];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();
  const { user, addOrder } = useAuth();

  const [step, setStep] = useState<Step>('delivery');
  const [delivery, setDelivery] = useState<DeliveryForm>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    zip: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [placing, setPlacing] = useState(false);

  const setD = (k: keyof DeliveryForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setDelivery((f) => ({ ...f, [k]: e.target.value }));
  const setC = (k: keyof typeof card) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setCard((f) => ({ ...f, [k]: e.target.value }));

  const formatCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  if (items.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-sm font-bold uppercase tracking-wide mb-4">Votre panier est vide</p>
        <Link to="/products" className="text-xs font-black tracking-widest uppercase underline hover:no-underline">
          Voir nos produits
        </Link>
      </main>
    );
  }

  const placeOrder = () => {
    setPlacing(true);
    const order: Order = {
      id: `ORD-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      items,
      subtotal,
      deliveryFee,
      total,
      status: 'En cours',
      address: { firstName: delivery.firstName, lastName: delivery.lastName, phone: delivery.phone, address: delivery.address, city: delivery.city, zip: delivery.zip },
      paymentMethod,
    };
    addOrder(order);
    clearCart();
    navigate('/order-confirmation', { state: { order } });
  };

  const STEPS: { key: Step; label: string }[] = [
    { key: 'delivery', label: 'Livraison' },
    { key: 'payment', label: 'Paiement' },
    { key: 'review', label: 'Vérification' },
  ];
  const stepIdx = STEPS.findIndex((s) => s.key === step);

  return (
    <main className="min-h-[80vh] bg-gray-50">
      <SEO title="Finaliser la commande — MAC Cosmetics Maroc" description="" canonical="/checkout" />

      {/* Step progress */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-0">
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex items-center">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-colors ${i < stepIdx ? 'bg-black text-white' : i === stepIdx ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {i < stepIdx ? <Check size={11} /> : i + 1}
                </div>
                <span className={`text-[10px] font-black tracking-widest uppercase hidden sm:inline ${i === stepIdx ? 'text-black' : 'text-gray-400'}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && <ChevronRight size={14} className="mx-3 sm:mx-5 text-gray-300" />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

        {/* ── Left: Form ─────────────────────────────────────────── */}
        <div className="bg-white border border-gray-200 p-6 sm:p-8">

          {/* STEP 1: Delivery */}
          {step === 'delivery' && (
            <form
              onSubmit={(e) => { e.preventDefault(); setStep('payment'); }}
              className="space-y-6"
            >
              <h2 className="text-xs font-black tracking-widest uppercase border-b border-gray-100 pb-4">
                Adresse de livraison
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {([
                  { k: 'firstName', label: 'Prénom', placeholder: 'Yasmine', required: true },
                  { k: 'lastName', label: 'Nom', placeholder: 'El Mansouri', required: true },
                ] as const).map(({ k, label, placeholder, required }) => (
                  <div key={k}>
                    <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">{label} *</label>
                    <input required={required} value={delivery[k]} onChange={setD(k)} placeholder={placeholder}
                      className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors" />
                  </div>
                ))}
              </div>

              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Téléphone *</label>
                <input required value={delivery.phone} onChange={setD('phone')} placeholder="+212 6XX XXX XXX"
                  className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors" />
              </div>

              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Adresse *</label>
                <input required value={delivery.address} onChange={setD('address')} placeholder="45 Boulevard Mohammed V"
                  className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Ville *</label>
                  <select required value={delivery.city} onChange={setD('city')}
                    className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors bg-white appearance-none">
                    <option value="">Choisir une ville</option>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Code postal</label>
                  <input value={delivery.zip} onChange={setD('zip')} placeholder="20000"
                    className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors" />
                </div>
              </div>

              <button type="submit" className="w-full bg-black text-white py-4 text-[11px] font-black tracking-widest uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                Continuer vers le paiement <ChevronRight size={14} />
              </button>
            </form>
          )}

          {/* STEP 2: Payment */}
          {step === 'payment' && (
            <form onSubmit={(e) => { e.preventDefault(); setStep('review'); }} className="space-y-6">
              <h2 className="text-xs font-black tracking-widest uppercase border-b border-gray-100 pb-4">
                Mode de paiement
              </h2>

              <div className="space-y-3">
                {([
                  { value: 'card', label: 'Carte bancaire', desc: 'Visa, Mastercard, CIH, CIB, Al Barid' },
                  { value: 'cod', label: 'Livraison avec paiement en espèce', desc: 'Paiement en espèces à la livraison' },
                ] as const).map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-4 p-4 border cursor-pointer transition-colors ${paymentMethod === opt.value ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}
                  >
                    <input type="radio" name="payment" value={opt.value} checked={paymentMethod === opt.value}
                      onChange={() => setPaymentMethod(opt.value)} className="mt-0.5 accent-black" />
                    <div className="flex-1">
                      <p className="text-xs font-black tracking-wide uppercase">{opt.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                    </div>
                    {opt.value === 'card' && <CreditCard size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />}
                    {opt.value === 'cod' && <Truck size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />}
                  </label>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 border border-gray-200 p-5">
                  <p className="text-[10px] font-black tracking-widest uppercase text-gray-500">Détails de la carte</p>
                  <div>
                    <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Numéro de carte *</label>
                    <input required value={card.number} onChange={(e) => setC('number')({ ...e, target: { ...e.target, value: formatCard(e.target.value) } })}
                      placeholder="0000 0000 0000 0000" maxLength={19}
                      className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors tracking-widest" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Date d'expiration *</label>
                      <input required value={card.expiry} onChange={(e) => setC('expiry')({ ...e, target: { ...e.target, value: formatExpiry(e.target.value) } })}
                        placeholder="MM/AA" maxLength={5}
                        className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors tracking-widest" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">CVV *</label>
                      <input required value={card.cvv} onChange={(e) => setC('cvv')({ ...e, target: { ...e.target, value: e.target.value.replace(/\D/g, '').slice(0, 4) } })}
                        placeholder="000" maxLength={4}
                        className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors tracking-widest" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Nom sur la carte *</label>
                    <input required value={card.name} onChange={setC('name')} placeholder="YASMINE EL MANSOURI"
                      className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors uppercase" />
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep('delivery')}
                  className="flex-1 border border-gray-300 py-3.5 text-[11px] font-black tracking-widest uppercase hover:border-black transition-colors">
                  Retour
                </button>
                <button type="submit"
                  className="flex-[2] bg-black text-white py-3.5 text-[11px] font-black tracking-widest uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  Vérifier la commande <ChevronRight size={14} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Review */}
          {step === 'review' && (
            <div className="space-y-6">
              <h2 className="text-xs font-black tracking-widest uppercase border-b border-gray-100 pb-4">
                Récapitulatif de la commande
              </h2>

              <div className="border border-gray-200 p-4">
                <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-2">Livraison à</p>
                <p className="text-sm font-bold">{delivery.firstName} {delivery.lastName}</p>
                <p className="text-xs text-gray-600 mt-0.5">{delivery.address}, {delivery.city} {delivery.zip}</p>
                <p className="text-xs text-gray-600">{delivery.phone}</p>
              </div>

              <div className="border border-gray-200 p-4">
                <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-2">Paiement</p>
                <p className="text-sm font-bold">
                  {paymentMethod === 'card' ? `Carte bancaire **** ${card.number.slice(-4).replace(' ', '')}` : 'Livraison avec paiement en espèce'}
                </p>
              </div>

              <div className="border border-gray-200 p-4">
                <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-3">Articles ({items.length})</p>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.shade?.id ?? '_'}`} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt="" className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate">{item.name}</p>
                        {item.shade && <p className="text-[11px] text-gray-500">{item.shade.name} · ×{item.quantity}</p>}
                      </div>
                      <p className="text-xs font-black flex-shrink-0">{item.price * item.quantity} MAD</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep('payment')}
                  className="flex-1 border border-gray-300 py-3.5 text-[11px] font-black tracking-widest uppercase hover:border-black transition-colors">
                  Retour
                </button>
                <button
                  onClick={placeOrder}
                  disabled={placing}
                  className="flex-[2] bg-black text-white py-3.5 text-[11px] font-black tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:opacity-60"
                >
                  {placing ? 'Traitement...' : 'Confirmer la commande'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Order summary ────────────────────────────────── */}
        <div className="bg-white border border-gray-200 p-6 sticky top-24">
          <h3 className="text-[10px] font-black tracking-widest uppercase mb-5 border-b border-gray-100 pb-3">
            Votre commande
          </h3>
          <div className="space-y-4 max-h-60 overflow-y-auto pr-1 mb-5">
            {items.map((item) => (
              <div key={`${item.productId}-${item.shade?.id ?? '_'}`} className="flex gap-3">
                <div className="relative w-14 h-14 bg-gray-50 flex-shrink-0 overflow-hidden">
                  <img src={item.image} alt="" className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black text-white text-[9px] font-black flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold leading-snug truncate">{item.name}</p>
                  {item.shade && (
                    <p className="text-[11px] text-gray-500 mt-0.5">{item.shade.name}</p>
                  )}
                  <p className="text-xs font-black mt-0.5">{item.price * item.quantity} MAD</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2 border-t border-gray-100 pt-4">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Sous-total</span>
              <span className="font-bold text-black">{subtotal} MAD</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Livraison</span>
              <span className="font-bold text-black">{deliveryFee === 0 ? 'Gratuite' : `${deliveryFee} MAD`}</span>
            </div>
            <div className="flex justify-between text-sm font-black border-t border-gray-100 pt-3">
              <span>Total</span>
              <span>{total} MAD</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
