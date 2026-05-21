import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import storesData from '../data/stores.json';
import content from '../data/content.json';
import type { Store } from '../types';
import SEO from '../components/SEO';

const stores = storesData as Store[];

export default function FindStorePage() {
  const { title, subtitle, directionsLabel, hoursLabel, phoneLabel } = content.findStore;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <SEO
        title="Trouver une Boutique MAC Cosmetics au Maroc"
        description="Trouvez les 5 boutiques MAC Cosmetics au Maroc : Casablanca (Morocco Mall, Anfa Place), Marrakech (Carré Eden, Menara Mall) et Rabat (Mega Mall). Horaires et itinéraires."
        canonical="/stores"
      />
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">{title}</h1>
        <p className="text-gray-500 text-sm mt-3">{subtitle}</p>
      </div>

      {/* Store grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store: Store) => (
          <div key={store.id} className="border border-gray-200 p-6 hover:border-black transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-black uppercase tracking-wide leading-snug">{store.name}</h2>
                <span className="inline-block mt-1 text-[10px] font-bold tracking-widest uppercase bg-black text-white px-2 py-0.5">
                  {store.city}
                </span>
              </div>
              <MapPin size={20} className="flex-shrink-0 text-black mt-0.5" />
            </div>

            <p className="text-xs text-gray-600 mt-4 leading-relaxed">{store.address}</p>

            {/* Phone */}
            <div className="flex items-center gap-2 mt-4">
              <Phone size={13} className="text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-black tracking-widest uppercase text-gray-400">{phoneLabel}</p>
                <a href={`tel:${store.phone.replace(/\s/g, '')}`} className="text-xs font-medium hover:underline">
                  {store.phone}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-2 mt-3">
              <Clock size={13} className="text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-1">{hoursLabel}</p>
                {store.hours.map((h, i) => (
                  <p key={i} className="text-xs">
                    <span className="font-medium">{h.days}</span> : {h.time}
                  </p>
                ))}
              </div>
            </div>

            {/* Directions CTA */}
            <a
              href={store.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full flex items-center justify-center gap-2 bg-black text-white py-3 text-xs font-black tracking-widest uppercase hover:bg-gray-800 transition-colors"
            >
              <Navigation size={13} /> {directionsLabel}
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
