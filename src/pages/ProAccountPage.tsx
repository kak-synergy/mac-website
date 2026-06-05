import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, FileText, Download, Star, Eye, EyeOff } from 'lucide-react';

const MOCK_PURCHASES = [
  {
    id: 'INV-2025-001',
    date: '15 mars 2025',
    products: ['Rouge à Lèvres Matte — Ruby Woo', 'Fond de Teint Studio Fix Fluid NW20'],
    total: 648,
    status: 'Livré',
  },
  {
    id: 'INV-2025-002',
    date: '28 janvier 2025',
    products: ['Prep + Prime Fix+ — Original', 'Crayon à Lèvres — Spice', 'Pinceau Estompeur 217S'],
    total: 747,
    status: 'Livré',
  },
  {
    id: 'INV-2024-047',
    date: '5 décembre 2024',
    products: ['Palette Neutral Times Nine', 'Correcteur Pro Longwear NW25'],
    total: 848,
    status: 'Livré',
  },
];

const ELIGIBILITY_CRITERIA = [
  { label: 'Registre de Commerce (RC)', done: true },
  { label: "Identifiant Commun de l'Entreprise (ICE)", done: true },
  { label: 'Diplôme ou Certification en Maquillage', done: true },
  { label: "Carte d'Identité Nationale (CIN)", done: true },
  { label: "Validation par l'équipe MAC", done: true },
];

type Step = 'login' | 'set-password' | 'dashboard';

export default function ProAccountPage() {
  const [step, setStep] = useState<Step>('login');
  const [proId, setProId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  // Step 1 — Enter unique ID
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!proId.trim()) { setError("Veuillez saisir votre identifiant unique."); return; }
    // Simulate: if ID matches our mock user → go to set-password (first login)
    setStep('set-password');
  };

  // Step 2 — Create password on first login
  const handleSetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('Le mot de passe doit contenir au moins 8 caractères.'); return; }
    if (password !== confirmPassword) { setError('Les mots de passe ne correspondent pas.'); return; }
    setStep('dashboard');
  };

  /* ── Step 1: Enter ID ───────────────────────────────────────── */
  if (step === 'login') {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <p className="text-xs font-black tracking-[0.35em] uppercase text-gray-400 mb-2">Espace Exclusif</p>
            <h1 className="text-3xl font-black uppercase tracking-tight">Connexion Pro</h1>
            <p className="text-sm text-gray-500 mt-3">
              Saisissez l'identifiant unique reçu par e-mail après validation de votre dossier.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] font-black tracking-widest uppercase block mb-1">
                Identifiant Unique *
              </label>
              <input
                required
                autoFocus
                value={proId}
                onChange={(e) => setProId(e.target.value)}
                placeholder="Ex : MAC-MA-00847"
                className="w-full border border-black px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-black tracking-widest uppercase placeholder-gray-300"
              />
            </div>

            {error && <p className="text-red-600 text-xs">{error}</p>}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 text-xs font-black tracking-widest uppercase hover:bg-gray-800 transition-colors"
            >
              Continuer
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Pas encore de compte ?{' '}
            <Link to="/pro-register" className="font-black text-black underline hover:no-underline">
              Déposer ma candidature
            </Link>
          </p>
        </div>
      </main>
    );
  }

  /* ── Step 2: Create password (first login) ──────────────────── */
  if (step === 'set-password') {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <p className="text-xs font-black tracking-[0.35em] uppercase text-gray-400 mb-2">Première Connexion</p>
            <h1 className="text-3xl font-black uppercase tracking-tight">Créer votre mot de passe</h1>
            <p className="text-sm text-gray-500 mt-3">
              Bienvenue ! Créez un mot de passe sécurisé pour accéder à votre espace professionnel.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 px-4 py-3 mb-6 flex items-center gap-3">
            <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-black tracking-widest uppercase text-gray-400">Identifiant confirmé</p>
              <p className="text-sm font-black tracking-widest">{proId.toUpperCase()}</p>
            </div>
          </div>

          <form onSubmit={handleSetPassword} className="space-y-4">
            <div>
              <label className="text-[10px] font-black tracking-widest uppercase block mb-1">
                Nouveau mot de passe *
              </label>
              <div className="relative">
                <input
                  required
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 caractères"
                  className="w-full border border-black px-4 py-3 pr-10 text-sm outline-none focus:ring-1 focus:ring-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black tracking-widest uppercase block mb-1">
                Confirmer le mot de passe *
              </label>
              <div className="relative">
                <input
                  required
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Répétez votre mot de passe"
                  className="w-full border border-black px-4 py-3 pr-10 text-sm outline-none focus:ring-1 focus:ring-black"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-600 text-xs">{error}</p>}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 text-xs font-black tracking-widest uppercase hover:bg-gray-800 transition-colors"
            >
              Accéder à mon espace
            </button>
          </form>
        </div>
      </main>
    );
  }

  /* ── Step 3: Dashboard ──────────────────────────────────────── */
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="border-b border-gray-200 pb-6 mb-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p className="text-xs font-black tracking-[0.3em] uppercase text-gray-400 mb-1">Espace Pro</p>
          <h1 className="text-3xl font-black uppercase tracking-tight">Mon Compte</h1>
          <p className="text-sm text-gray-600 mt-1">Bienvenue, <strong>Yasmine El Mansouri</strong></p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black tracking-widest uppercase text-gray-400">ID Professionnel</p>
          <p className="text-lg font-black tracking-widest">{proId.toUpperCase() || 'MAC-MA-00847'}</p>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase text-green-700 bg-green-50 px-2 py-0.5 mt-1 border border-green-200">
            <CheckCircle size={10} /> Validé
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        <aside className="space-y-8">
          <div className="bg-black text-white p-6 text-center">
            <p className="text-xs font-black tracking-widest uppercase text-gray-400 mb-1">Votre remise</p>
            <p className="text-5xl font-black leading-none">20%</p>
            <p className="text-xs text-gray-400 mt-2">sur tous les produits MAC, toute l'année</p>
          </div>

          <div>
            <h2 className="text-xs font-black tracking-widest uppercase mb-4 border-b border-gray-200 pb-2">Mes Avantages</h2>
            <ul className="space-y-3">
              {['20% de remise permanente sur tous les produits', 'Accès aux événements MAC exclusifs', "Invitations aux ouvertures de boutiques"].map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm">
                  <Star size={14} className="fill-black text-black flex-shrink-0" /> {b}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-black tracking-widest uppercase mb-4 border-b border-gray-200 pb-2">Éligibilité</h2>
            <ul className="space-y-3">
              {ELIGIBILITY_CRITERIA.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  {item.done
                    ? <CheckCircle size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                    : <Clock size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />}
                  <span className={`text-xs ${item.done ? '' : 'text-gray-400'}`}>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="md:col-span-2">
          <h2 className="text-xs font-black tracking-widest uppercase mb-6 border-b border-gray-200 pb-2">
            Historique des Achats & Factures
          </h2>
          <div className="space-y-4">
            {MOCK_PURCHASES.map((order) => (
              <div key={order.id} className="border border-gray-200 p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-4">
                  <div>
                    <p className="text-xs font-black tracking-widest uppercase">{order.id}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{order.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-black">{order.total} MAD</p>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 mt-1 inline-block">
                      {order.status}
                    </span>
                  </div>
                </div>
                <ul className="space-y-1 mb-4">
                  {order.products.map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
                <button className="flex items-center gap-2 text-xs font-black tracking-widest uppercase hover:underline">
                  <Download size={13} /><FileText size={13} /> Télécharger la facture
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
