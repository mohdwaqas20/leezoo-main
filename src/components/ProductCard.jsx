import { useState } from 'react';
import { useCart } from '../context/CartContext';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const WA_NUMBER = '971504746525';

export default function ProductCard({ product, variant = 'slide' }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleBuyWA = () => {
    const msg = `Hi LEEZOO! I want to buy ${product.name} (ID: ${product.product_id}) — AED ${product.price}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

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
    setSizeModalOpen(false);
    setSelectedSize(null);
  };

  if (variant === 'slide') {
    return (
      <>
        <div
          style={{ minWidth: '33.333%', position: 'relative', cursor: 'pointer', flexShrink: 0, background: 'var(--mid)' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {product.badge && (
            <div style={{
              position: 'absolute', top: '1rem', left: '1rem', zIndex: 2,
              background: product.badge === 'Limited' ? 'var(--white)' : 'var(--accent)',
              color: 'var(--ink)', fontSize: '0.55rem', letterSpacing: '0.2em',
              padding: '0.35rem 0.8rem', fontWeight: 400,
            }}>{product.badge}</div>
          )}
          <div style={{ width: '100%', height: 420, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111' }}>
            {product.image_url ? (
              <img
                src={product.image_url} alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center',
                  transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                  transform: hovered ? 'scale(1.04)' : 'scale(1)',
                  filter: product.image_filter || 'brightness(0.9)', padding: '1rem',
                }}
              />
            ) : (
              <TShirtSVG color={product.color_hex || '#1a1a1a'} />
            )}
          </div>
          <div style={{ padding: '1.4rem 1.6rem 1.8rem', background: 'var(--mid)', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.3rem', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>{product.name}</div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--accent)' }}>AED {product.price} &nbsp;·&nbsp; {product.color}</div>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.15em', opacity: 0.3, marginTop: '0.2rem' }}>Product ID: {product.product_id}</div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button
                onClick={() => setSizeModalOpen(true)}
                style={{
                  flex: 1, background: 'var(--white)', color: 'var(--ink)', border: 'none', cursor: 'pointer',
                  fontFamily: 'Barlow,sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', padding: '0.75rem',
                  transition: 'background 0.25s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--white)'}
              >Add to Bag</button>
              <button
                onClick={handleBuyWA}
                style={{
                  flex: 1, background: '#25D366', color: '#fff', border: 'none', cursor: 'pointer',
                  fontFamily: 'Barlow,sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', padding: '0.75rem', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '0.4rem', transition: 'background 0.25s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#1ebe5d'}
                onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
              >
                <WAIcon /> Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Size selector modal */}
        {sizeModalOpen && (
          <SizeModal
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            onClose={() => { setSizeModalOpen(false); setSelectedSize(null); }}
            onConfirm={handleAddToCart}
          />
        )}
      </>
    );
  }

  return null;
}

function SizeModal({ product, selectedSize, setSelectedSize, onClose, onConfirm }) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.7)' }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        zIndex: 1001, background: 'var(--mid)', padding: '2.5rem 3rem',
        minWidth: 340, border: '1px solid var(--border)',
      }}>
        <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.8rem', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Select Size</h3>
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', opacity: 0.4, marginBottom: '1.5rem' }}>{product.name}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {SIZES.map(s => (
            <button key={s} onClick={() => setSelectedSize(s)} style={{
              padding: '0.7rem', border: `1px solid ${selectedSize === s ? 'var(--accent)' : 'var(--border)'}`,
              background: selectedSize === s ? 'var(--accent)' : 'transparent',
              color: selectedSize === s ? 'var(--ink)' : 'var(--white)',
              cursor: 'pointer', fontFamily: 'Barlow,sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em',
              transition: 'all 0.2s',
            }}>{s}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '0.85rem', border: '1px solid var(--border)', background: 'transparent',
            color: 'var(--white)', cursor: 'pointer', fontSize: '0.6rem', letterSpacing: '0.18em',
          }}>Cancel</button>
          <button onClick={onConfirm} disabled={!selectedSize} style={{
            flex: 2, padding: '0.85rem', background: selectedSize ? 'var(--white)' : 'rgba(255,255,255,0.1)',
            color: 'var(--ink)', border: 'none', cursor: selectedSize ? 'pointer' : 'not-allowed',
            fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>Add to Bag</button>
        </div>
      </div>
    </>
  );
}

function WAIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.856L0 24l6.335-1.508A11.956 11.956 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.371l-.36-.214-3.732.888.936-3.627-.235-.373A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
    </svg>
  );
}

function TShirtSVG({ color }) {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M60 30 L30 60 L55 70 L55 170 L145 170 L145 70 L170 60 L140 30 Q120 50 100 50 Q80 50 60 30Z" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
    </svg>
  );
}
