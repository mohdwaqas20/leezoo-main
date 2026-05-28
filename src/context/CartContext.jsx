import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  fetchCart,
  upsertCartItem,
  deleteCartItem,
  clearCartDb,
} from '../lib/supabase';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD':
      return { ...state, items: action.items };
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (i) => i.id === action.item.id && i.size === action.item.size
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id && i.size === action.item.size
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.id === action.id && i.size === action.size)
        ),
      };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id && i.size === action.size
            ? { ...i, qty: action.qty }
            : i
        ),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    case 'TOGGLE_DRAWER':
      return { ...state, drawerOpen: !state.drawerOpen };
    case 'OPEN_DRAWER':
      return { ...state, drawerOpen: true };
    case 'CLOSE_DRAWER':
      return { ...state, drawerOpen: false };
    default:
      return state;
  }
};

const initialState = { items: [], drawerOpen: false };

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from DB on login; clear on logout
  useEffect(() => {
    if (!user) {
      dispatch({ type: 'CLEAR' });
      return;
    }
    fetchCart(user.id)
      .then((rows) => {
        // Map DB rows → cart item shape
        const items = rows.map((r) => ({
          id: r.products.id,           // product UUID
          name: r.products.name,
          price: r.products.price,
          image: r.products.image_url,
          color: r.products.color,
          product_id: r.products.product_id,
          size: r.size,
          qty: r.qty,
        }));
        dispatch({ type: 'LOAD', items });
      })
      .catch(() => dispatch({ type: 'CLEAR' }));
  }, [user?.id]);

  // ── DB-synced actions ──────────────────────────────────────────

  const addItem = useCallback(async (item) => {
    // Optimistic update
    dispatch({ type: 'ADD_ITEM', item });
    dispatch({ type: 'OPEN_DRAWER' });
    if (user) {
      const existing = state.items.find(
        (i) => i.id === item.id && i.size === item.size
      );
      const newQty = existing ? existing.qty + 1 : 1;
      try {
        await upsertCartItem(user.id, item.id, item.size, newQty);
      } catch (e) {
        console.error('Cart sync error:', e);
      }
    }
  }, [user, state.items]);

  const removeItem = useCallback(async (id, size) => {
    dispatch({ type: 'REMOVE_ITEM', id, size });
    if (user) {
      try {
        await deleteCartItem(user.id, id, size);
      } catch (e) {
        console.error('Cart remove error:', e);
      }
    }
  }, [user]);

  const updateQty = useCallback(async (id, size, qty) => {
    dispatch({ type: 'UPDATE_QTY', id, size, qty });
    if (user) {
      try {
        if (qty <= 0) {
          await deleteCartItem(user.id, id, size);
        } else {
          await upsertCartItem(user.id, id, size, qty);
        }
      } catch (e) {
        console.error('Cart update error:', e);
      }
    }
  }, [user]);

  const clearCart = useCallback(async () => {
    dispatch({ type: 'CLEAR' });
    if (user) {
      try {
        await clearCartDb(user.id);
      } catch (e) {
        console.error('Cart clear error:', e);
      }
    }
  }, [user]);

  const toggleDrawer = useCallback(() => dispatch({ type: 'TOGGLE_DRAWER' }), []);
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), []);
  const openDrawer = useCallback(() => dispatch({ type: 'OPEN_DRAWER' }), []);

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = state.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        total,
        count,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        toggleDrawer,
        closeDrawer,
        openDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};