import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import CategoryStrip from '../components/ui/CategoryStrip';
import SEO from '../components/SEO';
import productsData from '../data/products.json';
import content from '../data/content.json';
import type { Product } from '../types';

const products = productsData as Product[];

export default function HomePage() {
  const bestsellers = products.filter((p) => p.badge === 'BEST SELLER').slice(0, 4);
  const newArrivals = products.filter((p) => p.badge && p.badge !== 'BEST SELLER').slice(0, 4);
  const { hero, banners, instagramPosts } = content.home;

  return (
    <main>
      <SEO
        title="MAC Cosmetics Maroc — Maquillage Professionnel | Lèvres, Yeux, Visage"
        description="Découvrez MAC Cosmetics au Maroc — rouge à lèvres, fond de teint, fards à paupières et pinceaux professionnels. 5 boutiques à Casablanca, Marrakech et Rabat."
        canonical="/"
        image="/images/home-page-banner.png"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "MAC Cosmetics Maroc",
          "url": "https://www.maccosmetics.ma",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.maccosmetics.ma/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[500px] flex items-end overflow-hidden">
        <img
          src={hero.image}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 px-8 pb-16 max-w-xl">
          <p className="text-white text-xs font-black tracking-[0.3em] uppercase mb-3">{hero.title}</p>
          <h1 className="text-white text-5xl md:text-7xl font-black uppercase leading-none tracking-tight mb-4">
            {hero.subtitle}
          </h1>
          <p className="text-white/80 text-sm mb-6 max-w-sm">{hero.description}</p>
          <Link
            to={hero.ctaUrl}
            className="inline-block bg-white text-black px-8 py-3 text-xs font-black tracking-widest uppercase hover:bg-gray-100 transition-colors"
          >
            {hero.ctaLabel}
          </Link>
        </div>
      </section>

      {/* Category Strip */}
      <CategoryStrip />

      {/* Campaign Banners */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <Link key={banner.id} to={banner.ctaUrl} className="group relative overflow-hidden aspect-[3/4] block">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl font-black uppercase leading-tight">{banner.title}</h3>
                <p className="text-white/80 text-xs mt-1">{banner.subtitle}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-white text-xs font-black tracking-widest uppercase border-b border-white pb-0.5">
                  {banner.ctaLabel} <ChevronRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{content.home.bestsellersTitle}</h2>
          <Link to="/products" className="text-xs font-black tracking-widest uppercase underline hover:no-underline hidden md:block">
            Voir tout
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Pro Programme Banner */}
      <section className="bg-black text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-black tracking-[0.4em] uppercase text-gray-400 mb-4">
            Programme Professionnel
          </p>
          <h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tight leading-none mb-6">
            Beauté<br />Professionnelle
          </h2>
          <p className="text-gray-300 text-sm mb-10 max-w-lg mx-auto leading-relaxed">
            Vous êtes maquilleur(se) professionnel(le) ? Rejoignez le programme MAC dédié aux professionnels de la beauté et bénéficiez d'avantages exclusifs toute l'année.
          </p>

          {/* Main advantage highlighted */}
          <div className="inline-flex items-center gap-4 border border-white/30 px-8 py-5 mb-10">
            <span className="text-5xl font-black leading-none">20%</span>
            <div className="text-left">
              <p className="text-sm font-black uppercase tracking-wider">de remise permanente</p>
              <p className="text-xs text-gray-400 mt-0.5">sur tous les produits MAC, toute l'année</p>
            </div>
          </div>

          {/* Other benefits */}
          <ul className="flex flex-col md:flex-row gap-5 justify-center mb-10">
            {[
              "Accès aux événements et formations MAC exclusifs",
              "Invitations aux ouvertures de boutiques",
              "Accès au catalogue professionnel complet",
            ].map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-300 md:max-w-[180px] text-left">
                <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center font-black text-[9px] flex-shrink-0 mt-0.5">✓</span>
                {b}
              </li>
            ))}
          </ul>

          <p className="text-xs text-gray-500 mb-6">
            Inscription sur dossier — dépôt de documents requis (RC, ICE, diplôme, CIN).
          </p>

          <Link
            to="/pro-register"
            className="inline-block bg-white text-black px-12 py-4 text-xs font-black tracking-widest uppercase hover:bg-gray-200 transition-colors"
          >
            Nous rejoindre en tant que Pro
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{content.home.newArrivalsTitle}</h2>
          <Link to="/products" className="text-xs font-black tracking-widest uppercase underline hover:no-underline hidden md:block">
            Voir tout
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Instagram */}
      <section className="bg-black py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              {content.home.instagramTitle}
            </h2>
            <a
              href="https://www.instagram.com/maccosmetics"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block text-white text-xs font-black tracking-widest uppercase border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors"
            >
              Voir la galerie
            </a>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {instagramPosts.map((url, i) => (
              <a
                key={i}
                href="https://www.instagram.com/maccosmetics"
                target="_blank"
                rel="noopener noreferrer"
                className="group block aspect-square overflow-hidden"
              >
                <img
                  src={url}
                  alt={`Instagram post ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
