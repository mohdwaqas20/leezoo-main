import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  fetchWishlist,
  addToWishlist as dbAdd,
  removeFromWishlist as dbRemove,
} from '../lib/supabase';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  // items = full product objects (from joined query)
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load wishlist from DB whenever user changes
  useEffect(() => {
    if (!user) {
      setItems([]);
      return;
    }
    setLoading(true);
    fetchWishlist(user.id)
      .then((rows) => {
        // Each row has a `products` join; extract the product object
        setItems(rows.map((r) => r.products));
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const addToWishlist = useCallback(async (product) => {
    if (!user) return;
    // Optimistic update
    setItems((prev) => (prev.find((p) => p.id === product.id) ? prev : [...prev, product]));
    try {
      await dbAdd(user.id, product.id);
    } catch {
      // Rollback on failure
      setItems((prev) => prev.filter((p) => p.id !== product.id));
    }
  }, [user]);

  const removeFromWishlist = useCallback(async (productId) => {
    if (!user) return;
    const removed = items.find((p) => p.id === productId);
    setItems((prev) => prev.filter((p) => p.id !== productId));
    try {
      await dbRemove(user.id, productId);
    } catch {
      // Rollback
      if (removed) setItems((prev) => [...prev, removed]);
    }
  }, [user, items]);

  const toggleWishlist = useCallback(async (product) => {
    const exists = items.find((p) => p.id === product.id);
    if (exists) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product);
    }
  }, [items, addToWishlist, removeFromWishlist]);

  const isWishlisted = useCallback(
    (productId) => items.some((p) => p.id === productId),
    [items]
  );

  return (
    <WishlistContext.Provider value={{ items, loading, addToWishlist, removeFromWishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};