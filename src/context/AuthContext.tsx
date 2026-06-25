import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, Address, Order } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (data: { firstName: string; lastName: string; email: string; phone: string; password: string }) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  addresses: Address[];
  addAddress: (data: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, data: Partial<Address>) => void;
  removeAddress: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SEED_ORDERS: Order[] = [
  {
    id: 'ORD-2025-001',
    date: '15 mars 2025',
    items: [
      { productId: '0', name: 'M·A·CXIMAL Silky Matte Lipstick', image: '/images/macximal-product.png', price: 279, shade: { id: 'mx1', name: 'Whirl', hex: '#8B5E52' }, quantity: 1 },
      { productId: '11', name: 'Crayon Yeux Technakohl', image: '/images/product-eyeliner.png', price: 219, shade: { id: 's40', name: 'Graphblack', hex: '#1A1A1A' }, quantity: 2 },
    ],
    subtotal: 717,
    deliveryFee: 0,
    total: 717,
    status: 'Livré',
    address: { firstName: 'Yasmine', lastName: 'El Mansouri', phone: '+212 661 234 567', address: '45 Boulevard Mohammed V', city: 'Casablanca', zip: '20000' },
    paymentMethod: 'card',
  },
  {
    id: 'ORD-2024-089',
    date: '28 novembre 2024',
    items: [
      { productId: '5', name: 'Palette Fards à Paupières', image: '/images/product-eyeshadow-palette.png', price: 549, shade: null, quantity: 1 },
    ],
    subtotal: 549,
    deliveryFee: 40,
    total: 589,
    status: 'Livré',
    address: { firstName: 'Yasmine', lastName: 'El Mansouri', phone: '+212 661 234 567', address: '45 Boulevard Mohammed V', city: 'Casablanca', zip: '20000' },
    paymentMethod: 'cod',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    try {
      const u = localStorage.getItem('mac_user');
      if (u) {
        const parsed: User = JSON.parse(u);
        setUser(parsed);
        const o = localStorage.getItem(`mac_orders_${parsed.id}`);
        setOrders(o ? JSON.parse(o) : SEED_ORDERS);
        const a = localStorage.getItem(`mac_addresses_${parsed.id}`);
        if (a) setAddresses(JSON.parse(a));
      }
    } catch {}
  }, []);

  const login = (email: string, password: string) => {
    if (!email || !password) return { success: false, error: 'Veuillez remplir tous les champs.' };
    try {
      const accounts: (User & { password: string })[] = JSON.parse(localStorage.getItem('mac_accounts') || '[]');
      const account = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
      if (!account) return { success: false, error: 'Aucun compte trouvé avec cet e-mail.' };
      if (account.password !== password) return { success: false, error: 'Mot de passe incorrect.' };
      const { password: _pw, ...userData } = account;
      setUser(userData);
      localStorage.setItem('mac_user', JSON.stringify(userData));
      const o = localStorage.getItem(`mac_orders_${userData.id}`);
      setOrders(o ? JSON.parse(o) : SEED_ORDERS);
      const a = localStorage.getItem(`mac_addresses_${userData.id}`);
      if (a) setAddresses(JSON.parse(a));
    } catch {
      return { success: false, error: 'Une erreur est survenue.' };
    }
    return { success: true };
  };

  const register = (data: { firstName: string; lastName: string; email: string; phone: string; password: string }) => {
    try {
      const accounts: (User & { password: string })[] = JSON.parse(localStorage.getItem('mac_accounts') || '[]');
      if (accounts.find((a) => a.email.toLowerCase() === data.email.toLowerCase())) {
        return { success: false, error: 'Un compte existe déjà avec cet e-mail.' };
      }
      const newUser: User = { id: `usr_${Date.now()}`, firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone };
      accounts.push({ ...newUser, password: data.password });
      localStorage.setItem('mac_accounts', JSON.stringify(accounts));
      setUser(newUser);
      localStorage.setItem('mac_user', JSON.stringify(newUser));
      setOrders(SEED_ORDERS);
    } catch {
      return { success: false, error: 'Une erreur est survenue.' };
    }
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    setAddresses([]);
    localStorage.removeItem('mac_user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('mac_user', JSON.stringify(updated));
    const accounts: (User & { password: string })[] = JSON.parse(localStorage.getItem('mac_accounts') || '[]');
    localStorage.setItem('mac_accounts', JSON.stringify(accounts.map((a) => (a.id === user.id ? { ...a, ...data } : a))));
  };

  const addOrder = (order: Order) => {
    const updated = [order, ...orders];
    setOrders(updated);
    if (user) localStorage.setItem(`mac_orders_${user.id}`, JSON.stringify(updated));
  };

  const addAddress = (data: Omit<Address, 'id'>) => {
    const newAddr = { ...data, id: `addr_${Date.now()}` };
    const updated = data.isDefault
      ? [...addresses.map((a) => ({ ...a, isDefault: false })), newAddr]
      : [...addresses, newAddr];
    setAddresses(updated);
    if (user) localStorage.setItem(`mac_addresses_${user.id}`, JSON.stringify(updated));
  };

  const updateAddress = (id: string, data: Partial<Address>) => {
    const updated = data.isDefault
      ? addresses.map((a) => ({ ...a, isDefault: false, ...(a.id === id ? data : {}) }))
      : addresses.map((a) => (a.id === id ? { ...a, ...data } : a));
    setAddresses(updated);
    if (user) localStorage.setItem(`mac_addresses_${user.id}`, JSON.stringify(updated));
  };

  const removeAddress = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    if (user) localStorage.setItem(`mac_addresses_${user.id}`, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateProfile, orders, addOrder, addresses, addAddress, updateAddress, removeAddress }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
