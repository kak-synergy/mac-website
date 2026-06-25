import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ChevronDown, ChevronUp, Plus, Minus, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-xs font-black tracking-widest uppercase text-left"
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}
import ProductCard from '../components/ui/ProductCard';
import SEO from '../components/SEO';
import productsData from '../data/products.json';
import storesData from '../data/stores.json';
import type { Product, Store } from '../types';

const products = productsData as Product[];
const stores = storesData as Store[];

export default function PDPPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedShade, setSelectedShade] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [storeOpen, setStoreOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem, openCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  if (!product) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-black uppercase">Produit introuvable</h1>
        <Link to="/products" className="mt-4 inline-block underline text-sm">Retour aux produits</Link>
      </main>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const currentShade = product.shades[selectedShade];
  const shadeUnavailable = currentShade?.inStock === false;
  const canAddToCart = product.inStock && !shadeUnavailable;

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      shade: product.shades.length > 1 && currentShade
        ? { id: currentShade.id, name: currentShade.name, hex: currentShade.hex }
        : null,
      quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
    openCart();
  };

  const similar = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main>
      <SEO
        title={product.name}
        description={`${product.name} — ${product.description.slice(0, 140)}. Disponible en ${product.shades.length} teinte${product.shades.length > 1 ? 's' : ''}. Prix : ${product.price} MAD.`}
        canonical={`/products/${product.id}`}
        image={product.image}
        type="product"
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "image": product.images,
          "description": product.description,
          "brand": { "@type": "Brand", "name": "MAC Cosmetics" },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "MAD",
            "price": product.price,
            "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "reviewCount": product.reviewCount
          }
        }}
      />
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-gray-500 flex gap-2 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-black flex-shrink-0">Accueil</Link>
        <span>/</span>
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-black flex-shrink-0">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-black font-medium truncate">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

          {/* Images — thumbnails below main on mobile, left side on desktop */}
          <div className="flex flex-col gap-3">
            {/* Main image */}
            <div className="w-full bg-gray-50 aspect-square overflow-hidden relative">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-black tracking-widest uppercase px-2 py-1">
                  {product.badge}
                </span>
              )}
            </div>
            {/* Thumbnails row */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 border-2 overflow-hidden flex-shrink-0 transition-all ${activeImage === i ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-2">{product.subcategory}</p>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight">{product.name}</h1>

            <p className="text-2xl font-black mt-4">{product.price} MAD</p>

            {/* Shade selector */}
            {product.shades.length > 1 && (
              <div className="mt-6">
                <p className="text-xs font-black tracking-widest uppercase mb-3">
                  Teinte : <span className="font-normal normal-case tracking-normal">{product.shades[selectedShade].name}</span>
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {product.shades.map((shade, i) => {
                    const shadeOutOfStock = shade.inStock === false;
                    return (
                      <button
                        key={shade.id}
                        onClick={() => setSelectedShade(i)}
                        title={shadeOutOfStock ? `${shade.name} — Non disponible` : shade.name}
                        className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all hover:scale-110 ${selectedShade === i ? 'border-black scale-110 shadow-md' : 'border-gray-200'} ${shadeOutOfStock ? 'opacity-40' : ''}`}
                        style={{ backgroundColor: shade.hex }}
                      >
                        {shadeOutOfStock && (
                          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <svg viewBox="0 0 32 32" className="w-full h-full rounded-full overflow-hidden">
                              <line x1="4" y1="28" x2="28" y2="4" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {product.shades[selectedShade].name}
                  {product.shades[selectedShade].inStock === false && (
                    <span className="ml-2 text-red-500 font-bold">— Non disponible</span>
                  )}
                </p>
              </div>
            )}

            {/* Stock & Find in store */}
            <div className="mt-6 p-4 border border-gray-200">
              {(() => {
                const shadeStock = product.shades[selectedShade]?.inStock;
                const shadeUnavailable = shadeStock === false;
                const productUnavailable = !product.inStock;

                if (shadeUnavailable || productUnavailable) {
                  return (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                        <span className="text-sm font-bold">
                          {shadeUnavailable
                            ? `La teinte "${product.shades[selectedShade].name}" n'est pas disponible dans nos boutiques`
                            : 'Rupture de stock'}
                        </span>
                      </div>
                      {shadeUnavailable && (
                        <p className="text-xs text-gray-500 leading-relaxed mt-1">
                          Cette teinte est actuellement indisponible dans l'ensemble de nos 5 boutiques au Maroc. Sélectionnez une autre teinte ou contactez-nous pour être informé du réassort.
                        </p>
                      )}
                    </div>
                  );
                }

                return (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                      <span className="text-sm font-bold">En stock en boutique</span>
                    </div>
                    <button
                      onClick={() => setStoreOpen(!storeOpen)}
                      className="flex items-center gap-2 text-xs font-black tracking-widest uppercase underline hover:no-underline"
                    >
                      <MapPin size={14} /> Trouver en boutique {storeOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                    {storeOpen && (
                      <div className="mt-4 space-y-3">
                        {stores.map((store) => (
                          <div key={store.id} className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0 gap-2">
                            <div className="min-w-0">
                              <p className="text-sm font-bold truncate">{store.name}</p>
                              <p className="text-xs text-gray-500">{store.city}</p>
                            </div>
                            <a
                              href={store.googleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-black tracking-widest uppercase underline hover:no-underline flex-shrink-0"
                            >
                              Itinéraire
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Quantity + Add to cart + Wishlist */}
            <div className="mt-6 flex flex-col gap-3">
              {/* Quantity selector */}
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black tracking-widest uppercase text-gray-500">Quantité</span>
                <div className="flex items-center border border-gray-300">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Diminuer"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-10 text-center text-sm font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Augmenter"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-[11px] font-black tracking-widest uppercase transition-colors ${
                    canAddToCart
                      ? addedToCart
                        ? 'bg-green-700 text-white'
                        : 'bg-black text-white hover:bg-gray-800'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag size={15} />
                  {addedToCart ? 'Ajouté au panier !' : canAddToCart ? 'Ajouter au panier' : 'Indisponible'}
                </button>
                <button
                  onClick={() => toggle(product.id)}
                  aria-label={wishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  className={`w-14 border flex items-center justify-center transition-colors ${wishlisted ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-500 hover:border-black hover:text-black'}`}
                >
                  <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Accordions */}
            <div className="mt-6 border-t border-gray-200 divide-y divide-gray-200">
              <Accordion title="Description du produit" defaultOpen>
                <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
              </Accordion>
              <Accordion title="Avantages & Résultats">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />Formule longue tenue — jusqu'à 12 heures de port confortable</li>
                  <li className="flex items-start gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />Pigmentation intense dès la première application</li>
                  <li className="flex items-start gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />Formule hydratante — ne dessèche pas les lèvres</li>
                  <li className="flex items-start gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />Vegan &amp; testé dermatologiquement</li>
                </ul>
              </Accordion>
              <Accordion title="Ingrédients">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Isododecane, Dimethicone, Cyclopentasiloxane, Trimethylsiloxyphenyl Dimethicone, Polyethylene, Synthetic Wax, Ozokerite, Microcrystalline Wax, Tocopheryl Acetate (Vitamin E), Fragrance. [+/- CI 15850, CI 77491, CI 77492, CI 77499, CI 45410, CI 75470]
                </p>
              </Accordion>
              <Accordion title="Mode d'emploi">
                <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
                  <li>Exfoliez et hydratez les lèvres avant application pour un résultat optimal.</li>
                  <li>Appliquez directement depuis le tube en partant du centre vers les coins.</li>
                  <li>Pour plus de précision, contourez d'abord avec un crayon à lèvres assorti.</li>
                  <li>Superposez une deuxième couche pour intensifier la couleur.</li>
                </ol>
              </Accordion>
              <Accordion title="Description de la teinte">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>{product.shades[0]?.name}</strong> — {product.shades[0] ? `Un nude chaud aux reflets rosés, polyvalent et intemporel. Cette teinte iconique MAC se porte seule ou superposée pour moduler l'intensité.` : product.description}
                </p>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Similar products */}
        {similar.length > 0 && (
          <section className="mt-16 sm:mt-20">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-6 sm:mb-8">Vous aimerez aussi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
