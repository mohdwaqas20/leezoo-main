import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function ProductSlider({ title, products = [], loading = false, onShopAll, onViewProduct }) {
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(3);

  const maxIdx = Math.max(0, products.length - perView);

  useEffect(() => {
    const getPerView = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1100 ? 2 : 3;
    const update = () => setPerView(getPerView());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Clamp current index when perView changes
  useEffect(() => {
    setCurrent(c => Math.min(c, Math.max(0, products.length - perView)));
  }, [perView, products.length]);

  const go = (dir) => {
    setCurrent(c => dir === 'next' ? Math.min(c + 1, maxIdx) : Math.max(c - 1, 0));
  };

  if (loading) {
    return (
      <section style={{ padding: '3rem 0 0', background: 'transparent' }}>
        <div style={{ padding: '0 clamp(1rem,4vw,4rem) 1.5rem', borderBottom: '2px solid rgba(122,87,64,0.25)', marginBottom: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 className="slider-section-title" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(3rem,6vw,5rem)', letterSpacing: '0.05em', color: '#1a1008', fontWeight: 900 }}>{title}</h2>
        </div>
        <div style={{ display: 'flex', gap: 2, overflow: 'hidden' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ minWidth: '33.333%', height: 520, background: 'var(--mid)', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '3rem 0 0', background: 'transparent' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        padding: '0 clamp(1rem,4vw,4rem) 1.5rem', borderBottom: '2px solid rgba(122,87,64,0.25)', marginBottom: '0',
      }}>
        <h2 className="slider-section-title" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(3rem,6vw,5rem)', letterSpacing: '0.05em', color: '#1a1008', fontWeight: 900 }}>{title}</h2>
        <button onClick={onShopAll} style={{
          fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#1a1008', background: 'none', border: 'none', cursor: 'pointer',
          fontWeight: 700, borderBottom: '1.5px solid #1a1008', paddingBottom: 3,
          transition: 'color 0.2s, border-color 0.2s', fontFamily: 'Jost,sans-serif',
        }}
          onMouseEnter={e => { e.target.style.color = 'var(--brown)'; e.target.style.borderColor = 'var(--brown)'; }}
          onMouseLeave={e => { e.target.style.color = '#1a1008'; e.target.style.borderColor = '#1a1008'; }}
        >Shop All →</button>
      </div>

      {/* Track */}
      <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
        <div style={{
          display: 'flex',
          transform: `translateX(-${(100 / perView) * current}%)`,
          transition: 'transform 0.65s cubic-bezier(0.16,1,0.3,1)',
          willChange: 'transform',
        }}>
          {products.map((product, i) => (
            <div key={product.id || i} style={{ minWidth: `${100 / perView}%`, flexShrink: 0 }}>
              <ProductCard product={product} variant="slide" onView={onViewProduct} />
            </div>
          ))}
        </div>
      </div>

      {/* Manual controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '2.5rem 0' }}>
        <SliderBtn onClick={() => go('prev')} disabled={current === 0} label="Previous">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </SliderBtn>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: 30, padding: '0.6rem 1rem' }}>
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: 11, height: 11, borderRadius: '50%',
              background: i === current ? '#2a1f14' : 'var(--accent)',
              border: 'none', cursor: 'pointer',
              transform: i === current ? 'scale(1.2)' : 'scale(1)',
              transition: 'all 0.3s',
            }} />
          ))}
        </div>

        <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', opacity: 0.7, fontFamily: 'Jost,sans-serif' }}>
          {current + 1} / {maxIdx + 1}
        </span>

        <SliderBtn onClick={() => go('next')} disabled={current >= maxIdx} label="Next">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </SliderBtn>
      </div>
    </section>
  );
}

function SliderBtn({ children, onClick, disabled, label }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      style={{
        width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--border-light)',
        background: 'transparent', color: 'var(--dark)', cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: disabled ? 0.3 : 1, transition: 'all 0.25s',
      }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; } }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--white)'; }}
    >{children}</button>
  );
}