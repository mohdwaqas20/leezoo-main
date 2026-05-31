export default function CustomizationPolicy({ onBack }) {
  return <PolicyPage title="Customization Policy" onBack={onBack} sections={customContent} lastUpdated="May 2026" />;
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

      {/* Process Steps */}
      <div style={{ background: '#0f0f0f', padding: '4rem', borderBottom: '1px solid var(--border-light)' }}>
        <p style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', textAlign: 'center', marginBottom: '2.5rem' }}>How Custom Printing Works</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0', maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          {[
            { step: '01', label: 'WhatsApp Us', desc: 'Share your design idea' },
            { step: '02', label: 'Get a Quote', desc: 'Pricing & timeline confirmed' },
            { step: '03', label: 'Approve Mockup', desc: 'Digital proof sent to you' },
            { step: '04', label: 'Production', desc: '5–10 business days' },
            { step: '05', label: 'Delivered', desc: 'Pan India shipping' },
          ].map((s, i) => (
            <div key={s.step} style={{ textAlign: 'center', padding: '0 1rem', position: 'relative' }}>
              {i < 4 && <div style={{ position: 'absolute', top: '1.2rem', right: '-1rem', width: '2rem', height: 1, background: 'var(--accent)', opacity: 0.3 }} />}
              <div style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontFamily: "'Bebas Neue',sans-serif", fontSize: '1rem', color: 'var(--accent)', letterSpacing: '0.05em' }}>{s.step}</div>
              <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1rem', letterSpacing: '0.08em', marginBottom: '0.4rem', color: '#fff' }}>{s.label}</p>
              {/* RETAINED LIGHT COLOR FOR READABILITY AGAINST DARK (#0f0f0f) BACKGROUND */}
              <p style={{ fontSize: '0.62rem', color: 'rgba(245,240,234,0.65)', letterSpacing: '0.05em', lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '5rem 4rem' }}>
        <div style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-light)' }}>
          {/* FIXED: Changed text color to clear dark contrast against sand background */}
          <p style={{ fontSize: '0.85rem', lineHeight: 2, color: 'rgba(26,20,10,0.8)', letterSpacing: '0.04em' }}>
            <strong style={{ color: 'var(--dark)' }}>LEEZOO </strong> specialises in premium custom T-shirt printing for individuals, teams, businesses, and events. This policy covers all rules, responsibilities, and terms applicable to custom printing orders. Please read carefully before placing a custom order.
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

        {/* CTA Box */}
        <div style={{ background: 'rgba(196,153,90,0.06)', border: '1px solid rgba(196,153,90,0.2)', padding: '2.5rem', marginTop: '2rem' }}>
          <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.4rem', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '1rem' }}>START YOUR CUSTOM ORDER</h3>
          {/* FIXED: Changed details text color to clear dark contrast */}
          <p style={{ fontSize: '0.78rem', lineHeight: 2, color: 'rgba(26,20,10,0.8)', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>
            Ready to create something extraordinary? Reach out and let's build it together.<br />
            <strong style={{ color: 'var(--dark)' }}>WhatsApp:</strong> +91-9984090593 | +91-9169697273 | +91-9653026746<br />
            <strong style={{ color: 'var(--dark)' }}>Email:</strong> leezoo.official2026@gmail.com<br />
            <strong style={{ color: 'var(--dark)' }}>Minimum Quantity:</strong> 1 piece (individual) | 10 pieces (bulk/wholesale rate)
          </p>
          <a
            href="https://wa.me/919984090593"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-block', background: 'var(--accent)', color: 'var(--ink)', textDecoration: 'none', padding: '0.85rem 2.5rem', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'Jost,sans-serif', fontWeight: 400 }}
          >
            Get a Custom Quote →
          </a>
        </div>
      </div>
    </div>
  );
}

const customContent = [
  {
    heading: 'Accepted Design Formats',
    body: ['To ensure the highest print quality, please submit your designs in the following formats:'],
    bullets: [
      'Preferred: AI (Adobe Illustrator), PDF (vector), PNG (300 DPI minimum, transparent background).',
      'Accepted: JPG (high resolution, 300 DPI minimum), PSD (layered files).',
      'Not accepted: Low-resolution screenshots, blurry images, or designs below 150 DPI.',
      'Colour mode: RGB for DTG printing; CMYK recommended for screen printing.',
      'All text must be outlined/converted to paths to prevent font substitution.',
    ],
  },
  {
    heading: 'Design Ownership & Copyright',
    body: [
      'By submitting a design for printing, you confirm and warrant that you are the legal owner of the design, or that you have been granted the explicit right to use it for print purposes. LEEZOO Pvt. Ltd. is not responsible for any copyright or intellectual property infringement arising from customer-submitted artwork.',
    ],
    bullets: [
      'Do not submit designs that contain logos, characters, or artwork belonging to third-party brands or individuals without written permission.',
      'LEEZOO reserves the right to request proof of design ownership for any submitted artwork.',
      'Orders found to contain infringing content will be cancelled without refund.',
    ],
  },
  {
    heading: 'Content Restrictions',
    body: ['LEEZOO reserves the right to decline any order that contains the following:'],
    bullets: [
      'Hate speech, discriminatory content, or imagery targeting any group.',
      'Obscene, sexually explicit, or pornographic content.',
      'Content that promotes violence, illegal activity, or self-harm.',
      'Third-party brand logos or trademarks without authorisation.',
      'Political content deemed inflammatory or divisive.',
      'Content that impersonates any individual, brand, or government entity.',
    ],
  },
  {
    heading: 'Print Techniques & Limitations',
    body: ['LEEZOO uses multiple printing techniques. Each has specific capabilities and limitations:'],
    bullets: [
      'DTG (Direct-to-Garment): Best for full-colour, photographic prints. Works best on 100% cotton garments.',
      'Screen Printing: Best for bold, solid-colour designs on bulk orders. Minimum 20 units per design.',
      'Heat Transfer Vinyl (HTV): Ideal for names, numbers, and simple graphics on polyester or blended fabrics.',
      'Colour accuracy: Printed colours may vary up to 10–15% from screen display due to fabric and ink properties. We provide digital mockups for approval before production.',
    ],
  },
  {
    heading: 'Approval & Mockup Process',
    body: [
      'After receiving your design and order details, LEEZOO will send a digital mockup for your approval before production begins. Production will not start until you provide written approval (via WhatsApp or email).',
      'Once you approve the mockup, no further changes can be made to the design, size, colour, or placement.',
    ],
  },
  {
    heading: 'Production Turnaround Time',
    body: ['Turnaround times begin after design approval and payment confirmation:'],
    bullets: [
      'Single / small orders (1–9 pieces): 5–7 business days.',
      'Medium orders (10–49 pieces): 7–10 business days.',
      'Large/bulk orders (50+ pieces): 10–15 business days (timeline confirmed at order stage).',
      'Rush orders may be accommodated at an additional 25–40% charge, subject to availability.',
    ],
  },
  {
    heading: 'Cancellations & Refunds for Custom Orders',
    body: [
      'Custom-printed orders are non-refundable once production has commenced. Cancellations are only accepted before the design approval stage. If a cancellation is approved before production, a refund (minus any design or processing fees) will be issued within 5–7 business days.',
      'If the product received has a printing defect, incorrect design, or manufacturing fault, LEEZOO will arrange a full replacement at no cost. All defect claims must be raised within 48 hours of delivery with clear photos.',
    ],
  },
  {
    heading: 'Bulk & Wholesale Orders',
    body: [
      'LEEZOO offers competitive pricing for bulk orders (10+ units). Bulk order pricing, payment terms, and delivery schedules are confirmed separately via WhatsApp or email. A 50% advance payment is required for bulk orders before production begins.',
    ],
    bullets: [
      '10–49 pieces: 10–15% discount on standard pricing.',
      '50–99 pieces: 15–25% discount + priority production.',
      '100+ pieces: Custom pricing — contact us for a dedicated quote.',
      'All bulk orders include a GST-compliant invoice.',
    ],
  },
];