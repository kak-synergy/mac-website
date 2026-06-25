export interface ColorShade {
  id: string;
  name: string;
  hex: string;
  inStock?: boolean;
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

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  shade: { id: string; name: string; hex: string } | null;
  quantity: number;
}

export interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'En cours' | 'Expédié' | 'Livré';
  address: { firstName: string; lastName: string; phone: string; address: string; city: string; zip: string };
  paymentMethod: 'card' | 'cod';
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
