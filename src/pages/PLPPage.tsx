import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import productsData from '../data/products.json';
import content from '../data/content.json';
import { NAV_CATEGORIES } from '../data/navigation';
import type { Product } from '../types';
import SEO from '../components/SEO';

const products = productsData as Product[];

const PRICE_RANGES = [
  { label: 'Moins de 200 MAD', min: 0, max: 200 },
  { label: '200 – 300 MAD', min: 200, max: 300 },
  { label: '300 – 400 MAD', min: 300, max: 400 },
  { label: 'Plus de 400 MAD', min: 400, max: Infinity },
];

export default function PLPPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);

  const selectedCategory = searchParams.get('category') || '';
  const selectedSubcategory = searchParams.get('sub') || '';
  const selectedBadge = searchParams.get('badge') || '';
  const selectedPriceIdx = searchParams.get('price') ? Number(searchParams.get('price')) : -1;

  const setCategory = (cat: string) => {
    const p = new URLSearchParams(searchParams);
    if (cat) p.set('category', cat); else p.delete('category');
    p.delete('badge');
    p.delete('price');
    p.delete('sub');
    setSearchParams(p);
  };

  const setSub = (sub: string) => {
    const p = new URLSearchParams(searchParams);
    if (sub) p.set('sub', sub); else p.delete('sub');
    setSearchParams(p);
    setFilterOpen(false);
  };

  const setPrice = (idx: number) => {
    const p = new URLSearchParams(searchParams);
    if (idx >= 0) p.set('price', String(idx)); else p.delete('price');
    setSearchParams(p);
  };

  const filtered = useMemo(() => {
    let result = products;
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
    if (selectedSubcategory) result = result.filter((p) => p.subcategory === selectedSubcategory);
    if (selectedBadge === 'new') result = result.filter((p) => p.badge && p.badge !== 'BEST SELLER');
    if (selectedBadge === 'bestseller') result = result.filter((p) => p.badge === 'BEST SELLER');
    if (selectedPriceIdx >= 0) {
      const range = PRICE_RANGES[selectedPriceIdx];
      result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }
    return result;
  }, [selectedCategory, selectedSubcategory, selectedBadge, selectedPriceIdx]);

  const pageTitle = selectedSubcategory
    || selectedCategory
    || (selectedBadge === 'new' ? 'Nouveautés'
    : selectedBadge === 'bestseller' ? 'Best-Sellers'
    : 'Tous les Produits');

  // Find subcategory groups for selected category
  const activeNavCat = NAV_CATEGORIES.find((c) => c.category === selectedCategory);
  const allSubcategories = activeNavCat
    ? activeNavCat.columns.flatMap((col) => col.items)
    : [];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <SEO
        title={pageTitle}
        description={`Découvrez tous nos produits ${pageTitle.toLowerCase()} MAC Cosmetics au Maroc. Retrouvez-nous dans nos 5 boutiques à Casablanca, Marrakech et Rabat.`}
        canonical={`/products${selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}` : ''}`}
      />

      {/* Header */}
      <div className="flex items-end justify-between mb-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">{pageTitle}</h1>
          <p className="text-xs text-gray-500 mt-1">{filtered.length} produit{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-2 text-xs font-black tracking-widest uppercase border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors md:hidden"
        >
          <SlidersHorizontal size={14} /> Filtres
        </button>
      </div>

      {/* ── Subcategory strip ──────────────────────────────────────── */}
      {selectedCategory && allSubcategories.length > 0 && (
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSub('')}
              className={`flex-shrink-0 text-[10px] font-black tracking-widest uppercase px-4 py-2 border transition-colors ${!selectedSubcategory ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black'}`}
            >
              Tous
            </button>
            {allSubcategories.map((item) => (
              <button
                key={item.sub}
                onClick={() => setSub(item.sub)}
                className={`flex-shrink-0 text-[10px] font-black tracking-widest uppercase px-4 py-2 border transition-colors whitespace-nowrap ${selectedSubcategory === item.sub ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-10">
        {/* ── Sidebar filters ────────────────────────────────────── */}
        <aside
          className={`
            ${filterOpen ? 'fixed inset-0 z-50 bg-white overflow-y-auto p-6' : 'hidden'}
            md:block md:static md:inset-auto md:z-auto md:bg-transparent md:p-0
            w-full md:w-56 flex-shrink-0
          `}
        >
          {filterOpen && (
            <div className="flex items-center justify-between mb-6 md:hidden">
              <h2 className="text-lg font-black uppercase">Filtres</h2>
              <button onClick={() => setFilterOpen(false)}><X size={22} /></button>
            </div>
          )}

          {/* Category filter */}
          <div className="mb-8">
            <h3 className="text-xs font-black tracking-widest uppercase mb-4 border-b border-gray-200 pb-2">Catégorie</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { setCategory(''); setFilterOpen(false); }}
                  className={`text-sm w-full text-left py-0.5 hover:font-bold transition-all ${!selectedCategory ? 'font-black' : 'text-gray-600'}`}
                >
                  Tous les produits
                </button>
              </li>
              {content.categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => { setCategory(cat); setFilterOpen(false); }}
                    className={`text-sm w-full text-left py-0.5 hover:font-bold transition-all ${selectedCategory === cat ? 'font-black' : 'text-gray-600'}`}
                  >
                    {cat}
                  </button>

                  {/* Inline subcategories in sidebar when category is active */}
                  {selectedCategory === cat && allSubcategories.length > 0 && (
                    <ul className="mt-1 ml-3 space-y-1">
                      {allSubcategories.map((item) => (
                        <li key={item.sub}>
                          <Link
                            to={`${activeNavCat!.href}&sub=${encodeURIComponent(item.sub)}`}
                            className={`text-xs py-0.5 w-full text-left block transition-all ${selectedSubcategory === item.sub ? 'font-black' : 'text-gray-500 hover:text-black'}`}
                            onClick={() => setFilterOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Price filter */}
          <div className="mb-8">
            <h3 className="text-xs font-black tracking-widest uppercase mb-4 border-b border-gray-200 pb-2">Prix</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { setPrice(-1); setFilterOpen(false); }}
                  className={`text-sm w-full text-left py-0.5 hover:font-bold transition-all ${selectedPriceIdx === -1 ? 'font-black' : 'text-gray-600'}`}
                >
                  Tous les prix
                </button>
              </li>
              {PRICE_RANGES.map((range, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => { setPrice(idx); setFilterOpen(false); }}
                    className={`text-sm w-full text-left py-0.5 hover:font-bold transition-all ${selectedPriceIdx === idx ? 'font-black' : 'text-gray-600'}`}
                  >
                    {range.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Clear filters */}
          {(selectedCategory || selectedSubcategory || selectedPriceIdx >= 0) && (
            <button
              onClick={() => { setCategory(''); setPrice(-1); setSub(''); setFilterOpen(false); }}
              className="text-xs font-black tracking-widest uppercase underline hover:no-underline"
            >
              Effacer les filtres
            </button>
          )}
        </aside>

        {/* ── Product grid ────────────────────────────────────────── */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg font-black uppercase tracking-tight">Aucun produit trouvé</p>
              <p className="text-gray-500 text-sm mt-2">Essayez de modifier vos filtres.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
