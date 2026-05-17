import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import ProductSlider from './components/ProductSlider';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import { useProducts } from './hooks/useProducts';

function ShopContent({ onAuthClick }) {
  const { products: menProducts, loading: menLoading } = useProducts('men');
  const { products: womenProducts, loading: womenLoading } = useProducts('women');

  return (
    <>
      <Navbar onAuthClick={onAuthClick} />
      <CartDrawer />
      <Hero />
      <Marquee />

      <div id="shop-men">
        <ProductSlider title="MADE FOR MEN" products={menProducts} loading={menLoading} />
      </div>
      <div id="shop-women" style={{ marginTop: '1rem' }}>
        <ProductSlider title="MADE FOR WOMEN" products={womenProducts} loading={womenLoading} />
      </div>

      <Footer />
    </>
  );
}

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <ShopContent onAuthClick={() => setAuthOpen(true)} />
        {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      </CartProvider>
    </AuthProvider>
  );
}
