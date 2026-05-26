import { useState, useMemo, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

const SORT_OPTIONS = [
  { label: 'Newest First', value: 'new' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name A–Z', value: 'name' },
];

export default function ShopPage({ category, onBack, onViewProduct }) {
  const { products, loading } = useProducts(category);
  const [sort, setSort] = useState('new');
  const [filterBadge, setFilterBadge] = useState('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const isWomen = category === 'women';
  const title = isWomen ? 'Shop Women' : 'Shop Men';
  const subtitle = isWomen
    ? "Curated women's styles — Edge Collection 2026"
    : "Premium men's collection — Edge Collection 2026";

  const badges = ['all', ...Array.from(new Set(products.filter(p => p.badge).map(p => p.badge)))];

  const sorted = useMemo(() => {
    let list = filterBadge === 'all' ? [...products] : products.filter(p => p.badge === filterBadge);
    switch (sort) {
      case 'price-asc':  return list.sort((a, b) => a.price - b.price);
      case 'price-desc': return list.sort((a, b) => b.price - a.price);
      case 'name':       return list.sort((a, b) => a.name.localeCompare(b.name));
      default:           return list;
    }
  }, [products, sort, filterBadge]);

  return (
    <div style={{ minHeight: '100vh', background: '#EDE0CE' }}>

      {/* HERO HEADER */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0e0b07 0%, #1c1508 40%, #0a0806 100%)',
        paddingBottom: '3.5rem',
      }}>

        {/* Gold accent line top */}
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #BFA06A 30%, #C9A97A 50%, #BFA06A 70%, transparent)', width: '100%' }} />

        {/* Large ghost letters */}
        <div style={{
          position: 'absolute', right: '-2rem', top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(8rem, 20vw, 16rem)',
          letterSpacing: '0.08em',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(191,160,106,0.35)',
          lineHeight: 1,
          pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
        }}>
          {isWomen ? 'WOMEN' : 'MEN'}
        </div>

        {/* Diagonal gold accent */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(135deg, rgba(191,160,106,0.04) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ padding: '2.5rem 4rem 0', position: 'relative', zIndex: 1 }}>

          {/* Back button */}
          <button
            onClick={onBack}
            style={{
              background: 'none', border: 'none',
              color: 'rgba(245,237,224,0.65)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase',
              fontFamily: 'Jost, sans-serif', marginBottom: '2rem',
              transition: 'color 0.25s', padding: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#BFA06A'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,237,224,0.65)'; }}
          >
            <svg viewBox="0 0 16 10" width="14" height="10" stroke="currentColor" fill="none" strokeWidth="1.5">
              <path d="M1 5h14M1 5l4-4M1 5l4 4" />
            </svg>
            Back to Home
          </button>

          {/* Eyebrow label */}
          <p style={{
            fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase',
            color: '#BFA06A', marginBottom: '1rem',
            display: 'flex', alignItems: 'center', gap: '0.9rem',
            fontFamily: 'Jost, sans-serif', fontWeight: 400,
          }}>
            <span style={{ width: 36, height: 1, background: 'linear-gradient(90deg, transparent, #BFA06A)', display: 'inline-block' }} />
            LEEZOO — EDGE COLLECTION 2026
          </p>

          {/* Main title — gold gradient text */}
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(4rem, 8vw, 8.5rem)',
            letterSpacing: '0.04em', lineHeight: 0.88,
            marginBottom: '1.2rem',
            background: 'linear-gradient(135deg, #F5EDE0 0%, #D4B483 40%, #F5EDE0 70%, #C9A97A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {title}
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '0.72rem', letterSpacing: '0.15em',
            color: 'rgba(245,237,224,0.5)',
            fontFamily: 'Jost, sans-serif', fontWeight: 300,
          }}>
            {subtitle}
          </p>

          {/* Stats row }
          {!loading && (
            <div style={{ display: 'flex', gap: '2.5rem', marginTop: '2rem' }}>
              {[
                { label: 'Products', val: products.length },
                { label: 'New Arrivals', val: products.filter(p => p.badge === 'new' || p.badge === 'NEW').length },
                { label: 'Limited', val: products.filter(p => p.badge === 'limited' || p.badge === 'LIMITED').length },
              ].map(({ label, val }) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', color: '#BFA06A', lineHeight: 1 }}>{val || '—'}</div>
                  <div style={{ fontSize: '0.52rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,237,224,0.35)', fontFamily: 'Jost, sans-serif', marginTop: '0.2rem' }}>{label}</div>
                </div>
              ))}
            </div>
          )*/}
        </div>

        {/* Bottom gold line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(191,160,106,0.35) 20%, rgba(191,160,106,0.35) 80%, transparent)' }} />
      </div>

      {/* TOOLBAR */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 4rem',
        borderBottom: '1px solid rgba(122,87,64,0.2)',
        background: '#EDE0CE',
        flexWrap: 'wrap', gap: '1rem',
        position: 'sticky', top: 0, zIndex: 10,
        boxShadow: '0 2px 24px rgba(44,31,20,0.06)',
      }}>
        {/* Badge filters */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(60,42,30,0.4)', fontFamily: 'Jost,sans-serif', marginRight: '0.4rem' }}>Filter</span>
          {badges.map(b => (
            <button
              key={b}
              onClick={() => setFilterBadge(b)}
              style={{
                padding: '0.38rem 1rem',
                background: filterBadge === b ? '#BFA06A' : 'transparent',
                border: '1px solid ' + (filterBadge === b ? '#BFA06A' : 'rgba(122,87,64,0.28)'),
                color: filterBadge === b ? '#1a1208' : '#3C2A1E',
                fontFamily: 'Jost,sans-serif', fontSize: '0.57rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2,
                transition: 'all 0.22s', fontWeight: filterBadge === b ? 600 : 400,
              }}
              onMouseEnter={e => { if (filterBadge !== b) { e.currentTarget.style.borderColor = '#BFA06A'; e.currentTarget.style.color = '#BFA06A'; } }}
              onMouseLeave={e => { if (filterBadge !== b) { e.currentTarget.style.borderColor = 'rgba(122,87,64,0.28)'; e.currentTarget.style.color = '#3C2A1E'; } }}
            >
              {b === 'all' ? 'All (' + products.length + ')' : b}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <span style={{ fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(60,42,30,0.5)', fontFamily: 'Jost,sans-serif' }}>Sort</span>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(122,87,64,0.3)',
              color: '#3C2A1E',
              fontFamily: 'Jost,sans-serif', fontSize: '0.58rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '0.4rem 2rem 0.4rem 0.9rem', cursor: 'pointer', borderRadius: 2,
              outline: 'none', appearance: 'none',
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%237A5740' stroke-width='1.2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.7rem center',
            }}
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value} style={{ background: '#EDE0CE' }}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div style={{ padding: '3rem 4rem 7rem' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{
                height: 480, borderRadius: 2,
                background: 'linear-gradient(135deg, #E4D5BF, #D4C4AE)',
                animation: 'shimmer 1.8s ease-in-out infinite',
                animationDelay: (i * 0.08) + 's',
              }} />
            ))}
          </div>
        ) : sorted.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
            {sorted.map((product, i) => (
              <ProductCard key={product.id || i} product={product} variant="grid" onView={onViewProduct} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '8rem 0' }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '5rem', letterSpacing: '0.05em', color: 'rgba(60,42,30,0.08)', lineHeight: 1, marginBottom: '1rem' }}>
              No Results
            </div>
            <p style={{ color: 'rgba(60,42,30,0.4)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Jost,sans-serif', marginBottom: '2rem' }}>
              No products match this filter
            </p>
            <button
              onClick={() => setFilterBadge('all')}
              style={{
                padding: '0.8rem 2.5rem',
                background: '#BFA06A', border: 'none', color: '#1a1208',
                fontFamily: 'Jost,sans-serif', fontSize: '0.62rem', letterSpacing: '0.28em',
                textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2,
              }}
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.75; }
        }
        @media (max-width: 768px) {
          .shop-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)) !important; }
        }
      `}</style>
    </div>
  );
}
