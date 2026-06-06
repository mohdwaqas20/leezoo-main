import { useState, useEffect } from 'react';

const WA_NUMBER = '919984090593';
const WA_MSG_BULK = encodeURIComponent('Hi LEEZOO Team, I want to inquire about bulk t-shirt printing.');
const EMAIL = 'leezoo.official2026@gmail.com';

const audiences = [
  { icon: '◈', label: 'Businesses', desc: 'Corporate uniforms & branded merchandise' },
  { icon: '◎', label: 'Retail Shops', desc: 'Wholesale stock for clothing vendors' },
  { icon: '✦', label: 'Events & Teams', desc: 'Matching attire for groups & occasions' },
  { icon: '✧', label: 'Startups', desc: 'Launch your brand with custom apparel' },
  { icon: '▪', label: 'Organizations', desc: 'NGOs, clubs & community groups' },
  { icon: '◇', label: 'Vendors', desc: 'Reseller & distribution partnerships' },
];

const highlights = [
  { val: 'No MOQ', sub: 'Minimum Order' },
  { val: 'Best', sub: 'Wholesale Pricing' },
  { val: 'Fast', sub: 'Production Speed' },
  { val: 'Full', sub: 'Dedicated Support' },
];

export default function BulkPrinting() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      id="bulk-printing"
      style={{
        background: 'var(--sand)',
        color: '#2a1f14',
        padding: isMobile
          ? '0 1rem clamp(3rem,6vw,7rem)'
          : '0 clamp(1rem,4vw,4rem) clamp(3rem,6vw,7rem)',
        borderTop: '2px solid rgba(122,87,64,0.25)',
        overflowX: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >

      {/* Section heading */}
      <div style={{ textAlign: 'center', paddingTop: '4rem', marginBottom: '5rem' }}>
        <h2 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 'clamp(2.8rem,5vw,4rem)',
          letterSpacing: '0.2em',
          color: '#1a1008',
          marginBottom: '2rem',
        }}>Wholesale &amp; Bulk Printing</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <span style={{ flex: 1, height: '1px', background: 'rgba(122,87,64,0.25)', maxWidth: 200, display: 'block' }} />
          <span style={{ color: 'var(--brown)', fontSize: '0.5rem', opacity: 0.5 }}>◆</span>
          <span style={{ color: 'var(--brown)', fontSize: '0.7rem', opacity: 0.8 }}>◆</span>
          <span style={{ color: 'var(--brown)', fontSize: '0.9rem' }}>◆</span>
          <span style={{ color: 'var(--brown)', fontSize: '0.7rem', opacity: 0.8 }}>◆</span>
          <span style={{ color: 'var(--brown)', fontSize: '0.5rem', opacity: 0.5 }}>◆</span>
          <span style={{ flex: 1, height: '1px', background: 'rgba(122,87,64,0.25)', maxWidth: 200, display: 'block' }} />
        </div>
      </div>

      {/* Top: headline + highlights + pricing card */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
        gap: isMobile ? '2.5rem' : '4rem',
        alignItems: 'center',
        marginBottom: '5rem',
      }}>
        <div>
          <h2 style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 'clamp(3rem,7vw,6rem)',
            lineHeight: 1.0,
            letterSpacing: '0.04em',
            marginBottom: '2rem',
            color: '#2a1f14',
          }}>
            Scale Your<br />
            <em style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', color: 'var(--brown)', fontSize: '0.88em' }}>Brand With Us</em>
          </h2>
          <p style={{ fontSize: '0.82rem', lineHeight: 2, color: 'rgba(42,31,20,0.7)', letterSpacing: '0.04em', maxWidth: 520, marginBottom: '3rem' }}>
            From a single piece to large-volume runs — LEEZOO's bulk custom printing supports businesses, events, vendors, and organisations across India and beyond. Premium print quality at competitive wholesale pricing. No minimum order. No hassle.
          </p>
          <div style={{ display: 'flex', gap: isMobile ? '1.5rem' : '3rem', flexWrap: 'wrap' }}>
            {highlights.map(({ val, sub }) => (
              <div key={sub}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '2.2rem', color: 'var(--brown)', display: 'block', lineHeight: 1, letterSpacing: '0.02em' }}>{val}</span>
                <span style={{ fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(42,31,20,0.55)', marginTop: '0.4rem', display: 'block' }}>{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing card */}
        <div style={{
          border: '1.5px solid var(--brown)',
          padding: '3.8rem 3.2rem',
          background: 'rgba(122,92,63,0.06)',
          width: isMobile ? '100%' : 'auto',
          minWidth: isMobile ? 'unset' : 300,
          boxSizing: 'border-box',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0',
        }}>
          <span style={{ color: 'var(--brown)', fontSize: '2.4rem', display: 'block', marginBottom: '1.6rem' }}>◈</span>
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#2a1f14', fontWeight: 700, marginBottom: '0.8rem' }}>Wholesale Pricing</p>
          <p style={{ fontSize: '0.72rem', color: 'rgba(42,31,20,0.6)', letterSpacing: '0.04em', lineHeight: 1.7, marginBottom: '1.8rem', maxWidth: 200 }}>
            Get the best rates for bulk & custom orders. No minimums, no hassle.
          </p>
          <div style={{ width: 40, height: 1, background: 'var(--brown)', margin: '0 auto 1.8rem' }} />
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG_BULK}`}
            target="_blank" rel="noreferrer"
            style={{
              fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#fff', textDecoration: 'none', display: 'inline-block',
              background: 'var(--brown)', padding: '0.9rem 2rem',
              fontWeight: 600,
            }}
          >Contact for Quote →</a>
        </div>
      </div>

      {/* Who we serve */}
      <div style={{ marginBottom: '5rem' }}>
        <p style={{ fontSize: '0.62rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--brown)', fontWeight: 700, textAlign: 'center', marginBottom: '3rem' }}>Who We Serve</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(6,1fr)',
          gap: '1rem',
        }}>
          {audiences.map((a) => (
            <div key={a.label} style={{
              border: '1px solid rgba(122,92,63,0.3)',
              padding: isMobile ? '1.4rem 0.8rem' : '2rem 1.2rem',
              textAlign: 'center',
              cursor: 'default',
            }}>
              <span style={{ color: 'var(--brown)', fontSize: '1.2rem', display: 'block', marginBottom: '1.2rem' }}>{a.icon}</span>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2a1f14', fontFamily: 'Jost,sans-serif', fontWeight: 700, marginBottom: '0.6rem' }}>{a.label}</p>
              <p style={{ fontSize: '0.65rem', lineHeight: 1.7, color: 'rgba(42,31,20,0.6)', letterSpacing: '0.03em' }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div style={{
        background: '#2a1f14',
        padding: isMobile ? '2rem 1.5rem' : '2.5rem 3rem',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: '1.5rem',
        boxSizing: 'border-box',
        width: '100%',
      }}>
        <div>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.6rem', color: '#f5ede3', marginBottom: '0.4rem', letterSpacing: '0.02em' }}>Ready to place a bulk order?</p>
          <p style={{ fontSize: '0.72rem', color: 'rgba(245,237,227,0.7)', letterSpacing: '0.06em' }}>Get competitive pricing, fast production & dedicated support.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', width: isMobile ? '100%' : 'auto' }}>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG_BULK}`}
            target="_blank" rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              background: 'var(--brown)', color: '#fff', border: '1px solid var(--brown)',
              padding: '0.9rem 1.8rem', fontSize: '0.62rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', fontFamily: 'Jost,sans-serif',
              textDecoration: 'none', cursor: 'pointer',
              width: isMobile ? '100%' : 'auto',
              boxSizing: 'border-box',
              justifyContent: isMobile ? 'center' : 'flex-start',
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.856L0 24l6.335-1.508A11.956 11.956 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.371l-.36-.214-3.732.888.936-3.627-.235-.373A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
            </svg>
            WhatsApp Now
          </a>
          <a
            href={`mailto:${EMAIL}?subject=Bulk Printing Inquiry`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              background: 'none', color: '#f5ede3', border: '1.5px solid rgba(245,237,227,0.5)',
              padding: '0.9rem 1.8rem', fontSize: '0.62rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', fontFamily: 'Jost,sans-serif',
              textDecoration: 'none', cursor: 'pointer',
              width: isMobile ? '100%' : 'auto',
              boxSizing: 'border-box',
              justifyContent: isMobile ? 'center' : 'flex-start',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
            </svg>
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}