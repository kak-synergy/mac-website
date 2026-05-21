export interface ColorShade {
  id: string;
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  shades: ColorShade[];
  inStock: boolean;
  badge?: string | null;
  rating: number;
  reviewCount: number;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: { days: string; time: string }[];
  coordinates: { lat: number; lng: number };
  googleMapsUrl: string;
}

export interface ProDocument {
  type: 'rc' | 'ice' | 'diploma' | 'cin';
  label: string;
  required: boolean;
}

export type Category =
  | 'Lèvres'
  | 'Yeux'
  | 'Visage'
  | 'Peau'
  | 'Pinceaux & Outils';
