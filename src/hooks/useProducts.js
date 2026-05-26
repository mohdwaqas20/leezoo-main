import { useState, useEffect } from 'react';
import { fetchProducts } from '../lib/supabase';

export const DEMO_PRODUCTS_MEN = [
  { id: 1,  name: 'Edge Oversized Tee',    price: 189, color: 'Obsidian Black',  color_hex: '#111111', product_id: 'LZO-001', badge: 'New',     category: 'men', image_url: null },
  { id: 2,  name: 'Sand Classic Tee',      price: 149, color: 'Sahara Beige',    color_hex: '#c4a882', product_id: 'LZO-002', badge: null,      category: 'men', image_url: null },
  { id: 3,  name: 'Slate Edition Tee',     price: 169, color: 'Steel Grey',      color_hex: '#4a5568', product_id: 'LZO-003', badge: null,      category: 'men', image_url: null },
  { id: 4,  name: 'Signature Dark Tee',    price: 199, color: 'Midnight',        color_hex: '#0a0a0a', product_id: 'LZO-004', badge: 'Limited', category: 'men', image_url: null },
  { id: 5,  name: 'Earth Tee',             price: 155, color: 'Caramel Brown',   color_hex: '#7A5C3F', product_id: 'LZO-005', badge: null,      category: 'men', image_url: null },
  { id: 11, name: 'Arctic Oversized Tee',  price: 179, color: 'Polar White',     color_hex: '#F5F5F0', product_id: 'LZO-006', badge: 'New',     category: 'men', image_url: null },
  { id: 12, name: 'Carbon Tee',            price: 189, color: 'Charcoal',        color_hex: '#2D2D2D', product_id: 'LZO-007', badge: null,      category: 'men', image_url: null },
  { id: 13, name: 'Raw Linen Tee',         price: 159, color: 'Natural Linen',   color_hex: '#D4C5A9', product_id: 'LZO-008', badge: null,      category: 'men', image_url: null },
  { id: 14, name: 'Navy Edge Tee',         price: 169, color: 'Deep Navy',       color_hex: '#1B2A4A', product_id: 'LZO-009', badge: null,      category: 'men', image_url: null },
  { id: 15, name: 'Rust Oversized Tee',    price: 175, color: 'Burnt Rust',      color_hex: '#8B3A2A', product_id: 'LZO-010', badge: 'Hot',     category: 'men', image_url: null },
  { id: 16, name: 'Olive Drop-Shoulder',   price: 185, color: 'Military Olive',  color_hex: '#4A4A2A', product_id: 'LZO-011', badge: null,      category: 'men', image_url: null },
  { id: 17, name: 'Stone Washed Tee',      price: 195, color: 'Washed Stone',    color_hex: '#9E9E8E', product_id: 'LZO-012', badge: 'Limited', category: 'men', image_url: null },
  { id: 18, name: 'Void Tee',              price: 209, color: 'True Black',      color_hex: '#050505', product_id: 'LZO-013', badge: 'New',     category: 'men', image_url: null },
  { id: 19, name: 'Dusk Gradient Tee',     price: 219, color: 'Dusk Brown',      color_hex: '#5C3D2E', product_id: 'LZO-014', badge: null,      category: 'men', image_url: null },
  { id: 20, name: 'Ash Classic Tee',       price: 145, color: 'Light Ash',       color_hex: '#C4C4B8', product_id: 'LZO-015', badge: null,      category: 'men', image_url: null },
  { id: 21, name: 'Obsidian Drop Tee',     price: 199, color: 'Dark Obsidian',   color_hex: '#1A1A1A', product_id: 'LZO-016', badge: null,      category: 'men', image_url: null },
  { id: 22, name: 'Cream Heritage Tee',    price: 165, color: 'Vintage Cream',   color_hex: '#EDE0C8', product_id: 'LZO-017', badge: 'New',     category: 'men', image_url: null },
  { id: 23, name: 'Forest Oversized Tee',  price: 175, color: 'Deep Forest',     color_hex: '#2D4A3E', product_id: 'LZO-018', badge: null,      category: 'men', image_url: null },
  { id: 24, name: 'Taupe Signature Tee',   price: 185, color: 'Warm Taupe',      color_hex: '#A89880', product_id: 'LZO-019', badge: null,      category: 'men', image_url: null },
  { id: 25, name: 'Indigo Edge Tee',       price: 195, color: 'Washed Indigo',   color_hex: '#3D4F7C', product_id: 'LZO-020', badge: 'Limited', category: 'men', image_url: null },
];

export const DEMO_PRODUCTS_WOMEN = [
  { id: 6,  name: 'Edge Oversized Tee',    price: 189, color: 'Obsidian Black',  color_hex: '#111111', product_id: 'LZW-001', badge: 'New',     category: 'women', image_url: null },
  { id: 7,  name: 'Sand Classic Tee',      price: 149, color: 'Sahara Beige',    color_hex: '#c4a882', product_id: 'LZW-002', badge: null,      category: 'women', image_url: null },
  { id: 8,  name: 'Slate Edition Tee',     price: 169, color: 'Steel Grey',      color_hex: '#4a5568', product_id: 'LZW-003', badge: null,      category: 'women', image_url: null },
  { id: 9,  name: 'Signature Dark Tee',    price: 199, color: 'Midnight',        color_hex: '#0a0a0a', product_id: 'LZW-004', badge: 'Limited', category: 'women', image_url: null },
  { id: 10, name: 'Earth Tee',             price: 155, color: 'Caramel Brown',   color_hex: '#7A5C3F', product_id: 'LZW-005', badge: null,      category: 'women', image_url: null },
  { id: 31, name: 'Rose Drift Tee',        price: 165, color: 'Dusty Rose',      color_hex: '#C49090', product_id: 'LZW-006', badge: 'New',     category: 'women', image_url: null },
  { id: 32, name: 'Ivory Drape Tee',       price: 179, color: 'Warm Ivory',      color_hex: '#F0E8D8', product_id: 'LZW-007', badge: null,      category: 'women', image_url: null },
  { id: 33, name: 'Onyx Crop Tee',         price: 159, color: 'Pure Onyx',       color_hex: '#0D0D0D', product_id: 'LZW-008', badge: null,      category: 'women', image_url: null },
  { id: 34, name: 'Lavender Oversized',    price: 169, color: 'Soft Lavender',   color_hex: '#8C7BA8', product_id: 'LZW-009', badge: 'Hot',     category: 'women', image_url: null },
  { id: 35, name: 'Mocha Silk Touch Tee',  price: 189, color: 'Deep Mocha',      color_hex: '#5C3D2E', product_id: 'LZW-010', badge: null,      category: 'women', image_url: null },
  { id: 36, name: 'Sage Drape Tee',        price: 175, color: 'Dusty Sage',      color_hex: '#7A9E7E', product_id: 'LZW-011', badge: null,      category: 'women', image_url: null },
  { id: 37, name: 'Blush Classic Tee',     price: 149, color: 'Blush Pink',      color_hex: '#E8C0B0', product_id: 'LZW-012', badge: 'Limited', category: 'women', image_url: null },
  { id: 38, name: 'Midnight Crop',         price: 185, color: 'Deep Midnight',   color_hex: '#101828', product_id: 'LZW-013', badge: 'New',     category: 'women', image_url: null },
  { id: 39, name: 'Butter Oversized Tee',  price: 165, color: 'Butter Yellow',   color_hex: '#E8D89A', product_id: 'LZW-014', badge: null,      category: 'women', image_url: null },
  { id: 40, name: 'Charcoal Edge Tee',     price: 175, color: 'Charcoal',        color_hex: '#3A3A3A', product_id: 'LZW-015', badge: null,      category: 'women', image_url: null },
  { id: 41, name: 'Terracotta Tee',        price: 185, color: 'Warm Terracotta', color_hex: '#C2714F', product_id: 'LZW-016', badge: null,      category: 'women', image_url: null },
  { id: 42, name: 'Cloud Cotton Tee',      price: 155, color: 'Cloud White',     color_hex: '#F8F8F5', product_id: 'LZW-017', badge: 'New',     category: 'women', image_url: null },
  { id: 43, name: 'Mauve Signature Tee',   price: 195, color: 'Dusty Mauve',     color_hex: '#9E7A8A', product_id: 'LZW-018', badge: null,      category: 'women', image_url: null },
  { id: 44, name: 'Teal Oversized Tee',    price: 179, color: 'Deep Teal',       color_hex: '#2D6E6E', product_id: 'LZW-019', badge: null,      category: 'women', image_url: null },
  { id: 45, name: 'Latte Drape Tee',       price: 169, color: 'Warm Latte',      color_hex: '#C4A882', product_id: 'LZW-020', badge: 'Limited', category: 'women', image_url: null },
];

export const ALL_PRODUCTS = [...DEMO_PRODUCTS_MEN, ...DEMO_PRODUCTS_WOMEN];

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
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category]);

  return { products, loading, error };
};