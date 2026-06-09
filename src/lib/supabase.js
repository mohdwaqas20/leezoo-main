import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── Auth helpers ───────────────────────────────────────────────
export const signUp = (email, password, name) =>
  supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: 'www.leezoo.in',
    },
  });

export const signIn = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

export const signOut = () => supabase.auth.signOut();

export const getSession = () => supabase.auth.getSession();

// ─── Products ────────────────────────────────────────────────────
export const fetchProducts = async (category = null) => {
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (category) query = query.eq('category', category);
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const fetchProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

// ─── Cart ─────────────────────────────────────────────────────────
export const fetchCart = async (userId) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*, products(*)')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
};

export const upsertCartItem = async (userId, productId, size, qty) => {
  const { data, error } = await supabase
    .from('cart_items')
    .upsert(
      { user_id: userId, product_id: productId, size, qty },
      { onConflict: 'user_id,product_id,size' }
    )
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteCartItem = async (userId, productId, size) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId)
    .eq('size', size);
  if (error) throw error;
};

export const clearCartDb = async (userId) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId);
  if (error) throw error;
};

// ─── Orders ──────────────────────────────────────────────────────
export const createOrder = async (orderData, orderItems, paymentDetails = {}) => {
  // Merge Razorpay payment info into the order row if available
  if (paymentDetails.razorpay_payment_id) {
    orderData.payment_id = paymentDetails.razorpay_payment_id;
    orderData.payment_status = 'paid';
    orderData.status = 'confirmed';
  }

  // Insert order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();

  if (orderError) {
    throw new Error('Order insert failed: ' + orderError.message + ' (code: ' + orderError.code + ')');
  }

  // Insert order items
  const items = orderItems.map((i) => ({
    order_id: order.id,
    product_id: i.productDbId,
    size: i.size,
    qty: i.qty,
    unit_price: i.price,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(items);

  if (itemsError) {
    throw new Error('Order items insert failed: ' + itemsError.message + ' (code: ' + itemsError.code + ')');
  }

  return order;
};

export const fetchUserOrders = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products(*))')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

// ─── Wishlist ─────────────────────────────────────────────────────
export const addToWishlist = async (userId, productId) => {
  const { data, error } = await supabase
    .from('wishlist')
    .insert([{ user_id: userId, product_id: productId }]);
  if (error) throw error;
  return data;
};

export const removeFromWishlist = async (userId, productId) => {
  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);
  if (error) throw error;
};

export const fetchWishlist = async (userId) => {
  const { data, error } = await supabase
    .from('wishlist')
    .select('*, products(*)')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
};