import { useEffect } from 'react';

const mobileStyles = `
@media (max-width: 768px) {
  .policy-hero { padding: 5rem 1.5rem 2.5rem !important; }
  .policy-hero h1 { font-size: clamp(2.4rem, 11vw, 3.5rem) !important; }
  .policy-content { padding: 2.5rem 1.5rem !important; }
  .policy-section-body { padding-left: 0 !important; }
  .policy-section-heading { gap: 0.8rem !important; flex-wrap: wrap !important; }
  .policy-contact-box { padding: 1.5rem !important; }
}
`;

export default function TermsOfService({ onBack }) {
  useEffect(() => {
    if (!document.getElementById('policy-mobile-css')) {
      const style = document.createElement('style');
      style.id = 'policy-mobile-css';
      style.textContent = mobileStyles;
      document.head.appendChild(style);
    }
  }, []);
  return <PolicyPage title="Terms of Service" onBack={onBack} sections={termsContent} lastUpdated="May 2026" />;
}

function PolicyPage({ title, sections, onBack, lastUpdated }) {
  return (
    <div style={{ background: 'var(--sand)', minHeight: '100vh', color: 'var(--dark)' }}>
      {/* Hero */}
      <div className="policy-hero" style={{
        background: 'var(--sand)', color: 'var(--ink)',
        padding: '6rem 4rem 4rem',
        borderBottom: '1px solid rgba(122,92,63,0.2)',
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'var(--brown)', fontFamily: 'Jost,sans-serif',
            display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem',
            padding: 0,
          }}
        >
          ← Back to Home
        </button>
        <p style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--brown)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ width: 30, height: 1, background: 'var(--brown)', display: 'inline-block' }} />
          LEEZOO — Legal
        </p>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(3rem,7vw,6rem)', letterSpacing: '0.05em', lineHeight: 1, marginBottom: '1rem', color: 'var(--dark)' }}>
          {title}
        </h1>
        <p style={{ fontSize: '0.72rem', letterSpacing: '0.08em', color: 'rgba(26,20,10,0.65)', marginTop: '1rem' }}>
          Last updated: {lastUpdated} &nbsp;·&nbsp; LEEZOO (GST Registered Business, India)
        </p>
      </div>

      {/* Content */}
      <div className="policy-content" style={{ maxWidth: 860, margin: '0 auto', padding: '5rem 4rem' }}>
        {/* Intro */}
        <div style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-light)' }}>
          <p style={{ fontSize: '0.85rem', lineHeight: 2, color: 'rgba(26,20,10,0.8)', letterSpacing: '0.04em' }}>
            Welcome to <strong style={{ color: 'var(--dark)' }}>LEEZOO</strong>, These Terms of Service govern your access to and use of our website, products, and services. By using our website, purchasing products, or interacting with our services, you agree to comply with these terms.
            If you do not agree with these Terms of Service, please discontinue use of the website immediately.
          </p>
        </div>
        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: '3.5rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-light)' }}>
            <div className="policy-section-heading" style={{ display: 'flex', alignItems: 'baseline', gap: '1.2rem', marginBottom: '1.2rem' }}>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1rem', color: 'var(--accent)', letterSpacing: '0.15em', flexShrink: 0 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.6rem', letterSpacing: '0.08em', color: 'var(--dark)' }}>
                {s.heading}
              </h2>
            </div>
            <div className="policy-section-body" style={{ paddingLeft: '2.6rem' }}>
              {s.body.map((para, j) => (
                <p key={j} style={{ fontSize: '0.8rem', lineHeight: 2, color: 'rgba(26,20,10,0.75)', letterSpacing: '0.04em', marginBottom: '1rem' }}>
                  {para}
                </p>
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
              {s.note && s.note.map((noteText, j) => (
                <p key={j} style={{ fontSize: '0.8rem', lineHeight: 2, color: 'rgba(26,20,10,0.75)', letterSpacing: '0.04em', marginTop: '1rem' }}>
                  {noteText}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* Contact */}
        <div className="policy-contact-box" style={{ background: 'rgba(196,153,90,0.06)', border: '1px solid rgba(196,153,90,0.2)', padding: '2.5rem', marginTop: '2rem' }}>
          <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.4rem', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '1rem' }}>CONTACT US</h3>
          <p style={{ fontSize: '0.78rem', lineHeight: 2, color: 'rgba(26,20,10,0.8)', letterSpacing: '0.04em' }}>
            For any questions regarding these terms, reach us at:<br />
            <strong style={{ color: 'var(--dark)' }}>Email:</strong> leezoo.official2026@gmail.com<br />
            <strong style={{ color: 'var(--dark)' }}>WhatsApp:</strong> +91-9984090593 | +91-9169697273 | +91-9653026746| +91-9118604515<br />
            <strong style={{ color: 'var(--dark)' }}>Business Hours:</strong> Monday–Saturday, 10:00 AM – 8:00 PM IST
          </p>
        </div>
      </div>
    </div>
  );
}

const termsContent = [
  {
    heading: 'Eligibility',
    body: [
      'To use this website, you must: ',
    ],
    bullets: [
      'Be at least 18 years old or use the website under parental supervision.',
      'Provide accurate and complete information.',
      'Use the website only for lawful purposes.',
    ],
    note: [
      'LEEZOO reserves the right to suspend or terminate accounts that violate these eligibility requirements.',
    ]
  },
  {
    heading: 'Product Information',
    body: [
      'LEEZOO specializes in custom and premium apparel products including:',
    ],
    bullets: [
      'Oversized T-Shirts',
      'Custom Printed T-Shirts',
      'Puff Print Apparel',
      'Streetwear Collections',
      'Personalized Clothing',
    ],
    note: [
      'We strive to display accurate product colors, descriptions, and pricing. However, slight variations may occur due to photography, screen settings, or manufacturing processes.',
    ]
  },
  {
    heading: 'Pricing and Payments',
    body: [
      'All prices displayed on the website are listed in the applicable currency and may change without prior notice',
      'We accept secure online payments through trusted third-party payment gateways. By placing an order, you authorize LEEZOO to process the payment for the total order amount including shipping and taxes.',
      'LEEZOO is not responsible for payment gateway failures or banking issues.'
    ],
  },
  {
    heading: 'Orders and Acceptance',
    body: [
      'Placing an order does not guarantee acceptance. LEEZOO reserves the right to:',
    ],
    bullets: [
      'Cancel suspicious or fraudulent orders.',
      'Refuse orders due to stock unavailability.',
      'Limit quantities on selected products.',
      'Cancel orders with incorrect pricing or technical issues.',
    ],
    note: [
      'Customers will receive order confirmation once payment is successfully processed.',
    ]
  },
  {
    heading: 'Intellectual Property',
    body: [
      'All content on this website including logos, designs, graphics, product images, videos, and branding belongs to LEEZOO Company.',
      'Unauthorized copying, reproduction, or commercial use of any content without written permission is strictly prohibited.',
    ],
  },
  {
    heading: 'User Conduct',
    body: [
      'By using this website, you agree not to:',
    ],
    bullets: [
      'Upload harmful or malicious content.',
      'Attempt unauthorized access to systems.',
      'Use the website for fraudulent activities.',
      'Copy or misuse LEEZOO branding.',
    ],
    note: [
      'Violation of these terms may result in account suspension or legal action.',
    ]
  },
  {
    heading: 'Limitation of Liability',
    body: [
      'LEEZOO shall not be liable for indirect, incidental, or consequential damages arising from the use of our website, products, or services.',
      'Our maximum liability shall not exceed the total purchase amount paid for the specific order.',
    ],
  },
  {
    heading: 'Modifications to Terms',
    body: [
      'LEEZOO reserves the right to update or modify these Terms of Service at any time without prior notice.',
      'Continued use of the website after updates means you accept the revised terms.',
    ],
  },
  {
    heading: 'Governing Law',
    body: [
      'These Terms of Service are governed by the laws applicable in your jurisdiction.',
      'Any disputes related to the website or purchases shall be resolved through the appropriate courts under applicable law.',
    ],
  },
];