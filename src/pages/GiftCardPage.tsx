import { useState } from 'react';
import { Gift, MapPin, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import storesData from '../data/stores.json';

const AMOUNTS = [100, 200, 300, 500, 1000];

interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
}

const stores = storesData as Store[];

export default function GiftCardPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [custom, setCustom] = useState('');

  const finalAmount = custom ? parseInt(custom, 10) : selected;

  return (
    <main>
      <SEO
        title="Carte Cadeau MAC — Offrez de la Beauté"
        description="Offrez une carte cadeau MAC Cosmetics disponible en boutique au Maroc. Disponible en différents montants."
        canonical="/gift-cards"
      />

      {/* Hero */}
      <section className="bg-black text-white py-16 px-4 text-center">
        <p className="text-xs font-black tracking-[0.4em] uppercase text-gray-400 mb-3">
          Idée Cadeau
        </p>
        <h1 className="text-white text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
          Carte Cadeau MAC
        </h1>
        <p className="text-gray-300 text-sm max-w-lg mx-auto leading-relaxed">
          Offrez le plaisir du maquillage professionnel. Nos cartes cadeaux sont disponibles dans toutes nos boutiques MAC au Maroc.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Card preview + amount selection */}
          <div>
            {/* Visual card */}
            <div className="bg-black text-white aspect-video flex flex-col items-center justify-center mb-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1631214499644-f00718b5b7ac?w=800&q=80')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="relative z-10 text-center px-8">
                <img src="/images/mac-logo.png" alt="M·A·C" className="h-8 w-auto mx-auto mb-4 invert" />
                {finalAmount && finalAmount > 0 ? (
                  <p className="text-5xl font-black">{finalAmount} <span className="text-2xl">MAD</span></p>
                ) : (
                  <p className="text-xl font-black text-gray-400 uppercase tracking-widest">Choisissez un montant</p>
                )}
                <p className="text-xs text-gray-400 mt-3 tracking-widest uppercase">Carte Cadeau</p>
              </div>
            </div>

            {/* Preset amounts */}
            <h2 className="text-xs font-black tracking-widest uppercase mb-4">Choisissez un montant</h2>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => { setSelected(amt); setCustom(''); }}
                  className={`py-3 text-sm font-black border-2 transition-all ${
                    selected === amt && !custom
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-black'
                  }`}
                >
                  {amt}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Montant personnalisé (MAD)</p>
            <input
              type="number"
              min="50"
              step="50"
              value={custom}
              onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
              placeholder="Ex : 750"
              className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Info + stores */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xs font-black tracking-widest uppercase mb-5 border-b border-gray-200 pb-2 flex items-center gap-2">
                <Gift size={14} /> Comment ça marche
              </h2>
              <ul className="space-y-4">
                {[
                  { step: '01', text: 'Choisissez le montant de votre carte cadeau.' },
                  { step: '02', text: 'Rendez-vous dans l\'une de nos boutiques MAC au Maroc pour l\'acheter.' },
                  { step: '03', text: 'Remettez la carte à la personne de votre choix.' },
                  { step: '04', text: 'Le bénéficiaire utilise la carte pour régler ses achats en boutique.' },
                ].map(({ step, text }) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="w-8 h-8 border-2 border-black flex items-center justify-center text-xs font-black flex-shrink-0">
                      {step}
                    </span>
                    <p className="text-sm text-gray-700 mt-1">{text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200">
              <ul className="space-y-2">
                {[
                  'Valable dans toutes les boutiques MAC au Maroc',
                  'Aucune date d\'expiration',
                  'Non remboursable en espèces',
                  'Utilisable en une ou plusieurs fois',
                ].map((info, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-700">
                    <CheckCircle size={13} className="text-black flex-shrink-0" /> {info}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stores */}
            <div>
              <h2 className="text-xs font-black tracking-widest uppercase mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
                <MapPin size={14} /> Disponible dans nos boutiques
              </h2>
              <ul className="space-y-3">
                {stores.map((store) => (
                  <li key={store.id} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-2" />
                    <div>
                      <p className="text-xs font-bold">{store.name}</p>
                      <p className="text-xs text-gray-500">{store.address}, {store.city}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
