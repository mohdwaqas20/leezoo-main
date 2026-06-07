import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import AuthModal from './AuthModal';

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_yourkeyhere';

const SIZES = ['S', 'M', 'L', 'XL'];
const DARK_COLOR_KEYWORDS = ['black', 'dark', 'midnight', 'charcoal', 'obsidian', 'navy', 'slate', 'shadow'];

// Single consistent background for ALL product cards — same sand as page background
function getImageBg(product) {
  return { bg: 'var(--sand)', isOnLight: true };
}

export default function ProductCard({ product, variant = 'slide', onView }) {
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { user } = useAuth();
  const [hovered, setHovered] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [wishlistAnim, setWishlistAnim] = useState(false);
  const [authPrompt, setAuthPrompt] = useState(false);
  const [imgError, setImgError] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const requireAuth = (action) => {
    if (!user) { setAuthPrompt(true); return false; }
    action();
    return true;
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    requireAuth(() => {
      toggleWishlist(product);
      setWishlistAnim(true);
      setTimeout(() => setWishlistAnim(false), 400);
    });
  };

  const handleView = (e) => {
    e.stopPropagation();
    if (onView) onView(product);
    else setDetailOpen(true);
  };

  const { bg: imgBg, isOnLight } = getImageBg(product);
  const badgeBg    = isOnLight ? 'rgba(20,20,20,0.85)'  : 'rgba(232,224,213,0.92)';
  const badgeColor = isOnLight ? '#D4A853'               : '#1A1A1A';
  const badgeBdr   = isOnLight ? 'rgba(212,168,83,0.5)'  : 'rgba(20,20,20,0.25)';
  const wlBg       = isOnLight ? 'rgba(255,255,255,0.75)' : 'rgba(20,20,20,0.55)';
  const wlBdr      = isOnLight ? 'rgba(0,0,0,0.15)'      : 'rgba(255,255,255,0.2)';
  const shadowStr  = isOnLight ? 'rgba(0,0,0,0.2)'       : 'rgba(0,0,0,0.5)';

  if (variant === 'slide') {
    return (
      <>
        <div
          style={{
            minWidth: '33.333%',
            position: 'relative',
            cursor: 'pointer',
            flexShrink: 0,
            background: 'var(--mid)',
            border: hovered ? '2px solid var(--accent)' : '2px solid transparent',
            boxShadow: hovered
              ? '0 20px 60px rgba(0,0,0,0.25), 0 8px 24px rgba(191,160,106,0.12)'
              : '0 2px 16px rgba(0,0,0,0.06)',
            transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
            transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {product.badge && (
            <div style={{
              position: 'absolute', top: '1rem', left: '1rem', zIndex: 3,
              background: badgeBg, color: badgeColor,
              fontSize: '0.52rem', letterSpacing: '0.22em',
              padding: '0.3rem 0.85rem', fontWeight: 500,
              fontFamily: 'Jost,sans-serif', textTransform: 'uppercase',
              border: `1px solid ${badgeBdr}`, backdropFilter: 'blur(6px)',
            }}>{product.badge}</div>
          )}

          <button onClick={handleWishlist} style={{
            position: 'absolute', top: '1rem', right: '1rem', zIndex: 3,
            background: wishlisted ? 'rgba(220,38,38,0.18)' : wlBg,
            border: wishlisted ? '1px solid rgba(220,38,38,0.5)' : `1px solid ${wlBdr}`,
            borderRadius: '50%', width: 38, height: 38,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            transform: wishlistAnim ? 'scale(1.4)' : 'scale(1)',
            transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.2s',
            backdropFilter: 'blur(8px)',
          }}>
            <HeartIcon filled={wishlisted} onLight={isOnLight} />
          </button>

          {/* IMAGE ZONE */}
          <div
            onClick={handleView}
            style={{
              width: '100%', height: 'clamp(240px,50vw,460px)', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: imgBg, cursor: 'pointer', position: 'relative',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              background: hovered
                ? isOnLight
                  ? 'radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.05) 0%, transparent 65%)'
                  : 'radial-gradient(ellipse at 50% 100%, rgba(191,160,106,0.1) 0%, transparent 65%)'
                : 'transparent',
              transition: 'background 0.5s ease',
              pointerEvents: 'none', zIndex: 1,
            }} />

            {(product.image_url && !imgError)
              ? <img
                  src={product.image_url}
                  alt={product.name}
                  onError={() => setImgError(true)}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center',
                    transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                    transform: hovered ? 'scale(1.09) translateY(-4px)' : 'scale(1) translateY(0)',
                    position: 'relative', zIndex: 2,
                  }}
                />
              : <div style={{
                  transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                  transform: hovered ? 'scale(1.06)' : 'scale(1)',
                  position: 'relative', zIndex: 2,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
                }}>
                  <TShirtSVG color={product.color_hex || (DARK_COLOR_KEYWORDS.some(k => (product.color||'').toLowerCase().includes(k)) ? '#555' : '#e8ddd0')} />
                  <span style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: isOnLight ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.2)', fontFamily: 'Jost,sans-serif', textTransform: 'uppercase' }}>Image Coming Soon</span>
                </div>
            }
          </div>

          {/* CARD INFO */}
          <div style={{ padding: '1.4rem 1.6rem 1.8rem', background: 'var(--mid)', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.5rem', letterSpacing: '0.04em', marginBottom: '0.4rem', color: 'var(--dark)' }}>{product.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--dark)', fontFamily: 'Jost,sans-serif', letterSpacing: '0.02em' }}>RS {product.price}</span>
              <span style={{ width: 1, height: 12, background: 'var(--border)', display: 'inline-block' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.06em', fontFamily: 'Jost,sans-serif' }}>{product.color}</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--muted)', opacity: 0.5, marginBottom: '1.1rem', fontFamily: 'Jost,sans-serif', letterSpacing: '0.04em' }}>ID: {product.product_id}</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => requireAuth(() => setDetailOpen(true))}
                style={{ flex: 1, background: 'var(--dark)', color: '#F5EDE0', border: 'none', cursor: 'pointer', fontFamily: 'Jost,sans-serif', fontSize: '0.72rem', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.9rem', transition: 'background 0.25s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--dark)')}
              >Add to Bag</button>
              <button
                onClick={handleView}
                style={{ flex: 1, background: 'transparent', color: 'var(--dark)', border: '1px solid var(--dark)', cursor: 'pointer', fontFamily: 'Jost,sans-serif', fontSize: '0.72rem', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'background 0.25s, color 0.25s, border-color 0.25s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#F5EDE0'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--dark)'; e.currentTarget.style.borderColor = 'var(--dark)'; }}
              ><EyeIcon /> View</button>
            </div>
          </div>
        </div>

        {detailOpen && createPortal(<ProductDetailModal product={product} addItem={addItem} onClose={() => setDetailOpen(false)} />, document.body)}
        {authPrompt && createPortal(<AuthModal onClose={() => setAuthPrompt(false)} />, document.body)}
      </>
    );
  }

  if (variant === 'grid') {
    return (
      <>
        <div
          style={{
            position: 'relative',
            background: 'var(--mid)',
            border: hovered ? '2px solid var(--accent)' : '2px solid transparent',
            boxShadow: hovered
              ? '0 20px 60px rgba(0,0,0,0.2), 0 8px 24px rgba(191,160,106,0.1)'
              : '0 2px 12px rgba(0,0,0,0.05)',
            transform: hovered ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
            transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <button onClick={handleWishlist} style={{
            position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 3,
            background: wishlisted ? 'rgba(220,38,38,0.18)' : wlBg,
            border: wishlisted ? '1px solid rgba(220,38,38,0.5)' : `1px solid ${wlBdr}`,
            borderRadius: '50%', width: 34, height: 34,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            transform: wishlistAnim ? 'scale(1.4)' : 'scale(1)',
            transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
            backdropFilter: 'blur(8px)',
          }}>
            <HeartIcon filled={wishlisted} onLight={isOnLight} />
          </button>

          <div
            onClick={handleView}
            style={{
              height: 'clamp(200px,40vw,300px)', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: imgBg, cursor: 'pointer', position: 'relative',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              background: hovered
                ? isOnLight
                  ? 'radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.05) 0%, transparent 65%)'
                  : 'radial-gradient(ellipse at 50% 100%, rgba(191,160,106,0.1) 0%, transparent 65%)'
                : 'transparent',
              transition: 'background 0.5s ease',
              pointerEvents: 'none', zIndex: 1,
            }} />

            {(product.image_url && !imgError)
              ? <img
                  src={product.image_url}
                  alt={product.name}
                  onError={() => setImgError(true)}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transform: hovered ? 'scale(1.09) translateY(-4px)' : 'scale(1)',
                    transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                    position: 'relative', zIndex: 2,
                  }}
                />
              : <div style={{
                  transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                  transform: hovered ? 'scale(1.06)' : 'scale(1)',
                  position: 'relative', zIndex: 2,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                }}>
                  <TShirtSVG color={product.color_hex || (DARK_COLOR_KEYWORDS.some(k => (product.color||'').toLowerCase().includes(k)) ? '#555' : '#e8ddd0')} />
                  <span style={{ fontSize: '0.45rem', letterSpacing: '0.18em', color: isOnLight ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.2)', fontFamily: 'Jost,sans-serif', textTransform: 'uppercase' }}>Coming Soon</span>
                </div>
            }
          </div>

          <div style={{ padding: '1rem 1.2rem 1.4rem', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.25rem', letterSpacing: '0.04em', marginBottom: '0.3rem', color: 'var(--dark)' }}>{product.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.9rem' }}>
              <span style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--dark)', fontFamily: 'Jost,sans-serif' }}>RS {product.price}</span>
              {product.color && <>
                <span style={{ width: 1, height: 11, background: 'var(--border)', display: 'inline-block' }} />
                <span style={{ fontSize: '0.72rem', color: 'var(--muted)', letterSpacing: '0.04em', fontFamily: 'Jost,sans-serif' }}>{product.color}</span>
              </>}
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                onClick={() => requireAuth(() => setDetailOpen(true))}
                style={{ flex: 1, background: 'var(--dark)', color: '#F5EDE0', border: 'none', cursor: 'pointer', fontFamily: 'Jost,sans-serif', fontSize: '0.7rem', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.75rem', transition: 'background 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--dark)')}
              >Add to Bag</button>
              <button
                onClick={handleView}
                style={{ flex: 1, background: 'transparent', color: 'var(--dark)', border: '1px solid var(--dark)', cursor: 'pointer', fontFamily: 'Jost,sans-serif', fontSize: '0.7rem', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', transition: 'background 0.2s, color 0.2s, border-color 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#F5EDE0'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--dark)'; e.currentTarget.style.borderColor = 'var(--dark)'; }}
              ><EyeIcon /> View</button>
            </div>
          </div>
        </div>

        {detailOpen && createPortal(<ProductDetailModal product={product} addItem={addItem} onClose={() => setDetailOpen(false)} />, document.body)}
        {authPrompt && createPortal(<AuthModal onClose={() => setAuthPrompt(false)} />, document.body)}
      </>
    );
  }

  return null;
}

function ProductDetailModal({ product, addItem, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);
  const [authPrompt, setAuthPrompt] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();
  const { placeOrder } = useOrders();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleAddToCart = () => {
    if (!user) { setAuthPrompt(true); return; }
    if (!selectedSize) return;
    addItem({ id: product.id, name: product.name, price: product.price, size: selectedSize, image: product.image_url, productId: product.product_id });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = async () => {
    if (!user) { setAuthPrompt(true); return; }
    if (!selectedSize) return;
    setBuyingNow(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) { alert('Failed to load payment gateway.'); setBuyingNow(false); return; }
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: product.price * 100,
        currency: 'INR',
        name: 'LEEZOO',
        description: `${product.name} — Size: ${selectedSize}`,
        image: '/leezoo-logo.png',
        prefill: { name: user.user_metadata?.full_name || '', email: user.email || '' },
        theme: { color: '#231F1A' },
        modal: { ondismiss: () => setBuyingNow(false) },
        handler: async (response) => {
          try {
            await placeOrder([{ ...product, size: selectedSize, qty: 1 }], product.price, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            alert(`Payment successful! 🎉\nPayment ID: ${response.razorpay_payment_id}`);
          } catch (e) {
            alert('Payment received but order save failed. Contact support with Payment ID: ' + response.razorpay_payment_id);
          } finally { setBuyingNow(false); }
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (r) => { alert('Payment failed: ' + (r.error?.description || 'Unknown error')); setBuyingNow(false); });
      rzp.open();
    } catch (e) { alert('Error: ' + e.message); setBuyingNow(false); }
  };

  const { bg: imgBg, isOnLight } = getImageBg(product);
  const modalShadow = isOnLight ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.55)';

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 1001, background: 'var(--mid)', border: '1px solid rgba(196,153,90,0.2)', width: 'min(880px, 92vw)', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', animation: 'modalIn 0.35s cubic-bezier(0.16,1,0.3,1)', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}>

        <button onClick={onClose}
          style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', zIndex: 10, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dark)', transition: 'background 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(196,153,90,0.3)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.3)')}>
          <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round">
            <path d="M1 1l10 10M11 1L1 11" />
          </svg>
        </button>

        {/* Image panel */}
        <div
          style={{ flex: isMobile ? 'none' : '0 0 50%', background: imgBg, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: isMobile ? 260 : 460, height: isMobile ? 280 : 'auto', padding: isMobile ? '1.5rem' : '2.5rem', position: 'relative', cursor: 'zoom-in', overflow: 'hidden' }}
          onMouseEnter={() => setImgHovered(true)}
          onMouseLeave={() => setImgHovered(false)}
        >
          {/* Subtle glow on hover */}
          <div style={{
            position: 'absolute', inset: 0,
            background: imgHovered
              ? isOnLight
                ? 'radial-gradient(ellipse at 50% 90%, rgba(0,0,0,0.06) 0%, transparent 60%)'
                : 'radial-gradient(ellipse at 50% 90%, rgba(191,160,106,0.1) 0%, transparent 60%)'
              : 'transparent',
            transition: 'background 0.5s ease',
            pointerEvents: 'none', zIndex: 1,
          }} />

          {product.badge && (
            <div style={{ position: 'absolute', top: '1.2rem', left: '1.2rem', zIndex: 3, background: isOnLight ? 'rgba(20,20,20,0.85)' : 'rgba(232,224,213,0.92)', color: isOnLight ? '#D4A853' : '#1A1A1A', fontSize: '0.5rem', letterSpacing: '0.22em', padding: '0.3rem 0.8rem', fontFamily: 'Jost,sans-serif', textTransform: 'uppercase', border: isOnLight ? '1px solid rgba(212,168,83,0.5)' : '1px solid rgba(20,20,20,0.25)', backdropFilter: 'blur(6px)' }}>{product.badge}</div>
          )}

          {(product.image_url && !imgError)
            ? <img
                src={product.image_url}
                alt={product.name}
                onError={() => setImgError(true)}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center',
                  position: 'relative', zIndex: 2,
                  transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                  transform: imgHovered ? 'scale(1.07) translateY(-4px)' : 'scale(1)',
                }}
              />
            : <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <TShirtSVG color={product.color_hex || (DARK_COLOR_KEYWORDS.some(k => (product.color||'').toLowerCase().includes(k)) ? '#555' : '#e8ddd0')} />
                <span style={{ fontSize: '0.5rem', letterSpacing: '0.22em', color: isOnLight ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.22)', fontFamily: 'Jost,sans-serif', textTransform: 'uppercase' }}>Image Coming Soon</span>
              </div>
          }
        </div>

        {/* Details panel */}
        <div style={{ flex: 1, padding: isMobile ? '1.5rem' : '2.5rem 2.5rem 2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          <div>
            <div style={{ fontSize: '0.5rem', letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase', fontFamily: 'Jost,sans-serif', marginBottom: '0.6rem', opacity: 0.7 }}>LEEZOO — EDGE COLLECTION</div>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2.2rem', letterSpacing: '0.06em', lineHeight: 1, marginBottom: '0.6rem' }}>{product.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontSize: '1.1rem', color: 'var(--accent)', fontFamily: 'Jost,sans-serif', fontWeight: 300 }}>RS {product.price}</span>
              {product.color && <>
                <span style={{ width: 1, height: 14, background: 'var(--border)' }} />
                <span style={{ fontSize: '0.6rem', letterSpacing: '0.18em', opacity: 0.5, textTransform: 'uppercase', fontFamily: 'Jost,sans-serif' }}>{product.color}</span>
              </>}
            </div>
            {product.product_id && <div style={{ fontSize: '0.5rem', letterSpacing: '0.15em', opacity: 0.25, marginTop: '0.4rem', fontFamily: 'Jost,sans-serif' }}>Product ID: {product.product_id}</div>}
          </div>

          <div style={{ height: 1, background: 'var(--border)' }} />

          <div>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.45, marginBottom: '0.75rem', fontFamily: 'Jost,sans-serif' }}>Select Size</div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {SIZES.map((s) => (
                <button key={s} onClick={() => setSelectedSize(s)}
                  style={{ width: 48, height: 44, border: selectedSize === s ? '1px solid var(--accent)' : '1px solid rgba(122,87,64,0.22)', background: selectedSize === s ? 'var(--accent)' : 'transparent', color: selectedSize === s ? '#F0E6D8' : '#5C3D25', cursor: 'pointer', fontFamily: 'Jost,sans-serif', fontSize: '0.58rem', letterSpacing: '0.1em', transition: 'all 0.18s' }}
                  onMouseEnter={(e) => { if (selectedSize !== s) { e.currentTarget.style.borderColor = '#BFA06A'; e.currentTarget.style.color = '#BFA06A'; } }}
                  onMouseLeave={(e) => { if (selectedSize !== s) { e.currentTarget.style.borderColor = 'rgba(122,87,64,0.2)'; e.currentTarget.style.color = '#5C3D25'; } }}>
                  {s}
                </button>
              ))}
            </div>
            {!selectedSize && <p style={{ fontSize: '0.5rem', letterSpacing: '0.1em', color: 'rgba(196,153,90,0.45)', marginTop: '0.5rem', fontFamily: 'Jost,sans-serif' }}>Choose a size to add to bag</p>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
            <button onClick={handleAddToCart} disabled={!selectedSize}
              style={{ width: '100%', padding: '0.9rem', background: selectedSize ? (added ? 'var(--accent)' : 'var(--dark)') : 'rgba(122,87,64,0.12)', color: selectedSize ? '#F5EDE0' : 'rgba(44,31,20,0.3)', border: 'none', cursor: selectedSize ? 'pointer' : 'not-allowed', fontFamily: 'Jost,sans-serif', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', transition: 'background 0.25s' }}
              onMouseEnter={(e) => { if (selectedSize && !added) e.currentTarget.style.background = 'var(--accent)'; }}
              onMouseLeave={(e) => { if (selectedSize && !added) e.currentTarget.style.background = 'var(--dark)'; }}>
              {added ? '✓ Added to Bag' : 'Add to Bag'}
            </button>
            <button onClick={handleBuyNow}
              disabled={buyingNow}
              style={{ width: '100%', padding: '0.9rem', background: buyingNow ? 'rgba(196,153,90,0.5)' : 'var(--accent)', color: '#1a0f00', border: 'none', cursor: buyingNow ? 'wait' : 'pointer', fontFamily: 'Jost,sans-serif', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, transition: 'background 0.25s', opacity: buyingNow ? 0.7 : 1 }}
              onMouseEnter={(e) => { if (!buyingNow) e.currentTarget.style.background = '#b8922a'; }}
              onMouseLeave={(e) => { if (!buyingNow) e.currentTarget.style.background = 'var(--accent)'; }}>
              {buyingNow ? 'Opening Payment…' : '⚡ Buy Now'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translate(-50%,-46%) scale(0.97); }
          to   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        }
      `}</style>
      {authPrompt && createPortal(<AuthModal onClose={() => setAuthPrompt(false)} />, document.body)}
    </>
  );
}

function HeartIcon({ filled, onLight }) {
  const strokeColor = filled ? '#ef4444' : onLight ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.85)';
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#ef4444' : 'none'} stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TShirtSVG({ color }) {
  const isDarkColor = color && color !== '#e8ddd0' && color !== '#F5EDE0';
  const strokeColor = isDarkColor ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)';
  return (
    <svg viewBox="0 0 220 220" width="160" height="160" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="110" cy="205" rx="60" ry="8" fill="rgba(0,0,0,0.18)" />
      <path
        d="M65 38 L28 72 L52 82 L52 182 L168 182 L168 82 L192 72 L155 38 Q138 58 110 58 Q82 58 65 38Z"
        fill={color}
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M82 44 Q110 64 138 44" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />
      <line x1="110" y1="65" x2="110" y2="175" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
    </svg>
  );
}