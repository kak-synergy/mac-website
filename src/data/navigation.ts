export interface NavSubcategory {
  label: string;
  sub: string;
}

export interface NavSubcategoryGroup {
  title?: string;
  items: NavSubcategory[];
}

export interface NavCategory {
  label: string;
  category: string;
  href: string;
  columns: NavSubcategoryGroup[];
}

export const NAV_CATEGORIES: NavCategory[] = [
  {
    label: 'Lèvres',
    category: 'Lèvres',
    href: '/products?category=L%C3%A8vres',
    columns: [
      {
        items: [
          { label: 'Rouge à Lèvres', sub: 'Rouge à Lèvres' },
          { label: 'Rouge à Lèvres Liquide', sub: 'Rouge à Lèvres Liquide' },
          { label: 'Gloss & Huiles', sub: 'Gloss & Huiles' },
          { label: 'Contour des Lèvres', sub: 'Contour des Lèvres' },
          { label: 'Palettes & Kits', sub: 'Palettes & Kits' },
        ],
      },
      {
        title: 'Outils',
        items: [
          { label: 'Baumes & Primers', sub: 'Baumes & Primers' },
          { label: 'Pinceaux à Lèvres', sub: 'Pinceaux à Lèvres' },
          { label: 'Coffrets', sub: 'Coffrets' },
        ],
      },
    ],
  },
  {
    label: 'Yeux',
    category: 'Yeux',
    href: '/products?category=Yeux',
    columns: [
      {
        items: [
          { label: 'Fards à Paupières', sub: 'Fards à Paupières' },
          { label: 'Eyeliner', sub: 'Eyeliner' },
          { label: 'Mascara', sub: 'Mascara' },
          { label: 'Sourcils', sub: 'Sourcils' },
          { label: 'Faux Cils', sub: 'Faux Cils' },
          { label: 'Palettes & Kits', sub: 'Palettes & Kits Yeux' },
          { label: 'Primers Yeux', sub: 'Primer Yeux' },
        ],
      },
      {
        title: 'Outils & Accessoires',
        items: [
          { label: 'Pinceaux Yeux', sub: 'Pinceaux Yeux' },
          { label: 'Accessoires Yeux', sub: 'Accessoires Yeux' },
        ],
      },
    ],
  },
  {
    label: 'Visage',
    category: 'Visage',
    href: '/products?category=Visage',
    columns: [
      {
        items: [
          { label: 'Fond de Teint', sub: 'Fond de Teint' },
          { label: 'Poudre', sub: 'Poudre' },
          { label: 'Blush & Bronzers', sub: 'Blush & Bronzers' },
          { label: 'Correcteur', sub: 'Correcteur' },
          { label: 'Illuminateur', sub: 'Illuminateur' },
          { label: 'Palettes & Kits', sub: 'Palettes & Kits Visage' },
          { label: 'Pailletés & Pigments', sub: 'Pailletés & Pigments' },
        ],
      },
      {
        title: 'Primers & Outils',
        items: [
          { label: 'Primers Visage', sub: 'Primer Visage' },
          { label: 'Primers Lèvres', sub: 'Primer Lèvres' },
          { label: 'Pinceaux Visage', sub: 'Pinceaux Visage' },
          { label: 'Éponges & Applicateurs', sub: 'Éponges & Applicateurs' },
        ],
      },
    ],
  },
  {
    label: 'Peau',
    category: 'Peau',
    href: '/products?category=Peau',
    columns: [
      {
        title: 'Primers & Fixateurs',
        items: [
          { label: 'Primers Visage', sub: 'Primer Visage' },
          { label: 'Primers Yeux', sub: 'Primer Yeux' },
          { label: 'Primers Lèvres', sub: 'Primer Lèvres' },
          { label: 'Fixateur de Maquillage', sub: 'Fixateur' },
        ],
      },
      {
        title: 'Soins',
        items: [
          { label: 'Nettoyants & Démaquillants', sub: 'Nettoyant' },
          { label: 'Sérums & Soins', sub: 'Sérum' },
          { label: 'Hydratants', sub: 'Hydratant' },
          { label: 'Soins Yeux & Lèvres', sub: 'Soins Yeux & Lèvres' },
        ],
      },
    ],
  },
  {
    label: 'Pinceaux & Outils',
    category: 'Pinceaux & Outils',
    href: '/products?category=Pinceaux+%26+Outils',
    columns: [
      {
        items: [
          { label: 'Pinceaux Visage', sub: 'Pinceaux Visage' },
          { label: 'Pinceaux Yeux', sub: 'Pinceaux Yeux' },
          { label: 'Pinceaux Lèvres', sub: 'Pinceaux Lèvres' },
          { label: 'Tous les Pinceaux', sub: 'Pinceaux' },
        ],
      },
      {
        title: 'Accessoires',
        items: [
          { label: 'Éponges & Applicateurs', sub: 'Éponges & Applicateurs' },
          { label: 'Accessoires Maquillage', sub: 'Accessoires Maquillage' },
        ],
      },
    ],
  },
];
