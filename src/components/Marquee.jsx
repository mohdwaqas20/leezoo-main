const words = [
  'Wear Your Edge', 'Impossible To Overlook', 'Not Made To Blend In',
  'Crafted For The Bold', 'Designed To Be Noticed', 'Beyond Ordinary',
  'Defined By Detail', 'Quiet Luxury. Loud Presence.', 'Made For Statement Makers',
  'The Edge Starts Here', 'Crafted to Define', 'LEEZOO',
];

export default function Marquee() {
  const items = [...words, ...words];
  return (
    <div style={{
      borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      overflow: 'hidden', padding: '1.1rem 0', background: 'var(--dark)',
      position: 'relative', zIndex: 0,
    }}>
      <div style={{
        display: 'inline-flex', gap: '3.5rem', whiteSpace: 'nowrap',
        animation: 'marquee 60s linear infinite',
      }}>
        {items.map((w, i) => (
          <span key={i} style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: '0.85rem', letterSpacing: '0.3em', color: '#F0E6D8',
            opacity: i % 12 === 11 ? 0.85 : 0.45,
          }}>
            {w === 'LEEZOO'
              ? <><span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', verticalAlign: 'middle', marginRight: '3.5rem' }} />{w}</>
              : w}
          </span>
        ))}
      </div>
    </div>
  );
}