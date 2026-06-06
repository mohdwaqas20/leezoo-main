import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ALL_PRODUCTS } from '../hooks/useProducts';

const WA_NUMBER = '919984090593';

export default function Navbar({ onAuthClick, onNavigate, currentPage = 'home' }) {
  const { count, toggleDrawer, openDrawer } = useCart();
  const { user, logout, displayName } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCompact, setIsCompact] = useState(false); // true on tablet + mobile (≤768px)

  // Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Positions for dropdowns
  const [shopPos, setShopPos] = useState({ top: 0, left: 0 });
  const [servicesPos, setServicesPos] = useState({ top: 0, left: 0 });

  const accountRef = useRef(null);
  const shopBtnRef = useRef(null);
  const shopRef = useRef(null);
  const servicesBtnRef = useRef(null);
  const servicesRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  // Nav link styles definition
  const navLinkStyle = {
    background: 'none',
    border: 'none',
    borderBottom: '1px solid transparent',
    fontFamily: 'Jost, sans-serif',
    fontSize: '0.68rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--dark)',
    cursor: 'pointer',
    opacity: 0.55,
    padding: '0.4rem 0',
    transition: 'opacity 0.25s, border-color 0.25s',
  };

  const dropdownItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '0.65rem 1.2rem',
    background: 'none',
    border: 'none',
    fontFamily: 'Jost, sans-serif',
    fontSize: '0.68rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--dark)',
    cursor: 'pointer',
    textAlign: 'left',
    opacity: 0.75,
    transition: 'all 0.15s',
  };

  const iconStyle = {
    width: 20,
    height: 20,
    stroke: 'var(--dark)',
    fill: 'none',
    strokeWidth: 1.5,
    cursor: 'pointer',
  };

  // ── scroll detection ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── compact mode (tablet + mobile ≤768px) ──
  useEffect(() => {
    const check = () => setIsCompact(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── close dropdowns on outside click ──
  useEffect(() => {
    const handler = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) setAccountOpen(false);
      if (shopRef.current && !shopRef.current.contains(e.target)
        && !shopBtnRef.current?.contains(e.target)) setShopOpen(false);
      if (servicesRef.current && !servicesRef.current.contains(e.target)
        && !servicesBtnRef.current?.contains(e.target)) setServicesOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── recalculate dropdown positions on scroll while open ──
  useEffect(() => {
    if (!shopOpen) return;
    const update = () => {
      if (shopBtnRef.current) {
        const r = shopBtnRef.current.getBoundingClientRect();
        setShopPos({ top: r.bottom, left: r.left });
      }
    };
    update();
    window.addEventListener('scroll', update, true);
    return () => window.removeEventListener('scroll', update, true);
  }, [shopOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const update = () => {
      if (servicesBtnRef.current) {
        const r = servicesBtnRef.current.getBoundingClientRect();
        setServicesPos({ top: r.bottom, left: r.left });
      }
    };
    update();
    window.addEventListener('scroll', update, true);
    return () => window.removeEventListener('scroll', update, true);
  }, [servicesOpen]);

  // ── search logic ──
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) { setSearchResults([]); return; }
    const results = ALL_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.color.toLowerCase().includes(q) ||
      (p.badge && p.badge.toLowerCase().includes(q)) ||
      p.product_id.toLowerCase().includes(q)
    ).slice(0, 5); // Limit slightly to keep popup sleek
    setSearchResults(results);
  }, [searchQuery]);

  const toggleSearch = () => {
    const state = !searchOpen;
    setSearchOpen(state);
    if (state) {
      setShopOpen(false);
      setServicesOpen(false);
      setAccountOpen(false);
      setTimeout(() => searchInputRef.current?.focus(), 80);
    }
  };

  const handleSearchResult = (product) => {
    setSearchOpen(false);
    setSearchQuery('');
    const id = product.category === 'women' ? 'shop-women' : 'shop-men';
    if (currentPage !== 'home') {
      onNavigate?.('home');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ── other handlers ──
  const handleLogout = async () => {
    setAccountOpen(false);
    await logout();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavItem = (page) => {
    setAccountOpen(false);
    setShopOpen(false);
    setServicesOpen(false);
    if (page === 'cart') openDrawer();
    else onNavigate?.(page);
  };

  const scrollToSection = (id) => {
    setShopOpen(false);
    setServicesOpen(false);
    setMenuOpen(false);
    if (currentPage !== 'home') {
      onNavigate?.('home');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300);
    } else {
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  };

  const toggleShop = () => {
    const opening = !shopOpen;
    if (opening && shopBtnRef.current) {
      const r = shopBtnRef.current.getBoundingClientRect();
      setShopPos({ top: r.bottom, left: r.left });
    }
    setShopOpen(opening);
    setServicesOpen(false);
    setSearchOpen(false);
  };

  const toggleServices = () => {
    const opening = !servicesOpen;
    if (opening && servicesBtnRef.current) {
      const r = servicesBtnRef.current.getBoundingClientRect();
      setServicesPos({ top: r.bottom, left: r.left });
    }
    setServicesOpen(opening);
    setShopOpen(false);
    setSearchOpen(false);
  };

  const avatarLetter = displayName
    ? displayName[0].toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? '?';

  const shopItems = [
    { label: 'Shop Men', desc: "Premium men's collection", icon: '♂', id: 'shop-men', page: 'shop-men' },
    { label: 'Shop Women', desc: "Curated women's styles", icon: '♀', id: 'shop-women', page: 'shop-women' },
  ];

  const serviceItems = [
    { label: 'Customized T-Shirt Printing', desc: 'Your design, printed to perfection', icon: '✦', id: 'custom-printing' },
    { label: 'Bulk T-Shirt Printing', desc: 'Wholesale & volume printing', icon: '◈', id: 'bulk-printing' },
    { label: 'Business & Team Orders', desc: 'Corporate & brand identity', icon: '◎', id: 'bulk-printing' },
    { label: 'Event Printing', desc: 'Uniforms & occasion wear', icon: '◇', id: 'bulk-printing' },
  ];

  return (
    <>
      {/* Announcement bar */}
      <div style={{
        background: 'var(--accent)', textAlign: 'center',
        padding: '0.45rem 0.5rem', fontSize: 'clamp(0.48rem,1.8vw,0.65rem)',
        letterSpacing: 'clamp(0.05em,1vw,0.25em)', textTransform: 'uppercase',
        color: 'var(--ink)', fontWeight: 400,
      }}>
        Free shipping on orders above RS 499 &nbsp;·&nbsp; New Drop: Edge Collection
      </div>

      {/* Full-screen mobile menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 500, background: 'var(--surface)',
        transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem,6vw,4rem)',
      }}>
        <button onClick={() => setMenuOpen(false)} style={{
          position: 'absolute', top: '2rem', right: '3rem', background: 'none', border: 'none',
          color: 'var(--dark)', fontFamily: 'Jost,sans-serif', fontSize: '0.62rem',
          letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer', opacity: 0.5,
        }}>Close ✕</button>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { label: 'Home', fn: () => { setMenuOpen(false); onNavigate?.('home'); } },
            { label: 'Shop Men', fn: () => { setMenuOpen(false); onNavigate?.('shop-men'); } },
            { label: 'Shop Women', fn: () => { setMenuOpen(false); onNavigate?.('shop-women'); } },
            { label: 'Custom Printing', fn: () => scrollToSection('custom-printing') },
            { label: 'Bulk Orders', fn: () => scrollToSection('bulk-printing') },
            { label: 'About Us', fn: () => scrollToSection('about') },
            { label: 'Contact Us', fn: () => scrollToSection('contact-us') },
          ].map((item, i) => (
            <li key={i}>
              <button onClick={item.fn} style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.5rem,7vw,6rem)',
                letterSpacing: '0.04em', color: 'var(--dark)', background: 'none', border: 'none',
                opacity: 0.12, transition: 'opacity 0.3s, transform 0.3s',
                display: 'inline-block', lineHeight: 1.05, cursor: 'pointer', padding: 0,
              }}
                onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.transform = 'translateX(12px)'; }}
                onMouseLeave={e => { e.target.style.opacity = 0.12; e.target.style.transform = 'translateX(0)'; }}
              >{item.label}</button>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: '3rem', display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Terms Of Service', page: 'terms' },
            { label: 'Privacy Policy', page: 'privacy' },
            { label: 'Shipping Policy', page: 'shipping' },
            { label: 'Refund & Exchange', page: 'refund' },
            { label: 'Customization Policy', page: 'customization' },
          ].map(item => (
            <button key={item.page} onClick={() => { setMenuOpen(false); onNavigate?.(item.page); }} style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--dark)', fontFamily: 'Jost,sans-serif', opacity: 0.3, transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.3}
            >{item.label}</button>
          ))}
        </div>
      </div>

      {/* Main nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 200,
        background: scrolled ? 'rgba(240,230,216,0.97)' : 'rgba(245,237,224,0.92)',
        borderBottom: '1px solid var(--border)', backdropFilter: 'blur(12px)',
        display: 'grid', gridTemplateColumns: isCompact ? 'auto 1fr' : '1fr auto 1fr',
        alignItems: 'center', padding: isCompact ? '0 0.75rem' : '0 clamp(1rem,3vw,3rem)', height: 64, transition: 'background 0.3s',
      }}>

        {/* Left: nav links */}
        <div className="desktop-only" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {currentPage !== 'home' && (
            <button
              onClick={() => onNavigate?.('home')}
              style={navLinkStyle}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.55}
            >Home</button>
          )}

          <button
            ref={shopBtnRef}
            onMouseEnter={() => { if (!shopOpen) toggleShop(); }}
            onClick={toggleShop}
            style={{
              ...navLinkStyle,
              borderBottom: shopOpen ? '1px solid var(--accent)' : '1px solid transparent',
              opacity: shopOpen ? 1 : 0.55,
              display: 'flex', alignItems: 'center', gap: '0.35rem',
            }}
          >
            Shop
            <svg viewBox="0 0 10 6" style={{ width: 8, height: 8, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5, transform: shopOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s' }}><path d="M1 1l4 4 4-4" /></svg>
          </button>

          <button
            ref={servicesBtnRef}
            onMouseEnter={() => { if (!servicesOpen) toggleServices(); }}
            onClick={toggleServices}
            style={{
              ...navLinkStyle,
              borderBottom: servicesOpen ? '1px solid var(--accent)' : '1px solid transparent',
              opacity: servicesOpen ? 1 : 0.55,
              display: 'flex', alignItems: 'center', gap: '0.35rem',
            }}
          >
            Other Services
            <svg viewBox="0 0 10 6" style={{ width: 8, height: 8, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5, transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s' }}><path d="M1 1l4 4 4-4" /></svg>
          </button>

          {[
            { label: 'About Us', id: 'about' },
            { label: 'Contact Us', id: 'contact-us' },
          ].map((l, i) => (
            <button key={i} onClick={() => scrollToSection(l.id)} style={navLinkStyle}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.55}
            >{l.label}</button>
          ))}
        </div>

        {/* Center logo */}
        <div style={{ display: 'flex', justifyContent: isCompact ? 'flex-start' : 'center' }}>
          <button onClick={() => { setShopOpen(false); setServicesOpen(false); onNavigate?.('home'); }} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0, height: 'auto'
          }}>
            <img
              src="https://tpsjxaqxsedgshxiqvst.supabase.co/storage/v1/object/public/Web%20images%20Home%20LEEZOO/LEEZOO%20Logo.png"
              alt="LEEZOO"
              style={{
                height: isCompact ? '32px' : '45px',
                width: 'auto',
                objectFit: 'contain',
                transition: 'opacity 0.3s, transform 0.3s',
                filter: 'drop-shadow(0 0 0.5px rgba(0,0,0,0.1))'  // Subtle depth
              }}
              onMouseEnter={e => {
                e.target.style.opacity = '0.85';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                e.target.style.opacity = '1';
                e.target.style.transform = 'scale(1)';
              }}
            />        </button>
        </div>

        {/* Right icons */}
        <div style={{ display: 'flex', gap: isCompact ? '0.85rem' : '1.5rem', alignItems: 'center', justifyContent: 'flex-end' }}>

          {/* Account Menu Section */}
          {user ? (
            <div ref={accountRef} style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  setAccountOpen(!accountOpen);
                  setShopOpen(false);
                  setServicesOpen(false);
                  setSearchOpen(false);
                }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.4rem', borderRadius: 4, transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(191,160,106,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent)', color: '#F0E6D8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.68rem', fontWeight: 700, fontFamily: 'Jost,sans-serif', flexShrink: 0 }}>{avatarLetter}</span>
                <span className="nav-display-name" style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dark)', opacity: 0.8, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayName || user.email}</span>
                <svg viewBox="0 0 10 6" style={{ width: 9, height: 9, stroke: 'var(--dark)', fill: 'none', strokeWidth: 1.5, opacity: 0.5, flexShrink: 0, transform: accountOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><path d="M1 1l4 4 4-4" /></svg>
              </button>

              {accountOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#F0E6D8',
                  border: '1px solid var(--border)',
                  minWidth: 220,
                  zIndex: 9999,
                  boxShadow: '0 16px 40px rgba(60,42,30,0.14)',
                  animation: 'dropIn 0.18s ease',
                  borderRadius: 2,
                  marginTop: '12px'
                }}>
                  <div style={{ position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '6px solid var(--border)' }} />
                  <div style={{ padding: '1rem 1.2rem 0.8rem', borderBottom: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--dark)', opacity: 0.95, marginBottom: '0.2rem', fontFamily: 'Jost,sans-serif', fontWeight: 500 }}>{displayName || 'My Account'}</p>
                    <p style={{ fontSize: '0.58rem', letterSpacing: '0.08em', color: 'var(--muted)', opacity: 1, fontFamily: 'Jost,sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                  </div>
                  <div style={{ padding: '0.4rem 0' }}>
                    {[{ label: 'My Cart', icon: '🛍️', page: 'cart' }, { label: 'My Orders', icon: '📦', page: 'orders' }, { label: 'Wishlist', icon: '♡', page: 'wishlist' }].map(({ label, icon, page }) => (
                      <button key={label} onClick={() => handleNavItem(page)} style={dropdownItemStyle}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(191,160,106,0.1)'; e.currentTarget.style.opacity = '1'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.opacity = '0.75'; }}>
                        <span style={{ opacity: 0.6, fontSize: '0.85rem', width: 18 }}>{icon}</span>{label}
                      </button>
                    ))}
                  </div>
                  <div style={{ borderTop: '1px solid var(--border)', padding: '0.4rem 0' }}>
                    <button onClick={handleLogout} style={{ ...dropdownItemStyle, color: '#ff7070', opacity: 1 }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,80,80,0.08)'; e.currentTarget.style.color = '#ff5050'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#ff7070'; }}>
                      <span style={{ opacity: 0.7, fontSize: '0.85rem', width: 18 }}>→</span>Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <svg
              style={{ ...iconStyle, cursor: 'pointer' }}
              viewBox="0 0 24 24"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAuthClick?.(); }}
              title="Sign in"
            >
              <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          )}

          {/* WhatsApp */}
          <a href={`https://wa.me/${+919984090593}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
            <svg style={{ ...iconStyle, fill: 'var(--dark)', stroke: 'none' }} viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.856L0 24l6.335-1.508A11.956 11.956 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.371l-.36-.214-3.732.888.936-3.627-.235-.373A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
            </svg>
          </a>


          {/* Hamburger */}
          <svg style={iconStyle} viewBox="0 0 24 24" onClick={() => setMenuOpen(true)}>
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </div>
      </nav>

      {/* ── SHOP DROPDOWN ── */}
      {shopOpen && (
        <div ref={shopRef} style={{
          position: 'fixed',
          top: shopPos.top + 8,
          left: shopPos.left,
          background: '#F0E6D8',
          border: '1px solid var(--border)',
          minWidth: 260,
          zIndex: 99999,
          boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
          borderRadius: 2,
          animation: 'dropIn 0.2s cubic-bezier(0.16,1,0.3,1) both',
          isolation: 'isolate',
        }}>
          <div style={{ padding: '0.6rem' }}>
            {shopItems.map(item => (
              <button key={item.label} onClick={() => { setShopOpen(false); onNavigate?.(item.page); }} style={{
                display: 'flex', alignItems: 'center', gap: '1rem', width: '100%',
                padding: '0.9rem 1rem', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 2, textAlign: 'left', transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(191,160,106,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                <div style={{ width: 38, height: 38, background: 'rgba(185,145,70,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '1rem', flexShrink: 0, border: '1px solid rgba(185,145,70,0.2)' }}>{item.icon}</div>
                <div>
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--dark)', fontFamily: 'Jost,sans-serif', fontWeight: 500, marginBottom: '0.2rem' }}>{item.label}</p>
                  <p style={{ fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.06em', fontFamily: 'Jost,sans-serif' }}>{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── SERVICES DROPDOWN ── */}
      {servicesOpen && (
        <div ref={servicesRef} style={{
          position: 'fixed',
          top: servicesPos.top + 8,
          left: servicesPos.left,
          background: '#F0E6D8',
          border: '1px solid var(--border)',
          minWidth: 380,
          zIndex: 99999,
          boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
          borderRadius: 2,
          animation: 'dropIn 0.2s cubic-bezier(0.16,1,0.3,1) both',
          isolation: 'isolate',
        }}>
          <div style={{ padding: '0.75rem 1rem 0.5rem', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.52rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', fontFamily: 'Jost,sans-serif', marginBottom: '0.2rem' }}>Our Services</p>
            <p style={{ fontSize: '0.6rem', color: 'rgba(44,31,20,0.4)', letterSpacing: '0.05em', fontFamily: 'Jost,sans-serif' }}>Premium printing solutions — no MOQ required</p>
          </div>
          <div style={{ padding: '0.6rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.2rem' }}>
            {serviceItems.map(item => (
              <button key={item.label} onClick={() => { setServicesOpen(false); scrollToSection(item.id); }} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.9rem 0.8rem',
                background: 'none', border: 'none', cursor: 'pointer', borderRadius: 2, textAlign: 'left', transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(191,160,106,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                <div style={{ width: 34, height: 34, background: 'rgba(185,145,70,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '0.85rem', flexShrink: 0, border: '1px solid rgba(185,145,70,0.15)', marginTop: '0.1rem' }}>{item.icon}</div>
                <div>
                  <p style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dark)', fontFamily: 'Jost,sans-serif', fontWeight: 500, marginBottom: '0.2rem', lineHeight: 1.3 }}>{item.label}</p>
                  <p style={{ fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.04em', fontFamily: 'Jost,sans-serif', lineHeight: 1.35 }}>{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}