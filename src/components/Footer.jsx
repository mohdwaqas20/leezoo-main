import { useState, useEffect } from 'react';

const contactMobileStyles = `
@media (max-width: 768px) {
  .contact-section {
    padding: 2.5rem 1.2rem !important;
    grid-template-columns: 1fr !important;
    gap: 2.5rem !important;
    overflow: hidden !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
  .contact-section > div {
    overflow: hidden !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
  .contact-details {
    gap: 1.4rem !important;
    width: 100% !important;
    overflow: hidden !important;
  }
  .contact-item {
    gap: 0.8rem !important;
    width: 100% !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
  }
  .contact-item > div {
    overflow: hidden !important;
    min-width: 0 !important;
    flex: 1 !important;
  }
  .contact-item-icon {
    font-size: 0.9rem !important;
    margin-top: 0.15rem !important;
    flex-shrink: 0 !important;
  }
  .contact-item-label {
    font-size: 0.5rem !important;
    margin-bottom: 0.2rem !important;
  }
  .contact-item-value {
    font-size: 0.72rem !important;
    word-break: break-all !important;
    overflow-wrap: break-word !important;
    white-space: normal !important;
    line-height: 1.7 !important;
    display: block !important;
    max-width: 100% !important;
  }
  .contact-item-sub {
    font-size: 0.6rem !important;
  }
  .contact-btns {
    flex-direction: column !important;
    gap: 0.75rem !important;
  }
  .contact-btn-send,
  .contact-btn-wa {
    width: 100% !important;
    text-align: center !important;
    padding: 0.9rem 1rem !important;
    box-sizing: border-box !important;
    display: block !important;
  }
}
`;

export default function Footer({ onNavigate }) {
  const [feedback, setFeedback] = useState({ name: '', email: '', rating: 0, message: '' });
  const [contact, setContact] = useState({ name: '', email: '', phone: '', message: '' });
  const [hoverStar, setHoverStar] = useState(0);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    if (!document.getElementById('contact-mobile-css')) {
      const style = document.createElement('style');
      style.id = 'contact-mobile-css';
      style.textContent = contactMobileStyles;
      document.head.appendChild(style);
    }
  }, []);
  useEffect(() => {
    if (contactSent) {
      const timer = setTimeout(() => {
        setContactSent(false);

        setContact({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [contactSent]);
  useEffect(() => {
    if (feedbackSent) {
      const timer = setTimeout(() => {
        setFeedbackSent(false);

        setFeedback({
          name: '',
          email: '',
          rating: 0,
          message: '',
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [feedbackSent]);

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
      name: 'Praveen',
      role: 'Co-Founder & Production Head',
      desc: 'Oversees production planning, sourcing, printing operations, quality control, and manufacturing excellence.',
      icon: '◈',
    },
    {
      name: 'Mohd Waqas',
      role: 'Co-Founder & Digital Operations Head',
      desc: 'Leads product design, online operations, marketplace management, e-commerce growth, and digital strategy across all platforms.',
      icon: '◈',
    },
    {
      name: 'Suraj',
      role: 'Co-Founder & Operations Head',
      desc: 'Manages day-to-day field operations, logistics coordination, fulfillment processes, and operational efficiency.',
      icon: '◈',
    },
    {
      name: 'Vishal',
      role: 'Co-Founder & Operations Head',
      desc: 'Supervises offline operations, inventory movement, logistics execution, and customer order fulfillment.',
      icon: '◈',
    },
    {
      name: 'Rahul',
      role: 'Sales Executive',
      desc: 'Drives customer acquisition, sales growth, lead generation, and business development through commission-based sales activities.',
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
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', minHeight: 'auto',
      }}>
        <div style={{ padding: 'clamp(2.5rem,6vw,6rem) clamp(1.5rem,5vw,5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
                <rect width="420" height="185" fill="white" />
                <rect x="224" y="47" width="72" height="11" rx="1" fill="black" />
              </mask>
              <mask id="lzO2">
                <rect width="420" height="185" fill="white" />
                <rect x="310" y="47" width="72" height="11" rx="1" fill="black" />
              </mask>
            </defs>

            <g className="lz-float-wrap">
              {/* L */}
              <line className="lz-s" x1="10" y1="14" x2="10" y2="96" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{ animationDelay: '0.3s' }} />
              <line className="lz-s" x1="10" y1="96" x2="56" y2="96" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{ animationDelay: '0.38s' }} />
              {/* E */}
              <line className="lz-s" x1="72" y1="14" x2="72" y2="96" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{ animationDelay: '0.46s' }} />
              <line className="lz-s" x1="72" y1="14" x2="116" y2="14" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{ animationDelay: '0.52s' }} />
              <line className="lz-s" x1="72" y1="55" x2="108" y2="55" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{ animationDelay: '0.58s' }} />
              <line className="lz-s" x1="72" y1="96" x2="116" y2="96" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{ animationDelay: '0.64s' }} />
              {/* E */}
              <line className="lz-s" x1="132" y1="14" x2="132" y2="96" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{ animationDelay: '0.72s' }} />
              <line className="lz-s" x1="132" y1="14" x2="176" y2="14" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{ animationDelay: '0.78s' }} />
              <line className="lz-s" x1="132" y1="55" x2="168" y2="55" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{ animationDelay: '0.84s' }} />
              <line className="lz-s" x1="132" y1="96" x2="176" y2="96" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{ animationDelay: '0.9s' }} />
              {/* Z */}
              <line className="lz-s" x1="192" y1="14" x2="232" y2="14" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{ animationDelay: '0.98s' }} />
              <line className="lz-s" x1="232" y1="14" x2="192" y2="96" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{ animationDelay: '1.06s' }} />
              <line className="lz-s" x1="192" y1="96" x2="232" y2="96" stroke="#4A3008" strokeWidth="7.5" strokeLinecap="square" style={{ animationDelay: '1.12s' }} />
              {/* O */}
              <circle className="lz-s" cx="268" cy="55" r="40" stroke="#4A3008" strokeWidth="7.5" fill="none" mask="url(#lzO1)" style={{ animationDelay: '1.2s' }} />
              {/* O */}
              <circle className="lz-s" cx="354" cy="55" r="40" stroke="#4A3008" strokeWidth="7.5" fill="none" mask="url(#lzO2)" style={{ animationDelay: '1.32s' }} />

              {/* Tagline — pushed down with generous gap */}
              <line className="lz-ln" x1="25" y1="148" x2="128" y2="148" stroke="#3D2606" strokeWidth="0.85" style={{ animationDelay: '1.9s' }} />
              <text className="lz-tl" x="200" y="153" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="12" fill="#4A3008" letterSpacing="6" fontWeight="600" style={{ animationDelay: '1.9s' }}>WEAR YOUR EDGE</text>
              <line className="lz-ln" x1="295" y1="148" x2="398" y2="148" stroke="#3D2606" strokeWidth="0.85" style={{ animationDelay: '1.9s' }} />
            </g>
          </svg>
        </div>
      </section>

      {/* ── Meet the Founders ── */}
      <section id="founders" style={{ padding: 'clamp(3rem,6vw,6rem) clamp(1rem,4vw,4rem)', borderBottom: '1px solid rgba(122, 87, 64, 0.15)', background: 'linear-gradient(135deg, #F5EDE0 0%, #EAD8C2 100%)' }}>
        <p style={{
          fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase',
          color: '#7A5740', marginBottom: '1rem',
          display: 'flex', alignItems: 'center', gap: '0.8rem',
        }}>
          <span style={{ width: 30, height: 1, background: '#7A5740', display: 'inline-block' }} />
          The Team Behind LEEZOO
        </p>
        <h2 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 'clamp(2.5rem,5vw,4rem)', letterSpacing: '0.04em',
          marginBottom: '1.5rem',
          color: '#2C1F14',
        }}>MEET THE LEADERSHIP TEAM</h2>
        <p style={{
          maxWidth: '750px',
          fontSize: '0.95rem',
          lineHeight: 1.8,
          color: '#5C4B3A',
          marginBottom: '3rem',
          letterSpacing: '0.02em',
          margin: '0 auto 3rem'
        }}>
          The people driving LEEZOO forward through innovation, production excellence, operations management, and customer-focused growth.
        </p>

        {/* All 5 Team Members - Single Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', maxWidth: '1400px', margin: '0 auto' }} className="founders-grid">
          {founders.map((f) => (
            <div key={f.name} className="founder-card" style={{
              background: f.name === 'Rahul'
                ? 'linear-gradient(135deg, #FFF9F0 0%, #F8EDE2 100%)'
                : '#FFFFFF',
              border: f.name === 'Rahul' 
                ? '2px solid #BFA06A' 
                : '2px solid rgba(191,160,106,0.3)',
              padding: '2.2rem 1.8rem',
              borderRadius: '16px',
              minHeight: '280px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              boxShadow: f.name === 'Rahul'
                ? '0 6px 16px rgba(191,160,106,0.16)'
                : '0 2px 8px rgba(122, 87, 64, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#BFA06A';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = f.name === 'Rahul'
                  ? '0 12px 24px rgba(191,160,106,0.2)'
                  : '0 8px 20px rgba(122, 87, 64, 0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = f.name === 'Rahul' ? '#BFA06A' : 'rgba(191,160,106,0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = f.name === 'Rahul'
                  ? '0 6px 16px rgba(191,160,106,0.16)'
                  : '0 2px 8px rgba(122, 87, 64, 0.04)';
              }}
            >
              <span style={{ fontSize: '1.5rem', color: '#BFA06A', display: 'block', marginBottom: '0.9rem', position: 'relative', zIndex: 1 }}>{f.icon}</span>
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.15rem', letterSpacing: '0.08em', color: '#2C1F14', marginBottom: '0.4rem', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>{f.name}</h3>
              <p style={{ fontSize: '0.52rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: f.name === 'Rahul' ? '#BFA06A' : '#BFA06A', marginBottom: '1rem', fontWeight: 600, position: 'relative', zIndex: 1 }}>{f.role}</p>
              <p className="founder-desc" style={{ fontSize: '0.72rem', lineHeight: 1.7, color: '#5C4B3A', letterSpacing: '0.01em', position: 'relative', zIndex: 1 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Customer Feedback ── */}
      <section id="feedback" style={{ padding: 'clamp(3rem,6vw,6rem) clamp(1rem,4vw,4rem)', borderBottom: '1px solid rgba(122, 87, 64, 0.15)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(2rem,4vw,6rem)', alignItems: 'center', background: 'linear-gradient(135deg, #F5EDE0 0%, #EAD8C2 100%)' }}>
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
      <section id="contact-us" className="contact-section" style={{ padding: 'clamp(3rem,6vw,6rem) clamp(1rem,4vw,4rem)', borderBottom: '1px solid rgba(122, 87, 64, 0.15)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(2rem,4vw,6rem)', alignItems: 'start', background: 'linear-gradient(135deg, #F5EDE0 0%, #EAD8C2 100%)' }}>
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
          <div className="contact-details" style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            {[
              {
                icon: '◉',
                label: 'WhatsApp',
                value: '+91-9984090593, +91-9653026746 , +91-9118604515 ',
                sub: '24*7',
                href: 'https://wa.me/919984090593',
              },

              {
                icon: '◉',
                label: 'Calling Number',
                value: '+91-9169697273, +91-9653026746 , +91-9118604515 ',
                sub: 'Mon – Sat, 10am – 8pm IST',
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
              <div key={item.label} className="contact-item" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <span className="contact-item-icon" style={{ color: '#BFA06A', fontSize: '1.2rem', marginTop: '0.2rem', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p className="contact-item-label" style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7A5740', marginBottom: '0.3rem', fontWeight: 600 }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="contact-item-value" style={{ fontSize: '0.85rem', color: '#2C1F14', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s', fontWeight: 500 }}
                      onMouseEnter={e => e.target.style.color = '#BFA06A'}
                      onMouseLeave={e => e.target.style.color = '#2C1F14'}
                    >{item.value}</a>
                  ) : (
                    <p className="contact-item-value" style={{ fontSize: '0.85rem', color: '#2C1F14', letterSpacing: '0.04em', fontWeight: 500 }}>{item.value}</p>
                  )}
                  <p className="contact-item-sub" style={{ fontSize: '0.7rem', color: '#7A5740', marginTop: '0.3rem', letterSpacing: '0.04em' }}>{item.sub}</p>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1.5rem' }}>
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
              <div className="contact-btns" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button
                  onClick={() => {
                    if (contact.name && contact.message) {
                      const waMessage = encodeURIComponent(
                        `Hello LEEZOO Team,\n\n` +
                        `I am reaching out regarding an enquiry. Here are my details:\n\n` +
                        `*Name:* ${contact.name}\n` +
                        `*Phone:* ${contact.phone || 'Not provided'}\n` +
                        `*Email:* ${contact.email || 'Not provided'}\n\n` +
                        `*My Message:*\n${contact.message}\n\n` +
                        `Kindly get back to me at your earliest convenience.\n` +
                        `Thank you.`
                      );
                      window.open(`https://wa.me/919984090593?text=${waMessage}`, '_blank');
                      setContactSent(true);
                    }
                  }}
                  className="contact-btn-send"
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
                <a href="mailto:leezoo.official2026@gmail.com"
                  className="contact-btn-wa"
                  style={{
                    border: '1px solid #BFA06A', padding: '0.95rem 1.8rem',
                    fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'var(--dark)', textDecoration: 'none', transition: 'all 0.3s', borderRadius: '4px', fontWeight: 500,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.backgroundColor = 'var(--accent)'; e.currentTarget.style.color = '#1a0f00'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#BFA06A'; e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--dark)'; }}
                >Email Us</a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Platforms ── */}
      <section id="platforms" style={{ padding: 'clamp(2rem,4vw,4rem) clamp(1rem,3vw,4rem)', borderBottom: '1px solid rgba(191,160,106,0.3)', background: 'var(--dark)' }}>
        <p style={{ textAlign: 'center', fontSize: '0.78rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(240,230,216,0.85)', marginBottom: '2.5rem', fontWeight: 600 }}>Also available on</p>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Amazon', 'Flipkart', 'Meesho', 'Myntra', 'AJIO'].map(p => (
            <button key={p} onClick={(e) => e.preventDefault()} style={{
              display: 'inline-block', textDecoration: 'none', fontSize: '0.62rem',
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#E8D9C5',
              border: '1px solid rgba(191,160,106,0.4)', padding: '0.7rem 2rem', transition: 'all 0.3s',
              borderRadius: '2px', background: 'transparent', cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#BFA06A'; e.currentTarget.style.color = '#BFA06A'; e.currentTarget.style.background = 'rgba(191,160,106,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(191,160,106,0.4)'; e.currentTarget.style.color = '#E8D9C5'; e.currentTarget.style.background = 'transparent'; }}
            >Shop on {p}</button>
          ))}
        </div>
      </section>

      {/* ── Footer links ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'clamp(2rem,3vw,4rem)', padding: 'clamp(2.5rem,4vw,5rem) clamp(1rem,4vw,4rem) clamp(2rem,3vw,4rem)', borderBottom: '1px solid rgba(191,160,106,0.2)', background: 'var(--dark)' }}>
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
      <div style={{ padding: '1.5rem clamp(1rem,4vw,4rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#2A1D13', flexWrap: 'wrap', gap: '1rem' }}>
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