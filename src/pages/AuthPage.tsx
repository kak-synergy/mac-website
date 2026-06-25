import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '' });
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || '/account';

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = mode === 'login'
      ? login(form.email, form.password)
      : register(form);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Une erreur est survenue.');
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gray-50">
      <SEO
        title={mode === 'login' ? 'Connexion — MAC Cosmetics Maroc' : 'Créer un compte — MAC Cosmetics Maroc'}
        description="Connectez-vous à votre compte MAC Cosmetics pour suivre vos commandes, gérer votre liste de souhaits et profiter d'une expérience personnalisée."
        canonical="/login"
      />

      <div className="w-full max-w-md">
        {/* Logo / brand */}
        <div className="text-center mb-10">
          <Link to="/">
            <img src="/images/mac-logo.png" alt="M·A·C" className="h-7 mx-auto mb-6" />
          </Link>
          <h1 className="text-xl font-black uppercase tracking-tight">
            {mode === 'login' ? 'Connexion' : 'Créer un compte'}
          </h1>
          <p className="text-xs text-gray-500 mt-1.5">
            {mode === 'login'
              ? 'Accédez à votre espace personnel MAC'
              : 'Rejoignez la communauté MAC Cosmetics Maroc'}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex border border-gray-200 mb-8">
          {(['login', 'signup'] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); }}
              className={`flex-1 py-3 text-[11px] font-black tracking-widest uppercase transition-colors ${mode === m ? 'bg-black text-white' : 'bg-white text-gray-500 hover:text-black'}`}
            >
              {m === 'login' ? 'Se connecter' : "S'inscrire"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 space-y-5">
          {mode === 'signup' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Prénom *</label>
                <input
                  required
                  value={form.firstName}
                  onChange={set('firstName')}
                  placeholder="Yasmine"
                  className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Nom *</label>
                <input
                  required
                  value={form.lastName}
                  onChange={set('lastName')}
                  placeholder="El Mansouri"
                  className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Adresse e-mail *</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="yasmine@exemple.ma"
              className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors"
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Téléphone</label>
              <input
                value={form.phone}
                onChange={set('phone')}
                placeholder="+212 6XX XXX XXX"
                className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors"
              />
            </div>
          )}

          <div>
            <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Mot de passe *</label>
            <div className="relative">
              <input
                required
                type={showPw ? 'text' : 'password'}
                value={form.password}
                onChange={set('password')}
                minLength={mode === 'signup' ? 8 : undefined}
                placeholder={mode === 'signup' ? '8 caractères minimum' : '••••••••'}
                className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-600 font-bold border border-red-200 bg-red-50 px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-4 text-[11px] font-black tracking-widest uppercase hover:bg-gray-800 transition-colors"
          >
            {mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
          </button>

          {mode === 'login' && (
            <p className="text-center text-xs text-gray-400">
              Pas encore de compte ?{' '}
              <button
                type="button"
                onClick={() => { setMode('signup'); setError(''); }}
                className="font-black underline hover:no-underline text-black"
              >
                S'inscrire
              </button>
            </p>
          )}
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Vous êtes professionnel·le ?{' '}
          <Link to="/pro-register" className="font-black underline hover:no-underline text-black">
            Rejoindre MAC Pro
          </Link>
        </p>
      </div>
    </main>
  );
}
