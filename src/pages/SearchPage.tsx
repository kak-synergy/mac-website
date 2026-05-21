import { useSearchParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import productsData from '../data/products.json';
import type { Product } from '../types';

const products = productsData as Product[];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.shades.some((s) => s.name.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <Search size={20} />
          <h1 className="text-2xl font-black uppercase tracking-tight">
            Résultats pour &ldquo;{query}&rdquo;
          </h1>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {results.length} résultat{results.length !== 1 ? 's' : ''} trouvé{results.length !== 1 ? 's' : ''}
        </p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg font-black uppercase tracking-tight">Aucun résultat</p>
          <p className="text-gray-500 text-sm mt-2 mb-6">
            Aucun produit ne correspond à votre recherche &ldquo;{query}&rdquo;.
          </p>
          <Link
            to="/products"
            className="inline-block bg-black text-white px-8 py-3 text-xs font-black tracking-widest uppercase hover:bg-gray-800 transition-colors"
          >
            Voir tous les produits
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
