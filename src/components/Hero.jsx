import { useState, useRef, useEffect } from 'react';

export default function Hero({ onNavigate }) {
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <section style={{
      position: 'relative', zIndex: 0,
      height: 'calc(100vh - 24px)',
      minHeight: 500,
      display: 'flex', alignItems: 'center',
      overflow: 'hidden',
      background: 'linear-gradient(150deg, #F0E6D8 0%, #EAD8C2 40%, #E2CDB0 75%, #D9C3A5 100%)',
    }} className="hero-section">
      {/* Linen texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(100,70,40,0.035) 3px, rgba(100,70,40,0.035) 6px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(100,70,40,0.025) 3px, rgba(100,70,40,0.025) 6px)`,
      }} />
      {/* Glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 65% 50%, rgba(191,160,106,0.15) 0%, transparent 60%)',
      }} />

      {/* T-shirt — full size on desktop, hidden on mobile */}
      <div style={{ position: 'absolute', right: '-1%', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
        className="desktop-only">
        <img
          src="https://tpsjxaqxsedgshxiqvst.supabase.co/storage/v1/object/public/Web%20images%20Home%20LEEZOO/HomePage-1.png"
          alt="LEEZOO T-Shirt"
          style={{ width: 'clamp(300px, 38vw, 600px)', height: 'auto' }}
        />
      </div>

      {/* Gold accent line */}
      <div className="desktop-only" style={{ position: 'absolute', right: '4rem', top: '20%', width: 1, height: '35%',
        background: 'linear-gradient(to bottom, transparent, rgba(191,160,106,0.55), transparent)', pointerEvents: 'none' }} />

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '0 clamp(1.5rem,5vw,5rem)', maxWidth: 720 }}>
        <p className="hero-eyebrow" style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#7A5740', fontWeight: 500, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ width: 36, height: 2, background: '#7A5740', display: 'inline-block', flexShrink: 0 }} />
          EDGE COLLECTION
        </p>

        <h1 className="hero-title" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(4rem,11vw,10rem)', lineHeight: 0.9, letterSpacing: '0.02em', color: '#2C1F14', animation: 'heroIn 1.2s cubic-bezier(0.16,1,0.3,1) both', marginBottom: '0.15em' }}>
          IMPOSSIBLE
        </h1>
        <p className="hero-subtitle" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(3rem,9vw,8rem)', lineHeight: 1, color: '#7A5740', marginBottom: 0, animation: 'heroIn 1.4s cubic-bezier(0.16,1,0.3,1) both' }}>
          to overlook.
        </p>

        <p className="hero-body" style={{ marginTop: '2.2rem', fontSize: '0.88rem', letterSpacing: '0.08em', color: '#5C3D25', lineHeight: 1.9, maxWidth: 340, fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
          Not made to blend in. Every thread tells your story.
        </p>

        <div className="hero-cta" style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div ref={dropRef} style={{ position: 'relative', display: 'inline-block' }}>
            <button onClick={() => setDropOpen(o => !o)} style={{
              background: '#2C1F14', color: '#F0E6D8', border: 'none', cursor: 'pointer',
              padding: '1rem 2.4rem', display: 'flex', alignItems: 'center', gap: '0.7rem',
              fontFamily: 'Jost, sans-serif', fontWeight: 400,
              fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase',
              transition: 'background 0.25s, color 0.25s', boxShadow: '0 6px 24px rgba(44,31,20,0.22)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#BFA06A'; e.currentTarget.style.color = '#2C1F14'; }}
              onMouseLeave={e => { if (!dropOpen) { e.currentTarget.style.background = '#2C1F14'; e.currentTarget.style.color = '#F0E6D8'; } }}
            >
              EXPLORE COLLECTION
              <svg viewBox="0 0 10 6" style={{ width: 9, height: 9, stroke: 'currentColor', fill: 'none', strokeWidth: 2, flexShrink: 0, transform: dropOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s' }}>
                <path d="M1 1l4 4 4-4" />
              </svg>
            </button>
            {dropOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, minWidth: 240, zIndex: 9999, background: '#F5EDE0', border: '1px solid rgba(191,160,106,0.35)', boxShadow: '0 20px 50px rgba(44,31,20,0.18)', animation: 'heroDropIn 0.2s cubic-bezier(0.16,1,0.3,1) both' }}>
                {[
                  { label: 'Shop Men', desc: "Premium men's collection", icon: '♂', page: 'shop-men' },
                  { label: 'Shop Women', desc: "Curated women's styles", icon: '♀', page: 'shop-women' },
                ].map((item, idx) => (
                  <button key={item.label} onClick={() => { setDropOpen(false); onNavigate?.(item.page); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', padding: '1rem 1.2rem', background: 'none', border: 'none', cursor: 'pointer', borderBottom: idx === 0 ? '1px solid rgba(191,160,106,0.2)' : 'none', textAlign: 'left', transition: 'background 0.18s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(191,160,106,0.12)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <div style={{ width: 38, height: 38, flexShrink: 0, background: 'rgba(191,160,106,0.15)', border: '1px solid rgba(191,160,106,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#BFA06A', fontSize: '1.1rem' }}>{item.icon}</div>
                    <div>
                      <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2C1F14', fontFamily: 'Jost,sans-serif', fontWeight: 500, marginBottom: '0.2rem' }}>{item.label}</p>
                      <p style={{ fontSize: '0.6rem', color: '#7A5740', letterSpacing: '0.05em', fontFamily: 'Jost,sans-serif' }}>{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ color: '#2C1F14', background: 'none', border: 'none', borderBottom: '1px solid rgba(44,31,20,0.5)', paddingBottom: 3, fontFamily: 'Jost, sans-serif', fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer', opacity: 0.75, transition: 'opacity 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0.75}
          >DISCOVER LEEZOO</button>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="desktop-only" style={{ position: 'absolute', right: '3.5rem', bottom: '3rem', zIndex: 3, writingMode: 'vertical-rl', fontSize: '0.52rem', letterSpacing: '0.32em', color: '#7A5740', opacity: 0.55, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        Scroll
        <span style={{ width: 1, height: 48, background: '#7A5740', display: 'block', animation: 'scrollPulse 2s ease-in-out infinite' }} />
      </div>

      <style>{`
        @keyframes heroDropIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

        /* ── MOBILE (≤768px) ── */
        @media (max-width: 768px) {
          .hero-section {
            height: auto !important;
            min-height: unset !important;
            align-items: flex-start !important;
            padding-top: 3.5rem !important;
            padding-bottom: 12rem !important;
            overflow: visible !important;
          }
          .hero-title {
            font-size: clamp(3rem, 15vw, 5rem) !important;
          }
          .hero-subtitle {
            font-size: clamp(2rem, 12vw, 4rem) !important;
          }
          .hero-body {
            font-size: 0.78rem !important;
            margin-top: 1.2rem !important;
          }
          .hero-cta {
            margin-top: 2rem !important;
          }
          .hero-eyebrow {
            margin-bottom: 1.2rem !important;
          }
        }

        /* ── IPAD / TABLET (769px–1024px) ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-section {
            height: auto !important;
            min-height: unset !important;
            align-items: flex-start !important;
            padding-top: 4rem !important;
            padding-bottom: 14rem !important;
            overflow: visible !important;
          }
          .hero-title {
            font-size: clamp(3.5rem, 10vw, 6rem) !important;
          }
          .hero-subtitle {
            font-size: clamp(2.5rem, 8vw, 5rem) !important;
          }
          .hero-body {
            font-size: 0.82rem !important;
            margin-top: 1.5rem !important;
          }
          .hero-cta {
            margin-top: 2.2rem !important;
          }
        }
      `}</style>
    </section>
  );
}