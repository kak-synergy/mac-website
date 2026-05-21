import { useState } from 'react';
import { Upload, CheckCircle, Info, ArrowRight, Sparkles, Scissors, Flower2, GraduationCap, Wand2, Camera } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import content from '../data/content.json';
import SEO from '../components/SEO';

type DocType = 'rc' | 'ice' | 'diploma' | 'cin';

interface FileState {
  rc: File | null;
  ice: File | null;
  diploma: File | null;
  cin: File | null;
}

const STEPS = [
  {
    number: '01',
    title: 'Vérifiez votre éligibilité',
    description:
      'Le programme MAC Pro est ouvert aux maquilleurs·ses professionnels, esthéticiennes, coiffeurs·ses et étudiants en école de beauté agréée.',
  },
  {
    number: '02',
    title: 'Préparez votre dossier',
    description:
      'Rassemblez votre Registre de Commerce (RC), ICE, votre diplôme ou certification en maquillage et votre CIN.',
  },
  {
    number: '03',
    title: 'Soumettez votre candidature',
    description:
      'Remplissez le formulaire ci-dessous et déposez vos documents. Notre équipe examine chaque dossier sous 5 à 7 jours ouvrables.',
  },
  {
    number: '04',
    title: 'Recevez votre identifiant unique',
    description:
      'Une fois votre profil validé, vous recevez par e-mail votre identifiant professionnel MAC (format : MAC-MA-XXXXX).',
  },
  {
    number: '05',
    title: 'Utilisez votre ID en boutique',
    description:
      "Présentez votre identifiant à la caisse lors de chaque achat dans l'une de nos 5 boutiques au Maroc pour bénéficier automatiquement de votre remise de 20%.",
  },
];

const PROFILES: { Icon: LucideIcon; label: string }[] = [
  { Icon: Sparkles,      label: 'Maquilleurs / Maquilleuses' },
  { Icon: Scissors,      label: 'Coiffeurs / Coiffeuses' },
  { Icon: Flower2,       label: 'Esthéticiennes' },
  { Icon: GraduationCap, label: 'Étudiants en école de beauté' },
  { Icon: Wand2,         label: 'Artistes & Stylistes' },
  { Icon: Camera,        label: 'Photographes & Créateurs' },
];

export default function ProRegisterPage() {
  const { title, subtitle, benefits, documents, validationNote, formLabels } =
    content.proRegister;

  const [files, setFiles] = useState<FileState>({ rc: null, ice: null, diploma: null, cin: null });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    city: '',
  });

  const handleFile = (type: DocType, file: File | null) => {
    setFiles((prev) => ({ ...prev, [type]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-20 text-center">
        <CheckCircle size={56} className="mx-auto mb-6 text-black" strokeWidth={1.5} />
        <h1 className="text-3xl font-black uppercase tracking-tight mb-4">Candidature Reçue !</h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Votre dossier a bien été soumis. Notre équipe l'examinera dans un délai de{' '}
          <strong>5 à 7 jours ouvrables</strong>. Vous recevrez votre identifiant unique par e-mail
          une fois votre profil validé.
        </p>
        <div className="bg-gray-50 border border-gray-200 p-5 text-left">
          <p className="text-xs font-black tracking-widest uppercase mb-2">Prochaine étape</p>
          <p className="text-sm text-gray-700">
            Une fois votre identifiant reçu, <strong>présentez-le à la caisse</strong> dans l'une
            de nos boutiques pour bénéficier de votre remise professionnelle de <strong>20%</strong>.
          </p>
        </div>
        <p className="text-xs text-gray-400 mt-6">{validationNote}</p>
      </main>
    );
  }

  return (
    <main>
      <SEO
        title="Espace Beauté Professionnelle — Rejoindre le Programme Pro MAC"
        description="Rejoignez le programme MAC dédié aux professionnels de la beauté au Maroc. Bénéficiez de 20% de remise permanente, accès aux événements exclusifs et formations MAC."
        canonical="/pro-register"
      />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-black text-white py-16 px-4 text-center">
        <p className="text-xs font-black tracking-[0.4em] uppercase text-gray-400 mb-3">
          Programme Professionnel
        </p>
        <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-center">
          {title}
        </h1>
        <p className="text-gray-300 text-sm max-w-xl mx-auto">{subtitle}</p>
        <div className="mt-8 inline-flex items-center gap-3 border border-white/30 px-6 py-3">
          <span className="text-3xl font-black">20%</span>
          <span className="text-xs text-gray-300 text-left leading-tight">
            de remise permanente<br />sur tous les produits
          </span>
        </div>
      </section>

      {/* ── Eligible profiles ────────────────────────────────────── */}
      <section className="border-b border-gray-200 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-black tracking-widest uppercase text-center mb-6 text-gray-400">
            Ce programme est fait pour vous si vous êtes
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {PROFILES.map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-3 text-center">
                <div className="w-14 h-14 border border-black flex items-center justify-center flex-shrink-0">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <p className="text-xs font-bold tracking-wide leading-snug text-gray-800">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-center mb-10">
            Comment ça marche
          </h2>
          <div className="relative">
            {/* connecting line on desktop */}
            <div className="hidden md:block absolute top-7 left-0 right-0 h-px bg-gray-200 z-0" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
              {STEPS.map((step, i) => (
                <div key={step.number} className="flex md:flex-col gap-4 md:gap-3 md:items-center">
                  {/* Step number circle */}
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-lg font-black ${
                      step.number === '05'
                        ? 'bg-black text-white'
                        : 'bg-white border-2 border-black text-black'
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="md:text-center">
                    <p className="text-xs font-black tracking-wide uppercase mb-1">{step.title}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                  {/* Arrow between steps on mobile */}
                  {i < STEPS.length - 1 && (
                    <ArrowRight size={16} className="md:hidden text-gray-300 flex-shrink-0 self-center ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── In-store ID usage highlight ──────────────────────────── */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="border-l-4 border-black pl-6 py-2 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-xs font-black tracking-widest uppercase mb-1">Comment utiliser votre ID en boutique</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Lors de votre passage en caisse dans l'une de nos <strong>5 boutiques MAC au Maroc</strong>,
                communiquez simplement votre <strong>identifiant professionnel MAC</strong> (format MAC-MA-XXXXX)
                à l'équipe en boutique. Votre remise de <strong>20%</strong> sera automatiquement appliquée
                sur l'ensemble de vos achats.
              </p>
            </div>
            <div className="flex-shrink-0 bg-black text-white px-6 py-4 text-center">
              <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-1">Remise Pro</p>
              <p className="text-4xl font-black">20%</p>
              <p className="text-[10px] text-gray-400 mt-1">à la caisse</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Form section ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
        {/* Benefits sidebar */}
        <aside>
          <h2 className="text-xs font-black tracking-widest uppercase mb-5 border-b border-gray-200 pb-2">
            Vos Avantages
          </h2>
          <ul className="space-y-4">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle size={16} className="flex-shrink-0 mt-0.5 text-black" />
                <span className="text-sm text-gray-700">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 p-4 bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-2">
              <Info size={14} className="flex-shrink-0 mt-0.5 text-gray-500" />
              <p className="text-xs text-gray-600 leading-relaxed">{validationNote}</p>
            </div>
          </div>
        </aside>

        {/* Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-8">
          {/* Personal info */}
          <div>
            <h2 className="text-xs font-black tracking-widest uppercase mb-5 border-b border-gray-200 pb-2">
              Informations Personnelles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1">
                  {formLabels.firstName} *
                </label>
                <input
                  required
                  value={form.firstName}
                  onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                  className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1">
                  {formLabels.lastName} *
                </label>
                <input
                  required
                  value={form.lastName}
                  onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                  className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1">
                  {formLabels.email} *
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1">
                  {formLabels.phone} *
                </label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="+212 6XX XXX XXX"
                  className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1">
                  {formLabels.businessName} *
                </label>
                <input
                  required
                  value={form.businessName}
                  onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
                  className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1">
                  {formLabels.city} *
                </label>
                <input
                  required
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Document uploads */}
          <div>
            <h2 className="text-xs font-black tracking-widest uppercase mb-5 border-b border-gray-200 pb-2">
              Documents Requis
            </h2>
            <div className="space-y-4">
              {documents.map((doc) => {
                const type = doc.type as DocType;
                const file = files[type];
                return (
                  <div key={doc.type} className="border border-gray-200 p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black tracking-wider uppercase">
                          {doc.label}
                          {doc.required && <span className="text-red-500 ml-1">*</span>}
                        </p>
                        {file && (
                          <p className="text-xs text-gray-500 mt-1 truncate">✓ {file.name}</p>
                        )}
                      </div>
                      <label className="flex items-center justify-center sm:justify-start gap-2 border border-black px-4 py-2 text-xs font-black tracking-widest uppercase cursor-pointer hover:bg-black hover:text-white transition-colors sm:flex-shrink-0">
                        <Upload size={13} />
                        {file ? 'Modifier' : 'Choisir'}
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          required={doc.required}
                          className="hidden"
                          onChange={(e) => handleFile(type, e.target.files?.[0] ?? null)}
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Formats acceptés : PDF, JPG, PNG. Taille max : 5 Mo par fichier.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 text-xs font-black tracking-widest uppercase hover:bg-gray-800 transition-colors"
          >
            {formLabels.submitBtn}
          </button>
        </form>
      </div>
    </main>
  );
}
