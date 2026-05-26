export default function TermsOfService({ onBack }) {
  return <PolicyPage title="Terms of Service" onBack={onBack} sections={termsContent} lastUpdated="May 2026" />;
}

function PolicyPage({ title, sections, onBack, lastUpdated }) {
  return (
    <div style={{ background: 'var(--sand)', minHeight: '100vh', color: 'var(--dark)' }}>
      {/* Hero */}
      <div style={{
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
          LEEZOO Pvt. Ltd. — Legal
        </p>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(3rem,7vw,6rem)', letterSpacing: '0.05em', lineHeight: 1, marginBottom: '1rem', color: 'var(--dark)' }}>
          {title}
        </h1>
        <p style={{ fontSize: '0.72rem', letterSpacing: '0.08em', color: 'rgba(26,20,10,0.65)', marginTop: '1rem' }}>
          Last updated: {lastUpdated} &nbsp;·&nbsp; LEEZOO Pvt. Ltd. (GST Registered Business, India)
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '5rem 4rem' }}>
        {/* Intro */}
        <div style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-light)' }}>
          {/* FIXED: Changed from light rgba to a solid dark-mix for high readability */}
          <p style={{ fontSize: '0.85rem', lineHeight: 2, color: 'rgba(26,20,10,0.8)', letterSpacing: '0.04em' }}>
            Welcome to <strong style={{ color: 'var(--dark)' }}>LEEZOO Pvt. Ltd.</strong>, a GST-registered clothing brand headquartered in India. By accessing our website, placing an order, or engaging with our services — including custom printing — you agree to be bound by the following Terms of Service. Please read them carefully.
          </p>
        </div>

        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: '3.5rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.2rem', marginBottom: '1.2rem' }}>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1rem', color: 'var(--accent)', letterSpacing: '0.15em', flexShrink: 0 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.6rem', letterSpacing: '0.08em', color: 'var(--dark)' }}>
                {s.heading}
              </h2>
            </div>
            <div style={{ paddingLeft: '2.6rem' }}>
              {s.body.map((para, j) => (
                /* FIXED: Changed text color to clear dark contrast */
                <p key={j} style={{ fontSize: '0.8rem', lineHeight: 2, color: 'rgba(26,20,10,0.75)', letterSpacing: '0.04em', marginBottom: '1rem' }}>
                  {para}
                </p>
              ))}
              {s.bullets && (
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {s.bullets.map((b, j) => (
                    /* FIXED: Changed bullet text color to clear dark contrast */
                    <li key={j} style={{ fontSize: '0.78rem', lineHeight: 1.9, color: 'rgba(26,20,10,0.75)', letterSpacing: '0.04em', listStyleType: 'none', display: 'flex', gap: '0.8rem' }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}>◈</span> {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}

        {/* Contact */}
        <div style={{ background: 'rgba(196,153,90,0.06)', border: '1px solid rgba(196,153,90,0.2)', padding: '2.5rem', marginTop: '2rem' }}>
          <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.4rem', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '1rem' }}>CONTACT US</h3>
          {/* FIXED: Changed fallback text color to a crisp dark tone */}
          <p style={{ fontSize: '0.78rem', lineHeight: 2, color: 'rgba(26,20,10,0.8)', letterSpacing: '0.04em' }}>
            For any questions regarding these terms, reach us at:<br />
            <strong style={{ color: 'var(--dark)' }}>Email:</strong> leezoo.official2026@gmail.com<br />
            <strong style={{ color: 'var(--dark)' }}>WhatsApp:</strong> +91-9984090593 | +91-9169697273 | +91-8709708827<br />
            <strong style={{ color: 'var(--dark)' }}>Business Hours:</strong> Monday–Saturday, 10:00 AM – 8:00 PM IST
          </p>
        </div>
      </div>
    </div>
  );
}

const termsContent = [
  {
    heading: 'Acceptance of Terms',
    body: [
      'By using this website or placing any order with LEEZOO Pvt. Ltd., you confirm that you are at least 18 years of age, or are accessing the site under the supervision of a parent or guardian, and you agree to these Terms of Service in full.',
      'LEEZOO reserves the right to update or modify these terms at any time without prior notice. Continued use of the website after changes constitutes your acceptance of the revised terms.',
    ],
  },
  {
    heading: 'Products & Descriptions',
    body: [
      'We take every effort to display our products accurately. However, colours may slightly vary depending on your screen settings and device calibration. LEEZOO does not guarantee that product colours, textures, or descriptions are 100% accurate on all displays.',
    ],
    bullets: [
      'All products are subject to availability.',
      'We reserve the right to limit quantities per order.',
      'Product specifications may change without notice.',
      'Custom-printed items are made-to-order and are non-refundable once production begins.',
    ],
  },
  {
    heading: 'Orders & Acceptance',
    body: [
      'Placing an order constitutes an offer to purchase. An order is only confirmed after you receive a confirmation message or email from LEEZOO. We reserve the right to refuse or cancel any order at our discretion, including if we suspect fraudulent activity, pricing errors, or supply constraints.',
    ],
    bullets: [
      'Orders cannot be modified after 12 hours of placement.',
      'Cancellations are only accepted before production begins for custom orders.',
      'LEEZOO is not liable for delays caused by incorrect address or contact information provided by the customer.',
    ],
  },
  {
    heading: 'Pricing & Payments',
    body: [
      'All prices listed are in Indian Rupees (INR) unless otherwise specified and are inclusive of applicable GST. LEEZOO Pvt. Ltd. is a GST-registered entity and complies with Indian tax regulations.',
      'We accept payments via UPI, net banking, debit/credit cards, and approved wallet services. Payment must be completed at the time of order. LEEZOO does not store card information.',
    ],
    bullets: [
      'Prices are subject to change without notice.',
      'In case of a pricing error, LEEZOO will notify you and offer a cancellation or the corrected price.',
      'Bulk orders may be subject to custom invoicing with GST breakdown.',
    ],
  },
  {
    heading: 'Intellectual Property',
    body: [
      'All content on this website — including logos, graphics, product photographs, brand name, taglines, and design assets — is the exclusive intellectual property of LEEZOO Pvt. Ltd. and is protected under applicable Indian and international copyright laws.',
      'You may not reproduce, distribute, modify, or use any LEEZOO content for commercial purposes without express written permission from LEEZOO Pvt. Ltd.',
    ],
  },
  {
    heading: 'Custom Printing & User Responsibility',
    body: [
      'LEEZOO offers custom printing services. By submitting a design or image for printing, you confirm that you own or have full legal rights to use that design. LEEZOO is not responsible for any copyright infringement that arises from customer-submitted artwork.',
    ],
    bullets: [
      'LEEZOO reserves the right to reject any design containing offensive, illegal, or inappropriate content.',
      'Custom orders are final once confirmed — no refunds or exchanges unless there is a production defect.',
      'Turnaround time for custom orders is 5–10 business days.',
      'Bulk custom orders (50+ units) must be confirmed via WhatsApp before placing.',
    ],
  },
  {
    heading: 'Limitation of Liability',
    body: [
      'To the fullest extent permitted by law, LEEZOO Pvt. Ltd. and its founders shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services, including but not limited to loss of profit, loss of data, or personal injury.',
      'Our total liability in any matter arising out of or related to these terms shall not exceed the amount paid by you for the relevant order.',
    ],
  },
  {
    heading: 'Governing Law',
    body: [
      'These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of India.',
    ],
  },
];