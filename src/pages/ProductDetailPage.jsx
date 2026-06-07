import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import { createPortal } from 'react-dom';
import AuthModal from '../components/AuthModal';

// ─── Load Razorpay script once ────────────────────────────────────────────────
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

// ─── css tokens ────────────────────────────────────────────────────────────────
const T = {
  dark:    'var(--dark)',
  muted:   'var(--muted)',
  accent:  'var(--accent)',
  sand:    'var(--sand)',
  mid:     'var(--mid)',
  border:  'var(--border)',
  borderL: 'var(--border-light)',
  surface: 'var(--surface)',
};
// readable label style reused everywhere
const label = {
  fontFamily: 'Jost,sans-serif',
  fontSize: '0.7rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: T.muted,
  marginBottom: '0.9rem',
};

export default function ProductDetailPage({ product, onBack, onViewProduct, allProducts = [] }) {
  const { addItem }           = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { user }              = useAuth();
  const { placeOrder }        = useOrders();
  const [selectedSize,  setSelectedSize]  = useState(null);
  const [mainImage,     setMainImage]     = useState(0);
  const [added,         setAdded]         = useState(false);
  const [buyingNow,     setBuyingNow]     = useState(false);
  const [wishlistAnim,  setWishlistAnim]  = useState(false);
  const [authPrompt,    setAuthPrompt]    = useState(false);
  const [sizeError,     setSizeError]     = useState(false);

  const wishlisted = isWishlisted(product.id);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const productImages = [
    product.image_url,
    product.img_url_1,
    product.img_url_2,
    product.img_url_3,
  ].filter(Boolean);

  const requireAuth = (action) => {
    if (!user) { setAuthPrompt(true); return; }
    action();
  };

  const handleAddToCart = () => {
    requireAuth(() => {
      if (!selectedSize) { setSizeError(true); setTimeout(() => setSizeError(false), 1800); return; }
      addItem({ ...product, size: selectedSize, quantity: 1 });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    });
  };

  const handleBuyNow = () => {
    requireAuth(async () => {
      if (!selectedSize) { setSizeError(true); setTimeout(() => setSizeError(false), 1800); return; }
      setBuyingNow(true);
      try {
        const loaded = await loadRazorpayScript();
        if (!loaded) { alert('Failed to load payment gateway. Please check your connection.'); setBuyingNow(false); return; }
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
              alert(`Payment successful! 🎉\nPayment ID: ${response.razorpay_payment_id}\nYour order has been placed.`);
            } catch (e) {
              alert('Payment received but order save failed. Contact support with Payment ID: ' + response.razorpay_payment_id);
            } finally { setBuyingNow(false); }
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', (r) => { alert('Payment failed: ' + (r.error?.description || 'Unknown error')); setBuyingNow(false); });
        rzp.open();
      } catch (e) { alert('Error initiating payment: ' + e.message); setBuyingNow(false); }
    });
  };

  const handleWishlist = () => {
    requireAuth(() => {
      toggleWishlist(product);
      setWishlistAnim(true);
      setTimeout(() => setWishlistAnim(false), 400);
    });
  };

  return (
    <div style={{ background: T.sand, color: T.dark, minHeight: '100vh' }}>

      {/* ── Sticky header ── */}
      <div style={{ position:'sticky', top:0, zIndex:100, background:T.sand, borderBottom:`1px solid ${T.borderL}`, padding: isMobile ? '1rem' : '1.2rem 2rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <button onClick={onBack}
          style={{ background:'transparent', border:`1px solid ${T.border}`, color:T.dark, padding:'0.55rem 1.4rem', cursor:'pointer', fontFamily:'Jost,sans-serif', fontSize:'0.72rem', fontWeight:400, letterSpacing:'0.14em', textTransform:'uppercase', transition:'all 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = T.accent; e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = '#F5EDE0'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.dark; }}>
          ← Back
        </button>
        <div style={{ width:80 }} />
      </div>

      {/* ── Main grid ── */}
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1fr) minmax(0,1fr)', gap: isMobile ? '0' : '3rem', padding: isMobile ? '1.2rem 1rem' : '2.5rem', maxWidth:'1400px', margin:'0 auto', alignItems:'start' }}>

        {/* Gallery */}
        <div style={{ order: isMobile ? 1 : 0 }}>
          {/* Big image */}
          <div style={{ position:'relative', background:'var(--sand)', display:'flex', alignItems:'center', justifyContent:'center', minHeight: isMobile ? '300px' : '600px', marginBottom:'1.2rem', overflow:'hidden' }}>
            {product.badge && (
              <div style={{ position:'absolute', top:'1.2rem', left:'1.2rem', background: product.badge === 'Limited' ? '#1a1007' : T.accent, color: product.badge === 'Limited' ? '#F5EDE0' : '#1a0f00', fontSize:'0.62rem', fontWeight:600, letterSpacing:'0.18em', padding:'0.45rem 1rem', fontFamily:'Jost,sans-serif', textTransform:'uppercase', zIndex:10 }}>{product.badge}</div>
            )}
            <img src={productImages[mainImage]} alt={product.name} style={{ width:'100%', height:'100%', objectFit:'contain', padding:'2rem' }} />
          </div>
          {/* Thumbnails */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0.75rem', marginBottom: isMobile ? '1.5rem' : '0' }}>
            {productImages.map((img, idx) => (
              <button key={idx} onClick={() => setMainImage(idx)}
                style={{ background:'var(--sand)', border: mainImage===idx ? `2px solid ${T.accent}` : `1px solid ${T.border}`, cursor:'pointer', height:'110px', display:'flex', alignItems:'center', justifyContent:'center', padding:'0.5rem', transition:'border-color 0.2s' }}
                onMouseEnter={(e) => { if (mainImage!==idx) e.currentTarget.style.borderColor = T.accent; }}
                onMouseLeave={(e) => { if (mainImage!==idx) e.currentTarget.style.borderColor = T.border; }}>
                <img src={img} alt={`View ${idx+1}`} style={{ width:'100%', height:'100%', objectFit:'contain' }} />
              </button>
            ))}
          </div>
        </div>

        {/* ── Product info panel ── */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1.6rem', order: isMobile ? 2 : 0 }}>

          {/* Title block */}
          <div>
            <div style={{ fontSize:'0.62rem', letterSpacing:'0.28em', color:T.accent, textTransform:'uppercase', fontFamily:'Jost,sans-serif', marginBottom:'0.7rem' }}>
              LEEZOO — EDGE COLLECTION
            </div>
            <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'2.6rem', letterSpacing:'0.04em', lineHeight:1.05, marginBottom:'1rem', color:T.dark }}>{product.name}</h1>

            {/* Price row */}
            <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'0.5rem' }}>
              <span style={{ fontSize:'1.6rem', fontFamily:'Jost,sans-serif', fontWeight:600, color:T.dark, letterSpacing:'0.02em' }}>RS {product.price}</span>
              {product.color && <>
                <span style={{ width:1, height:22, background:T.border, display:'inline-block' }} />
                <span style={{ fontSize:'0.8rem', letterSpacing:'0.1em', textTransform:'uppercase', color:T.muted, fontFamily:'Jost,sans-serif' }}>{product.color}</span>
              </>}
            </div>
            {product.product_id && (
              <div style={{ fontSize:'0.72rem', color:T.muted, fontFamily:'Jost,sans-serif', letterSpacing:'0.06em' }}>
                Product ID: <span style={{ color:T.accent }}>{product.product_id}</span>
              </div>
            )}
          </div>

          <div style={{ height:1, background:T.borderL }} />

          {/* Description */}
          <p style={{ fontSize:'0.92rem', lineHeight:1.85, color:T.dark, fontFamily:'Jost,sans-serif', fontWeight:300 }}>
            Crafted with premium comfort in mind, this piece combines luxury aesthetics with everyday wearability. Perfect for those who appreciate quality and style.
          </p>

          <div style={{ height:1, background:T.borderL }} />

          {/* Size */}
          <div>
            <div style={label}>Select Size</div>
            {sizeError && (
              <div style={{ fontSize:'0.72rem', color:'#e53e3e', fontFamily:'Jost,sans-serif', marginBottom:'0.6rem', letterSpacing:'0.04em' }}>
                ⚠ Please select a size before continuing
              </div>
            )}
            <div style={{ display:'flex', gap:'0.6rem', flexWrap:'wrap' }}>
              {SIZES.map((s) => (
                <button key={s} onClick={() => setSelectedSize(s)}
                  style={{
                    width:52, height:50,
                    border: selectedSize===s ? `2px solid ${T.accent}` : `1.5px solid ${T.border}`,
                    background: selectedSize===s ? T.accent : 'transparent',
                    color: selectedSize===s ? '#1a0f00' : T.dark,
                    cursor:'pointer', fontFamily:'Jost,sans-serif',
                    fontSize:'0.75rem', fontWeight:600, letterSpacing:'0.08em',
                    transition:'all 0.18s',
                  }}
                  onMouseEnter={(e) => { if (selectedSize!==s) { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; } }}
                  onMouseLeave={(e) => { if (selectedSize!==s) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.dark; } }}>
                  {s}
                </button>
              ))}
            </div>
          </div>


          <div style={{ height:1, background:T.borderL }} />

          {/* Action buttons */}
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            {/* Add to Bag */}
            <button onClick={handleAddToCart}
              style={{
                width:'100%', padding:'1.1rem',
                background: added ? T.accent : T.dark,
                color: added ? '#1a0f00' : '#F5EDE0',
                border:'none', cursor:'pointer',
                fontFamily:'Jost,sans-serif', fontSize:'0.8rem',
                fontWeight:500, letterSpacing:'0.18em', textTransform:'uppercase',
                transition:'background 0.25s',
              }}
              onMouseEnter={(e) => { if (!added) e.currentTarget.style.background = T.accent; if (!added) e.currentTarget.style.color = '#1a0f00'; }}
              onMouseLeave={(e) => { if (!added) e.currentTarget.style.background = T.dark; if (!added) e.currentTarget.style.color = '#F5EDE0'; }}>
              {added ? '✓  Added to Bag' : 'Add to Bag'}
            </button>

            {/* Buy Now — triggers Razorpay */}
            <button onClick={handleBuyNow}
              disabled={buyingNow}
              style={{
                width:'100%', padding:'1.1rem',
                background: buyingNow ? T.border : T.accent,
                color:'#1a0f00',
                border:'none', cursor: buyingNow ? 'wait' : 'pointer',
                fontFamily:'Jost,sans-serif', fontSize:'0.8rem',
                fontWeight:600, letterSpacing:'0.18em', textTransform:'uppercase',
                transition:'background 0.25s',
                opacity: buyingNow ? 0.7 : 1,
              }}
              onMouseEnter={(e) => { if (!buyingNow) e.currentTarget.style.background = '#b8922a'; }}
              onMouseLeave={(e) => { if (!buyingNow) e.currentTarget.style.background = T.accent; }}>
              {buyingNow ? 'Opening Payment…' : '⚡ Buy Now'}
            </button>
          </div>

          {/* Wishlist */}
          <button onClick={handleWishlist}
            style={{
              width:'100%', padding:'0.9rem',
              background: wishlisted ? 'rgba(220,38,38,0.08)' : 'transparent',
              color: wishlisted ? '#dc2626' : T.muted,
              border: `1px solid ${wishlisted ? 'rgba(220,38,38,0.35)' : T.border}`,
              cursor:'pointer', fontFamily:'Jost,sans-serif',
              fontSize:'0.75rem', fontWeight:400, letterSpacing:'0.14em',
              textTransform:'uppercase',
              display:'flex', alignItems:'center', justifyContent:'center', gap:'0.55rem',
              transition:'all 0.2s',
              transform: wishlistAnim ? 'scale(1.04)' : 'scale(1)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = wishlisted ? '#dc2626' : T.accent; e.currentTarget.style.color = wishlisted ? '#dc2626' : T.dark; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = wishlisted ? 'rgba(220,38,38,0.35)' : T.border; e.currentTarget.style.color = wishlisted ? '#dc2626' : T.muted; }}>
            <HeartIcon filled={wishlisted} /> {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
          </button>

          {/* Shipping perks */}
          <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem', paddingTop:'0.5rem' }}>
            {['Free shipping on orders over RS 499', 'Easy returns within 30 days', 'Authentic quality guaranteed'].map((t) => (
              <div key={t} style={{ display:'flex', alignItems:'center', gap:'0.6rem', fontSize:'0.75rem', color:T.muted, fontFamily:'Jost,sans-serif', letterSpacing:'0.04em' }}>
                <span style={{ color:T.accent, fontSize:'0.9rem' }}>✓</span> {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── You May Also Like ── */}
      {(() => {
        const similarProducts = allProducts
          .filter(p => p.id !== product.id)
          .slice(0, 5);
        if (similarProducts.length === 0) return null;
        return (
          <div style={{ borderTop:`1px solid ${T.borderL}`, padding: isMobile ? '3rem 1rem' : '4rem 2.5rem', marginTop:'1rem' }}>
            <div style={{ maxWidth:'1400px', margin:'0 auto' }}>
              <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'2rem', letterSpacing:'0.06em', marginBottom:'2.5rem', textAlign:'center', color:T.dark }}>
                YOU MAY ALSO LIKE
              </h2>
              {isMobile ? (
                /* Mobile: horizontal scroll row */
                <div style={{ display:'flex', gap:'1rem', overflowX:'auto', paddingBottom:'0.5rem', WebkitOverflowScrolling:'touch', scrollbarWidth:'none' }}>
                  {similarProducts.map((prod) => (
                    <div key={prod.id} style={{ minWidth:'60vw', maxWidth:'60vw', flexShrink:0 }}>
                      <SimilarCard prod={prod} onViewProduct={onViewProduct} />
                    </div>
                  ))}
                </div>
              ) : (
                /* Desktop: unchanged grid */
                <div style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(similarProducts.length, 5)},1fr)`, gap:'1.5rem' }}>
                  {similarProducts.map((prod) => (
                    <SimilarCard key={prod.id} prod={prod} onViewProduct={onViewProduct} />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {authPrompt && createPortal(<AuthModal onClose={() => setAuthPrompt(false)} />, document.body)}
    </div>
  );
}

// ─── Similar card ──────────────────────────────────────────────────────────────
function SimilarCard({ prod, onViewProduct }) {
  const [hovered, setHovered] = useState(false);
  const handleView = () => { if (onViewProduct) onViewProduct(prod); };
  return (
    <div
      style={{ position:'relative', background:'var(--surface)', border:`1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`, cursor:'pointer', transition:'border-color 0.25s, transform 0.25s', transform: hovered ? 'translateY(-3px)' : 'translateY(0)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleView}>
      {prod.badge && (
        <div style={{ position:'absolute', top:'0.7rem', left:'0.7rem', zIndex:2, background: prod.badge==='Limited' ? '#1a1007' : 'var(--accent)', color: prod.badge==='Limited' ? '#F5EDE0' : '#1a0f00', fontSize:'0.58rem', fontWeight:600, letterSpacing:'0.16em', padding:'0.35rem 0.8rem', fontFamily:'Jost,sans-serif', textTransform:'uppercase' }}>{prod.badge}</div>
      )}
      <div style={{ height:220, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--sand)' }}>
        <img src={prod.image_url} alt={prod.name}
          style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s cubic-bezier(0.16,1,0.3,1)', transform: hovered ? 'scale(1.07)' : 'scale(1)' }} />
      </div>
      <div style={{ padding:'1rem 1.1rem 1.2rem', borderTop:'1px solid var(--border-light)' }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.1rem', letterSpacing:'0.04em', marginBottom:'0.3rem', color:'var(--dark)' }}>{prod.name}</div>
        <div style={{ fontSize:'0.85rem', fontWeight:500, color:'var(--dark)', fontFamily:'Jost,sans-serif', marginBottom:'0.7rem' }}>RS {prod.price}</div>
        <button onClick={(e) => { e.stopPropagation(); handleView(); }}
          style={{ width:'100%', padding:'0.65rem', background: hovered ? 'var(--accent)' : 'var(--dark)', color: hovered ? '#1a0f00' : '#F5EDE0', border:'none', cursor:'pointer', fontFamily:'Jost,sans-serif', fontSize:'0.7rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', transition:'background 0.2s, color 0.2s' }}>
          View
        </button>
      </div>
    </div>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? '#dc2626' : 'none'} stroke={filled ? '#dc2626' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}