import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function WishlistPage({ onBack }) {
  const { items, removeFromWishlist } = useWishlist();
  const { addItem, openDrawer } = useCart();
  const { displayName } = useAuth();
  const [addedIds, setAddedIds] = useState([]);

  const handleAddToCart = (product) => {
    // Add with default size M; in a full app you'd prompt size
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: 'M',
      image: product.image_url,
      productId: product.product_id,
    });
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 1800);
    openDrawer();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--sand)', paddingBottom: '6rem' }}>
      {/* Header */}
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '2rem 2rem 2rem',
        borderBottom: '1px solid var(--border-light)',
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', color: 'var(--dark)', cursor: 'pointer',
            fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            opacity: 0.45, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem',
            padding: 0, transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.45)}
        >
          ← Back
        </button>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.5rem,6vw,4rem)', letterSpacing: '0.06em' }}>
            Wishlist
          </h1>
          {items.length > 0 && (
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', opacity: 0.4, textTransform: 'uppercase' }}>
              {items.length} item{items.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        {displayName && (
          <p style={{ fontSize: '0.62rem', letterSpacing: '0.15em', opacity: 0.7, textTransform: 'uppercase', marginTop: '0.2rem' }}>
            {displayName}'s saved items
          </p>
        )}
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 2rem 0' }}>
        {items.length === 0 ? (
          <EmptyState onBack={onBack} />
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}>
            {items.map((product) => (
              <WishlistCard
                key={product.id}
                product={product}
                onRemove={() => removeFromWishlist(product.id)}
                onAddToCart={() => handleAddToCart(product)}
                added={addedIds.includes(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WishlistCard({ product, onRemove, onAddToCart, added }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', position: 'relative', transition: 'border-color 0.2s' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Remove button */}
      <button
        onClick={onRemove}
        title="Remove from wishlist"
        style={{
          position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 2,
          background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%', width: 30, height: 30,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#ef4444',
          fontSize: '0.65rem', transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.2)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.5)')}
      >
        ✕
      </button>

      {/* Image */}
      <div style={{ height: 260, background: '#111', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {product.image_url ? (
          <img
            src={product.image_url} alt={product.name}
            style={{
              width: '100%', height: '100%', objectFit: 'contain', padding: '1rem',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />
        ) : (
          <span style={{ opacity: 0.55, fontSize: '3rem' }}>👕</span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '1rem 1.2rem 1.4rem', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.1rem', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
          {product.name}
        </div>
        <div style={{ fontSize: '0.62rem', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '1rem' }}>
          AED {product.price} {product.color && `· ${product.color}`}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={onAddToCart}
            style={{
              flex: 1, padding: '0.7rem',
              background: added ? 'var(--accent)' : 'var(--white)',
              color: 'var(--ink)', border: 'none', cursor: 'pointer',
              fontFamily: 'Jost,sans-serif', fontSize: '0.58rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { if (!added) e.currentTarget.style.background = 'var(--accent)'; }}
            onMouseLeave={(e) => { if (!added) e.currentTarget.style.background = 'var(--white)'; }}
          >
            {added ? '✓ Added' : 'Add to Bag'}
          </button>
          <button
            onClick={onRemove}
            style={{
              padding: '0.7rem 0.9rem',
              background: 'transparent', border: '1px solid var(--border-light)',
              color: 'var(--dark)', cursor: 'pointer',
              fontSize: '0.85rem', transition: 'border-color 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            title="Remove from wishlist"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#ef4444')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <HeartFilledIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function HeartFilledIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function EmptyState({ onBack }) {
  return (
    <div style={{ textAlign: 'center', paddingTop: '5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </div>
      <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', letterSpacing: '0.08em', marginBottom: '0.5rem', opacity: 0.4 }}>
        Your Wishlist is Empty
      </h2>
      <p style={{ fontSize: '0.62rem', letterSpacing: '0.15em', opacity: 0.65, marginBottom: '2rem' }}>
        Save items you love by tapping the heart icon on any product.
      </p>
      <button
        onClick={onBack}
        style={{
          background: 'var(--accent)', color: 'var(--ink)', border: 'none', cursor: 'pointer',
          fontFamily: 'Jost,sans-serif', fontSize: '0.62rem', letterSpacing: '0.22em',
          textTransform: 'uppercase', padding: '0.85rem 2.5rem',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.85)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
      >
        Explore Products
      </button>
    </div>
  );
}