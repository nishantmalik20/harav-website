// ProductCard.jsx — single tile in the shop grid.
const { useState: useStatePC } = React;

function ProductCard({ product, onOpen, onAdd }) {
  const [hover, setHover] = useStatePC(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer', position: 'relative' }}
      onClick={() => onOpen(product)}>
      <div style={{
        aspectRatio: '4 / 5', overflow: 'hidden',
        background: 'var(--blush)', position: 'relative',
        border: '1px solid var(--border-hairline)',
      }}>
        <img src={product.img} alt=""
             style={{
               width: '100%', height: '100%', objectFit: 'cover',
               filter: 'saturate(.82) sepia(.08)',
               transition: 'transform 600ms cubic-bezier(.22,1,.36,1)',
               transform: hover ? 'scale(1.04)' : 'scale(1)',
             }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 60%, rgba(26,23,20,0.30) 100%)',
          opacity: hover ? 1 : 0,
          transition: 'opacity 320ms ease',
          pointerEvents: 'none',
        }} />
        <button
          onClick={(e) => { e.stopPropagation(); onAdd(product); }}
          style={{
            position: 'absolute', bottom: 16, left: 16, right: 16,
            background: 'var(--pearl)', color: 'var(--noir)', border: 0,
            fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.24em', textTransform: 'uppercase',
            padding: '12px', cursor: 'pointer',
            opacity: hover ? 1 : 0,
            transform: hover ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 320ms ease, transform 320ms ease',
          }}>
          Add to bag
        </button>
      </div>
      <div style={{ paddingTop: 16, display: 'grid', gridTemplateColumns: '1fr auto', gap: 12 }}>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 22,
            lineHeight: 1.2, margin: '0 0 4px', color: 'var(--noir)',
          }}>{product.name}</h3>
          <div style={{
            fontFamily: 'var(--font-label)', fontSize: 10,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'var(--ink-500)',
          }}>{product.type}</div>
        </div>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 20,
          color: 'var(--noir)', fontVariantNumeric: 'oldstyle-nums',
          alignSelf: 'start',
        }}>${product.price}</div>
      </div>
    </article>
  );
}
window.ProductCard = ProductCard;
