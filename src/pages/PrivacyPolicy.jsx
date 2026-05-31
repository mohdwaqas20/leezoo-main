export default function PrivacyPolicy({ onBack }) {
  return <PolicyPage title="Privacy Policy" onBack={onBack} sections={privacyContent} lastUpdated="May 2026" />;
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

      {/* Content */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '5rem 4rem' }}>
        {/* Intro */}
        <div style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-light)' }}>
          {/* FIXED: Swapped light color value to dark for sharp visibility */}
          <p style={{ fontSize: '0.85rem', lineHeight: 2, color: 'rgba(26,20,10,0.8)', letterSpacing: '0.04em' }}>
            <strong style={{ color: 'var(--dark)' }}>LEEZOO </strong>Company, values your privacy and is committed to protecting your personal information.This Privacy Policy explains how we collect, use, store, and protect your data when you use our website or services.
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
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {s.bullets.map((b, j) => (
                    /* FIXED: Changed list text color to clear dark contrast */
                    <li key={j} style={{ fontSize: '0.78rem', lineHeight: 1.9, color: 'rgba(26,20,10,0.75)', letterSpacing: '0.04em', listStyleType: 'none', display: 'flex', gap: '0.8rem' }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}>◈</span> {b}
                    </li>
                  ))}
                </ul>
              )}

              {/* ADD THIS BLOCK RIGHT HERE 👇 */}
              {s.note && s.note.map((noteText, j) => (
                <p key={j} style={{ fontSize: '0.8rem', lineHeight: 2, color: 'rgba(26,20,10,0.75)', letterSpacing: '0.04em', marginTop: '1rem' }}>
                  {noteText}
                </p>
              ))}

            </div>
          </div>
        ))}

        {/* Contact/Concerns Area */}
        <div style={{ background: 'rgba(196,153,90,0.06)', border: '1px solid rgba(196,153,90,0.2)', padding: '2.5rem', marginTop: '2rem' }}>
          <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.4rem', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '1rem' }}>PRIVACY CONCERNS</h3>
          {/* FIXED: Tuned color to premium dark-mix layout format */}
          <p style={{ fontSize: '0.78rem', lineHeight: 2, color: 'rgba(26,20,10,0.8)', letterSpacing: '0.04em' }}>
            For any privacy-related concerns or data deletion requests:<br />
            <strong style={{ color: 'var(--dark)' }}>Email:</strong> leezoo.official2026@gmail.com<br />
            <strong style={{ color: 'var(--dark)' }}>WhatsApp:</strong> +91-9984090593 | +91-9169697273 | +91-9653026746| +91-9118604515<br />
            We will respond to all data requests within 7 business days.
          </p>
        </div>
      </div>
    </div>
  );
}

const privacyContent = [
  {
    heading: 'Information We Collect',
    body: ['We may collect the following information:'],
    bullets: [
      'Full Name',
      'Email Address',
      'Phone Number',
      'Shipping Address',
      'Billing Details',
      'Payment Information',
      'Order History',
      'Device and Browser Information',
    ],
  },
  {
    heading: 'How We Use Your Information',
    body: ['Your information may be used to:'],
    bullets: [
      'Process and deliver orders',
      'Provide customer support',
      'Improve our website and services',
      'Send order updates and notifications',
      'Share promotional offers and new launches',
      'Prevent fraud and misuse',
    ],
  },
  {
    heading: 'Payment Security',
    body: [
      'All payments are processed through secure third-party payment gateways.',
      'LEEZOO does not store complete debit or credit card details on its servers.',
    ],
  },
  {
    heading: 'Cookies and Tracking',
    body: [
      'Our website may use cookies and analytics tools to improve user experience and understand visitor behavior.',
      'You can disable cookies through your browser settings.',
    ],
  },
  {
    heading: 'Sharing of Information',
    body: [
      'LEEZOO does not sell or rent customer information to third parties.',
      'Information may only be shared with:',
    ],
    bullets: [
      'Shipping partners',
      'Payment providers',
      'Legal authorities if required by law',
    ],
  },
  {
    heading: 'Data Protection',
    body: [
      'We implement security measures to protect your personal information from unauthorized access, misuse, or disclosure.',
      'However, no online system can guarantee complete security.',
    ],
  },
  {
    heading: 'Your Rights',
    body: [
      'Customers may request to:',
    ],
    bullets: [
      'Access personal data',
      'Correct inaccurate information',
      'Delete personal data',
      'Unsubscribe from promotional emails',
    ],
    note: [
      'For assistance, contact our support team.',
    ]
  },
  {
    heading: 'Children\'s Privacy',
    body: [
      'Our services are not directed at children under the age of 13. We do not knowingly collect personal data from minors. If you believe a minor has provided us with personal information, please contact us immediately for deletion.',
    ],
  },
];