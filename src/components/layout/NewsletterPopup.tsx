import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { asset } from '../../lib/asset';

// ── Change the popup image here ──────────────────────────────────────────────
const POPUP_IMAGE = '/images/home-page-banner.png';
// ────────────────────────────────────────────────────────────────────────────

type Channel = 'email' | 'whatsapp';

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [channel, setChannel] = useState<Channel>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('newsletter-dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setOpen(false);
    sessionStorage.setItem('newsletter-dismissed', '1');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (channel === 'whatsapp' && phone) {
      const cleaned = phone.replace(/\s/g, '');
      window.open(`https://wa.me/${cleaned.startsWith('+') ? cleaned.slice(1) : cleaned}`, '_blank');
    }
    setSubmitted(true);
    setTimeout(dismiss, 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white max-w-md w-full relative overflow-hidden">
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 z-10 hover:opacity-60 transition-opacity"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        <img
          src={asset(POPUP_IMAGE)}
          alt=""
          className="w-full h-48 object-cover block"
        />

        <div className="px-8 py-8">
          {submitted ? (
            <div className="text-center py-4">
              <p className="text-xl font-black uppercase tracking-tight">Merci !</p>
              <p className="text-sm text-gray-600 mt-2">Vous êtes maintenant inscrit(e) à notre newsletter.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-black uppercase tracking-tight text-center">
                Restez dans la tendance
              </h2>
              <p className="text-sm text-gray-600 text-center mt-2 mb-5">
                Inscrivez-vous et recevez les nouveautés, offres exclusives et invitations aux événements MAC.
              </p>

              {/* Channel tabs */}
              <div className="flex border border-black mb-5">
                <button
                  type="button"
                  onClick={() => setChannel('email')}
                  className={`flex-1 py-2 text-xs font-black tracking-widest uppercase transition-colors ${
                    channel === 'email' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  E-mail
                </button>
                <button
                  type="button"
                  onClick={() => setChannel('whatsapp')}
                  className={`flex-1 py-2 text-xs font-black tracking-widest uppercase transition-colors border-l border-black ${
                    channel === 'whatsapp' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  WhatsApp
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {channel === 'email' ? (
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse e-mail"
                    className="border border-black px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-black"
                  />
                ) : (
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 6XX XXX XXX"
                    className="border border-black px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-black"
                  />
                )}
                <button
                  type="submit"
                  className="bg-black text-white py-3 text-xs font-black tracking-widest uppercase hover:bg-gray-800 transition-colors"
                >
                  {channel === 'whatsapp' ? 'Rejoindre sur WhatsApp' : "S'abonner"}
                </button>
              </form>
              <button
                onClick={dismiss}
                className="w-full mt-3 text-xs text-gray-400 hover:text-black underline transition-colors"
              >
                Non merci
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
