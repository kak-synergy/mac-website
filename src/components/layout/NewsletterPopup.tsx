import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
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

        {/* Image strip */}
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1631214499644-f00718b5b7ac?w=800&q=80')" }}
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
              <p className="text-sm text-gray-600 text-center mt-2 mb-6">
                Inscrivez-vous et recevez les nouveautés, offres exclusives et invitations aux événements MAC.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse e-mail"
                  className="border border-black px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-black"
                />
                <button
                  type="submit"
                  className="bg-black text-white py-3 text-xs font-black tracking-widest uppercase hover:bg-gray-800 transition-colors"
                >
                  S'abonner
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
