import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const WA_NUMBER = '971504746525';

export default function Navbar({ onAuthClick }) {
  const { count, toggleDrawer } = useCart();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Announce bar */}
      <div style={{
        background: 'var(--accent)', textAlign: 'center',
        padding: '0.55rem 1rem', fontSize: '0.65rem',
        letterSpacing: '0.25em', textTransform: 'uppercase',
        color: 'var(--ink)', fontWeight: 400,
      }}>
        Free shipping on orders above RS 349 &nbsp;·&nbsp; New Drop: Edge Collection 2026
      </div>

      {/* Slide-in Menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'var(--ink)',
        transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '4rem',
      }}>
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'absolute', top: '2rem', right: '3rem',
            background: 'none', border: 'none', color: 'var(--white)',
            fontFamily: 'Barlow,sans-serif', fontSize: '0.62rem',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            cursor: 'pointer', opacity: 0.5,
          }}
        >Close ✕</button>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {['Home', 'Shop Men', 'Shop Women', 'About Us', 'Contact Us', 'Share Your Feedback'].map((item, i) => (
            <li key={i}>
              <a
                href={item === 'Home' ? '#' : `#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: 'clamp(3rem,8vw,7rem)', letterSpacing: '0.04em',
                  color: 'var(--white)', textDecoration: 'none',
                  opacity: 0.12, transition: 'opacity 0.3s, transform 0.3s',
                  display: 'inline-block', lineHeight: 1.05,
                }}
                onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.transform = 'translateX(12px)'; }}
                onMouseLeave={e => { e.target.style.opacity = 0.12; e.target.style.transform = 'translateX(0)'; }}
              >{item}</a>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: '3rem', display: 'flex', gap: '3rem' }}>
          {['Terms Of Service', 'Privacy Policy', 'Shipping Policy', 'Returns'].map((l, i) => (
            <a key={i} href="#" style={{
              fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--white)', textDecoration: 'none', opacity: 0.3,
            }}>{l}</a>
          ))}
        </div>
      </div>

      {/* Main Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 200,
        background: scrolled ? 'rgba(13,13,13,0.97)' : 'var(--ink)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', padding: '0 3rem', height: 64,
        transition: 'background 0.3s',
      }}>
        {/* Left links */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {['Shop Men', 'Shop Women', 'About Us', 'Feedback','Contact Us'].map((l, i) => (
            <a key={i} href={`#${l.toLowerCase().replace(' ', '-')}`}
              style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--white)', textDecoration: 'none', opacity: 0.55, transition: 'opacity 0.25s' }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.55}
            >{l}</a>
          ))}
        </div>

        {/* Center logo */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a href="#" style={{
            fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.9rem',
            letterSpacing: '0.18em', color: 'var(--white)', textDecoration: 'none',
          }}>LEEZOO</a>
        </div>

        {/* Right icons */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'flex-end' }}>
          {/* Search */}
          <svg style={iconStyle} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/>
          </svg>
          {/* Account */}
          <svg style={iconStyle} viewBox="0 0 24 24" onClick={user ? logout : onAuthClick} title={user ? `Logged in as ${user.email} — click to logout` : 'Sign in'}>
            <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
          {/* WhatsApp quick contact */}
          <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
            <svg style={{ ...iconStyle, fill: '#25D366', stroke: 'none' }} viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.856L0 24l6.335-1.508A11.956 11.956 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.371l-.36-.214-3.732.888.936-3.627-.235-.373A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
            </svg>
          </a>
          {/* Cart */}
          <button onClick={toggleDrawer} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <svg style={iconStyle} viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {count > 0 && (
              <sup style={{
                fontSize: '0.55rem', background: 'var(--accent)', color: 'var(--ink)',
                borderRadius: '50%', width: 16, height: 16, display: 'inline-flex',
                alignItems: 'center', justifyContent: 'center',
                marginLeft: -6, marginTop: -10, verticalAlign: 'top', fontWeight: 400,
              }}>{count}</sup>
            )}
          </button>
          {/* Hamburger */}
          <svg style={iconStyle} viewBox="0 0 24 24" onClick={() => setMenuOpen(true)}>
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </div>
      </nav>

      {/* Overlay backdrop for menu */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 499 }} />
      )}
    </>
  );
}

const iconStyle = {
  width: 20, height: 20, stroke: 'var(--white)', fill: 'none',
  strokeWidth: 1.2, opacity: 0.65, cursor: 'pointer', verticalAlign: 'middle',
};
