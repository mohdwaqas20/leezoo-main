import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { useAuth } from '../context/AuthContext';

export default function CartDrawer() {
  const { items, total, count, drawerOpen, closeDrawer, removeItem, updateQty, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();
  const [placing, setPlacing] = useState(false);

  const handleWhatsApp = () => {
    const lines = items.map(i => `• ${i.name} (${i.size}) x${i.qty} — AED ${i.price * i.qty}`).join('%0A');
    const msg = `Hi LEEZOO! I'd like to order:%0A${lines}%0A%0ATotal: AED ${total}`;
    window.open(`https://wa.me/971504746525?text=${msg}`, '_blank');
  };

  const handlePlaceOrder = async () => {
    if (!user || placing) return;
    setPlacing(true);
    try {
      await placeOrder(items, total);
      await clearCart();
      closeDrawer();
      alert('Order placed! We will contact you to confirm.');
    } catch (e) {
      alert('Error placing order: ' + e.message);
    } finally {
      setPlacing(false);
    }
  };

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
        width: 420, maxWidth: '95vw',
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
                  <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: 'var(--accent)' }}>AED {item.price * item.qty}</span>
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
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.4rem', letterSpacing: '0.06em', color: 'var(--accent)' }}>AED {total}</span>
            </div>

            {/* Place Order — only for logged-in users, saves to DB */}
            {user && (
              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                style={{
                  width: '100%', background: 'var(--dark)', color: '#F5EDE0',
                  border: 'none', cursor: placing ? 'wait' : 'pointer',
                  padding: '1.1rem', marginBottom: '0.6rem',
                  fontFamily: 'Jost,sans-serif', fontSize: '0.65rem',
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  opacity: placing ? 0.6 : 1, transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => { if (!placing) e.currentTarget.style.background = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--dark)'; }}
              >
                {placing ? 'Placing Order…' : 'Place Order'}
              </button>
            )}

            {/* WhatsApp — always visible */}
            <button onClick={handleWhatsApp} style={{
              width: '100%', background: '#25D366', color: '#fff', border: 'none', cursor: 'pointer',
              padding: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.7rem',
              fontFamily: 'Jost,sans-serif', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.856L0 24l6.335-1.508A11.956 11.956 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.371l-.36-.214-3.732.888.936-3.627-.235-.373A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
              {user ? 'Order via WhatsApp Instead' : 'Order via WhatsApp'}
            </button>

            <p style={{ fontSize: '0.55rem', letterSpacing: '0.12em', opacity: 0.3, textAlign: 'center', marginTop: '0.8rem' }}>
              {user ? 'Order saved to your account · Free shipping above AED 299' : 'Sign in to save your order history'}
            </p>
          </div>
        )}
      </div>
    </>
  );
}