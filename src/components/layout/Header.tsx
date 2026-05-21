import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, ChevronDown } from 'lucide-react';
import { NAV_CATEGORIES } from '../../data/navigation';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  };

  const closeAll = () => {
    setMenuOpen(false);
    setMobileExpanded(null);
  };

  return (
    <header
      className="sticky top-0 z-50 bg-white border-b border-gray-200 relative"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between h-16">
        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-1 flex-shrink-0"
          onClick={() => { setMenuOpen(!menuOpen); setMobileExpanded(null); }}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0 mx-auto md:mx-0" onClick={closeAll}>
          <img src="/images/mac-logo.png" alt="M·A·C Cosmetics" className="h-7 sm:h-8 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 absolute left-1/2 -translate-x-1/2">
          {NAV_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.href}
              className="flex items-center"
              onMouseEnter={() => setActiveDropdown(idx)}
            >
              <Link
                to={cat.href}
                className={`flex items-center gap-0.5 text-xs font-bold tracking-widest uppercase transition-opacity whitespace-nowrap py-5 ${activeDropdown === idx ? 'opacity-60' : 'hover:opacity-60'}`}
              >
                {cat.label}
                <ChevronDown
                  size={11}
                  className={`ml-0.5 transition-transform duration-200 ${activeDropdown === idx ? 'rotate-180' : ''}`}
                />
              </Link>
            </div>
          ))}
          <Link
            to="/stores"
            className="text-xs font-bold tracking-widest uppercase hover:opacity-60 transition-opacity whitespace-nowrap"
            onMouseEnter={() => setActiveDropdown(null)}
          >
            Trouver un Magasin
          </Link>
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <Link
            to="/pro-register"
            className="hidden md:inline-block text-[10px] font-black tracking-widest uppercase border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors whitespace-nowrap"
          >
            Devenir Pro
          </Link>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Rechercher"
            className="hover:opacity-60 transition-opacity"
          >
            <Search size={20} />
          </button>
          <Link to="/pro-account" className="hover:opacity-60 transition-opacity" aria-label="Compte Pro">
            <User size={20} />
          </Link>
        </div>
      </div>

      {/* ── Desktop Mega Dropdown ─────────────────────────────────── */}
      {activeDropdown !== null && (
        <div
          className="hidden md:block absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg"
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
        >
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex gap-16 items-start">
              {/* "See all" link */}
              <div className="flex-shrink-0 pt-0.5">
                <p className="text-[10px] font-black tracking-[0.25em] uppercase text-gray-400 mb-3">
                  {NAV_CATEGORIES[activeDropdown].label}
                </p>
                <Link
                  to={NAV_CATEGORIES[activeDropdown].href}
                  className="text-sm font-black tracking-wide uppercase underline hover:no-underline"
                  onClick={() => setActiveDropdown(null)}
                >
                  Voir tout
                </Link>
              </div>

              {/* Divider */}
              <div className="w-px bg-gray-200 self-stretch flex-shrink-0" />

              {/* Subcategory columns */}
              <div className="flex gap-14">
                {NAV_CATEGORIES[activeDropdown].columns.map((col, ci) => (
                  <div key={ci}>
                    {col.title && (
                      <p className="text-[10px] font-black tracking-[0.25em] uppercase text-gray-400 mb-3">
                        {col.title}
                      </p>
                    )}
                    <ul className="space-y-2.5">
                      {col.items.map((item) => (
                        <li key={item.sub}>
                          <Link
                            to={`${NAV_CATEGORIES[activeDropdown].href}&sub=${encodeURIComponent(item.sub)}`}
                            className="text-sm hover:font-bold transition-all"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Search overlay ────────────────────────────────────────── */}
      {searchOpen && (
        <div className="border-t border-gray-200 bg-white py-4 px-3 sm:px-4">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un produit, une couleur..."
              className="flex-1 border border-black px-4 py-2.5 text-base sm:text-sm outline-none focus:ring-1 focus:ring-black"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors"
            >
              Rechercher
            </button>
          </form>
        </div>
      )}

      {/* ── Mobile menu ───────────────────────────────────────────── */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white overflow-y-auto max-h-[80vh]">
          {NAV_CATEGORIES.map((cat, idx) => (
            <div key={cat.href} className="border-b border-gray-100">
              <div className="flex items-center">
                <Link
                  to={cat.href}
                  className="flex-1 px-6 py-4 text-xs font-bold tracking-widest uppercase"
                  onClick={closeAll}
                >
                  {cat.label}
                </Link>
                <button
                  className="px-5 py-4 text-gray-500"
                  onClick={() => setMobileExpanded(mobileExpanded === idx ? null : idx)}
                  aria-label={`Sous-catégories ${cat.label}`}
                >
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${mobileExpanded === idx ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              {mobileExpanded === idx && (
                <div className="bg-gray-50 px-6 pt-1 pb-4">
                  {cat.columns.map((col, ci) => (
                    <div key={ci} className={ci > 0 ? 'mt-4' : 'mt-2'}>
                      {col.title && (
                        <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-2">
                          {col.title}
                        </p>
                      )}
                      {col.items.map((item) => (
                        <Link
                          key={item.sub}
                          to={`${cat.href}&sub=${encodeURIComponent(item.sub)}`}
                          className="block py-2 text-sm text-gray-700 hover:text-black hover:font-medium"
                          onClick={closeAll}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Link
                    to={cat.href}
                    className="inline-block mt-4 text-[10px] font-black tracking-widest uppercase underline hover:no-underline"
                    onClick={closeAll}
                  >
                    Voir tout {cat.label}
                  </Link>
                </div>
              )}
            </div>
          ))}

          <Link
            to="/stores"
            className="block px-6 py-4 text-xs font-bold tracking-widest uppercase border-b border-gray-100 hover:bg-gray-50"
            onClick={closeAll}
          >
            Trouver un Magasin
          </Link>
          <Link
            to="/pro-register"
            className="block px-6 py-4 text-xs font-bold tracking-widest uppercase text-white bg-black hover:bg-gray-800"
            onClick={closeAll}
          >
            Devenir Beauté Professionnelle
          </Link>
        </div>
      )}
    </header>
  );
}
