import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '../types';

export const DELIVERY_FEE = 40;
export const FREE_DELIVERY_THRESHOLD = 500;

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; productId: string; shadeId: string | null }
  | { type: 'UPDATE_QTY'; productId: string; shadeId: string | null; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'LOAD'; items: CartItem[] };

function itemKey(productId: string, shadeId: string | null) {
  return `${productId}::${shadeId ?? '_'}`;
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = itemKey(action.item.productId, action.item.shade?.id ?? null);
      const exists = state.items.find((i) => itemKey(i.productId, i.shade?.id ?? null) === key);
      return {
        ...state,
        items: exists
          ? state.items.map((i) =>
              itemKey(i.productId, i.shade?.id ?? null) === key
                ? { ...i, quantity: i.quantity + action.item.quantity }
                : i,
            )
          : [...state.items, action.item],
      };
    }
    case 'REMOVE_ITEM': {
      const key = itemKey(action.productId, action.shadeId);
      return { ...state, items: state.items.filter((i) => itemKey(i.productId, i.shade?.id ?? null) !== key) };
    }
    case 'UPDATE_QTY': {
      const key = itemKey(action.productId, action.shadeId);
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => itemKey(i.productId, i.shade?.id ?? null) !== key) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          itemKey(i.productId, i.shade?.id ?? null) === key ? { ...i, quantity: action.quantity } : i,
        ),
      };
    }
    case 'CLEAR':
      return { ...state, items: [] };
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'LOAD':
      return { ...state, items: action.items };
    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, shadeId: string | null) => void;
  updateQty: (productId: string, shadeId: string | null, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mac_cart');
      if (saved) dispatch({ type: 'LOAD', items: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('mac_cart', JSON.stringify(state.items));
  }, [state.items]);

  const subtotal = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryFee = subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;
  const itemCount = state.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem: (item) => dispatch({ type: 'ADD_ITEM', item }),
        removeItem: (pid, sid) => dispatch({ type: 'REMOVE_ITEM', productId: pid, shadeId: sid }),
        updateQty: (pid, sid, qty) => dispatch({ type: 'UPDATE_QTY', productId: pid, shadeId: sid, quantity: qty }),
        clearCart: () => dispatch({ type: 'CLEAR' }),
        subtotal,
        deliveryFee,
        total,
        itemCount,
        isOpen: state.isOpen,
        openCart: () => dispatch({ type: 'OPEN' }),
        closeCart: () => dispatch({ type: 'CLOSE' }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
