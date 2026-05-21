import { Link } from 'react-router-dom';

interface CategoryTile {
  label: string;
  href: string;
  image: string;
}

const categories: CategoryTile[] = [
  {
    label: 'Nouveautés',
    href: '/products?badge=new',
    image: '/images/cat-nouveautes.png',
  },
  {
    label: 'Best-Sellers',
    href: '/products?badge=bestseller',
    image: '/images/cat-bestsellers.png',
  },
  {
    label: 'Visage',
    href: '/products?category=Visage',
    image: '/images/cat-visage.png',
  },
  {
    label: 'Yeux',
    href: '/products?category=Yeux',
    image: '/images/cat-yeux.png',
  },
  {
    label: 'Lèvres',
    href: '/products?category=L%C3%A8vres',
    image: '/images/cat-levres.png',
  },
  {
    label: 'Peau',
    href: '/products?category=Peau',
    image: '/images/cat-peau.png',
  },
  {
    label: 'Pinceaux',
    href: '/products?category=Pinceaux+%26+Outils',
    image: '/images/cat-pinceaux.png',
  },
];

export default function CategoryStrip() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 border-b border-gray-100">
      {/* 4 cols on mobile, 7 on desktop — each tile fills its column */}
      <div className="grid grid-cols-4 md:grid-cols-7 gap-3 md:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            to={cat.href}
            className="group flex flex-col items-center gap-3"
          >
            {/* Square image — fills column width */}
            <div className="w-full aspect-square bg-white overflow-hidden">
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* Label */}
            <span className="text-[10px] md:text-xs font-black tracking-widest uppercase text-center leading-tight group-hover:underline underline-offset-2">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
