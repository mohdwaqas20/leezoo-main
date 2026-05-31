import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// onView(product) — called when "View" is clicked → navigate to full product page
export default function ProductCard({ product, variant = 'slide', onView }) {
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { user } = useAuth();
  const [hovered, setHovered] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [wishlistAnim, setWishlistAnim] = useState(false);
  const [authPrompt, setAuthPrompt] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const requireAuth = (action) => {
    if (!user) {
      setAuthPrompt(true);
      return false;
    }
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
    if (onView) {
      onView(product);
    } else {
      setDetailOpen(true);
    }
  };

  if (variant === 'slide') {
    return (
      <>
        <div
          style={{ minWidth: '33.333%', position: 'relative', cursor: 'pointer', flexShrink: 0, background: 'var(--mid)', border: hovered ? '2px solid #BFA06A' : '2px solid rgba(122,87,64,0.25)', boxShadow: hovered ? '0 8px 40px rgba(191,160,106,0.28), inset 0 0 0 1px rgba(191,160,106,0.15)' : '0 2px 12px rgba(60,42,30,0.08)', transform: hovered ? 'translateY(-4px)' : 'translateY(0)', transition: 'border 0.25s, box-shadow 0.3s, transform 0.3s' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {product.badge && (
            <div style={{
              position: 'absolute', top: '1rem', left: '1rem', zIndex: 2,
              background: product.badge === 'Limited' ? 'var(--white)' : 'var(--accent)',
              color: '#F0E6D8', fontSize: '0.55rem', letterSpacing: '0.2em',
              padding: '0.35rem 0.8rem', fontWeight: 400,
            }}>{product.badge}</div>
          )}
          <button onClick={handleWishlist}
            style={{
              position: 'absolute', top: '1rem', right: '1rem', zIndex: 3,
              background: wishlisted ? 'rgba(220,38,38,0.12)' : 'rgba(245,237,224,0.92)',
              border: wishlisted ? '1px solid rgba(220,38,38,0.5)' : '1px solid rgba(122,87,64,0.3)',
              borderRadius: '50%', width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              transform: wishlistAnim ? 'scale(1.35)' : 'scale(1)',
              transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.2s',
              backdropFilter: 'blur(6px)',
            }}>
            <HeartIcon filled={wishlisted} />
          </button>
          <div onClick={handleView} style={{ width: '100%', height: 420, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', cursor: 'pointer' }}>
            {product.image_url
              ? <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)', transform: hovered ? 'scale(1.08)' : 'scale(1)', filter: product.image_filter || 'brightness(0.9)', padding: '1rem' }} />
              : <div style={{ transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}><TShirtSVG color={product.color_hex || '#1a1a1a'} /></div>}
          </div>
          <div style={{ padding: '1.4rem 1.6rem 1.8rem', background: 'var(--mid)', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.5rem', letterSpacing: '0.04em', marginBottom: '0.4rem', color: 'var(--dark)' }}>{product.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--dark)', fontFamily: 'Jost,sans-serif', letterSpacing: '0.02em' }}>RS {product.price}</span>
              <span style={{ width: 1, height: 12, background: 'var(--border)', display: 'inline-block' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.06em', fontFamily: 'Jost,sans-serif' }}>{product.color}</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--muted)', opacity: 0.6, marginBottom: '1.1rem', fontFamily: 'Jost,sans-serif', letterSpacing: '0.04em' }}>ID: {product.product_id}</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => requireAuth(() => setDetailOpen(true))}
                style={{ flex: 1, background: 'var(--dark)', color: '#F5EDE0', border: 'none', cursor: 'pointer', fontFamily: 'Jost,sans-serif', fontSize: '0.72rem', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.85rem', transition: 'background 0.25s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--dark)')}>
                Add to Bag
              </button>
              <button onClick={handleView}
                style={{ flex: 1, background: 'transparent', color: 'var(--dark)', border: '1px solid var(--dark)', cursor: 'pointer', fontFamily: 'Jost,sans-serif', fontSize: '0.72rem', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'background 0.25s, color 0.25s, border-color 0.25s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#F5EDE0'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--dark)'; e.currentTarget.style.borderColor = 'var(--dark)'; }}>
                <EyeIcon /> View
              </button>
            </div>
          </div>
        </div>
        {detailOpen && createPortal(
          <ProductDetailModal product={product} addItem={addItem} onClose={() => setDetailOpen(false)} />,
          document.body
        )}
        {authPrompt && createPortal(
          <AuthModal onClose={() => setAuthPrompt(false)} />,
          document.body
        )}
      </>
    );
  }

  if (variant === 'grid') {
    return (
      <>
        <div style={{ position: 'relative', background: 'var(--mid)', border: hovered ? '2px solid #BFA06A' : '2px solid rgba(122,87,64,0.25)', boxShadow: hovered ? '0 8px 40px rgba(191,160,106,0.28), inset 0 0 0 1px rgba(191,160,106,0.15)' : '0 2px 12px rgba(60,42,30,0.08)', transform: hovered ? 'translateY(-4px)' : 'translateY(0)', transition: 'border 0.25s, box-shadow 0.3s, transform 0.3s' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}>
          <button onClick={handleWishlist}
            style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 3, background: wishlisted ? 'rgba(220,38,38,0.12)' : 'rgba(245,237,224,0.92)', border: wishlisted ? '1px solid rgba(220,38,38,0.5)' : '1px solid rgba(122,87,64,0.3)', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transform: wishlistAnim ? 'scale(1.35)' : 'scale(1)', transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)' }}>
            <HeartIcon filled={wishlisted} />
          </button>
          <div onClick={handleView} style={{ height: 260, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', cursor: 'pointer' }}>
            {product.image_url
              ? <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: hovered ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)', padding: '0.5rem' }} />
              : <div style={{ transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}><TShirtSVG color={product.color_hex || '#1a1a1a'} /></div>}
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
              <button onClick={() => requireAuth(() => setDetailOpen(true))}
                style={{ flex: 1, background: 'var(--dark)', color: '#F5EDE0', border: 'none', cursor: 'pointer', fontFamily: 'Jost,sans-serif', fontSize: '0.7rem', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.75rem', transition: 'background 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--dark)')}>
                Add to Bag
              </button>
              <button onClick={handleView}
                style={{ flex: 1, background: 'transparent', color: 'var(--dark)', border: '1px solid var(--dark)', cursor: 'pointer', fontFamily: 'Jost,sans-serif', fontSize: '0.7rem', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', transition: 'background 0.2s, color 0.2s, border-color 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#F5EDE0'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--dark)'; e.currentTarget.style.borderColor = 'var(--dark)'; }}>
                <EyeIcon /> View
              </button>
            </div>
          </div>
        </div>
        {detailOpen && createPortal(
          <ProductDetailModal product={product} addItem={addItem} onClose={() => setDetailOpen(false)} />,
          document.body
        )}
        {authPrompt && createPortal(
          <AuthModal onClose={() => setAuthPrompt(false)} />,
          document.body
        )}
      </>
    );
  }

  return null;
}

function ProductDetailModal({ product, addItem, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [authPrompt, setAuthPrompt] = useState(false);
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (!user) { setAuthPrompt(true); return; }
    if (!selectedSize) return;
    addItem({ id: product.id, name: product.name, price: product.price, size: selectedSize, image: product.image_url, productId: product.product_id });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyWA = () => {
    const sizeText = selectedSize ? ` — Size: ${selectedSize}` : '';
    const msg = `Hi LEEZOO! I want to buy ${product.name} (ID: ${product.product_id})${sizeText} — RS ${product.price}`;
    window.open(`https://wa.me/971504746525?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 1001, background: 'var(--mid)', border: '1px solid rgba(196,153,90,0.2)', width: 'min(860px, 92vw)', maxHeight: '88vh', overflowY: 'auto', display: 'flex', flexDirection: 'row', animation: 'modalIn 0.3s cubic-bezier(0.16,1,0.3,1)' }}>

        {/* Close */}
        <button onClick={onClose}
          style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', zIndex: 10, background: 'rgba(191,160,106,0.1)', border: '1px solid var(--border-light)', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dark)', transition: 'background 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(196,153,90,0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}>
          <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round">
            <path d="M1 1l10 10M11 1L1 11" />
          </svg>
        </button>

        {/* Image */}
        <div style={{ flex: '0 0 50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 420, padding: '2rem', position: 'relative' }}>
          {product.badge && (
            <div style={{ position: 'absolute', top: '1.2rem', left: '1.2rem', background: product.badge === 'Limited' ? 'var(--white)' : 'var(--accent)', color: '#F0E6D8', fontSize: '0.5rem', letterSpacing: '0.2em', padding: '0.3rem 0.7rem', fontFamily: 'Jost,sans-serif', textTransform: 'uppercase' }}>{product.badge}</div>
          )}
          {product.image_url
            ? <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', maxHeight: 460 }} />
            : <TShirtSVG color={product.color_hex || '#2a2a2a'} />}
        </div>

        {/* Details */}
        <div style={{ flex: 1, padding: '2.5rem 2.5rem 2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          <div>
            <div style={{ fontSize: '0.5rem', letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase', fontFamily: 'Jost,sans-serif', marginBottom: '0.6rem', opacity: 0.7 }}>
              LEEZOO — EDGE COLLECTION
            </div>
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

          {/* Size */}
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

          {/* Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
            <button onClick={handleAddToCart} disabled={!selectedSize}
              style={{ width: '100%', padding: '0.9rem', background: selectedSize ? (added ? 'var(--accent)' : 'var(--white)') : 'rgba(122,87,64,0.12)', color: selectedSize ? 'var(--ink)' : 'rgba(44,31,20,0.3)', border: 'none', cursor: selectedSize ? 'pointer' : 'not-allowed', fontFamily: 'Jost,sans-serif', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', transition: 'background 0.25s' }}
              onMouseEnter={(e) => { if (selectedSize && !added) e.currentTarget.style.background = '#BFA06A'; }}
              onMouseLeave={(e) => { if (selectedSize && !added) e.currentTarget.style.background = '#2C1F14'; }}>
              {added ? '✓ Added to Bag' : 'Add to Bag'}
            </button>
            <button onClick={handleBuyWA}
              style={{ width: '100%', padding: '0.9rem', background: 'transparent', color: '#25D366', border: '1px solid rgba(37,211,102,0.35)', cursor: 'pointer', fontFamily: 'Jost,sans-serif', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'background 0.25s, border-color 0.25s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37,211,102,0.08)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.6)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.35)'; }}>
              <WAIcon /> Buy on WhatsApp
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translate(-50%,-46%); }
          to   { opacity: 1; transform: translate(-50%,-50%); }
        }
      `}</style>
      {authPrompt && createPortal(
        <AuthModal onClose={() => setAuthPrompt(false)} />,
        document.body
      )}
    </>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#ef4444' : 'none'} stroke={filled ? '#ef4444' : '#7A5740'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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

function WAIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.856L0 24l6.335-1.508A11.956 11.956 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.371l-.36-.214-3.732.888.936-3.627-.235-.373A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

function TShirtSVG({ color }) {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M60 30 L30 60 L55 70 L55 170 L145 170 L145 70 L170 60 L140 30 Q120 50 100 50 Q80 50 60 30Z" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    </svg>
  );
}