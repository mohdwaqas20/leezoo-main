import { useState } from 'react';

export default function Footer({ onNavigate }) {
  const [feedback, setFeedback] = useState({ name: '', email: '', rating: 0, message: '' });
  const [contact, setContact] = useState({ name: '', email: '', phone: '', message: '' });
  const [hoverStar, setHoverStar] = useState(0);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  const cols = [
    {
      title: 'Shop',
      links: [
        { label: "Men's Tees", action: () => scrollTo('shop-men') },
        { label: "Women's Tees", action: () => scrollTo('shop-women') },
        { label: 'Customized Printing', action: () => scrollTo('custom-printing') },
        { label: 'Bulk Orders', action: () => scrollTo('bulk-printing') },
      ],
    },
    {
      title: 'Info',
      links: [
        { label: 'About Us', action: () => scrollTo('about') },
        { label: 'Our Founders', action: () => scrollTo('founders') },
        { label: 'Feedback', action: () => scrollTo('feedback') },
        { label: 'Contact Us', action: () => scrollTo('contact-us') },
        { label: 'Track Order', action: () => onNavigate?.('orders') },
      ],
    },
    {
      title: 'Policies',
      links: [
        { label: 'Terms of Service', action: () => onNavigate?.('terms') },
        { label: 'Privacy Policy', action: () => onNavigate?.('privacy') },
        { label: 'Shipping Policy', action: () => onNavigate?.('shipping') },
        { label: 'Refund & Exchange', action: () => onNavigate?.('refund') },
        { label: 'Customization Policy', action: () => onNavigate?.('customization') },
      ],
    },
  ];

  const founders = [
    {
      name: 'Mohd Waqas',
      role: 'Co-Founder & Digital Head',
      desc: 'Drives all online operations — from Instagram & Facebook to digital sales, product listings, and brand presence across every platform.',
      icon: '◈',
    },
    {
      name: 'Praveen',
      role: 'Co-Founder & Production Head',
      desc: "Leads raw material sourcing, printing, and custom T-shirt manufacturing — ensuring every piece meets LEEZOO's quality standard.",
      icon: '◈',
    },
    {
      name: 'Suraj',
      role: 'Co-Founder & Field Director',
      desc: 'Oversees end-to-end field operations — from production floor to delivery — making sure every order reaches customers flawlessly.',
      icon: '◈',
    },
  ];

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(240,230,216,0.25)',
    padding: '0.85rem 0',
    color: '#F0E6D8',
    fontFamily: 'Jost,sans-serif',
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
    <footer id="contact" style={{ background: 'var(--dark)', padding: '0 0 2.5rem' }}>

      {/* ── Our Story ── */}
      <section id="about" style={{
        background: 'var(--mid)', color: 'var(--dark)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 520,
      }}>
        <div style={{ padding: '6rem 5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{
            fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--brown)', fontWeight: 700, marginBottom: '1.5rem',
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
            color: '#2a1f14',
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
            {[['100%', 'Premium quality'], ['Custom', 'Printing Available'], ['India', 'Made with Pride']].map(([num, label]) => (
              <div key={label}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2.6rem', color: 'var(--dark)', letterSpacing: '0.05em', display: 'block', lineHeight: 1 }}>{num}</span>
                <span style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--brown)', marginTop: '0.3rem', display: 'block' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Logo panel with animation */}
        <div style={{ background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <style>{`
            @keyframes lz-fadeScale {
              from { opacity: 0; transform: scale(0.88); }
              to   { opacity: 1; transform: scale(1); }
            }
            @keyframes lz-drawLoop {
              0%   { stroke-dashoffset: 700; opacity: 0; }
              5%   { opacity: 1; }
              40%  { stroke-dashoffset: 0; opacity: 1; }
              75%  { stroke-dashoffset: 0; opacity: 1; }
              90%  { stroke-dashoffset: 0; opacity: 0; }
              100% { stroke-dashoffset: 700; opacity: 0; }
            }
            @keyframes lz-tagLoop {
              0%,8%  { opacity: 0; transform: scaleX(0.6); }
              45%    { opacity: 1; transform: scaleX(1); }
              75%    { opacity: 1; transform: scaleX(1); }
              90%    { opacity: 0; transform: scaleX(0.6); }
              100%   { opacity: 0; transform: scaleX(0.6); }
            }
            @keyframes lz-lineLoop {
              0%,8%  { stroke-dashoffset: 80; opacity: 0; }
              45%    { stroke-dashoffset: 0; opacity: 1; }
              75%    { stroke-dashoffset: 0; opacity: 1; }
              90%    { stroke-dashoffset: 0; opacity: 0; }
              100%   { stroke-dashoffset: 80; opacity: 0; }
            }
            @keyframes lz-glow {
              0%,100% { filter: drop-shadow(0 0 0px rgba(139,105,20,0)); }
              50%      { filter: drop-shadow(0 0 28px rgba(139,105,20,0.6)); }
            }
            @keyframes lz-float {
              0%,100% { transform: translateY(0px); }
              50%      { transform: translateY(-6px); }
            }
            .lz-wrap {
              animation: lz-fadeScale 1s cubic-bezier(0.16,1,0.3,1) 0.2s both,
                         lz-glow 5s ease-in-out 2s infinite;
            }
            .lz-float-wrap {
              animation: lz-float 6s ease-in-out 2.5s infinite;
              transform-origin: center;
            }
            .lz-s  { stroke-dasharray: 700; animation: lz-drawLoop 6s cubic-bezier(0.4,0,0.2,1) infinite; }
            .lz-tl { animation: lz-tagLoop 6s cubic-bezier(0.16,1,0.3,1) infinite; transform-origin: center; }
            .lz-ln { stroke-dasharray: 80; animation: lz-lineLoop 6s ease infinite; }
          `}</style>

          <svg className="lz-wrap" viewBox="0 0 420 185" width="88%" style={{ maxWidth: 490 }} fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <mask id="lzO1">
                <rect width="420" height="185" fill="white"/>
                <rect x="224" y="47" width="72" height="11" rx="1" fill="black"/>
              </mask>
              <mask id="lzO2">
                <rect width="420" height="185" fill="white"/>
                <rect x="310" y="47" width="72" height="11" rx="1" fill="black"/>
              </mask>
            </defs>

            <g className="lz-float-wrap">
              {/* L */}
              <line className="lz-s" x1="10" y1="14" x2="10" y2="96" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{animationDelay:'0.3s'}}/>
              <line className="lz-s" x1="10" y1="96" x2="56" y2="96" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{animationDelay:'0.38s'}}/>
              {/* E */}
              <line className="lz-s" x1="72" y1="14" x2="72" y2="96" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{animationDelay:'0.46s'}}/>
              <line className="lz-s" x1="72" y1="14" x2="116" y2="14" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{animationDelay:'0.52s'}}/>
              <line className="lz-s" x1="72" y1="55" x2="108" y2="55" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{animationDelay:'0.58s'}}/>
              <line className="lz-s" x1="72" y1="96" x2="116" y2="96" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{animationDelay:'0.64s'}}/>
              {/* E */}
              <line className="lz-s" x1="132" y1="14" x2="132" y2="96" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{animationDelay:'0.72s'}}/>
              <line className="lz-s" x1="132" y1="14" x2="176" y2="14" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{animationDelay:'0.78s'}}/>
              <line className="lz-s" x1="132" y1="55" x2="168" y2="55" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{animationDelay:'0.84s'}}/>
              <line className="lz-s" x1="132" y1="96" x2="176" y2="96" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{animationDelay:'0.9s'}}/>
              {/* Z */}
              <line className="lz-s" x1="192" y1="14" x2="232" y2="14" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{animationDelay:'0.98s'}}/>
              <line className="lz-s" x1="232" y1="14" x2="192" y2="96" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{animationDelay:'1.06s'}}/>
              <line className="lz-s" x1="192" y1="96" x2="232" y2="96" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{animationDelay:'1.12s'}}/>
              {/* O */}
              <circle className="lz-s" cx="268" cy="55" r="40" stroke="#4A3008" strokeWidth="7.5" fill="none" mask="url(#lzO1)" style={{animationDelay:'1.2s'}}/>
              {/* O */}
              <circle className="lz-s" cx="354" cy="55" r="40" stroke="#4A3008" strokeWidth="7.5" fill="none" mask="url(#lzO2)" style={{animationDelay:'1.32s'}}/>
              
              {/* Tagline — pushed down with generous gap */}
              <line className="lz-ln" x1="25" y1="148" x2="128" y2="148" stroke="#3D2606" strokeWidth="0.85" style={{animationDelay:'1.9s'}}/>
              <text className="lz-tl" x="200" y="153" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="12" fill="#4A3008" letterSpacing="6" fontWeight="600" style={{animationDelay:'1.9s'}}>WEAR YOUR EDGE</text>
              <line className="lz-ln" x1="295" y1="148" x2="398" y2="148" stroke="#3D2606" strokeWidth="0.85" style={{animationDelay:'1.9s'}}/>
            </g>
          </svg>
        </div>
      </section>

      {/* ── Meet the Founders ── */}
      <section id="founders" style={{ padding: '6rem 4rem', borderBottom: '1px solid rgba(122, 87, 64, 0.15)', background: 'linear-gradient(135deg, #F5EDE0 0%, #EAD8C2 100%)' }}>
        <p style={{
          fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase',
          color: '#7A5740', marginBottom: '1rem',
          display: 'flex', alignItems: 'center', gap: '0.8rem',
        }}>
          <span style={{ width: 30, height: 1, background: '#7A5740', display: 'inline-block' }} />
          The People Behind LEEZOO
        </p>
        <h2 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 'clamp(2.5rem,5vw,4rem)', letterSpacing: '0.04em',
          marginBottom: '3.5rem',
          color: '#2C1F14',
        }}>MEET THE FOUNDERS</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {founders.map((f) => (
            <div key={f.name} style={{
              background: '#FFFFFF',
              border: '1px solid rgba(122, 87, 64, 0.15)', 
              padding: '2.8rem',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(122, 87, 64, 0.08)',
            }}
              onMouseEnter={e => { 
                e.currentTarget.style.borderColor = '#BFA06A'; 
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(122, 87, 64, 0.15)';
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.borderColor = 'rgba(122, 87, 64, 0.15)'; 
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(122, 87, 64, 0.08)';
              }}
            >
              <span style={{ fontSize: '1.6rem', color: '#BFA06A', display: 'block', marginBottom: '1.5rem' }}>{f.icon}</span>
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.4rem', letterSpacing: '0.08em', color: '#2C1F14', marginBottom: '0.5rem' }}>{f.name}</h3>
              <p style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7A5740', marginBottom: '1.5rem', fontWeight: 500 }}>{f.role}</p>
              <p style={{ fontSize: '0.8rem', lineHeight: 1.8, color: '#5C4B3A', letterSpacing: '0.03em' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Customer Feedback ── */}
      <section id="feedback" style={{ padding: '6rem 4rem', borderBottom: '1px solid rgba(122, 87, 64, 0.15)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center', background: 'linear-gradient(135deg, #F5EDE0 0%, #EAD8C2 100%)' }}>
        {/* Left — copy */}
        <div>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#7A5740', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ width: 30, height: 1, background: '#7A5740', display: 'inline-block' }} />
            Your Voice Matters
          </p>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.5rem,5vw,4.5rem)', lineHeight: 0.95, letterSpacing: '0.04em', marginBottom: '1.5rem', color: '#2C1F14' }}>
            SHARE YOUR<br />
            <em style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', color: '#BFA06A', fontSize: '0.85em' }}>experience.</em>
          </h2>
          <p style={{ fontSize: '0.8rem', lineHeight: 1.9, color: '#5C4B3A', letterSpacing: '0.05em', maxWidth: 360 }}>
            Every piece of feedback helps us grow. Whether it's about our quality, delivery, or custom printing — we want to hear it all. Your review shapes the next collection.
          </p>
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2rem' }}>
            {[['100%', 'PREMIUM QUALITY'], ['FAST', 'SHIPPING'], ['SECURE', 'CHECKOUT GUARANTEE']].map(([val, lbl]) => (
              <div key={lbl}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', color: '#BFA06A', display: 'block', lineHeight: 1 }}>{val}</span>
                <span style={{ fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7A5740', marginTop: '0.3rem', display: 'block', fontWeight: 500 }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div>
          {feedbackSent ? (
            <div style={{ textAlign: 'center', padding: '3rem', border: '2px solid #BFA06A', background: '#FFFFFF', borderRadius: '8px' }}>
              <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', color: '#2C1F14', letterSpacing: '0.1em' }}>THANK YOU!</p>
              <p style={{ fontSize: '0.75rem', color: '#7A5740', marginTop: '0.8rem', letterSpacing: '0.06em' }}>Your feedback means everything to us.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', background: '#FFFFFF', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(122, 87, 64, 0.1)' }}>
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
                        fontSize: '1.8rem', cursor: 'pointer',
                        color: star <= (hoverStar || feedback.rating) ? '#BFA06A' : 'rgba(122, 87, 64, 0.15)',
                        transition: 'color 0.2s',
                      }}
                    >★</span>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ ...labelStyle, color: '#7A5740' }}>Your Name</label>
                <input
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(122, 87, 64, 0.25)',
                    padding: '0.85rem 0',
                    color: '#2C1F14',
                    fontFamily: 'Jost,sans-serif',
                    fontSize: '0.85rem',
                    letterSpacing: '0.03em',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  placeholder="e.g. Arjun Sharma"
                  value={feedback.name}
                  onChange={e => setFeedback(p => ({ ...p, name: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = '#BFA06A'}
                  onBlur={e => e.target.style.borderColor = 'rgba(122, 87, 64, 0.25)'}
                />
              </div>
              <div>
                <label style={{ ...labelStyle, color: '#7A5740' }}>Email Address</label>
                <input
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(122, 87, 64, 0.25)',
                    padding: '0.85rem 0',
                    color: '#2C1F14',
                    fontFamily: 'Jost,sans-serif',
                    fontSize: '0.85rem',
                    letterSpacing: '0.03em',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  type="email"
                  placeholder="you@example.com"
                  value={feedback.email}
                  onChange={e => setFeedback(p => ({ ...p, email: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = '#BFA06A'}
                  onBlur={e => e.target.style.borderColor = 'rgba(122, 87, 64, 0.25)'}
                />
              </div>
              <div>
                <label style={{ ...labelStyle, color: '#7A5740' }}>Your Review</label>
                <textarea
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(122, 87, 64, 0.25)',
                    padding: '0.85rem 0',
                    color: '#2C1F14',
                    fontFamily: 'Jost,sans-serif',
                    fontSize: '0.85rem',
                    letterSpacing: '0.03em',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                    resize: 'none',
                    minHeight: 90
                  }}
                  placeholder="Tell us about your experience with LEEZOO..."
                  value={feedback.message}
                  onChange={e => setFeedback(p => ({ ...p, message: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = '#BFA06A'}
                  onBlur={e => e.target.style.borderColor = 'rgba(122, 87, 64, 0.25)'}
                />
              </div>
              <button
                onClick={() => { if (feedback.name && feedback.message) setFeedbackSent(true); }}
                style={{
                  background: '#BFA06A', color: '#FFFFFF',
                  border: 'none', padding: '0.95rem 2.5rem',
                  fontFamily: 'Jost,sans-serif', fontWeight: 500,
                  fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.3s', alignSelf: 'flex-start', borderRadius: '4px',
                }}
                onMouseEnter={e => { e.target.style.background = '#A0896D'; e.target.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.target.style.background = '#BFA06A'; e.target.style.transform = 'translateY(0)'; }}
              >Submit Review →</button>
            </div>
          )}
        </div>
      </section>

      {/* ── Contact Us ── */}
      <section id="contact-us" style={{ padding: '6rem 4rem', borderBottom: '1px solid rgba(122, 87, 64, 0.15)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start', background: 'linear-gradient(135deg, #F5EDE0 0%, #EAD8C2 100%)' }}>
        {/* Left — contact info */}
        <div>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#7A5740', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ width: 30, height: 1, background: '#7A5740', display: 'inline-block' }} />
            Get in Touch
          </p>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.5rem,5vw,4.5rem)', lineHeight: 0.95, letterSpacing: '0.04em', marginBottom: '1.5rem', color: '#2C1F14' }}>
            CONTACT<br />
            <em style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', color: '#BFA06A', fontSize: '0.85em' }}>us anytime.</em>
          </h2>
          <p style={{ fontSize: '0.8rem', lineHeight: 1.9, color: '#5C4B3A', letterSpacing: '0.05em', maxWidth: 360, marginBottom: '3rem' }}>
            Have a question about an order, custom printing, or just want to say hello? We're always here and happy to help.
          </p>

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            {[
              {
                icon: '◉',
                label: 'WhatsApp',
                value: '+91-9984090593 , +91-9169697273 , +91-9653026764',
                sub: 'Mon – Sat, 10am – 8pm IST',
                href: 'https://wa.me/919984090593',
              },
              {
                icon: '◉',
                label: 'Email',
                value: 'leezoo.official2026@gmail.com',
                sub: 'We reply within 24 hours',
                href: 'mailto:leezoo.official2026@gmail.com',
              },
              {
                icon: '◉',
                label: 'Location',
                value: 'India',
                sub: 'Manufacturing & Delivery across India',
                href: null,
              },
              {
                icon: '◉',
                label: 'Custom Orders',
                value: 'Bulk & Personalised Printing',
                sub: 'WhatsApp us for custom quotes',
                href: 'https://wa.me/919984090593',
              },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#BFA06A', fontSize: '1.2rem', marginTop: '0.2rem', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7A5740', marginBottom: '0.3rem', fontWeight: 600 }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} style={{ fontSize: '0.85rem', color: '#2C1F14', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s', fontWeight: 500 }}
                      onMouseEnter={e => e.target.style.color = '#BFA06A'}
                      onMouseLeave={e => e.target.style.color = '#2C1F14'}
                    >{item.value}</a>
                  ) : (
                    <p style={{ fontSize: '0.85rem', color: '#2C1F14', letterSpacing: '0.04em', fontWeight: 500 }}>{item.value}</p>
                  )}
                  <p style={{ fontSize: '0.7rem', color: '#7A5740', marginTop: '0.3rem', letterSpacing: '0.04em' }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — contact form */}
        <div>
          {contactSent ? (
            <div style={{ textAlign: 'center', padding: '3rem', border: '2px solid #BFA06A', background: '#FFFFFF', borderRadius: '8px' }}>
              <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', color: '#2C1F14', letterSpacing: '0.1em' }}>MESSAGE SENT!</p>
              <p style={{ fontSize: '0.75rem', color: '#7A5740', marginTop: '0.8rem', letterSpacing: '0.06em' }}>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', background: '#FFFFFF', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(122, 87, 64, 0.1)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7A5740', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Full Name</label>
                  <input style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(122, 87, 64, 0.25)',
                    padding: '0.8rem 0',
                    color: '#2C1F14',
                    fontFamily: 'Jost,sans-serif',
                    fontSize: '0.85rem',
                    letterSpacing: '0.03em',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                    placeholder="Your name"
                    value={contact.name} 
                    onChange={e => setContact(p => ({ ...p, name: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = '#BFA06A'}
                    onBlur={e => e.target.style.borderColor = 'rgba(122, 87, 64, 0.25)'}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7A5740', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Phone Number</label>
                  <input style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(122, 87, 64, 0.25)',
                    padding: '0.8rem 0',
                    color: '#2C1F14',
                    fontFamily: 'Jost,sans-serif',
                    fontSize: '0.85rem',
                    letterSpacing: '0.03em',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                    placeholder="+91 XXXXX XXXXX"
                    value={contact.phone} 
                    onChange={e => setContact(p => ({ ...p, phone: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = '#BFA06A'}
                    onBlur={e => e.target.style.borderColor = 'rgba(122, 87, 64, 0.25)'}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7A5740', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email Address</label>
                <input style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(122, 87, 64, 0.25)',
                  padding: '0.8rem 0',
                  color: '#2C1F14',
                  fontFamily: 'Jost,sans-serif',
                  fontSize: '0.85rem',
                  letterSpacing: '0.03em',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
                  type="email"
                  placeholder="you@example.com"
                  value={contact.email} 
                  onChange={e => setContact(p => ({ ...p, email: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = '#BFA06A'}
                  onBlur={e => e.target.style.borderColor = 'rgba(122, 87, 64, 0.25)'}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7A5740', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Message</label>
                <textarea style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(122, 87, 64, 0.25)',
                  padding: '0.8rem 0',
                  color: '#2C1F14',
                  fontFamily: 'Jost,sans-serif',
                  fontSize: '0.85rem',
                  letterSpacing: '0.03em',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                  resize: 'none',
                  minHeight: 110
                }}
                  placeholder="Tell us how we can help — orders, custom printing, bulk enquiries..."
                  value={contact.message} 
                  onChange={e => setContact(p => ({ ...p, message: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = '#BFA06A'}
                  onBlur={e => e.target.style.borderColor = 'rgba(122, 87, 64, 0.25)'}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button
                  onClick={() => { if (contact.name && contact.message) setContactSent(true); }}
                  style={{
                    background: '#BFA06A', color: '#FFFFFF',
                    border: 'none', padding: '0.95rem 2.5rem',
                    fontFamily: 'Jost,sans-serif', fontWeight: 500,
                    fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all 0.3s', borderRadius: '4px',
                  }}
                  onMouseEnter={e => { e.target.style.background = '#A0896D'; e.target.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.target.style.background = '#BFA06A'; e.target.style.transform = 'translateY(0)'; }}
                >Send Message →</button>
                <a href="https://wa.me/919984090593" target="_blank" rel="noreferrer" style={{
                  border: '1px solid #BFA06A', padding: '0.95rem 1.8rem',
                  fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#25D366', textDecoration: 'none', transition: 'all 0.3s', borderRadius: '4px', fontWeight: 500,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#25D366'; e.currentTarget.style.backgroundColor = 'rgba(37, 211, 102, 0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#BFA06A'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                >WhatsApp Us</a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Platforms ── */}
      <section id="platforms" style={{ padding: '4rem', borderBottom: '1px solid rgba(191,160,106,0.3)', background: 'var(--dark)' }}>
        <p style={{ textAlign: 'center', fontSize: '0.78rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(240,230,216,0.85)', marginBottom: '2.5rem', fontWeight: 600 }}>Also available on</p>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Amazon', 'Flipkart', 'Meesho', 'Myntra', 'AJIO'].map(p => (
            <a key={p} href="#" style={{
              display: 'inline-block', textDecoration: 'none', fontSize: '0.62rem',
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#E8D9C5',
              border: '1px solid rgba(191,160,106,0.4)', padding: '0.7rem 2rem', transition: 'all 0.3s',
              borderRadius: '2px',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#BFA06A'; e.currentTarget.style.color = '#BFA06A'; e.currentTarget.style.background = 'rgba(191,160,106,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(191,160,106,0.4)'; e.currentTarget.style.color = '#E8D9C5'; e.currentTarget.style.background = 'transparent'; }}
            >Shop on {p}</a>
          ))}
        </div>
      </section>

      {/* ── Footer links ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4rem', padding: '5rem 4rem 4rem', borderBottom: '1px solid rgba(191,160,106,0.2)', background: 'var(--dark)' }}>
        <div>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2.2rem', letterSpacing: '0.2em', marginBottom: '1rem', display: 'block', color: '#F0E6D8' }}>LEEZOO</span>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '0.95rem', color: '#BFA06A', letterSpacing: '0.1em' }}>Wear Your Edge.</p>
          <p style={{ fontSize: '0.75rem', lineHeight: 1.9, color: 'rgba(240,230,216,0.65)', marginTop: '1.2rem', letterSpacing: '0.05em', maxWidth: 280 }}>
            Premium T-shirts crafted for those who refuse the ordinary. Born in India, worn with pride.
          </p>
        </div>
        {cols.map(col => (
          <div key={col.title}>
            <h4 style={{ fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#BFA06A', marginBottom: '1.5rem' }}>{col.title}</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {col.links.map(link => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.72rem', letterSpacing: '0.08em', color: 'rgba(240,230,216,0.72)', textDecoration: 'none', transition: 'color 0.25s', cursor: 'pointer', fontFamily: 'Jost,sans-serif', textAlign: 'left' }}
                    onMouseEnter={e => e.target.style.color = '#BFA06A'}
                    onMouseLeave={e => e.target.style.color = 'rgba(240,230,216,0.72)'}
                  >{link.label}</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ padding: '1.8rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#2A1D13', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <p style={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: 'rgba(240,230,216,0.7)', fontFamily: 'Jost,sans-serif' }}>
            © {new Date().getFullYear()} LEEZOO. All rights reserved.
          </p>
          <p style={{ fontSize: '0.56rem', letterSpacing: '0.08em', color: 'rgba(191,160,106,0.55)', fontFamily: 'Jost,sans-serif' }}>
            Founded by Mohd Waqas, Praveen &amp; Suraj &nbsp;·&nbsp; Made with pride in India
          </p>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[
            { label: 'Instagram', href: 'https://www.instagram.com/leezoo.official?igsh=MW5oN2o2cm15eGNqZg%3D%3D&utm_source=qr' },
            { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61589738124360' },
            { label: 'WhatsApp', href: 'https://wa.me/919984090593' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,230,216,0.55)', textDecoration: 'none', transition: 'color 0.25s' }}
              onMouseEnter={e => e.target.style.color = '#BFA06A'}
              onMouseLeave={e => e.target.style.color = 'rgba(240,230,216,0.55)'}
            >{s.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}