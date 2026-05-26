import { useState, useEffect, useCallback } from 'react';
import { useCart } from '../context/CartContext';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// Placeholder images when only one image_url is provided
function buildGallery(product) {
  const imgs = [];
  if (product.image_url) imgs.push(product.image_url);
  if (product.image_url_2) imgs.push(product.image_url_2);
  if (product.image_url_3) imgs.push(product.image_url_3);
  if (product.image_url_4) imgs.push(product.image_url_4);
  if (product.image_url_5) imgs.push(product.image_url_5);
  // If only one image, repeat it to fill the slider slots visually
  if (imgs.length === 1) return [imgs[0], imgs[0], imgs[0]];
  return imgs;
}

export default function ProductPage({ product, onBack }) {
  const { addItem } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [slideDir, setSlideDir] = useState(null); // 'left' | 'right'
  const [animKey, setAnimKey] = useState(0);

  const gallery = buildGallery(product);

  const goTo = useCallback((idx, dir) => {
    setSlideDir(dir);
    setAnimKey((k) => k + 1);
    setActiveImg(idx);
  }, []);

  const prev = () => {
    const idx = (activeImg - 1 + gallery.length) % gallery.length;
    goTo(idx, 'right');
  };

  const next = () => {
    const idx = (activeImg + 1) % gallery.length;
    goTo(idx, 'left');
  };

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.image_url,
      productId: product.product_id,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyWA = () => {
    const sizeText = selectedSize ? ` — Size: ${selectedSize}` : '';
    const msg = `Hi LEEZOO! I want to buy ${product.name} (ID: ${product.product_id})${sizeText} — AED ${product.price}`;
    window.open(`https://wa.me/971504746525?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--white)', paddingTop: '80px' }}>
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .img-slide-left  { animation: slideInLeft  0.35s cubic-bezier(0.16,1,0.3,1) both; }
        .img-slide-right { animation: slideInRight 0.35s cubic-bezier(0.16,1,0.3,1) both; }

        .thumb-btn:hover { border-color: var(--accent) !important; }
        .size-btn:hover  { border-color: rgba(196,153,90,0.6) !important; color: var(--accent) !important; }
        .arrow-btn:hover { background: rgba(196,153,90,0.15) !important; border-color: rgba(196,153,90,0.4) !important; }
        .back-btn:hover  { color: var(--accent) !important; }

        @media (max-width: 768px) {
          .product-layout { flex-direction: column !important; }
          .product-left   { min-height: 380px !important; }
          .product-right  { padding: 2rem 1.4rem 3rem !important; }
          .size-grid      { gap: 0.35rem !important; }
        }
      `}</style>

      {/* Back button */}
      <div style={{ padding: '1.2rem 2.5rem 0', maxWidth: 1200, margin: '0 auto' }}>
        <button
          className="back-btn"
          onClick={onBack}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.45)', fontFamily: 'Barlow,sans-serif',
            fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            transition: 'color 0.2s', padding: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
      </div>

      {/* Main Layout */}
      <div
        className="product-layout"
        style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', gap: 0,
          padding: '1.5rem 0 4rem',
          minHeight: 'calc(100vh - 140px)',
        }}
      >
        {/* ── LEFT: Image Slider ── */}
        <div
          className="product-left"
          style={{ flex: '0 0 55%', position: 'sticky', top: 80, alignSelf: 'flex-start', display: 'flex', gap: '1rem', padding: '0 2rem 0 2.5rem' }}
        >
          {/* Thumbnail strip */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.2rem' }}>
            {gallery.map((img, i) => (
              <button
                key={i}
                className="thumb-btn"
                onClick={() => goTo(i, i > activeImg ? 'left' : 'right')}
                style={{
                  width: 60, height: 68,
                  border: `1px solid ${i === activeImg ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
                  background: '#111',
                  cursor: 'pointer', padding: '0.3rem',
                  transition: 'border-color 0.2s',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                {img
                  ? <img src={img} alt={`View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  : <TShirtSVG color={product.color_hex || '#2a2a2a'} small />
                }
              </button>
            ))}
          </div>

          {/* Main image area */}
          <div style={{ flex: 1, position: 'relative', background: '#111', overflow: 'hidden', minHeight: 520, display: 'flex', flexDirection: 'column' }}>
            {/* Badge */}
            {product.badge && (
              <div style={{
                position: 'absolute', top: '1.2rem', left: '1.2rem', zIndex: 3,
                background: product.badge === 'Limited' ? 'var(--white)' : 'var(--accent)',
                color: 'var(--ink)', fontSize: '0.5rem', letterSpacing: '0.2em',
                padding: '0.3rem 0.75rem', fontFamily: 'Barlow,sans-serif',
                textTransform: 'uppercase',
              }}>{product.badge}</div>
            )}

            {/* Main image */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', minHeight: 460 }}>
              {gallery[activeImg]
                ? (
                  <img
                    key={animKey}
                    src={gallery[activeImg]}
                    alt={product.name}
                    className={slideDir === 'left' ? 'img-slide-left' : slideDir === 'right' ? 'img-slide-right' : ''}
                    style={{ maxWidth: '100%', maxHeight: 440, objectFit: 'contain', display: 'block' }}
                  />
                ) : (
                  <TShirtSVG color={product.color_hex || '#2a2a2a'} />
                )
              }
            </div>

            {/* Prev / Next arrows */}
            {gallery.length > 1 && (
              <div style={{ position: 'absolute', bottom: '1.2rem', right: '1.2rem', display: 'flex', gap: '0.5rem' }}>
                <button className="arrow-btn" onClick={prev} style={arrowStyle}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button className="arrow-btn" onClick={next} style={arrowStyle}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            )}

            {/* Dot indicators */}
            {gallery.length > 1 && (
              <div style={{ position: 'absolute', bottom: '1.4rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.4rem' }}>
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > activeImg ? 'left' : 'right')}
                    style={{
                      width: i === activeImg ? 20 : 6, height: 6, borderRadius: 3,
                      background: i === activeImg ? 'var(--accent)' : 'rgba(255,255,255,0.25)',
                      border: 'none', cursor: 'pointer', padding: 0,
                      transition: 'width 0.3s, background 0.3s',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Image counter */}
            <div style={{
              position: 'absolute', top: '1.2rem', right: '1.2rem',
              background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '0.25rem 0.6rem',
              fontFamily: 'Barlow,sans-serif', fontSize: '0.5rem',
              letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)',
            }}>
              {activeImg + 1} / {gallery.length}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Product Details ── */}
        <div
          className="product-right"
          style={{
            flex: 1, padding: '0.2rem 2.5rem 2rem 2rem',
            display: 'flex', flexDirection: 'column', gap: '1.6rem',
          }}
        >
          {/* Collection label */}
          <div style={{ fontSize: '0.48rem', letterSpacing: '0.32em', color: 'var(--accent)', textTransform: 'uppercase', fontFamily: 'Barlow,sans-serif', opacity: 0.65 }}>
            LEEZOO — EDGE COLLECTION 2026
          </div>

          {/* Name + Price */}
          <div>
            <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.06em', lineHeight: 1, marginBottom: '0.8rem' }}>
              {product.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.4rem', color: 'var(--accent)', fontFamily: 'Barlow,sans-serif', fontWeight: 300 }}>
                AED {product.price}
              </span>
              {product.color && (
                <>
                  <span style={{ width: 1, height: 16, background: 'var(--border)' }} />
                  <span style={{ fontSize: '0.6rem', letterSpacing: '0.18em', opacity: 0.45, textTransform: 'uppercase', fontFamily: 'Barlow,sans-serif' }}>
                    {product.color}
                  </span>
                </>
              )}
            </div>
            {product.product_id && (
              <div style={{ fontSize: '0.48rem', letterSpacing: '0.15em', opacity: 0.22, marginTop: '0.5rem', fontFamily: 'Barlow,sans-serif' }}>
                Product ID: {product.product_id}
              </div>
            )}
          </div>

          <div style={{ height: 1, background: 'var(--border)' }} />

          {/* Description */}
          {product.description && (
            <div>
              <div style={{ fontSize: '0.52rem', letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.35, marginBottom: '0.6rem', fontFamily: 'Barlow,sans-serif' }}>
                About
              </div>
              <p style={{ fontFamily: 'Barlow,sans-serif', fontSize: '0.78rem', lineHeight: 1.75, opacity: 0.65, letterSpacing: '0.02em' }}>
                {product.description}
              </p>
            </div>
          )}

          {/* Material / details chips */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[
              product.material || '100% Premium Cotton',
              product.fit || 'Regular Fit',
              product.care || 'Machine Wash',
            ].map((detail, i) => (
              <span key={i} style={{
                fontFamily: 'Barlow,sans-serif', fontSize: '0.52rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', opacity: 0.45,
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '0.3rem 0.7rem',
              }}>
                {detail}
              </span>
            ))}
          </div>

          <div style={{ height: 1, background: 'var(--border)' }} />

          {/* Size selector */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.52rem', letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.4, fontFamily: 'Barlow,sans-serif' }}>
                Select Size
              </div>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'Barlow,sans-serif', color: 'var(--accent)', opacity: 0.7, textDecoration: 'underline', textUnderlineOffset: 3 }}>
                Size Guide
              </button>
            </div>
            <div className="size-grid" style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
              {SIZES.map((s) => (
                <button
                  key={s}
                  className={selectedSize === s ? '' : 'size-btn'}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    width: 52, height: 48,
                    border: `1px solid ${selectedSize === s ? 'var(--accent)' : 'rgba(255,255,255,0.12)'}`,
                    background: selectedSize === s ? 'var(--accent)' : 'transparent',
                    color: selectedSize === s ? 'var(--ink)' : 'rgba(255,255,255,0.55)',
                    cursor: 'pointer', fontFamily: 'Barlow,sans-serif',
                    fontSize: '0.58rem', letterSpacing: '0.1em',
                    transition: 'all 0.18s',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p style={{ fontSize: '0.5rem', letterSpacing: '0.1em', color: 'rgba(196,153,90,0.4)', marginTop: '0.55rem', fontFamily: 'Barlow,sans-serif' }}>
                Choose a size to add to bag
              </p>
            )}
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              style={{
                width: '100%', padding: '1rem',
                background: selectedSize ? (added ? 'var(--accent)' : 'var(--white)') : 'rgba(255,255,255,0.07)',
                color: selectedSize ? 'var(--ink)' : 'rgba(255,255,255,0.2)',
                border: 'none', cursor: selectedSize ? 'pointer' : 'not-allowed',
                fontFamily: 'Barlow,sans-serif', fontSize: '0.62rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                transition: 'background 0.25s',
              }}
              onMouseEnter={(e) => { if (selectedSize && !added) e.currentTarget.style.background = 'var(--accent)'; }}
              onMouseLeave={(e) => { if (selectedSize && !added) e.currentTarget.style.background = 'var(--white)'; }}
            >
              {added ? '✓ Added to Bag' : 'Add to Bag'}
            </button>

            <button
              onClick={handleBuyWA}
              style={{
                width: '100%', padding: '1rem',
                background: 'transparent', color: '#25D366',
                border: '1px solid rgba(37,211,102,0.3)',
                cursor: 'pointer', fontFamily: 'Barlow,sans-serif',
                fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                transition: 'background 0.25s, border-color 0.25s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37,211,102,0.07)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.55)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.3)'; }}
            >
              <WAIcon /> Buy on WhatsApp
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}>
            {[
              { icon: '🚚', label: 'Free delivery in UAE' },
              { icon: '↩', label: 'Easy returns' },
              { icon: '🔒', label: 'Secure checkout' },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem' }}>{icon}</span>
                <span style={{ fontFamily: 'Barlow,sans-serif', fontSize: '0.5rem', letterSpacing: '0.12em', opacity: 0.35, textTransform: 'uppercase' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const arrowStyle = {
  width: 36, height: 36, borderRadius: '50%',
  background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
  border: '1px solid rgba(255,255,255,0.12)',
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'rgba(255,255,255,0.7)', transition: 'background 0.2s, border-color 0.2s',
};

function WAIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.856L0 24l6.335-1.508A11.956 11.956 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.371l-.36-.214-3.732.888.936-3.627-.235-.373A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

function TShirtSVG({ color, small }) {
  const s = small ? 48 : 160;
  return (
    <svg viewBox="0 0 200 200" width={s} height={s} fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M60 30 L30 60 L55 70 L55 170 L145 170 L145 70 L170 60 L140 30 Q120 50 100 50 Q80 50 60 30Z" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    </svg>
  );
}