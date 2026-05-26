import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';

const OrdersContext = createContext(null);

const STORAGE_KEY = (userId) => `leezoo_orders_${userId || 'guest'}`;

export const OrdersProvider = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const key = STORAGE_KEY(user?.id);
    try {
      const stored = localStorage.getItem(key);
      setOrders(stored ? JSON.parse(stored) : []);
    } catch {
      setOrders([]);
    }
  }, [user?.id]);

  useEffect(() => {
    const key = STORAGE_KEY(user?.id);
    try {
      localStorage.setItem(key, JSON.stringify(orders));
    } catch {}
  }, [orders, user?.id]);

  const placeOrder = useCallback((cartItems, total) => {
    const order = {
      id: `LZ-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'Confirmed',
      items: cartItems,
      total,
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  return (
    <OrdersContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
};
