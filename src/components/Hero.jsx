import { useState, useRef, useEffect } from 'react';

export default function Hero({ onNavigate }) {
  const [dropOpen, setDropOpen] = useState(false);
  const [dropPos, setDropPos] = useState({ top: 0, left: 0, width: 0 });
  const dropRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!dropOpen) return;
    const updatePos = () => {
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        setDropPos({ top: rect.bottom + 8, left: rect.left, width: rect.width });
      }
    };
    window.addEventListener('scroll', updatePos, true);
    return () => window.removeEventListener('scroll', updatePos, true);
  }, [dropOpen]);

  const toggleDrop = () => {
    if (!dropOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setDropPos({ top: rect.bottom + 8, left: rect.left, width: rect.width });
    }
    setDropOpen(o => !o);
  };

  return (
    <section style={{
      position: 'relative',
      zIndex: 0,
      height: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      /* Single unified warm cream background — no split panel */
      background: 'linear-gradient(150deg, #F0E6D8 0%, #EAD8C2 40%, #E2CDB0 75%, #D9C3A5 100%)',
    }}>

      {/* Subtle linen texture overlay — covers entire section uniformly */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(100,70,40,0.035) 3px, rgba(100,70,40,0.035) 6px),
          repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(100,70,40,0.025) 3px, rgba(100,70,40,0.025) 6px)
        `,
      }} />

      {/* Radial warm glow — subtle, centre-right */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 65% 50%, rgba(191,160,106,0.15) 0%, transparent 60%)',
      }} />

      {/* T-shirt silhouette — right side, same background tones, NO separate panel */}
      <div style={{
        position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)',
        opacity: 0.18, pointerEvents: 'none',
      }}>
        <svg viewBox="0 0 260 280" width="320" height="350" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* T-shirt outline */}
          <path
            d="M75 35 L20 80 L55 95 L55 255 L205 255 L205 95 L240 80 L185 35 Q162 58 130 58 Q98 58 75 35Z"
            stroke="#7A5740"
            strokeWidth="1.5"
            fill="none"
          />
          {/* LEEZOO text inside shirt */}
          <text
            x="130" y="168"
            textAnchor="middle"
            fill="#7A5740"
            fontFamily="'Bebas Neue', sans-serif"
            fontSize="28"
            letterSpacing="6"
          >LEEZOO</text>
        </svg>
      </div>

      {/* Vertical gold accent line — far right */}
      <div style={{
        position: 'absolute', right: '4rem', top: '20%',
        width: 1, height: '35%',
        background: 'linear-gradient(to bottom, transparent, rgba(191,160,106,0.55), transparent)',
        pointerEvents: 'none',
      }} />

      {/* ── MAIN CONTENT ── */}
      <div style={{ position: 'relative', zIndex: 2, padding: '0 5rem', maxWidth: 720 }}>

        {/* Tag line */}
        <p style={{
          fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase',
          color: '#7A5740',
          fontWeight: 500,
          marginBottom: '2rem',
          display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
          <span style={{ width: 36, height: 2, background: '#7A5740', display: 'inline-block' }} />
          EDGE COLLECTION 2026
        </p>

        {/* H1 */}
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(5rem, 11vw, 10rem)',
          lineHeight: 0.9,
          letterSpacing: '0.02em',
          color: '#2C1F14',       /* strong dark brown — fully readable */
          animation: 'heroIn 1.2s cubic-bezier(0.16,1,0.3,1) both',
          marginBottom: '0.15em',
        }}>
          IMPOSSIBLE
        </h1>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(3.8rem, 9vw, 8rem)',
          lineHeight: 1,
          color: '#7A5740',       /* warm medium brown — distinct, clearly readable */
          marginBottom: 0,
          animation: 'heroIn 1.4s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          to overlook.
        </p>

        {/* Sub text */}
        <p style={{
          marginTop: '2.2rem',
          fontSize: '0.88rem',
          letterSpacing: '0.08em',
          color: '#5C3D25',       /* darker warm brown — NOT muted rgba, fully readable */
          lineHeight: 1.9,
          maxWidth: 340,
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
        }}>
          Not made to blend in. Every thread tells your story.
        </p>

        {/* Buttons */}
        <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div ref={dropRef} style={{ position: 'relative', display: 'inline-block' }}>
            <button
              ref={btnRef}
              onClick={toggleDrop}
              style={{
                background: '#2C1F14',
                color: '#F0E6D8',
                border: 'none', cursor: 'pointer',
                padding: '1rem 2.4rem',
                display: 'flex', alignItems: 'center', gap: '0.7rem',
                fontFamily: 'Jost, sans-serif', fontWeight: 400,
                fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase',
                transition: 'background 0.25s, color 0.25s',
                boxShadow: '0 6px 24px rgba(44,31,20,0.22)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#BFA06A'; e.currentTarget.style.color = '#2C1F14'; }}
              onMouseLeave={e => { if (!dropOpen) { e.currentTarget.style.background = '#2C1F14'; e.currentTarget.style.color = '#F0E6D8'; } }}
            >
              EXPLORE COLLECTION
              <svg viewBox="0 0 10 6" style={{ width: 9, height: 9, stroke: 'currentColor', fill: 'none', strokeWidth: 2, flexShrink: 0, transform: dropOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s' }}>
                <path d="M1 1l4 4 4-4" />
              </svg>
            </button>

            {/* DROPDOWN — inside dropRef so clicks register before outside-click fires */}
            {dropOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                minWidth: 240,
                zIndex: 9999,
                background: '#F5EDE0',
                border: '1px solid rgba(191,160,106,0.35)',
                boxShadow: '0 20px 50px rgba(44,31,20,0.18)',
                animation: 'heroDropIn 0.2s cubic-bezier(0.16,1,0.3,1) both',
              }}>
                {[
                  { label: 'Shop Men', desc: "Premium men's collection", icon: '♂', page: 'shop-men' },
                  { label: 'Shop Women', desc: "Curated women's styles", icon: '♀', page: 'shop-women' },
                ].map((item, idx) => (
                  <button
                    key={item.label}
                    onClick={() => { setDropOpen(false); onNavigate?.(item.page); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      width: '100%', padding: '1rem 1.2rem',
                      background: 'none', border: 'none', cursor: 'pointer',
                      borderBottom: idx === 0 ? '1px solid rgba(191,160,106,0.2)' : 'none',
                      textAlign: 'left', transition: 'background 0.18s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(191,160,106,0.12)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <div style={{
                      width: 38, height: 38, flexShrink: 0,
                      background: 'rgba(191,160,106,0.15)',
                      border: '1px solid rgba(191,160,106,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#BFA06A', fontSize: '1.1rem',
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2C1F14', fontFamily: 'Jost,sans-serif', fontWeight: 500, marginBottom: '0.2rem' }}>{item.label}</p>
                      <p style={{ fontSize: '0.6rem', color: '#7A5740', letterSpacing: '0.05em', fontFamily: 'Jost,sans-serif' }}>{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              color: '#2C1F14',
              background: 'none', border: 'none',
              borderBottom: '1px solid rgba(44,31,20,0.5)',
              paddingBottom: 3,
              fontFamily: 'Jost, sans-serif', fontSize: '0.62rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', cursor: 'pointer',
              opacity: 0.75, transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0.75}
          >DISCOVER LEEZOO</button>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', right: '3.5rem', bottom: '3rem', zIndex: 3,
        writingMode: 'vertical-rl', fontSize: '0.52rem', letterSpacing: '0.32em',
        color: '#7A5740', opacity: 0.55, textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: '0.8rem',
      }}>
        Scroll
        <span style={{ width: 1, height: 48, background: '#7A5740', display: 'block', animation: 'scrollPulse 2s ease-in-out infinite' }} />
      </div>

      <style>{`
        @keyframes heroDropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}