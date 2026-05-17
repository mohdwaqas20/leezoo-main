import { useState, useEffect } from 'react';
import { fetchProducts } from '../lib/supabase';

// Fallback demo products used when Supabase is not yet configured
const DEMO_PRODUCTS_MEN = [
  { id: 1, name: 'Edge Oversized Tee', price: 189, color: 'Obsidian Black', color_hex: '#111', product_id: 'LZO-001', badge: 'New', category: 'men', image_url: null },
  { id: 2, name: 'Sand Classic Tee', price: 149, color: 'Sahara Beige', color_hex: '#c4a882', product_id: 'LZO-002', badge: null, category: 'men', image_url: null },
  { id: 3, name: 'Slate Edition Tee', price: 169, color: 'Steel Grey', color_hex: '#4a5568', product_id: 'LZO-003', badge: null, category: 'men', image_url: null },
  { id: 4, name: 'Signature Dark Tee', price: 199, color: 'Midnight', color_hex: '#0a0a0a', product_id: 'LZO-004', badge: 'Limited', category: 'men', image_url: null },
  { id: 5, name: 'Earth Tee', price: 155, color: 'Caramel Brown', color_hex: '#7A5C3F', product_id: 'LZO-005', badge: null, category: 'men', image_url: null },
];

const DEMO_PRODUCTS_WOMEN = [
  { id: 6, name: 'Edge Oversized Tee', price: 189, color: 'Obsidian Black', color_hex: '#111', product_id: 'LZW-001', badge: 'New', category: 'women', image_url: null },
  { id: 7, name: 'Sand Classic Tee', price: 149, color: 'Sahara Beige', color_hex: '#c4a882', product_id: 'LZW-002', badge: null, category: 'women', image_url: null },
  { id: 8, name: 'Slate Edition Tee', price: 169, color: 'Steel Grey', color_hex: '#4a5568', product_id: 'LZW-003', badge: null, category: 'women', image_url: null },
  { id: 9, name: 'Signature Dark Tee', price: 199, color: 'Midnight', color_hex: '#0a0a0a', product_id: 'LZW-004', badge: 'Limited', category: 'women', image_url: null },
  { id: 10, name: 'Earth Tee', price: 155, color: 'Caramel Brown', color_hex: '#7A5C3F', product_id: 'LZW-005', badge: null, category: 'women', image_url: null },
];

export const useProducts = (category = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(category);
        setProducts(data && data.length > 0 ? data : (category === 'women' ? DEMO_PRODUCTS_WOMEN : DEMO_PRODUCTS_MEN));
      } catch (e) {
        console.warn('Supabase not configured, using demo products:', e.message);
        setProducts(category === 'women' ? DEMO_PRODUCTS_WOMEN : DEMO_PRODUCTS_MEN);
        setError(null); // suppress error in UI, show demo data
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category]);

  return { products, loading, error };
};
