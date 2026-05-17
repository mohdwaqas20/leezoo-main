import { useState } from 'react';

export default function Footer() {
  const [feedback, setFeedback] = useState({ name: '', email: '', rating: 0, message: '' });
  const [contact, setContact] = useState({ name: '', email: '', phone: '', message: '' });
  const [hoverStar, setHoverStar] = useState(0);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  const cols = [
    { title: 'Shop', links: ["New Arrivals", "Men's Tees", "Women's Tees", 'Custom Printing', 'All Products'] },
    { title: 'Info', links: ['About Us', 'Our Founders', 'Contact Us', 'Track Order'] },
    { title: 'Policies', links: ['Terms of Service', 'Privacy Policy', 'Shipping Policy', 'Refund & Exchange', 'Customization Policy'] },
  ];

  const founders = [
    {
      name: 'Mohd Waqas',
      role: 'Co-Founder & Digital Head',
      desc: 'Drives all online operations — from Instagram & Facebook to digital sales, product listings, and brand presence across every platform.',
      icon: '◈',
    },
    {
      name: 'Praveen Yadav',
      role: 'Co-Founder & Production Head',
      desc: "Leads raw material sourcing, printing, and custom T-shirt manufacturing — ensuring every piece meets LEEZOO's quality standard.",
      icon: '◈',
    },
    {
      name: 'Rahul Kumar',
      role: 'Co-Founder & Field Director',
      desc: 'Oversees end-to-end field operations — from production floor to delivery — making sure every order reaches customers flawlessly.',
      icon: '◈',
    },
  ];

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
    padding: '0.85rem 0',
    color: 'var(--white)',
    fontFamily: 'Barlow,sans-serif',
    fontSize: '0.78rem',
    letterSpacing: '0.06em',
    outline: 'none',
    transition: 'border-color 0.3s',
  };

  const labelStyle = {
    fontSize: '0.55rem',
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    display: 'block',
    marginBottom: '0.3rem',
  };

  return (
    <footer id="contact" style={{ background: '#080808', padding: '0 0 2.5rem' }}>

      {/* ── Our Story ── */}
      <section id="about" style={{
        background: 'var(--sand)', color: 'var(--ink)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 520,
      }}>
        <div style={{ padding: '6rem 5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{
            fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--brown)', marginBottom: '1.5rem',
            display: 'flex', alignItems: 'center', gap: '0.8rem',
          }}>
            <span style={{ width: 30, height: 1, background: 'var(--brown)', display: 'inline-block' }} />
            Our Story
          </p>
          <h2 style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 'clamp(3.5rem,6vw,5.5rem)',
            lineHeight: 1.0,
            letterSpacing: '0.04em',
          }}>
            BUILT ON
            <em style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontStyle: 'italic',
              color: 'var(--brown)',
              fontSize: '0.8em',
              display: 'block',
              margin: '0.2rem 0',
            }}>quality and</em>
            TRUST.
          </h2>
          <p style={{ marginTop: '2rem', fontSize: '0.82rem', lineHeight: 2, color: 'rgba(26,20,10,0.65)', letterSpacing: '0.04em', maxWidth: 380 }}>
            LEEZOO was founded in May 2026 with one clear vision — to give every customer something extraordinary at a price that's genuinely fair.
            We're not here just to sell T-shirts. We're here to build relationships rooted in trust, quality, and craftsmanship.
            Every fabric we source, every print we create, is a promise — that you deserve better.
            Made in India. Worn with pride.
          </p>
          <div style={{ display: 'flex', gap: '3rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(122,92,63,0.2)' }}>
            {[['100%', 'Premium Cotton'], ['Custom', 'Printing Available'], ['India', 'Made with Pride']].map(([num, label]) => (
              <div key={label}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2.6rem', color: 'var(--ink)', letterSpacing: '0.05em', display: 'block', lineHeight: 1 }}>{num}</span>
                <span style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--brown)', marginTop: '0.3rem', display: 'block' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Logo panel */}
        <div style={{ background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <svg viewBox="0 0 420 150" width="360" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <mask id="o1cut">
                <rect width="420" height="150" fill="white"/>
                <rect x="222" y="50" width="76" height="10" fill="black"/>
              </mask>
              <mask id="o2cut">
                <rect width="420" height="150" fill="white"/>
                <rect x="308" y="50" width="76" height="10" fill="black"/>
              </mask>
            </defs>
            <line x1="8" y1="15" x2="8" y2="95" stroke="#E8DDD0" strokeWidth="6.5" strokeLinecap="square"/>
            <line x1="8" y1="95" x2="52" y2="95" stroke="#E8DDD0" strokeWidth="6.5" strokeLinecap="square"/>
            <line x1="68" y1="15" x2="68" y2="95" stroke="#E8DDD0" strokeWidth="6.5" strokeLinecap="square"/>
            <line x1="68" y1="15" x2="110" y2="15" stroke="#E8DDD0" strokeWidth="6.5" strokeLinecap="square"/>
            <line x1="68" y1="55" x2="102" y2="55" stroke="#E8DDD0" strokeWidth="6.5" strokeLinecap="square"/>
            <line x1="68" y1="95" x2="110" y2="95" stroke="#E8DDD0" strokeWidth="6.5" strokeLinecap="square"/>
            <line x1="126" y1="15" x2="126" y2="95" stroke="#E8DDD0" strokeWidth="6.5" strokeLinecap="square"/>
            <line x1="126" y1="15" x2="168" y2="15" stroke="#E8DDD0" strokeWidth="6.5" strokeLinecap="square"/>
            <line x1="126" y1="55" x2="160" y2="55" stroke="#E8DDD0" strokeWidth="6.5" strokeLinecap="square"/>
            <line x1="126" y1="95" x2="168" y2="95" stroke="#E8DDD0" strokeWidth="6.5" strokeLinecap="square"/>
            <line x1="184" y1="15" x2="222" y2="15" stroke="#E8DDD0" strokeWidth="6.5" strokeLinecap="square"/>
            <line x1="222" y1="15" x2="184" y2="95" stroke="#E8DDD0" strokeWidth="6.5" strokeLinecap="square"/>
            <line x1="184" y1="95" x2="222" y2="95" stroke="#E8DDD0" strokeWidth="6.5" strokeLinecap="square"/>
            <circle cx="260" cy="55" r="37" stroke="#E8DDD0" strokeWidth="6.5" fill="none" mask="url(#o1cut)"/>
            <circle cx="346" cy="55" r="37" stroke="#E8DDD0" strokeWidth="6.5" fill="none" mask="url(#o2cut)"/>
            <line x1="82" y1="128" x2="140" y2="128" stroke="#9C7A5A" strokeWidth="0.8"/>
            <text x="210" y="132" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="8" fill="#9C7A5A" letterSpacing="5">WEAR YOUR EDGE</text>
            <line x1="280" y1="128" x2="338" y2="128" stroke="#9C7A5A" strokeWidth="0.8"/>
          </svg>
        </div>
      </section>

      {/* ── Meet the Founders ── */}
      <section id="founders" style={{ padding: '6rem 4rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{
          fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase',
          color: 'var(--accent)', marginBottom: '1rem',
          display: 'flex', alignItems: 'center', gap: '0.8rem',
        }}>
          <span style={{ width: 30, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
          The People Behind LEEZOO
        </p>
        <h2 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 'clamp(2.5rem,5vw,4rem)', letterSpacing: '0.04em',
          marginBottom: '3.5rem',
        }}>MEET THE FOUNDERS</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {founders.map((f) => (
            <div key={f.name} style={{
              border: '1px solid var(--border)', padding: '2.5rem',
              transition: 'border-color 0.3s, transform 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <span style={{ fontSize: '1.2rem', color: 'var(--accent)', display: 'block', marginBottom: '1.5rem' }}>{f.icon}</span>
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.6rem', letterSpacing: '0.08em', color: 'var(--white)', marginBottom: '0.4rem' }}>{f.name}</h3>
              <p style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.2rem' }}>{f.role}</p>
              <p style={{ fontSize: '0.75rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.03em' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Customer Feedback ── */}
      <section id="feedback" style={{ padding: '6rem 4rem', borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
        {/* Left — copy */}
        <div>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ width: 30, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
            Your Voice Matters
          </p>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.5rem,5vw,4.5rem)', lineHeight: 0.95, letterSpacing: '0.04em', marginBottom: '1.5rem' }}>
            SHARE YOUR<br />
            <em style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', color: 'var(--accent)', fontSize: '0.85em' }}>experience.</em>
          </h2>
          <p style={{ fontSize: '0.78rem', lineHeight: 2, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em', maxWidth: 360 }}>
            Every piece of feedback helps us grow. Whether it's about our quality, delivery, or custom printing — we want to hear it all. Your review shapes the next collection.
          </p>
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2rem' }}>
            {[['100%', 'PREMIUM QUALITY'], ['FAST', 'SHIPPING'], ['SECURE', 'CHECKOUT GUARANTEE']].map(([val, lbl]) => (
              <div key={lbl}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', color: 'var(--accent)', display: 'block', lineHeight: 1 }}>{val}</span>
                <span style={{ fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: '0.3rem', display: 'block' }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div>
          {feedbackSent ? (
            <div style={{ textAlign: 'center', padding: '3rem', border: '1px solid var(--accent)' }}>
              <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', color: 'var(--accent)', letterSpacing: '0.1em' }}>THANK YOU!</p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.8rem', letterSpacing: '0.06em' }}>Your feedback means everything to us.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              {/* Star Rating */}
              <div>
                <span style={labelStyle}>Rate Your Experience</span>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span
                      key={star}
                      onMouseEnter={() => setHoverStar(star)}
                      onMouseLeave={() => setHoverStar(0)}
                      onClick={() => setFeedback(p => ({ ...p, rating: star }))}
                      style={{
                        fontSize: '1.4rem', cursor: 'pointer',
                        color: star <= (hoverStar || feedback.rating) ? 'var(--accent)' : 'rgba(255,255,255,0.15)',
                        transition: 'color 0.2s',
                      }}
                    >★</span>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Your Name</label>
                <input
                  style={inputStyle}
                  placeholder="e.g. Arjun Sharma"
                  value={feedback.name}
                  onChange={e => setFeedback(p => ({ ...p, name: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  style={inputStyle}
                  type="email"
                  placeholder="you@example.com"
                  value={feedback.email}
                  onChange={e => setFeedback(p => ({ ...p, email: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                />
              </div>
              <div>
                <label style={labelStyle}>Your Review</label>
                <textarea
                  style={{ ...inputStyle, resize: 'none', minHeight: 90 }}
                  placeholder="Tell us about your experience with LEEZOO..."
                  value={feedback.message}
                  onChange={e => setFeedback(p => ({ ...p, message: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                />
              </div>
              <button
                onClick={() => { if (feedback.name && feedback.message) setFeedbackSent(true); }}
                style={{
                  background: 'var(--accent)', color: 'var(--ink)',
                  border: 'none', padding: '1rem 2.5rem',
                  fontFamily: 'Barlow,sans-serif', fontWeight: 300,
                  fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'background 0.3s', alignSelf: 'flex-start',
                }}
                onMouseEnter={e => e.target.style.background = 'var(--white)'}
                onMouseLeave={e => e.target.style.background = 'var(--accent)'}
              >Submit Review →</button>
            </div>
          )}
        </div>
      </section>

      {/* ── Contact Us ── */}
      <section id="contact-us" style={{ padding: '6rem 4rem', borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
        {/* Left — contact info */}
        <div>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ width: 30, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
            Get in Touch
          </p>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.5rem,5vw,4.5rem)', lineHeight: 0.95, letterSpacing: '0.04em', marginBottom: '1.5rem' }}>
            CONTACT<br />
            <em style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', color: 'var(--accent)', fontSize: '0.85em' }}>us anytime.</em>
          </h2>
          <p style={{ fontSize: '0.78rem', lineHeight: 2, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em', maxWidth: 360, marginBottom: '3rem' }}>
            Have a question about an order, custom printing, or just want to say hello? We're always here and happy to help.
          </p>

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            {[
              {
                icon: '◎',
                label: 'WhatsApp',
                value: '+91-9984090593 , +91-9169697273 , +91-8709708827',
                sub: 'Mon – Sat, 10am – 8pm IST',
                href: 'https://wa.me/91-9984090593',
              },
              {
                icon: '◎',
                label: 'Email',
                value: 'leezoo.official2026@gmail.com',
                sub: 'We reply within 24 hours',
                href: 'mailto:leezoo.official2026@gmail.com',
              },
              {
                icon: '◎',
                label: 'Location',
                value: 'India',
                sub: 'Manufacturing & Delivery across India',
                href: null,
              },
              {
                icon: '◎',
                label: 'Custom Orders',
                value: 'Bulk & Personalised Printing',
                sub: 'WhatsApp us for custom quotes',
                href: 'https://wa.me/91-9984090593',
              },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent)', fontSize: '1rem', marginTop: '0.1rem', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.3rem' }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} style={{ fontSize: '0.82rem', color: 'var(--white)', textDecoration: 'none', letterSpacing: '0.05em', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                      onMouseLeave={e => e.target.style.color = 'var(--white)'}
                    >{item.value}</a>
                  ) : (
                    <p style={{ fontSize: '0.82rem', color: 'var(--white)', letterSpacing: '0.05em' }}>{item.value}</p>
                  )}
                  <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.2rem', letterSpacing: '0.05em' }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — contact form */}
        <div>
          {contactSent ? (
            <div style={{ textAlign: 'center', padding: '3rem', border: '1px solid var(--accent)', marginTop: '6rem' }}>
              <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', color: 'var(--accent)', letterSpacing: '0.1em' }}>MESSAGE SENT!</p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.8rem', letterSpacing: '0.06em' }}>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', paddingTop: '7rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input style={inputStyle} placeholder="Your name"
                    value={contact.name} onChange={e => setContact(p => ({ ...p, name: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input style={inputStyle} placeholder="+91 XXXXX XXXXX"
                    value={contact.phone} onChange={e => setContact(p => ({ ...p, phone: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input style={inputStyle} type="email" placeholder="you@example.com"
                  value={contact.email} onChange={e => setContact(p => ({ ...p, email: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                />
              </div>
              <div>
                <label style={labelStyle}>Message</label>
                <textarea style={{ ...inputStyle, resize: 'none', minHeight: 110 }}
                  placeholder="Tell us how we can help — orders, custom printing, bulk enquiries..."
                  value={contact.message} onChange={e => setContact(p => ({ ...p, message: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button
                  onClick={() => { if (contact.name && contact.message) setContactSent(true); }}
                  style={{
                    background: 'var(--accent)', color: 'var(--ink)',
                    border: 'none', padding: '1rem 2.5rem',
                    fontFamily: 'Barlow,sans-serif', fontWeight: 300,
                    fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'background 0.3s',
                  }}
                  onMouseEnter={e => e.target.style.background = 'var(--white)'}
                  onMouseLeave={e => e.target.style.background = 'var(--accent)'}
                >Send Message →</button>
                <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer" style={{
                  border: '1px solid var(--border)', padding: '1rem 1.5rem',
                  fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: '#25D366', textDecoration: 'none', transition: 'border-color 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#25D366'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >WhatsApp Us</a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Platforms ── */}
      <section id="platforms" style={{ padding: '4rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ textAlign: 'center', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.35, marginBottom: '2.5rem' }}>Also available on</p>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Amazon', 'Flipkart', 'Meesho', 'Myntra', 'AJIO'].map(p => (
            <a key={p} href="#" style={{
              display: 'inline-block', textDecoration: 'none', fontSize: '0.62rem',
              letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--white)',
              border: '1px solid var(--border)', padding: '0.7rem 2rem', transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--white)'; }}
            >Shop on {p}</a>
          ))}
        </div>
      </section>

      {/* ── Footer links ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4rem', padding: '5rem 4rem 4rem', borderBottom: '1px solid var(--border)' }}>
        <div>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2.2rem', letterSpacing: '0.2em', marginBottom: '1rem', display: 'block' }}>LEEZOO</span>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--brown)', letterSpacing: '0.1em' }}>Wear Your Edge.</p>
          <p style={{ fontSize: '0.72rem', lineHeight: 1.9, opacity: 0.35, marginTop: '1.2rem', letterSpacing: '0.05em', maxWidth: 280 }}>
            Premium T-shirts crafted for those who refuse the ordinary. Born in India, worn with pride.
          </p>
        </div>
        {cols.map(col => (
          <div key={col.title}>
            <h4 style={{ fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem' }}>{col.title}</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {col.links.map(l => (
                <li key={l}>
                  <a href="#" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--white)', textDecoration: 'none', opacity: 0.38, transition: 'opacity 0.25s' }}
                    onMouseEnter={e => e.target.style.opacity = 1}
                    onMouseLeave={e => e.target.style.opacity = 0.38}
                  >{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '0.58rem', letterSpacing: '0.12em', opacity: 0.22 }}>
          © 2026 LEEZOO. All rights reserved. &nbsp;|&nbsp; Founded by Mohd Waqas, Praveen Yadav & Rahul Kumar
        </p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Instagram', 'Facebook', 'WhatsApp'].map(s => (
            <a key={s} href="#" style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--white)', textDecoration: 'none', opacity: 0.28, transition: 'opacity 0.25s' }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.28}
            >{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}