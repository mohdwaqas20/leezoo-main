export default function Hero() {
  return (
    <section style={{
      position: 'relative', height: 'calc(100vh - 100px)',
      display: 'flex', alignItems: 'flex-end', overflow: 'hidden',
      background: 'var(--mid)',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse at 70% 40%, rgba(196,153,90,0.12) 0%, transparent 60%),
          linear-gradient(160deg, #1a1208 0%, #0D0D0D 50%, #111008 100%)
        `,
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.012) 2px,rgba(255,255,255,0.012) 4px),
            repeating-linear-gradient(90deg,transparent,transparent 2px,rgba(255,255,255,0.012) 2px,rgba(255,255,255,0.012) 4px)
          `,
        }} />
      </div>

      {/* Right side graphic placeholder (replace with real image) */}
      <div style={{
        position: 'absolute', right: 0, top: 0, width: '50%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* T-shirt silhouette illustration */}
        <svg viewBox="0 0 400 450" width="380" height="420" style={{ opacity: 0.15 }}>
          <path d="M120 60 L60 120 L110 140 L110 400 L290 400 L290 140 L340 120 L280 60 Q240 100 200 100 Q160 100 120 60Z"
            fill="var(--white)" stroke="var(--accent)" strokeWidth="1"/>
          <text x="200" y="250" textAnchor="middle" fill="var(--accent)"
            fontFamily="'Bebas Neue',sans-serif" fontSize="48" letterSpacing="8" opacity="0.6">LEEZOO</text>
        </svg>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '0 5rem 5rem', maxWidth: 700 }}>
        <p style={{
          fontSize: '0.62rem', letterSpacing: '0.35em', textTransform: 'uppercase',
          color: 'var(--accent)', marginBottom: '1.8rem',
          display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
          <span style={{ width: 40, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
          EDGE COLLECTION 2026
        </p>

        <h1 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 'clamp(5rem,11vw,10rem)',
          lineHeight: 0.88, letterSpacing: '0.03em',
          animation: 'heroIn 1.2s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          IMPOSSIBLE<br />
          <span style={{
            fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic',
            fontSize: 'clamp(4rem,9vw,8rem)', color: 'var(--sand)', opacity: 0.7, display: 'block',
          }}>to overlook.</span>
        </h1>

        <p style={{
          marginTop: '2rem', fontSize: '0.8rem', letterSpacing: '0.1em',
          opacity: 0.45, lineHeight: 1.8, maxWidth: 320,
        }}>Not made to blend in. Every thread tells your story.</p>

        <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="#shop-men" style={{
            background: 'var(--white)', color: 'var(--ink)',
            padding: '0.95rem 2.8rem', textDecoration: 'none',
            fontFamily: 'Barlow,sans-serif', fontWeight: 300,
            fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase',
            transition: 'background 0.3s',
          }}
            onMouseEnter={e => e.target.style.background = 'var(--accent)'}
            onMouseLeave={e => e.target.style.background = 'var(--white)'}
          >EXPLORE COLLECTION →</a>
          <a href="#about" style={{
            color: 'var(--white)', borderBottom: '1px solid rgba(255,255,255,0.3)',
            paddingBottom: 3, opacity: 0.6, textDecoration: 'none',
            fontFamily: 'Barlow,sans-serif', fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase',
          }}>DISCOVER LEEZOO</a>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', right: '4rem', bottom: '3rem', zIndex: 3,
        writingMode: 'vertical-rl', fontSize: '0.55rem', letterSpacing: '0.3em',
        opacity: 0.3, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.8rem',
      }}>
        Scroll
        <span style={{ width: 1, height: 50, background: 'var(--white)', display: 'block', animation: 'scrollPulse 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
}
