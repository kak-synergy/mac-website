import { useState } from 'react';
import { CheckCircle, Calendar, Clock, MapPin, MessageSquare, Info } from 'lucide-react';
import SEO from '../components/SEO';

type Service = 'maquillage' | 'makeup-party' | 'makeup-mariee' | '';

interface ServiceInfo {
  id: Service;
  label: string;
  description: string;
  duration: string;
  note: string;
}

const SERVICES: ServiceInfo[] = [
  {
    id: 'maquillage',
    label: 'Maquillage',
    description: 'Séance maquillage individuelle réalisée par nos artistes MAC en boutique.',
    duration: '45 min',
    note: 'Remboursable en produit',
  },
  {
    id: 'makeup-party',
    label: 'Makeup Party',
    description: 'Séance maquillage en groupe — idéale pour fêter un événement entre amies.',
    duration: '1h30',
    note: 'Remboursable en produit',
  },
  {
    id: 'makeup-mariee',
    label: 'Makeup Mariée',
    description: 'Look de mariée personnalisé créé par votre artiste MAC dédié(e).',
    duration: '2h',
    note: 'Remboursable en produit',
  },
];

const STORES = [
  { id: 'massira', label: 'MAC Cosmetics — Massira', address: 'Quartier Massira, Casablanca' },
  { id: 'maarif',  label: 'MAC Cosmetics — Maârif',  address: 'Quartier Maârif, Casablanca' },
];

const TIME_SLOTS = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

const MAX_SATURDAY_SLOTS = 5;
const SATURDAY_BOOKED = 3;

function isSaturday(dateStr: string): boolean {
  if (!dateStr) return false;
  return new Date(dateStr).getDay() === 6;
}

function getTodayStr(): string {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

export default function MakeupBookingPage() {
  const [service, setService] = useState<Service>('');
  const [store, setStore] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });

  const saturdayFull = isSaturday(date) && SATURDAY_BOOKED >= MAX_SATURDAY_SLOTS;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (saturdayFull) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedService = SERVICES.find((s) => s.id === service);

  if (submitted) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-20 text-center">
        <SEO
          title="Rendez-vous Maquillage MAC — Confirmation"
          description="Votre rendez-vous maquillage MAC a bien été enregistré."
          canonical="/makeup-booking"
        />
        <CheckCircle size={56} className="mx-auto mb-6 text-black" strokeWidth={1.5} />
        <h1 className="text-3xl font-black uppercase tracking-tight mb-4">Rendez-vous Confirmé !</h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          Votre rendez-vous a bien été enregistré. Vous recevrez une confirmation par e-mail.
        </p>
        <div className="bg-gray-50 border border-gray-200 p-6 text-left space-y-3">
          <p className="text-xs font-black tracking-widest uppercase border-b border-gray-200 pb-2 mb-4">Récapitulatif</p>
          <p className="text-sm"><span className="font-bold">Service :</span> {selectedService?.label}</p>
          <p className="text-sm"><span className="font-bold">Date :</span> {date} à {time}</p>
          <p className="text-sm"><span className="font-bold">Boutique :</span> {STORES.find((s) => s.id === store)?.label}</p>
          {note && <p className="text-sm"><span className="font-bold">Note :</span> {note}</p>}
        </div>
        <div className="mt-8 p-4 border border-black text-left">
          <div className="flex items-start gap-2">
            <Info size={14} className="flex-shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed">
              <strong>Remboursable en produit :</strong> le montant de votre séance est intégralement remboursable sous forme de produits MAC lors de votre rendez-vous.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <SEO
        title="Prendre Rendez-vous Maquillage — MAC Cosmetics Maroc"
        description="Réservez votre séance maquillage, makeup party ou makeup mariée dans une boutique MAC au Maroc. Tout est remboursable en produit."
        canonical="/makeup-booking"
      />

      {/* Hero */}
      <section className="bg-black text-white py-16 px-4 text-center">
        <p className="text-xs font-black tracking-[0.4em] uppercase text-gray-400 mb-3">
          Services en Boutique
        </p>
        <h1 className="text-white text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
          Prendre Rendez-vous
        </h1>
        <p className="text-gray-300 text-sm max-w-lg mx-auto leading-relaxed">
          Réservez votre séance maquillage avec nos artistes MAC. Tout est remboursable en produit.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 border border-white/30 px-5 py-2 text-xs text-gray-300">
          <Info size={13} />
          Tout est remboursable en produit MAC
        </div>
      </section>

      {/* Service cards */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="text-xs font-black tracking-widest uppercase text-gray-400 text-center mb-8">
          Choisissez votre service
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setService(s.id)}
              className={`text-left p-6 border-2 transition-all ${
                service === s.id
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 hover:border-black bg-white text-black'
              }`}
            >
              <p className="text-lg font-black uppercase tracking-tight mb-2">{s.label}</p>
              <p className={`text-xs leading-relaxed mb-4 ${service === s.id ? 'text-gray-300' : 'text-gray-600'}`}>
                {s.description}
              </p>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold flex items-center gap-1 ${service === s.id ? 'text-gray-300' : 'text-gray-500'}`}>
                  <Clock size={12} /> {s.duration}
                </span>
                <span className={`text-[10px] font-black tracking-widest uppercase px-2 py-1 ${
                  service === s.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {s.note}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Booking form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">

          {/* Personal info */}
          <div>
            <h2 className="text-xs font-black tracking-widest uppercase mb-5 border-b border-gray-200 pb-2">
              Vos Coordonnées
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1">Prénom *</label>
                <input
                  required
                  value={form.firstName}
                  onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                  className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1">Nom *</label>
                <input
                  required
                  value={form.lastName}
                  onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                  className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1">E-mail *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1">Téléphone *</label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="+212 6XX XXX XXX"
                  className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Store & date/time */}
          <div>
            <h2 className="text-xs font-black tracking-widest uppercase mb-5 border-b border-gray-200 pb-2 flex items-center gap-2">
              <MapPin size={14} /> Boutique &amp; Date
            </h2>

            {/* Store selection */}
            <div className="mb-4">
              <label className="text-[10px] font-black tracking-widest uppercase block mb-2">Choisissez votre boutique *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STORES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStore(s.id)}
                    className={`text-left p-4 border-2 transition-all ${
                      store === s.id ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-black'
                    }`}
                  >
                    <p className="text-xs font-black uppercase tracking-wide">{s.label}</p>
                    <p className={`text-xs mt-1 ${store === s.id ? 'text-gray-300' : 'text-gray-500'}`}>{s.address}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1 flex items-center gap-1">
                  <Calendar size={11} /> Date *
                </label>
                <input
                  required
                  type="date"
                  min={getTodayStr()}
                  value={date}
                  onChange={(e) => { setDate(e.target.value); setTime(''); }}
                  className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                />
                {isSaturday(date) && (
                  <p className={`text-xs mt-1 ${saturdayFull ? 'text-red-600 font-bold' : 'text-amber-600'}`}>
                    {saturdayFull
                      ? `Samedi complet — plus de créneaux disponibles (max ${MAX_SATURDAY_SLOTS} rdv).`
                      : `Samedi : ${MAX_SATURDAY_SLOTS - SATURDAY_BOOKED} créneau(x) restant(s) (max ${MAX_SATURDAY_SLOTS} par samedi).`}
                  </p>
                )}
              </div>

              {/* Time slots */}
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1 flex items-center gap-1">
                  <Clock size={11} /> Heure *
                </label>
                <select
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={!date || saturdayFull}
                  className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black bg-white disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <option value="">— Choisir une heure —</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">Aucun rendez-vous avant 12h00</p>
              </div>
            </div>
          </div>

          {/* Note */}
          <div>
            <h2 className="text-xs font-black tracking-widest uppercase mb-3 border-b border-gray-200 pb-2 flex items-center gap-2">
              <MessageSquare size={14} /> Laisser une note (optionnel)
            </h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Précisions sur le look souhaité, allergies, événement spécial…"
              rows={3}
              className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black resize-none"
            />
          </div>

          {/* Notice */}
          <div className="p-4 bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-2">
              <Info size={14} className="flex-shrink-0 mt-0.5 text-gray-500" />
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Remboursable en produit :</strong> le montant de votre séance est intégralement remboursable sous forme de produits MAC lors de votre rendez-vous en boutique.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={!service || !store || saturdayFull}
            className="w-full bg-black text-white py-4 text-xs font-black tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Confirmer le Rendez-vous
          </button>
        </form>
      </section>
    </main>
  );
}
