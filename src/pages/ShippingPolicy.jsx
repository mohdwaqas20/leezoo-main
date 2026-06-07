import { useEffect } from 'react';

const mobileStyles = `
@media (max-width: 768px) {
  .policy-hero { padding: 5rem 1.5rem 2.5rem !important; }
  .policy-hero h1 { font-size: clamp(2.4rem, 11vw, 3.5rem) !important; }
  .policy-content { padding: 2.5rem 1.5rem !important; }
  .policy-section-body { padding-left: 0 !important; }
  .policy-section-heading { gap: 0.8rem !important; flex-wrap: wrap !important; }
  .policy-contact-box { padding: 1.5rem !important; }
  .shipping-cards { grid-template-columns: 1fr !important; }
  .shipping-card { border-right: none !important; border-bottom: 1px solid var(--border) !important; padding: 1.5rem !important; }
}
`;

export default function ShippingPolicy({ onBack }) {
  useEffect(() => {
    if (!document.getElementById('policy-mobile-css')) {
      const style = document.createElement('style');
      style.id = 'policy-mobile-css';
      style.textContent = mobileStyles;
      document.head.appendChild(style);
    }
  }, []);
  return <PolicyPage title="Shipping Policy" onBack={onBack} sections={shippingContent} lastUpdated="May 2026" />;
}

function PolicyPage({ title, sections, onBack, lastUpdated }) {
  return (
    <div style={{ background: 'var(--sand)', minHeight: '100vh', color: 'var(--dark)' }}>
      {/* Hero */}
      <div className="policy-hero" style={{ background: 'var(--sand)', color: 'var(--ink)', padding: '6rem 4rem 4rem', borderBottom: '1px solid rgba(122,92,63,0.2)' }}>
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

      {/* Highlight cards */}
      <div className="shipping-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid var(--border-light)' }}>
        {[
          { label: 'Standard Delivery', value: '3–7 Business Days', sub: 'Pan India' },
          { label: 'Express Delivery', value: '1–3 Business Days', sub: 'Select Pincodes' },
          { label: 'Free Shipping', value: 'Orders Above ₹499', sub: 'Within India' },
        ].map(card => (
          <div className="shipping-card" key={card.label} style={{ padding: '3rem 4rem', borderRight: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.55rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.8rem' }}>{card.label}</p>
            <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', letterSpacing: '0.05em', color: 'var(--dark)', marginBottom: '0.3rem' }}>{card.value}</p>
            <p style={{ fontSize: '0.65rem', color: 'rgba(26,20,10,0.5)', letterSpacing: '0.08em' }}>{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="policy-content" style={{ maxWidth: 860, margin: '0 auto', padding: '5rem 4rem' }}>
        {/* Intro */}
        <div style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-light)' }}>
          <p style={{ fontSize: '0.85rem', lineHeight: 2, color: 'rgba(26,20,10,0.8)', letterSpacing: '0.04em' }}>
            <strong style={{ color: 'var(--dark)' }}>LEEZOO </strong>Company, delivers products across India and selected international regions.
            Shipping charges and delivery timelines are displayed during checkout.
          </p>
        </div>

        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: '3.5rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-light)' }}>
            <div className="policy-section-heading" style={{ display: 'flex', alignItems: 'baseline', gap: '1.2rem', marginBottom: '1.2rem' }}>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1rem', color: 'var(--accent)', letterSpacing: '0.15em', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.6rem', letterSpacing: '0.08em', color: 'var(--dark)' }}>{s.heading}</h2>
            </div>
            <div className="policy-section-body" style={{ paddingLeft: '2.6rem' }}>
              {s.body.map((para, j) => (
                <p key={j} style={{ fontSize: '0.8rem', lineHeight: 2, color: 'rgba(26,20,10,0.75)', letterSpacing: '0.04em', marginBottom: '1rem' }}>{para}</p>
              ))}
              {s.bullets && (
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {s.bullets.map((b, j) => (
                    <li key={j} style={{ fontSize: '0.78rem', lineHeight: 1.9, color: 'rgba(26,20,10,0.75)', letterSpacing: '0.04em', listStyleType: 'none', display: 'flex', gap: '0.8rem' }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}>◈</span> {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}

        {/* Support Block */}
        <div className="policy-contact-box" style={{ background: 'rgba(196,153,90,0.06)', border: '1px solid rgba(196,153,90,0.2)', padding: '2.5rem', marginTop: '2rem' }}>
          <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.4rem', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '1rem' }}>SHIPPING SUPPORT</h3>
          <p style={{ fontSize: '0.78rem', lineHeight: 2, color: 'rgba(26,20,10,0.8)', letterSpacing: '0.04em' }}>
            For shipping queries, tracking issues, or delivery concerns:<br />
            <strong style={{ color: 'var(--dark)' }}>Email:</strong> leezoo.official2026@gmail.com<br />
            <strong style={{ color: 'var(--dark)' }}>WhatsApp:</strong> +91-9984090593 | +91-9169697273 | +91-9653026746| +91-9118604515<br />
            <strong style={{ color: 'var(--dark)' }}>Hours:</strong> Mon–Sat, 10:00 AM – 8:00 PM IST
          </p>
        </div>
      </div>
    </div>
  );
}

const shippingContent = [
  {
    heading: 'Processing Time',
    body: [
      'All standard orders are processed within 1–2 business days (Monday–Saturday, excluding public holidays) after payment confirmation. Custom printing orders require 5–10 additional business days for production before dispatch.',
      'Orders placed after 6:00 PM IST or on Sundays will be processed the next business day.',
    ],
  },
  {
    heading: 'Delivery Timelines',
    body: ['Estimated delivery times after dispatch:'],
    bullets: [
      'Metro cities (Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata): 2–4 business days.',
      'Tier 2 & Tier 3 cities: 4–6 business days.',
      'Remote or hilly areas: 6–10 business days.',
      'Express shipping (where available): 1–3 business days at an additional charge.',
    ],
  },
  {
    heading: 'Shipping Charges',
    body: ['Our shipping charges are as follows:'],
    bullets: [
      'Free shipping on all orders above ₹499.',
      'Orders below ₹499: flat ₹49 shipping charge.',
      'Express delivery: additional ₹99–₹149 depending on location.',
      'Bulk orders (10+ units): shipping cost calculated separately — contact us on WhatsApp.',
    ],
  },
  {
    heading: 'Tracking Your Order',
    body: [
      "Once your order is dispatched, you will receive a tracking number via email and/or WhatsApp. You can use this number on our logistics partner's website to monitor your shipment in real time.",
      'Tracking may take 24 hours to activate after dispatch.',
    ],
  },
  {
    heading: 'Incorrect Address & Failed Delivery',
    body: [
      'LEEZOO is not responsible for delivery failures arising from incorrect or incomplete address information provided by the customer. Please double-check your delivery address before confirming your order.',
    ],
    bullets: [
      'If a delivery attempt fails, the courier will retry up to 3 times.',
      'If still undelivered, the package will be returned to LEEZOO.',
      'Re-shipping charges will apply for returned orders due to incorrect address or customer unavailability.',
    ],
  },
  {
    heading: 'Damaged or Lost Shipments',
    body: [
      'If your package arrives damaged, please photograph the packaging and product immediately upon receipt and contact us within 48 hours. We will raise a claim with the logistics provider and arrange a replacement or refund after review.',
      'For lost shipments, please raise a complaint within 10 days of the expected delivery date. We will investigate and resolve the matter within 5–7 business days.',
    ],
  },
  {
    heading: 'International Shipping',
    body: [
      'Currently, LEEZOO ships within India only. We do not offer international shipping at this time. International orders may be arranged on a special basis for bulk or wholesale inquiries — please contact us via WhatsApp for details.',
    ],
  },
  {
    heading: 'Public Holidays & Force Majeure',
    body: [
      'Deliveries will not be made on national or state public holidays. In case of natural disasters, strikes, pandemics, or other force majeure events, delivery timelines may be extended. LEEZOO will notify affected customers proactively.',
    ],
  },
];