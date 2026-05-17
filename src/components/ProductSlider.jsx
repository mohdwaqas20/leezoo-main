import { useState, useEffect, useRef, useCallback } from 'react';
import ProductCard from './ProductCard';

export default function ProductSlider({ title, products = [], loading = false }) {
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(3);
  const timerRef = useRef(null);

  const maxIdx = Math.max(0, products.length - perView);

  const getPerView = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1100 ? 2 : 3;

  useEffect(() => {
    const update = () => setPerView(getPerView());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const resetAuto = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => c >= maxIdx ? 0 : c + 1);
    }, 4000);
  }, [maxIdx]);

  useEffect(() => {
    resetAuto();
    return () => clearInterval(timerRef.current);
  }, [resetAuto]);

  const go = (dir) => {
    setCurrent(c => dir === 'next' ? Math.min(c + 1, maxIdx) : Math.max(c - 1, 0));
    resetAuto();
  };

  if (loading) {
    return (
      <section style={{ padding: '6rem 0 0', background: 'var(--ink)' }}>
        <div style={{ padding: '0 4rem 1.5rem', borderBottom: '1px solid var(--border)', marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)', letterSpacing: '0.05em' }}>{title}</h2>
        </div>
        <div style={{ display: 'flex', gap: 2, overflow: 'hidden' }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ minWidth: '33.333%', height: 520, background: 'var(--mid)', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '6rem 0 0', background: 'var(--ink)' }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        padding: '0 4rem 1.5rem', borderBottom: '1px solid var(--border)', marginBottom: '3rem',
      }}>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)', letterSpacing: '0.05em' }}>{title}</h2>
        <a href="#" style={{
          fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'var(--white)', textDecoration: 'none', opacity: 0.45,
          borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 2,
        }}>Shop All →</a>
      </div>

      <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
        <div style={{
          display: 'flex',
          transform: `translateX(-${(100 / perView) * current}%)`,
          transition: 'transform 0.65s cubic-bezier(0.16,1,0.3,1)',
        }}>
          {products.map((product, i) => (
            <div key={product.id || i} style={{ minWidth: `${100 / perView}%`, flexShrink: 0 }}>
              <ProductCard product={product} variant="slide" />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '2.5rem 0' }}>
        <SliderBtn onClick={() => go('prev')} disabled={current === 0}>
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </SliderBtn>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: 30, padding: '0.6rem 1rem' }}>
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button key={i} onClick={() => { setCurrent(i); resetAuto(); }} style={{
              width: 11, height: 11, borderRadius: '50%',
              background: i === current ? 'var(--accent)' : 'rgba(255,255,255,0.25)',
              border: 'none', cursor: 'pointer',
              transform: i === current ? 'scale(1.2)' : 'scale(1)',
              transition: 'all 0.3s',
            }} />
          ))}
        </div>

        <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', opacity: 0.35 }}>{current + 1} / {maxIdx + 1}</span>

        <SliderBtn onClick={() => go('next')} disabled={current >= maxIdx}>
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </SliderBtn>
      </div>
    </section>
  );
}

function SliderBtn({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} style={{
      width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--border)',
      background: 'transparent', color: 'var(--white)', cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: disabled ? 0.3 : 1, transition: 'all 0.25s',
    }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--white)'; }}
    >{children}</button>
  );
}
