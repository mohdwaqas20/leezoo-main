import { useState, useEffect } from 'react';
import { fetchProducts } from '../lib/supabase';

export const useProducts = (category = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(category);
        setProducts(data);
      } catch (e) {
        console.warn('Supabase not configured, using demo products:', e.message);
        setProducts([]);
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category]);

  return { products, loading, error };
};

export const ALL_PRODUCTS = []