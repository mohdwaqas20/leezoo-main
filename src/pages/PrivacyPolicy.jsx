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
          LEEZOO Pvt. Ltd. — Legal
        </p>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(3rem,7vw,6rem)', letterSpacing: '0.05em', lineHeight: 1, marginBottom: '1rem', color: 'var(--dark)' }}>{title}</h1>
        <p style={{ fontSize: '0.72rem', letterSpacing: '0.08em', color: 'rgba(26,20,10,0.65)', marginTop: '1rem' }}>
          Last updated: {lastUpdated} &nbsp;·&nbsp; LEEZOO Pvt. Ltd. (GST Registered Business, India)
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '5rem 4rem' }}>
        {/* Intro */}
        <div style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-light)' }}>
          {/* FIXED: Swapped light color value to dark for sharp visibility */}
          <p style={{ fontSize: '0.85rem', lineHeight: 2, color: 'rgba(26,20,10,0.8)', letterSpacing: '0.04em' }}>
            At <strong style={{ color: 'var(--dark)' }}>LEEZOO Pvt. Ltd.</strong>, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect the information you share with us when using our website or services.
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
            <strong style={{ color: 'var(--dark)' }}>WhatsApp:</strong> +91-9984090593<br />
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
    body: ['When you interact with LEEZOO, we may collect the following categories of personal information:'],
    bullets: [
      'Name, email address, and phone number — provided during account creation or checkout.',
      'Delivery address and billing information for processing orders.',
      'Payment transaction data (processed securely via third-party gateways; LEEZOO does not store card details).',
      'Custom printing files or designs you upload for print orders.',
      'Website interaction data, including browsing history on our platform, device type, and IP address.',
      'Feedback and review content submitted voluntarily.',
    ],
  },
  {
    heading: 'How We Use Your Information',
    body: ['Your data is used solely to provide and improve our services. Specifically:'],
    bullets: [
      'To process and fulfil orders, including tracking and delivery.',
      'To send order confirmations, updates, and customer service communications.',
      'To personalise your shopping experience and recommend products.',
      'To respond to queries, complaints, and custom printing requests.',
      'To comply with legal obligations including GST records and tax filings.',
      'To send promotional messages — only with your consent, and you may opt out at any time.',
    ],
  },
  {
    heading: 'Data Sharing & Third Parties',
    body: [
      'LEEZOO does not sell or rent your personal data to third parties. We only share information with trusted partners required to deliver our services:',
    ],
    bullets: [
      'Logistics and delivery partners — for order fulfillment.',
      'Payment gateway providers — for secure payment processing.',
      'Cloud service and hosting providers — for data storage and website operation.',
      'Legal authorities — if required by law, court order, or government regulation.',
    ],
  },
  {
    heading: 'Data Security',
    body: [
      'We implement industry-standard security measures to protect your data from unauthorised access, disclosure, or destruction. However, no method of internet transmission is 100% secure, and LEEZOO cannot guarantee absolute security.',
      'All sensitive transactions are encrypted. We use secure authentication systems and routinely review our data protection practices.',
    ],
  },
  {
    heading: 'Cookies & Tracking',
    body: [
      'Our website may use cookies and similar tracking technologies to enhance your experience, understand user behaviour, and improve our platform. You may disable cookies via your browser settings; however, this may affect certain website functionality.',
    ],
    bullets: [
      'Session cookies — to maintain your cart and login state.',
      'Analytics cookies — to understand how visitors use our site.',
      'Preference cookies — to remember your settings and preferences.',
    ],
  },
  {
    heading: 'Your Rights',
    body: [
      'As a user, you have the right to access, correct, or request deletion of your personal data. You may also withdraw consent for marketing communications at any time. To exercise any of these rights, contact us at leezoo.official2026@gmail.com.',
    ],
  },
  {
    heading: 'Data Retention',
    body: [
      'We retain your personal data for as long as your account is active or as required to fulfil orders and comply with legal obligations (including GST records, which may require retention for up to 7 years under Indian tax law). After this period, data is securely deleted.',
    ],
  },
  {
    heading: 'Children\'s Privacy',
    body: [
      'Our services are not directed at children under the age of 13. We do not knowingly collect personal data from minors. If you believe a minor has provided us with personal information, please contact us immediately for deletion.',
    ],
  },
];