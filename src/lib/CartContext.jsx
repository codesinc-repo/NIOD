import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from './api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], subtotal: 0 });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const refresh = useCallback(async () => {
    try {
      const c = await api.get('/api/cart', { cart: true, auth: !!user });
      setCart(c && c.items ? c : { items: [], subtotal: 0 });
    } catch {
      setCart({ items: [], subtotal: 0 });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  const add = useCallback(async (product_id, qty = 1, size_id = null) => {
    const c = await api.post('/api/cart/items', { product_id, qty, size_id }, { cart: true, auth: !!user });
    setCart(c);
    return c;
  }, [user]);

  const updateQty = useCallback(async (itemId, qty) => {
    const c = await api.patch(`/api/cart/items/${itemId}`, { qty }, { cart: true, auth: !!user });
    setCart(c);
    return c;
  }, [user]);

  const removeItem = useCallback(async (itemId) => {
    const c = await api.delete(`/api/cart/items/${itemId}`, { cart: true, auth: !!user });
    setCart(c);
    return c;
  }, [user]);

  const clear = useCallback(async () => {
    const c = await api.delete('/api/cart', { cart: true, auth: !!user });
    setCart(c && c.items ? c : { items: [], subtotal: 0 });
  }, [user]);

  const count = (cart.items || []).reduce((s, it) => s + (it.qty || 0), 0);

  return (
    <CartContext.Provider value={{ cart, loading, count, refresh, add, updateQty, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
