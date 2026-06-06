export default function RefundExchange({ onBack }) {
  return <PolicyPage title="Refund & Exchange" onBack={onBack} sections={refundContent} lastUpdated="May 2026" />;
}

function PolicyPage({ title, sections, onBack, lastUpdated }) {
  return (
    <div style={{ background: 'var(--sand)', minHeight: '100vh', color: 'var(--dark)' }}>
      {/* Hero */}
      <div style={{ background: 'var(--sand)', color: 'var(--ink)', padding: '6rem 4rem 4rem', borderBottom: '1px solid rgba(122,92,63,0.2)' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--brown)', fontFamily: 'Jost,sans-serif', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', padding: 0 }}>
          ← Back to Home
        </button>
        <p style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--brown)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ width: 30, height: 1, background: 'var(--brown)', display: 'inline-block' }} />
          LEEZOO — Legal
        </p>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(3rem,7vw,6rem)', letterSpacing: '0.05em', lineHeight: 1, marginBottom: '1rem', color: 'var(--dark)' }}>{title}</h1>
        <p style={{ fontSize: '0.72rem', letterSpacing: '0.08em', color: 'rgba(26,20,10,0.65)', marginTop: '1rem' }}>
          Last updated: {lastUpdated} &nbsp;·&nbsp; LEEZOO (GST Registered Business, India)
        </p>
      </div>

      {/* Quick Reference Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid var(--border-light)' }}>
        {[
          { label: 'Return Window', value: '7 Days', sub: 'From delivery date' },
          { label: 'Exchange Window', value: '10 Days', sub: 'Size or colour swap' },
          { label: 'Refund Timeline', value: '5–7 Days', sub: 'After approval' },
          { label: 'Custom Orders', value: 'Non-Refundable', sub: 'Defects excepted' },
        ].map(card => (
          <div key={card.label} style={{ padding: '2.5rem 3rem', borderRight: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.8rem' }}>{card.label}</p>
            <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.6rem', letterSpacing: '0.05em', color: 'var(--dark)', marginBottom: '0.3rem', lineHeight: 1.1 }}>{card.value}</p>
            {/* FIXED: Swapped card subtext color from white-mix to crisp dark-mix */}
            <p style={{ fontSize: '0.62rem', color: 'rgba(26,20,10,0.5)', letterSpacing: '0.08em' }}>{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '5rem 4rem' }}>
        {/* Intro */}
        <div style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-light)' }}>
          {/* FIXED: Changed text color to clear dark contrast */}
          <p style={{ fontSize: '0.85rem', lineHeight: 2, color: 'rgba(26,20,10,0.8)', letterSpacing: '0.04em' }}>
            At <strong style={{ color: 'var(--dark)' }}>LEEZOO </strong>, we stand behind the quality of everything we make. If something isn't right, we want to fix it. Please review this policy carefully to understand your options in case of returns, exchanges, or refund requests.
          </p>
        </div>

        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: '3.5rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.2rem', marginBottom: '1.2rem' }}>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1rem', color: 'var(--accent)', letterSpacing: '0.15em', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.6rem', letterSpacing: '0.08em', color: 'var(--dark)' }}>{s.heading}</h2>
            </div>
            <div style={{ paddingLeft: '2.6rem' }}>
              {s.body.map((para, j) => (
                /* FIXED: Changed text color to clear dark contrast */
                <p key={j} style={{ fontSize: '0.8rem', lineHeight: 2, color: 'rgba(26,20,10,0.75)', letterSpacing: '0.04em', marginBottom: '1rem' }}>{para}</p>
              ))}
              {s.bullets && (
                <ul style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.2rem' }}>
                  {s.bullets.map((b, j) => (
                    /* FIXED: Changed list text color to clear dark contrast */
                    <li key={j} style={{ fontSize: '0.78rem', lineHeight: 1.9, color: 'rgba(26,20,10,0.75)', letterSpacing: '0.04em', listStyleType: 'none', display: 'flex', gap: '0.8rem' }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}>◈</span> {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}

        {/* WhatsApp CTA */}
        <div style={{ background: 'rgba(191,160,106,0.08)', border: '1px solid rgba(191,160,106,0.25)', padding: '2.5rem', marginTop: '2rem' }}>
          <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.4rem', letterSpacing: '0.1em', color: 'var(--dark)', marginBottom: '1rem' }}>RAISE A RETURN REQUEST</h3>
          {/* FIXED: Changed description text color to clear dark contrast */}
          <p style={{ fontSize: '0.78rem', lineHeight: 2, color: 'rgba(26,20,10,0.8)', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>
            To initiate a return or exchange, reach us within your eligible window:<br />
            <strong style={{ color: 'var(--dark)' }}>WhatsApp:</strong> +91-9984090593 | +91-9169697273 | +91-9653026746| +91-9118604515<br />
            <strong style={{ color: 'var(--dark)' }}>Email:</strong> leezoo.official2026@gmail.com<br />
            Please include your order number, issue description, and photos of the product.
          </p>
          <a
            href="https://wa.me/919984090593"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-block', background: 'var(--dark)', color: '#F5EDE0', textDecoration: 'none', padding: '0.85rem 2rem', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'Jost,sans-serif', fontWeight: 400 }}
          >
            WhatsApp Us Now →
          </a>
        </div>
      </div>
    </div>
  );
}

const refundContent = [
  {
    heading: 'Return Eligibility',
    body: ['We accept returns within 7 days of delivery. To be eligible for a return, the following conditions must be met:'],
    bullets: [
      'The item must be unused, unwashed, and in its original packaging with tags intact.',
      'The return request must be initiated within 7 calendar days of the delivery date.',
      'The product must not be a custom-printed or personalised item (unless defective).',
      'Proof of purchase (order ID) and photos of the issue must be provided.',
    ],
  },
  {
    heading: 'Non-Returnable Items',
    body: ['The following items are not eligible for return or exchange:'],
    bullets: [
      'Custom-printed or personalised T-shirts (name, logo, design) — unless the defect is ours.',
      'Items that have been washed, worn, or altered.',
      'Items purchased during clearance or final-sale events.',
      'Items without original packaging or tags.',
      'Items reported after 7 days of delivery.',
    ],
  },
  {
    heading: 'Exchange Policy',
    body: [
      'We offer size or colour exchanges within 10 days of delivery, subject to availability. If your desired size or colour is out of stock, we will offer a refund or store credit.',
    ],
    bullets: [
      'One exchange per order is permitted.',
      'The customer bears return shipping costs for size-related exchanges unless the wrong size was dispatched by us.',
      'LEEZOO covers return shipping if we made an error (wrong item, wrong size dispatched).',
    ],
  },
  {
    heading: 'Defective or Damaged Products',
    body: [
      'If you receive a defective, damaged, or incorrect item, we will offer a full replacement or refund with no return shipping cost. Please report the issue within 48 hours of delivery with clear photographs.',
    ],
  },
  {
    heading: 'Refund Process',
    body: [
      'Once your return is received and inspected, we will notify you of the approval or rejection. Approved refunds are processed within 5–7 business days to your original payment method.',
    ],
    bullets: [
      'UPI / Bank Transfer: 2–5 business days.',
      'Credit/Debit Card: 5–7 business days (subject to your bank\'s processing time).',
      'Wallet / Net Banking: 3–5 business days.',
      'Cash on Delivery orders: refund issued via bank transfer after verification.',
    ],
  },
  {
    heading: 'Order Cancellation',
    body: [
      'You may cancel a standard order within 12 hours of placement for a full refund. Custom-printed orders cannot be cancelled once production has begun. To cancel, contact us immediately via WhatsApp or email with your order number.',
    ],
  },
  {
    heading: 'Bulk Order Returns',
    body: [
      'Bulk or wholesale orders (10+ units) follow a separate returns process. Issues must be reported within 5 days of delivery. Replacement or credit will be offered at LEEZOO\'s discretion after product inspection. Contact us directly for bulk return arrangements.',
    ],
  },
];