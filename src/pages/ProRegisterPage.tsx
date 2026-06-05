import { useState } from 'react';
import { Upload, CheckCircle, Info, ArrowRight, Sparkles, Scissors, Flower2, GraduationCap, Wand2, Camera, Tv } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SEO from '../components/SEO';

type DocKey = 'rc' | 'ice' | 'diploma' | 'cin' | 'portfolio';

interface DocSpec {
  type: DocKey;
  label: string;
  required: boolean;
}

interface FileState {
  rc: File | null;
  ice: File | null;
  diploma: File | null;
  cin: File | null;
  portfolio: File | null;
}

const PROFESSION_DOCS: Record<string, DocSpec[]> = {
  'Maquilleurs / Maquilleuses': [
    { type: 'cin',       label: "Carte d'Identité Nationale (CIN)", required: true },
    { type: 'diploma',   label: 'Diplôme ou Certification en Maquillage', required: true },
    { type: 'rc',        label: 'Registre de Commerce (RC)', required: false },
    { type: 'ice',       label: "Identifiant Commun de l'Entreprise (ICE)", required: false },
  ],
  'Salon de Coiffure': [
    { type: 'cin',  label: "Carte d'Identité Nationale (CIN)", required: true },
    { type: 'rc',   label: 'Registre de Commerce (RC)', required: true },
    { type: 'ice',  label: "Identifiant Commun de l'Entreprise (ICE)", required: true },
  ],
  'Esthéticiennes': [
    { type: 'cin',      label: "Carte d'Identité Nationale (CIN)", required: true },
    { type: 'diploma',  label: "Diplôme en Esthétique", required: true },
    { type: 'rc',       label: 'Registre de Commerce (RC)', required: false },
    { type: 'ice',      label: "Identifiant Commun de l'Entreprise (ICE)", required: false },
  ],
  'Étudiants en école de beauté': [
    { type: 'cin',     label: "Carte d'Identité Nationale (CIN)", required: true },
    { type: 'diploma', label: "Attestation d'inscription ou carte d'étudiant(e)", required: true },
  ],
  'Artistes & Stylistes': [
    { type: 'cin',       label: "Carte d'Identité Nationale (CIN)", required: true },
    { type: 'portfolio', label: 'Portfolio ou CV', required: false },
  ],
  'Professionnel(le)s TV & Artistes': [
    { type: 'cin',       label: "Carte d'Identité Nationale (CIN)", required: true },
    { type: 'portfolio', label: 'Carte de presse ou Portfolio', required: false },
  ],
  'Photographes & Créateurs': [
    { type: 'cin',       label: "Carte d'Identité Nationale (CIN)", required: true },
    { type: 'portfolio', label: 'Portfolio', required: false },
  ],
};

const PROFESSION_TYPES = Object.keys(PROFESSION_DOCS);

const PROFILES: { Icon: LucideIcon; label: string }[] = [
  { Icon: Sparkles,      label: 'Maquilleurs / Maquilleuses' },
  { Icon: Scissors,      label: 'Salon de Coiffure' },
  { Icon: Flower2,       label: 'Esthéticiennes' },
  { Icon: GraduationCap, label: 'Étudiants en école de beauté' },
  { Icon: Wand2,         label: 'Artistes & Stylistes' },
  { Icon: Tv,            label: 'Professionnel(le)s TV & Artistes' },
  { Icon: Camera,        label: 'Photographes & Créateurs' },
];

const STEPS = [
  {
    number: '01',
    title: 'Vérifiez votre éligibilité',
    description:
      'Le programme MAC Pro est ouvert aux maquilleurs·ses professionnels, esthéticiennes, salons de coiffure, professionnels TV & artistes et étudiants en école de beauté agréée.',
  },
  {
    number: '02',
    title: 'Préparez votre dossier',
    description:
      'Rassemblez les documents requis selon votre profil (RC, ICE, diplôme ou certification, CIN, portfolio…).',
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
      "Présentez votre identifiant à la caisse lors de chaque achat dans l'une de nos boutiques au Maroc pour bénéficier automatiquement de vos avantages professionnels.",
  },
];

const BENEFITS = [
  "Avantages professionnels exclusifs sur tous les produits",
  "Accès aux événements et formations MAC exclusifs",
  "Invitations aux ouvertures de boutiques",
  "Accès au catalogue professionnel complet",
];

const VALIDATION_NOTE =
  "Votre dossier sera examiné par notre équipe dans un délai de 5 à 7 jours ouvrables. Un identifiant unique vous sera envoyé par e-mail une fois votre profil validé.";

export default function ProRegisterPage() {
  const [files, setFiles] = useState<FileState>({ rc: null, ice: null, diploma: null, cin: null, portfolio: null });
  const [submitted, setSubmitted] = useState(false);
  const [professionType, setProfessionType] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    city: '',
    instagram: '',
    tiktok: '',
    note: '',
  });

  const currentDocs = professionType ? PROFESSION_DOCS[professionType] ?? [] : [];

  const handleFile = (type: DocKey, file: File | null) => {
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
            de nos boutiques pour bénéficier de vos avantages professionnels.
          </p>
        </div>
        <p className="text-xs text-gray-400 mt-6">{VALIDATION_NOTE}</p>
      </main>
    );
  }

  return (
    <main>
      <SEO
        title="Espace Beauté Professionnelle — Rejoindre le Programme Pro MAC"
        description="Rejoignez le programme MAC dédié aux professionnels de la beauté au Maroc. Accès aux événements exclusifs, formations MAC et avantages professionnels."
        canonical="/pro-register"
      />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-black text-white py-16 px-4 text-center">
        <p className="text-xs font-black tracking-[0.4em] uppercase text-gray-400 mb-3">
          Programme Professionnel
        </p>
        <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-center">
          Espace Beauté Professionnelle
        </h1>
        <p className="text-gray-300 text-sm max-w-xl mx-auto">
          Rejoignez la communauté des professionnels de la beauté MAC
        </p>
      </section>

      {/* ── Eligible profiles ────────────────────────────────────── */}
      <section className="border-b border-gray-200 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-black tracking-widest uppercase text-center mb-6 text-gray-400">
            Ce programme est fait pour vous si vous êtes
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6">
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
            <div className="hidden md:block absolute top-7 left-0 right-0 h-px bg-gray-200 z-0" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
              {STEPS.map((step, i) => (
                <div key={step.number} className="flex md:flex-col gap-4 md:gap-3 md:items-center">
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
                  {i < STEPS.length - 1 && (
                    <ArrowRight size={16} className="md:hidden text-gray-300 flex-shrink-0 self-center ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Règles d'adhésion ────────────────────────────────────── */}
      <section className="py-12 px-4 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-8">
            Règles d'adhésion
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* How to use your ID */}
            <div className="border border-black p-6">
              <p className="text-xs font-black tracking-widest uppercase mb-4">Utiliser votre ID en boutique</p>
              <ol className="space-y-3">
                {[
                  "Recevez votre identifiant professionnel MAC (format MAC-MA-XXXXX) par e-mail après validation.",
                  "À la caisse, présentez votre ID Pro MAC accompagné de votre CIN.",
                  "Votre remise de 20% est appliquée automatiquement sur l'ensemble de vos achats.",
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center font-black text-[10px] flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {rule}
                  </li>
                ))}
              </ol>
            </div>

            {/* Rules & conditions */}
            <div className="bg-gray-50 border border-gray-200 p-6">
              <p className="text-xs font-black tracking-widest uppercase mb-4">Conditions d'utilisation</p>
              <ul className="space-y-3">
                {[
                  "La remise est strictement personnelle et non transférable.",
                  "L'ID Pro est valable uniquement en boutique MAC au Maroc, sur présentation de la CIN.",
                  "Toute tentative de fraude entraîne la suspension immédiate du compte.",
                  "Le programme est réservé aux professionnels exerçant une activité dans le secteur de la beauté.",
                  "MAC se réserve le droit de demander une mise à jour des documents à tout moment.",
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                    <span className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0 mt-1.5" />
                    {rule}
                  </li>
                ))}
              </ul>
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
            {BENEFITS.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle size={16} className="flex-shrink-0 mt-0.5 text-black" />
                <span className="text-sm text-gray-700">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 p-4 bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-2">
              <Info size={14} className="flex-shrink-0 mt-0.5 text-gray-500" />
              <p className="text-xs text-gray-600 leading-relaxed">{VALIDATION_NOTE}</p>
            </div>
          </div>
        </aside>

        {/* Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-8">

          {/* Profession type */}
          <div>
            <h2 className="text-xs font-black tracking-widest uppercase mb-5 border-b border-gray-200 pb-2">
              Type de Profil
            </h2>
            <div>
              <label className="text-[10px] font-black tracking-widest uppercase block mb-1">
                Vous êtes *
              </label>
              <select
                required
                value={professionType}
                onChange={(e) => {
                  setProfessionType(e.target.value);
                  setFiles({ rc: null, ice: null, diploma: null, cin: null, portfolio: null });
                }}
                className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black bg-white"
              >
                <option value="">— Sélectionnez votre profil —</option>
                {PROFESSION_TYPES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Personal info */}
          <div>
            <h2 className="text-xs font-black tracking-widest uppercase mb-5 border-b border-gray-200 pb-2">
              Informations Personnelles
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
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1">Adresse e-mail professionnelle *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1">Numéro de téléphone *</label>
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
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1">Nom du salon / studio</label>
                <input
                  value={form.businessName}
                  onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
                  className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1">Ville *</label>
                <input
                  required
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1">Instagram (optionnel)</label>
                <input
                  type="url"
                  value={form.instagram}
                  onChange={(e) => setForm((f) => ({ ...f, instagram: e.target.value }))}
                  placeholder="https://instagram.com/votre_compte"
                  className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1">TikTok (optionnel)</label>
                <input
                  type="url"
                  value={form.tiktok}
                  onChange={(e) => setForm((f) => ({ ...f, tiktok: e.target.value }))}
                  placeholder="https://tiktok.com/@votre_compte"
                  className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Dynamic document uploads */}
          {professionType && (
            <div>
              <h2 className="text-xs font-black tracking-widest uppercase mb-2 border-b border-gray-200 pb-2">
                Documents Requis
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                Documents pour le profil <strong>{professionType}</strong>
              </p>
              <div className="space-y-4">
                {currentDocs.map((doc) => {
                  const file = files[doc.type];
                  return (
                    <div key={doc.type} className="border border-gray-200 p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black tracking-wider uppercase">
                            {doc.label}
                            {doc.required
                              ? <span className="text-red-500 ml-1">*</span>
                              : <span className="text-gray-400 ml-1 font-normal normal-case tracking-normal">(optionnel)</span>
                            }
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
                            onChange={(e) => handleFile(doc.type, e.target.files?.[0] ?? null)}
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
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-4 text-xs font-black tracking-widest uppercase hover:bg-gray-800 transition-colors"
          >
            Soumettre ma candidature
          </button>
        </form>
      </div>
    </main>
  );
}
