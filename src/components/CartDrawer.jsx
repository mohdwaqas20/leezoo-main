import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartDrawer({ onCheckout }) {
  const { items, total, count, drawerOpen, closeDrawer, removeItem, updateQty } = useCart();
  const { user } = useAuth();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        style={{
          position: 'fixed', inset: 0, zIndex: 800,
          background: 'rgba(0,0,0,0.6)',
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? 'all' : 'none',
          transition: 'opacity 0.3s',
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 900,
        width: 'min(420px, 100vw)', maxWidth: '95vw',
        background: 'var(--mid)',
        borderLeft: '1px solid var(--border)',
        transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Header */}
        <div style={{
          padding: '1.8rem 2rem', borderBottom: '1px solid var(--border-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.8rem', letterSpacing: '0.08em' }}>Your Bag</h2>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', opacity: 0.4 }}>{count} ITEM{count !== 1 ? 'S' : ''}</span>
          </div>
          <button onClick={closeDrawer} style={{
            background: 'none', border: 'none', color: 'var(--dark)', cursor: 'pointer',
            fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5,
          }}>Close ✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.35 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', letterSpacing: '0.1em' }}>YOUR BAG IS EMPTY</div>
              <p style={{ fontSize: '0.7rem', marginTop: '0.5rem', letterSpacing: '0.1em' }}>Add some pieces to get started</p>
            </div>
          ) : items.map((item) => (
            <div key={`${item.id}-${item.size}`} style={{
              display: 'flex', gap: '1.2rem', paddingBottom: '1.5rem',
              marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)',
            }}>
              {/* Image */}
              <div style={{
                width: 80, height: 80, background: 'var(--surface)', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                {item.image ? (
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
                ) : (
                  <span style={{ fontSize: '0.5rem', letterSpacing: '0.1em', opacity: 0.4 }}>IMG</span>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.06em', fontSize: '1.1rem' }}>{item.name}</div>
                <div style={{ fontSize: '0.6rem', opacity: 0.4, letterSpacing: '0.12em', marginTop: 2 }}>SIZE: {item.size}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.8rem' }}>
                  {/* Qty control */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', border: '1px solid var(--border-light)', padding: '0.3rem 0.8rem' }}>
                    <button
                      onClick={() => item.qty > 1 ? updateQty(item.id, item.size, item.qty - 1) : removeItem(item.id, item.size)}
                      style={{ background: 'none', border: 'none', color: 'var(--dark)', cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}
                    >−</button>
                    <span style={{ fontSize: '0.75rem', minWidth: 16, textAlign: 'center' }}>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                      style={{ background: 'none', border: 'none', color: 'var(--dark)', cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}
                    >+</button>
                  </div>
                  <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: 'var(--accent)' }}>₹{item.price * item.qty}</span>
                </div>
              </div>

              <button onClick={() => removeItem(item.id, item.size)} style={{
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dark)',
                opacity: 0.3, alignSelf: 'flex-start', fontSize: '1rem',
              }}>✕</button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5 }}>Subtotal</span>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.4rem', letterSpacing: '0.06em', color: 'var(--accent)' }}>₹{total}</span>
            </div>

            {/* Checkout button — goes to checkout page */}
            <button
              onClick={() => { closeDrawer(); onCheckout && onCheckout(); }}
              style={{
                width: '100%', background: 'var(--dark)', color: '#F5EDE0',
                border: 'none', cursor: 'pointer',
                padding: '1.1rem', marginBottom: '0.6rem',
                fontFamily: 'Jost,sans-serif', fontSize: '0.65rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--dark)'; }}
            >
              Proceed to Checkout →
            </button>

            <p style={{ fontSize: '0.55rem', letterSpacing: '0.12em', opacity: 0.3, textAlign: 'center', marginTop: '0.8rem' }}>
              Free shipping above ₹499
            </p>
          </div>
        )}
      </div>
    </>
  );
}