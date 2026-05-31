const WA_NUMBER = '919984090593';
const WA_MSG = encodeURIComponent('Hi LEEZOO Team, I want to inquire about customized t-shirt printing.');
const EMAIL = 'leezoo.official2026@gmail.com';

const steps = [
  {
    num: '01',
    title: 'Send Your Inquiry',
    desc: 'Reach out via WhatsApp, email, or our contact form. Share your vision, quantity, and timeline.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Share Your Design',
    desc: 'Upload your logo, artwork, or reference image. Our team reviews your file and suggests optimizations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
        <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'We Confirm & Print',
    desc: 'Our team prepares a digital proof for your approval. Once confirmed, we move to precision production.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
        <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
    ),
    highlight: true,
  },
  {
    num: '04',
    title: 'Quality & Packaging',
    desc: 'Every garment passes our quality inspection. Packed with care under the LEEZOO standard.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Delivered To You',
    desc: 'Your customized order ships directly to your address. Fast, secure, and beautifully presented.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
        <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

export default function CustomPrinting() {
  return (
    <section id="custom-printing" style={{ background: 'var(--sand)', color: '#2a1f14', padding: '0 4rem 7rem', borderTop: '2px solid rgba(122,87,64,0.25)' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '5rem', paddingTop: '4rem' }}>
        <h2 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 'clamp(2.8rem,5vw,4rem)',
          letterSpacing: '0.2em',
          color: '#1a1008',
          marginBottom: '2rem',
        }}>Custom Printing</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
          <span style={{ flex: 1, height: '1px', background: 'rgba(122,87,64,0.25)', maxWidth: 200, display: 'block' }} />
          <span style={{ color: 'var(--brown)', fontSize: '0.5rem', opacity: 0.5 }}>◆</span>
          <span style={{ color: 'var(--brown)', fontSize: '0.7rem', opacity: 0.8 }}>◆</span>
          <span style={{ color: 'var(--brown)', fontSize: '0.9rem' }}>◆</span>
          <span style={{ color: 'var(--brown)', fontSize: '0.7rem', opacity: 0.8 }}>◆</span>
          <span style={{ color: 'var(--brown)', fontSize: '0.5rem', opacity: 0.5 }}>◆</span>
          <span style={{ flex: 1, height: '1px', background: 'rgba(122,87,64,0.25)', maxWidth: 200, display: 'block' }} />
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(3rem,7vw,5.5rem)', lineHeight: 1.0, letterSpacing: '0.04em', marginBottom: '1.5rem', color: '#2a1f14' }}>
          Your Design.{' '}
          <em style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', color: 'var(--brown)', fontSize: '0.92em' }}>Our Craftsmanship.</em>
        </h2>
        <p style={{ fontSize: '0.82rem', lineHeight: 2, color: 'rgba(26,20,10,0.6)', letterSpacing: '0.04em', maxWidth: 620, margin: '0 auto 1.5rem' }}>
          LEEZOO brings your vision to life with precision custom printing. Whether it's a single piece or a full collection — your artwork, your brand, your identity. We handle every detail from file to final print.
        </p>
        <div style={{ display: 'inline-flex', gap: '2rem', padding: '1rem 2rem', border: '1px solid rgba(122,92,63,0.2)', borderRadius: 2, background: 'rgba(122,92,63,0.05)' }}>
          {[['No MOQ', 'Single piece accepted'], ['Any Quantity', 'From 1 to 10,000+'], ['All Designs', 'Logo, art, photo']].map(([val, lbl]) => (
            <div key={lbl} style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.4rem', color: 'var(--brown)', display: 'block', lineHeight: 1, letterSpacing: '0.05em' }}>{val}</span>
              <span style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(26,20,10,0.45)', marginTop: '0.3rem', display: 'block' }}>{lbl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Process steps */}
      <div style={{ position: 'relative', marginBottom: '5rem' }}>
        {/* Connector line */}
        <div style={{ position: 'absolute', top: 50, left: '10%', right: '10%', height: 1, background: 'rgba(122,92,63,0.2)', zIndex: 0 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{
                width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: step.highlight ? 'var(--brown)' : '#e8ddd0',
                color: step.highlight ? '#fff' : 'var(--brown)',
                boxShadow: step.highlight ? '0 8px 30px rgba(122,92,63,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
                marginBottom: '1.5rem', border: step.highlight ? 'none' : '1px solid rgba(122,92,63,0.25)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(122,92,63,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = step.highlight ? '0 8px 30px rgba(122,92,63,0.3)' : '0 4px 20px rgba(0,0,0,0.08)'; }}
              >
                {step.icon}
              </div>
              <span style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: 'var(--brown)', marginBottom: '0.6rem', display: 'block' }}>{step.num}</span>
              <h3 style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--brown)', fontWeight: 700, marginBottom: '0.8rem' }}>{step.title}</h3>
              <p style={{ fontSize: '0.72rem', lineHeight: 1.8, color: 'rgba(26,20,10,0.52)', letterSpacing: '0.03em' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* WhatsApp — brand-consistent dark button with WhatsApp icon */}
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
          target="_blank" rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.7rem',
            background: 'var(--brown)', color: '#fff', border: '1px solid var(--brown)',
            padding: '1rem 2.2rem', fontSize: '0.62rem', letterSpacing: '0.25em',
            textTransform: 'uppercase', fontFamily: 'Jost,sans-serif',
            textDecoration: 'none', cursor: 'pointer', transition: 'background 0.3s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#5a3e28'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--brown)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.856L0 24l6.335-1.508A11.956 11.956 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.371l-.36-.214-3.732.888.936-3.627-.235-.373A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
          </svg>
          WhatsApp Inquiry
        </a>
        {/* Email — visible outlined button */}
        <a
          href={`mailto:${EMAIL}?subject=Custom T-Shirt Printing Inquiry`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.7rem',
            background: 'none', color: 'var(--brown)', border: '1.5px solid var(--brown)',
            padding: '1rem 2.2rem', fontSize: '0.62rem', letterSpacing: '0.25em',
            textTransform: 'uppercase', fontFamily: 'Jost,sans-serif',
            textDecoration: 'none', cursor: 'pointer', transition: 'background 0.3s, color 0.3s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--brown)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--brown)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
          </svg>
          Email Us
        </a>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #custom-printing { padding: 5rem 2rem !important; }
          #custom-printing .steps-grid { grid-template-columns: repeat(2,1fr) !important; }
          #custom-printing .connector-line { display: none !important; }
        }
        @media (max-width: 560px) {
          #custom-printing .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}