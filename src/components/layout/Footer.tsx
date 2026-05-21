import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <img src="/images/mac-logo.png" alt="M·A·C Cosmetics" className="h-8 w-auto mb-4 invert" />
          <p className="text-gray-400 text-xs leading-relaxed">
            Make-up Art Cosmetics.<br />
            Tous Les Ages. Toutes les Races. Tous les Sexes.
          </p>
          <div className="flex gap-4 mt-5">
            <a href="https://www.instagram.com/maccosmetics" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-60 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/MACcosmetics" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-60 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.youtube.com/maccosmetics" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:opacity-60 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
            </a>
          </div>
        </div>

        {/* Produits */}
        <div>
          <h3 className="text-xs font-black tracking-widest uppercase mb-4">Produits</h3>
          <ul className="space-y-2 text-gray-400 text-xs">
            {['Lèvres', 'Yeux', 'Visage', 'Peau', 'Pinceaux & Outils'].map((cat) => (
              <li key={cat}>
                <Link to={`/products?category=${encodeURIComponent(cat)}`} className="hover:text-white transition-colors">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Informations */}
        <div>
          <h3 className="text-xs font-black tracking-widest uppercase mb-4">Informations</h3>
          <ul className="space-y-3 text-xs">
            <li>
              <Link to="/stores" className="flex items-center gap-2 text-white font-bold hover:opacity-70 transition-opacity">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Trouver un Magasin
              </Link>
            </li>
            <li>
              <Link to="/pro-register" className="flex items-center gap-2 text-white font-bold hover:opacity-70 transition-opacity">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Devenir Beauté Professionnelle
              </Link>
            </li>
            <li className="pt-1 border-t border-gray-800">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Mentions Légales</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Politique de Confidentialité</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xs font-black tracking-widest uppercase mb-4">Restez Connecté</h3>
          <p className="text-gray-400 text-xs mb-3">Recevez les dernières nouveautés et offres exclusives.</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-2"
          >
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              className="bg-transparent border border-gray-600 text-white px-3 py-2 text-xs outline-none focus:border-white transition-colors placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 text-xs font-black tracking-widest uppercase hover:bg-gray-200 transition-colors"
            >
              S'abonner
            </button>
          </form>
          <p className="text-gray-500 text-xs mt-3">Ou rejoignez-nous sur WhatsApp</p>
          <input
            type="tel"
            placeholder="+212 6XX XXX XXX"
            className="mt-1 w-full bg-transparent border border-gray-600 text-white px-3 py-2 text-xs outline-none focus:border-white transition-colors placeholder-gray-500"
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-4 px-4 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} MAC Cosmetics Morocco — Distribué par{' '}
        <a href="#" className="text-white font-bold hover:underline">AKSAL Group</a>.
        Tous droits réservés.
      </div>
    </footer>
  );
}
