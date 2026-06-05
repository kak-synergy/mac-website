import { useState, useMemo } from 'react';
import { ChevronRight, ChevronLeft, Clock, MapPin, Check, Calendar, Phone } from 'lucide-react';
import SEO from '../components/SEO';

const SERVICES = [
  {
    id: 'jour',
    name: 'Maquillage de Jour',
    description: 'Look naturel et lumineux, parfait pour le quotidien ou un déjeuner.',
    duration: '45 min',
    price: 150,
    accent: '#F9E8D0',
  },
  {
    id: 'nuit',
    name: 'Maquillage de Nuit',
    description: 'Look glamour et sophistiqué pour vos soirées et événements.',
    duration: '1h',
    price: 200,
    accent: '#E8D5F5',
  },
  {
    id: 'mariee',
    name: 'Maquillage de Mariée',
    description: 'Look de mariée sur-mesure, longue tenue garantie. Essai inclus.',
    duration: '2h',
    price: 600,
    accent: '#FDEAEA',
    priceNote: '',
  },
  {
    id: 'photoshoot',
    name: 'Maquillage Photoshoot',
    description: 'Maquillage haute définition adapté à la lumière studio et aux objectifs.',
    duration: '1h30',
    price: 350,
    accent: '#D0F0E8',
  },
  {
    id: 'party',
    name: 'Makeup Party',
    description: 'Séance en groupe — idéale pour un anniversaire, EVJF ou sortie entre amies.',
    duration: '1h',
    price: 160,
    accent: '#FEF3C7',
    priceNote: 'par personne',
  },
];

const STORES = [
  { id: 'massira', name: 'Massira', address: 'Quartier Massira, Casablanca' },
  { id: 'maarif',  name: 'Maârif',  address: 'Quartier Maârif, Casablanca' },
];

const TIME_SLOTS = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00',
];

const MAX_SAT = 5;
const SAT_BOOKED = 3;

const DAY_SHORT = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const MONTHS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

function getNextDays(n: number): Date[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    d.setHours(0, 0, 0, 0);
    return d;
  });
}

function fmtDate(d: Date): string {
  return `${DAY_SHORT[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function fmtDateLong(d: Date): string {
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

type Step = 1 | 2 | 3;

export default function MakeupBookingPage() {
  const [step, setStep] = useState<Step>(1);
  const [serviceId, setServiceId] = useState('');
  const [store, setStore] = useState('');
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [time, setTime] = useState('');
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', note: '' });
  const [submitted, setSubmitted] = useState(false);

  const days = useMemo(() => getNextDays(14), []);
  const service = SERVICES.find((s) => s.id === serviceId);
  const storeInfo = STORES.find((s) => s.id === store);
  const isSat = selectedDay?.getDay() === 6;
  const satFull = isSat && SAT_BOOKED >= MAX_SAT;

  const canStep2 = !!serviceId;
  const canStep3 = !!store && !!selectedDay && !!time && !satFull;
  const canSubmit = form.firstName.trim() && form.lastName.trim() && form.phone.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ── Confirmation screen ─────────────────────────────────── */
  if (submitted && service && storeInfo && selectedDay) {
    return (
      <main className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-16">
        <SEO title="Rendez-vous confirmé — MAC" description="" canonical="/makeup-booking" />
        <div className="max-w-sm w-full">
          <div className="bg-white border border-gray-100 p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center mx-auto mb-5">
              <Check size={24} className="text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-black uppercase tracking-tight mb-1">Rendez-vous Confirmé</h1>
            <p className="text-gray-400 text-xs mb-7">Un SMS de confirmation vous sera envoyé.</p>

            <div
              className="h-2 w-full mb-6"
              style={{ backgroundColor: service.accent }}
            />

            <div className="space-y-4 text-left">
              {[
                { label: 'Service', value: service.name },
                { label: 'Prix', value: `${service.price} MAD${service.priceNote ? ` / ${service.priceNote}` : ''}` },
                { label: 'Boutique', value: `MAC ${storeInfo.name}` },
                { label: 'Date', value: `${fmtDateLong(selectedDay)} à ${time}` },
                { label: 'Client', value: `${form.firstName} ${form.lastName}` },
                { label: 'Téléphone', value: form.phone },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <span className="text-[10px] font-black tracking-widest uppercase text-gray-400 flex-shrink-0">{label}</span>
                  <span className="text-sm font-bold text-right">{value}</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-gray-400 mt-6 leading-relaxed">
              Remboursable en produit MAC lors de votre rendez-vous.
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* ── Booking flow ────────────────────────────────────────── */
  return (
    <main className="bg-gray-50 min-h-screen">
      <SEO
        title="Prendre Rendez-vous Maquillage — MAC Cosmetics Maroc"
        description="Réservez votre séance maquillage de jour, nuit, mariée ou photoshoot dans une boutique MAC au Maroc. Remboursable en produit."
        canonical="/makeup-booking"
      />

      {/* Page header */}
      <div className="bg-white border-b border-gray-200 px-4 py-5">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">MAC Cosmetics · Casablanca</p>
          <h1 className="text-2xl font-black uppercase tracking-tight">Prendre Rendez-vous</h1>
        </div>
      </div>

      {/* Step indicator */}
      <div className="bg-white border-b border-gray-100 px-4 py-0">
        <div className="max-w-3xl mx-auto flex">
          {[
            { n: 1 as Step, label: 'Service' },
            { n: 2 as Step, label: 'Date & Heure' },
            { n: 3 as Step, label: 'Vos Infos' },
          ].map(({ n, label }) => (
            <button
              key={n}
              type="button"
              onClick={() => { if (n < step) setStep(n); }}
              className={`flex-1 py-3 text-[10px] font-black tracking-widest uppercase border-b-2 transition-all ${
                step === n
                  ? 'border-black text-black'
                  : n < step
                  ? 'border-black text-gray-400 cursor-pointer hover:text-black'
                  : 'border-transparent text-gray-300 cursor-default'
              }`}
            >
              <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full mr-1.5 text-[9px] flex-shrink-0 ${
                step > n ? 'bg-black text-white' : step === n ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {step > n ? <Check size={8} strokeWidth={3} /> : n}
              </span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* ── Main panel ─────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">

            {/* STEP 1 ── Service selection */}
            {step === 1 && (
              <>
                <p className="text-[10px] font-black tracking-widest uppercase text-gray-400">Choisissez votre service</p>
                <div className="space-y-2">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setServiceId(s.id)}
                      className={`w-full text-left bg-white border-2 transition-all group ${
                        serviceId === s.id ? 'border-black' : 'border-transparent shadow-sm hover:border-gray-200'
                      }`}
                    >
                      <div className="flex items-stretch">
                        {/* Color accent stripe */}
                        <div className="w-1.5 flex-shrink-0" style={{ backgroundColor: s.accent }} />
                        <div className="flex items-center gap-4 px-4 py-4 flex-1 min-w-0">
                          {/* Color swatch */}
                          <div
                            className="w-11 h-11 rounded-full flex-shrink-0"
                            style={{ backgroundColor: s.accent }}
                          />
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="font-black text-sm tracking-wide">{s.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5 leading-snug">{s.description}</p>
                            <span className="inline-flex items-center gap-1 text-[10px] text-gray-400 mt-1.5">
                              <Clock size={10} /> {s.duration}
                            </span>
                          </div>
                          {/* Price + radio */}
                          <div className="flex items-center gap-4 flex-shrink-0">
                            <div className="text-right">
                              <p className="font-black text-sm">{s.price} MAD</p>
                              {s.priceNote && <p className="text-[10px] text-gray-400">{s.priceNote}</p>}
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              serviceId === s.id ? 'border-black bg-black' : 'border-gray-300 group-hover:border-gray-400'
                            }`}>
                              {serviceId === s.id && <Check size={9} className="text-white" strokeWidth={3} />}
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={!canStep2}
                  onClick={() => setStep(2)}
                  className="w-full bg-black text-white py-4 text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed mt-4"
                >
                  Continuer <ChevronRight size={14} />
                </button>
              </>
            )}

            {/* STEP 2 ── Date, store & time */}
            {step === 2 && (
              <div className="space-y-6">

                {/* Store */}
                <div>
                  <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-3 flex items-center gap-1.5">
                    <MapPin size={11} /> Boutique
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {STORES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setStore(s.id)}
                        className={`text-left bg-white border-2 p-4 transition-all ${
                          store === s.id ? 'border-black' : 'border-transparent shadow-sm hover:border-gray-200'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full mb-2 ${store === s.id ? 'bg-black' : 'bg-gray-200'}`} />
                        <p className="text-sm font-black">MAC {s.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{s.address}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date picker */}
                <div>
                  <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-3 flex items-center gap-1.5">
                    <Calendar size={11} /> Date
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
                    {days.map((d, i) => {
                      const isSatDay = d.getDay() === 6;
                      const isToday = i === 0;
                      const isSel = selectedDay?.toDateString() === d.toDateString();
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => { setSelectedDay(d); setTime(''); }}
                          className={`flex-shrink-0 w-[3.75rem] py-3.5 flex flex-col items-center gap-0.5 transition-all border-2 ${
                            isSel
                              ? 'border-black bg-black text-white'
                              : 'border-transparent bg-white shadow-sm hover:border-gray-200'
                          }`}
                        >
                          <span className={`text-[9px] font-black uppercase tracking-widest ${isSel ? 'text-gray-400' : isToday ? 'text-black' : 'text-gray-400'}`}>
                            {isToday ? "Auj." : DAY_SHORT[d.getDay()]}
                          </span>
                          <span className="text-lg font-black leading-none">{d.getDate()}</span>
                          <span className={`text-[9px] ${isSel ? 'text-gray-400' : 'text-gray-300'}`}>
                            {MONTHS[d.getMonth()]}
                          </span>
                          {isSatDay && (
                            <span className={`text-[8px] font-bold mt-0.5 ${isSel ? 'text-gray-400' : 'text-amber-500'}`}>
                              Max {MAX_SAT}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {satFull && (
                    <p className="text-xs text-red-600 font-bold mt-2">
                      Ce samedi est complet — max {MAX_SAT} rendez-vous par samedi.
                    </p>
                  )}
                </div>

                {/* Time slots */}
                {selectedDay && !satFull && (
                  <div>
                    <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-3 flex items-center gap-1.5">
                      <Clock size={11} /> Heure disponible
                      <span className="text-gray-300 font-normal normal-case tracking-normal text-[10px]">· à partir de 12h00</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {TIME_SLOTS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTime(t)}
                          className={`px-4 py-2.5 text-sm font-bold border-2 transition-all ${
                            time === t
                              ? 'border-black bg-black text-white'
                              : 'border-transparent bg-white shadow-sm hover:border-gray-200'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="border-2 border-black px-5 py-4 text-xs font-black tracking-widest uppercase flex items-center gap-1 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft size={13} /> Retour
                  </button>
                  <button
                    type="button"
                    disabled={!canStep3}
                    onClick={() => setStep(3)}
                    className="flex-1 bg-black text-white py-4 text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Continuer <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 ── Personal info */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <p className="text-[10px] font-black tracking-widest uppercase text-gray-400">Vos coordonnées</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5 text-gray-500">Prénom *</label>
                    <input
                      required
                      autoFocus
                      value={form.firstName}
                      onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                      className="w-full bg-white border-2 border-transparent focus:border-black px-4 py-3 text-sm outline-none transition-all shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5 text-gray-500">Nom *</label>
                    <input
                      required
                      value={form.lastName}
                      onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                      className="w-full bg-white border-2 border-transparent focus:border-black px-4 py-3 text-sm outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5 text-gray-500 flex items-center gap-1">
                    <Phone size={10} /> Numéro de téléphone *
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+212 6XX XXX XXX"
                    className="w-full bg-white border-2 border-transparent focus:border-black px-4 py-3 text-sm outline-none transition-all shadow-sm"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Confirmation par SMS</p>
                </div>

                <div>
                  <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5 text-gray-500">Note (optionnel)</label>
                  <textarea
                    value={form.note}
                    onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                    placeholder="Look souhaité, allergies, événement spécial…"
                    rows={3}
                    className="w-full bg-white border-2 border-transparent focus:border-black px-4 py-3 text-sm outline-none transition-all resize-none shadow-sm"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="border-2 border-black px-5 py-4 text-xs font-black tracking-widest uppercase flex items-center gap-1 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft size={13} /> Retour
                  </button>
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="flex-1 bg-black text-white py-4 text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Confirmer <ChevronRight size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ── Summary sidebar ─────────────────────────────── */}
          <aside className="lg:col-span-1">
            <div className="bg-white shadow-sm p-5 sticky top-24">
              {service && (
                <div
                  className="h-1.5 w-full mb-5 -mt-5 -mx-5"
                  style={{ width: 'calc(100% + 2.5rem)', backgroundColor: service.accent }}
                />
              )}
              <h3 className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-4">Récapitulatif</h3>

              {service ? (
                <div className="space-y-4">
                  <div>
                    <p className="font-black text-sm">{service.name}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock size={10} /> {service.duration}
                    </p>
                  </div>

                  {storeInfo && (
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Boutique</p>
                      <p className="text-sm font-bold flex items-center gap-1.5">
                        <MapPin size={11} className="text-gray-400" /> MAC {storeInfo.name}
                      </p>
                    </div>
                  )}

                  {selectedDay && time && (
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Date</p>
                      <p className="text-sm font-bold">{fmtDate(selectedDay)}</p>
                      <p className="text-sm font-bold text-gray-600">{time}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Total</span>
                    <div className="text-right">
                      <span className="font-black text-base">{service.price} MAD</span>
                      {service.priceNote && (
                        <p className="text-[10px] text-gray-400">{service.priceNote}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-400 leading-relaxed pt-2 border-t border-gray-100">
                    Remboursable en produit MAC lors de votre rendez-vous.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-gray-300 italic">Aucun service sélectionné</p>
              )}
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
