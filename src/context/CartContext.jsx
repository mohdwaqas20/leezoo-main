import { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
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
    case 'LOAD':
      return { ...state, items: action.items };
    default:
      return state;
  }
};

// Per-user cart key so different users never share a cart
const CART_KEY = (userId) => userId ? `leezoo_cart_${userId}` : null;

const initialState = { items: [], drawerOpen: false };

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Track previous user so we can save before switching
  const prevUserRef = useRef(user?.id ?? null);

  // When user changes: save old cart, then load new user's cart (or clear)
  useEffect(() => {
    const prevId = prevUserRef.current;
    const nextId = user?.id ?? null;

    if (prevId === nextId) return; // no change

    // Save current cart for the previous user (if they were logged in)
    if (prevId) {
      try {
        localStorage.setItem(CART_KEY(prevId), JSON.stringify(state.items));
      } catch {}
    }

    prevUserRef.current = nextId;

    if (nextId) {
      // Load this user's saved cart
      try {
        const stored = localStorage.getItem(CART_KEY(nextId));
        dispatch({ type: 'LOAD', items: stored ? JSON.parse(stored) : [] });
      } catch {
        dispatch({ type: 'CLEAR' });
      }
    } else {
      // Logged out — clear cart from UI (data already saved above)
      dispatch({ type: 'CLEAR' });
    }
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist to localStorage whenever items change (for logged-in users)
  useEffect(() => {
    const key = CART_KEY(user?.id);
    if (!key) return;
    try {
      localStorage.setItem(key, JSON.stringify(state.items));
    } catch {}
  }, [state.items, user?.id]);

  const addItem = useCallback((item) => {
    dispatch({ type: 'ADD_ITEM', item });
    dispatch({ type: 'OPEN_DRAWER' });
  }, []);

  const removeItem = useCallback(
    (id, size) => dispatch({ type: 'REMOVE_ITEM', id, size }),
    []
  );
  const updateQty = useCallback(
    (id, size, qty) => dispatch({ type: 'UPDATE_QTY', id, size, qty }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);
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