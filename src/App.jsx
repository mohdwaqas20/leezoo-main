import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrdersProvider } from './context/OrdersContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import ProductSlider from './components/ProductSlider';
import CustomPrinting from './components/CustomPrinting';
import BulkPrinting from './components/BulkPrinting';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import OrdersPage from './pages/OrdersPage';
import WishlistPage from './pages/WishlistPage';
import ShopPage from './pages/ShopPage';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import RefundExchange from './pages/RefundExchange';
import CustomizationPolicy from './pages/CustomizationPolicy';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import { useProducts } from './hooks/useProducts';

function AppContent() {
  const [authOpen, setAuthOpen] = useState(false);
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { products: menProducts, loading: menLoading } = useProducts('men');
  const { products: womenProducts, loading: womenLoading } = useProducts('women');

  const handleNavigate = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (page) {
      case 'checkout':
        return (
          <CheckoutPage
            onBack={() => handleNavigate('home')}
            onSuccess={() => handleNavigate('home')}
          />
        );
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => { setSelectedProduct(null); setPage('home'); }}
            onViewProduct={(product) => { setSelectedProduct(product); setPage('product-detail'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            allProducts={[...menProducts, ...womenProducts]}
          />
        ) : null;
      case 'shop-men':
        return <ShopPage category="men" onBack={() => handleNavigate('home')} onViewProduct={(product) => { setSelectedProduct(product); setPage('product-detail'); }} />;
      case 'shop-women':
        return <ShopPage category="women" onBack={() => handleNavigate('home')} onViewProduct={(product) => { setSelectedProduct(product); setPage('product-detail'); }} />;
      case 'orders':
        return <OrdersPage onBack={() => handleNavigate('home')} />;
      case 'wishlist':
        return <WishlistPage onBack={() => handleNavigate('home')} />;
      case 'terms':
        return <TermsOfService onBack={() => handleNavigate('home')} />;
      case 'privacy':
        return <PrivacyPolicy onBack={() => handleNavigate('home')} />;
      case 'shipping':
        return <ShippingPolicy onBack={() => handleNavigate('home')} />;
      case 'refund':
        return <RefundExchange onBack={() => handleNavigate('home')} />;
      case 'customization':
        return <CustomizationPolicy onBack={() => handleNavigate('home')} />;
      default:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <Marquee />
            <div id="shop-men" style={{ background: 'var(--sand)' }}>
              <ProductSlider
                title="MADE FOR MEN"
                products={menProducts}
                loading={menLoading}
                onShopAll={() => handleNavigate('shop-men')}
                onViewProduct={(product) => { setSelectedProduct(product); setPage('product-detail'); }}
              />
            </div>

            {/* ── Men → Women divider ── */}
            <div style={{ background: 'var(--sand)', padding: '0 4rem' }}>
              <div style={{ position: 'relative', height: '1px', background: 'rgba(122,87,64,0.3)' }}>
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%,-50%)',
                  background: 'var(--sand)', padding: '0.5rem 2rem',
                  display: 'flex', alignItems: 'center', gap: '0.6rem', whiteSpace: 'nowrap',
                }}>
                  <span style={{ color: 'var(--brown)', fontSize: '0.55rem', opacity: 0.5 }}>◆</span>
                  <span style={{ color: 'var(--brown)', fontSize: '0.75rem', opacity: 0.8 }}>◆</span>
                  <span style={{ color: 'var(--brown)', fontSize: '1rem' }}>◆</span>
                  <span style={{ color: 'var(--brown)', fontSize: '0.75rem', opacity: 0.8 }}>◆</span>
                  <span style={{ color: 'var(--brown)', fontSize: '0.55rem', opacity: 0.5 }}>◆</span>
                </div>
              </div>
            </div>

            <div id="shop-women" style={{ background: 'var(--sand)' }}>
              <ProductSlider
                title="MADE FOR WOMEN"
                products={womenProducts}
                loading={womenLoading}
                onShopAll={() => handleNavigate('shop-women')}
                onViewProduct={(product) => { setSelectedProduct(product); setPage('product-detail'); }}
              />
            </div>
            <CustomPrinting />
            <BulkPrinting />
            <Footer onNavigate={handleNavigate} />
          </>
        );
    }
  };

  return (
    <>
      <Navbar
        onAuthClick={() => setAuthOpen(true)}
        onNavigate={handleNavigate}
        currentPage={page}
      />
      {/* Pass onCheckout to CartDrawer so "Proceed to Checkout" navigates to the page */}
      <CartDrawer onCheckout={() => handleNavigate('checkout')} />
      {renderPage()}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <OrdersProvider>
            <AppContent />
          </OrdersProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}