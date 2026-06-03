// ProductDetail.jsx — modal opened on tile click.
function ProductDetail({ product, onClose, onAdd }) {
  if (!product) return null;
  const backdropStyle = {
    position: 'fixed', inset: 0, zIndex: 200,
    background: 'rgba(26,23,20,0.55)',
    backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 24,
  };
  const sheetStyle = {
    background: 'var(--linen)', color: 'var(--noir)',
    maxWidth: 1080, width: '100%', maxHeight: '90vh', overflowY: 'auto',
    display: 'grid', gridTemplateColumns: '5fr 4fr',
    position: 'relative',
    boxShadow: '0 24px 60px rgba(60,40,25,0.20)',
  };
  return (
    <div style={backdropStyle} onClick={onClose}>
      <div style={sheetStyle} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" style={{
          position: 'absolute', top: 16, right: 16, zIndex: 2,
          background: 'rgba(251,247,238,0.85)', border: 0, cursor: 'pointer',
          width: 36, height: 36, fontSize: 22, color: 'var(--noir)', lineHeight: 1,
        }}>×</button>

        <div style={{ aspectRatio: '4 / 5', overflow: 'hidden', background: 'var(--blush)' }}>
          <img src={product.img} alt="" style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'saturate(.82) sepia(.08)',
          }} />
        </div>

        <div style={{ padding: '56px 48px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <span style={{ width: 36, height: 1, background: 'var(--champagne-deep)' }} />
              <span style={{
                fontFamily: 'var(--font-label)', fontSize: 10,
                letterSpacing: '0.32em', textTransform: 'uppercase',
                color: 'var(--champagne-deep)',
              }}>{product.cat}</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 52,
              lineHeight: 1.05, letterSpacing: '-0.015em',
              margin: '0 0 10px', color: 'var(--noir)',
            }}>{product.name}</h2>
            <div style={{
              fontFamily: 'var(--font-label)', fontSize: 11,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'var(--ink-500)',
            }}>{product.type}</div>
          </div>

          <p style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 19,
            lineHeight: 1.55, color: 'var(--ink-700)', margin: 0,
          }}>{product.blurb}</p>

          <div style={{ paddingTop: 14, borderTop: '1px solid var(--border-hairline)' }}>
            <div style={{
              fontFamily: 'var(--font-label)', fontSize: 10,
              letterSpacing: '0.32em', textTransform: 'uppercase',
              color: 'var(--ink-500)', marginBottom: 10,
            }}>The ritual</div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7,
              color: 'var(--ink-700)', margin: 0,
            }}>{product.ritual}</p>
          </div>

          <div style={{
            marginTop: 'auto', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: 20, paddingTop: 24,
            borderTop: '1px solid var(--border-hairline)',
          }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--noir)',
              fontVariantNumeric: 'oldstyle-nums',
            }}>${product.price}</div>
            <button onClick={() => onAdd(product)} style={{
              background: 'var(--noir)', color: 'var(--pearl)', border: 0,
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
              letterSpacing: '0.24em', textTransform: 'uppercase',
              padding: '16px 36px', cursor: 'pointer',
              transition: 'opacity 220ms ease',
            }}
              onMouseEnter={e=>e.target.style.opacity=0.78}
              onMouseLeave={e=>e.target.style.opacity=1}>
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
window.ProductDetail = ProductDetail;
