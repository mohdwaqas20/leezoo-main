import { useOrders } from '../context/OrdersContext';
import { useAuth } from '../context/AuthContext';

const STATUS_COLORS = {
  pending:   { bg: 'rgba(234,179,8,0.15)',   text: '#f59e0b', border: 'rgba(234,179,8,0.3)' },
  confirmed: { bg: 'rgba(59,130,246,0.15)',  text: '#60a5fa', border: 'rgba(59,130,246,0.3)' },
  shipped:   { bg: 'rgba(139,92,246,0.15)',  text: '#a78bfa', border: 'rgba(139,92,246,0.3)' },
  delivered: { bg: 'rgba(34,197,94,0.15)',   text: '#4ade80', border: 'rgba(34,197,94,0.3)' },
  cancelled: { bg: 'rgba(239,68,68,0.12)',   text: '#f87171', border: 'rgba(239,68,68,0.3)' },
};

export default function OrdersPage({ onBack }) {
  const { orders, loading } = useOrders();
  const { displayName } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--sand)', paddingTop: '2rem', paddingBottom: '6rem' }}>
      {/* Header */}
      <div style={{
        maxWidth: 860, margin: '0 auto', padding: '0 2rem 2rem',
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
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.5rem,6vw,4rem)', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>
          My Orders
        </h1>
        <p style={{ fontSize: '0.62rem', letterSpacing: '0.15em', opacity: 0.4, textTransform: 'uppercase' }}>
          {displayName ? `${displayName}'s order history` : 'Your order history'}
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '2.5rem 2rem 0' }}>
        {loading ? (
          <div style={{ textAlign: 'center', paddingTop: '5rem', opacity: 0.35, fontSize: '0.7rem', letterSpacing: '0.2em' }}>
            Loading orders…
          </div>
        ) : orders.length === 0 ? (
          <EmptyState onBack={onBack} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderCard({ order }) {
  const statusStyle = STATUS_COLORS[order.status] || STATUS_COLORS.pending;

  const date = new Date(order.created_at).toLocaleDateString('en-AE', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  const displayId = order.display_id || order.id.slice(0, 8).toUpperCase();

  return (
    <div style={{
      border: '1px solid var(--border-light)',
      background: 'var(--surface)',
      overflow: 'hidden',
    }}>
      {/* Order header */}
      <div style={{
        padding: '1.2rem 1.6rem',
        borderBottom: '1px solid var(--border-light)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '0.75rem',
      }}>
        <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '0.52rem', letterSpacing: '0.18em', opacity: 0.4, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Order ID</p>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.08em', fontFamily: 'Jost,sans-serif', color: 'var(--accent)' }}>{displayId}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.52rem', letterSpacing: '0.18em', opacity: 0.4, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Date</p>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.06em', fontFamily: 'Jost,sans-serif' }}>{date}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.52rem', letterSpacing: '0.18em', opacity: 0.4, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Total</p>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.06em', fontFamily: 'Jost,sans-serif', color: 'var(--dark)' }}>AED {Number(order.total_amount).toFixed(0)}</p>
          </div>
        </div>

        <span style={{
          fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          padding: '0.4rem 1rem',
          background: statusStyle.bg,
          color: statusStyle.text,
          border: `1px solid ${statusStyle.border}`,
        }}>
          {order.status}
        </span>
      </div>

      {/* Order items */}
      <div style={{ padding: '1rem 1.6rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {(order.order_items || []).map((item, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
            {/* Image */}
            <div style={{
              width: 64, height: 64, flexShrink: 0,
              background: '#111', border: '1px solid var(--border-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              {item.products?.image_url ? (
                <img
                  src={item.products.image_url}
                  alt={item.products.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
                />
              ) : (
                <span style={{ opacity: 0.6, fontSize: '1.2rem' }}>👕</span>
              )}
            </div>

            {/* Details */}
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1rem', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>
                {item.products?.name || 'Product'}
              </p>
              <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                <span style={metaStyle}>Size: <span style={{ color: 'var(--dark)', opacity: 0.8 }}>{item.size}</span></span>
                <span style={metaStyle}>Qty: <span style={{ color: 'var(--dark)', opacity: 0.8 }}>{item.qty}</span></span>
                <span style={metaStyle}>AED <span style={{ color: 'var(--accent)' }}>{(item.unit_price * item.qty).toFixed(0)}</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ onBack }) {
  return (
    <div style={{ textAlign: 'center', paddingTop: '5rem' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.3 }}>📦</div>
      <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', letterSpacing: '0.08em', marginBottom: '0.5rem', opacity: 0.5 }}>
        No Orders Yet
      </h2>
      <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', opacity: 0.65, marginBottom: '2rem' }}>
        Your orders will appear here once you place them.
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
        Start Shopping
      </button>
    </div>
  );
}

const metaStyle = {
  fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase',
  color: 'var(--dark)', opacity: 0.4, fontFamily: 'Jost,sans-serif',
};