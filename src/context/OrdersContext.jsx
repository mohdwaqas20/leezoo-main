import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { fetchUserOrders, createOrder } from '../lib/supabase';

const OrdersContext = createContext(null);

export const OrdersProvider = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }
    setLoading(true);
    fetchUserOrders(user.id)
      .then((data) => setOrders(data || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user?.id]);

  // cartItems shape: [{ id, name, price, qty, size, image, product_id, ... }]
  const placeOrder = useCallback(async (cartItems, total, paymentDetails = {}) => {
    if (!user) throw new Error('Must be logged in to place an order');

    const displayId = `LZ-${Date.now()}`;
    const orderData = {
      user_id: user.id,
      total_amount: total,
      status: 'pending',
      display_id: displayId,
      customer_email: user.email,
      customer_name: user.user_metadata?.full_name || '',
    };

    // Map cart items → order_items shape
    // NOTE: item.id is the product UUID (we store it that way in CartContext)
    const orderItems = cartItems.map((i) => ({
      productDbId: i.id,   // UUID for order_items FK
      size: i.size,
      qty: i.qty,
      price: i.price,
    }));

    const order = await createOrder(orderData, orderItems, paymentDetails);

    // Refresh orders list
    const updated = await fetchUserOrders(user.id);
    setOrders(updated || []);

    return order;
  }, [user]);

  return (
    <OrdersContext.Provider value={{ orders, loading, placeOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
};