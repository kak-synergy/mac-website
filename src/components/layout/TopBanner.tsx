import { useState } from 'react';
import { X } from 'lucide-react';

export default function TopBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-black text-white text-center py-2 px-4 text-xs tracking-widest uppercase font-medium relative flex items-center justify-center">
      <span>
        Rejoignez{' '}
        <strong className="font-black">AKSAL BLACK</strong> — Profitez de 20% de remise toute l'année &amp; accès aux événements exclusifs MAC.{' '}
        <a href="/pro-register" className="underline hover:no-underline font-bold">
          Rejoindre maintenant
        </a>
      </span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
        aria-label="Fermer"
      >
        <X size={14} />
      </button>
    </div>
  );
}
