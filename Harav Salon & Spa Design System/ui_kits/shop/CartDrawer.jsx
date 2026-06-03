// CartDrawer.jsx — right-side cart with line items.
function CartDrawer({ open, onClose, items, onChange }) {
  const subtotal = items.reduce((s, it) => s + it.product.price * it.qty, 0);
  const backdropStyle = {
    position: 'fixed', inset: 0, zIndex: 150,
    background: 'rgba(26,23,20,0.55)',
    backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'auto' : 'none',
    transition: 'opacity 450ms cubic-bezier(.22,1,.36,1)',
  };
  const drawerStyle = {
    position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 151,
    width: 520, maxWidth: '92vw',
    background: 'var(--linen)',
    transform: open ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 450ms cubic-bezier(.22,1,.36,1)',
    display: 'flex', flexDirection: 'column',
    boxShadow: '0 24px 60px rgba(60,40,25,0.20)',
  };
  return (
    <React.Fragment>
      <div style={backdropStyle} onClick={onClose} />
      <aside style={drawerStyle}>
        <header style={{
          padding: '28px 36px', borderBottom: '1px solid var(--border-hairline)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-label)', fontSize: 10,
              letterSpacing: '0.32em', textTransform: 'uppercase',
              color: 'var(--champagne-deep)', marginBottom: 6,
            }}>Your bag</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--noir)' }}>
              Take this with you.
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{
            background: 'transparent', border: 0, fontSize: 24, cursor: 'pointer',
            color: 'var(--ink-600)', padding: 8, lineHeight: 1,
          }}>×</button>
        </header>

        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 36px' }}>
          {items.length === 0 ? (
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--champagne-deep)', marginBottom: 16 }}>✦</div>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 19, color: 'var(--ink-600)' }}>
                Nothing held yet.
              </div>
            </div>
          ) : items.map(({ product, qty }) => (
            <div key={product.id} style={{
              display: 'grid', gridTemplateColumns: '88px 1fr auto',
              gap: 18, alignItems: 'center',
              padding: '20px 0', borderTop: '1px solid var(--border-hairline)',
            }}>
              <div style={{ width: 88, aspectRatio: '4 / 5', overflow: 'hidden', background: 'var(--blush)' }}>
                <img src={product.img} alt="" style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  filter: 'saturate(.82) sepia(.08)',
                }} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, color: 'var(--noir)', marginBottom: 4 }}>
                  {product.name}
                </div>
                <div style={{
                  fontFamily: 'var(--font-label)', fontSize: 9,
                  letterSpacing: '0.28em', textTransform: 'uppercase',
                  color: 'var(--ink-500)', marginBottom: 10,
                }}>{product.type}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => onChange(product.id, qty - 1)}
                          style={qtyBtn}>−</button>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: 17,
                    fontVariantNumeric: 'oldstyle-nums', minWidth: 18, textAlign: 'center',
                  }}>{qty}</span>
                  <button onClick={() => onChange(product.id, qty + 1)}
                          style={qtyBtn}>+</button>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 19, color: 'var(--noir)',
                  fontVariantNumeric: 'oldstyle-nums',
                }}>${product.price * qty}</div>
                <button onClick={() => onChange(product.id, 0)} style={{
                  background: 'transparent', border: 0, cursor: 'pointer',
                  fontFamily: 'var(--font-body)', fontSize: 10,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: 'var(--ink-500)', marginTop: 6, padding: 0,
                  textDecoration: 'underline', textUnderlineOffset: 3,
                }}>Remove</button>
              </div>
            </div>
          ))}
          {items.length > 0 && <div style={{ borderTop: '1px solid var(--border-hairline)' }} />}
        </div>

        <footer style={{
          padding: '24px 36px 28px', borderTop: '1px solid var(--border-hairline)',
          background: 'var(--pearl)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            marginBottom: 16,
          }}>
            <span style={{
              fontFamily: 'var(--font-label)', fontSize: 10,
              letterSpacing: '0.32em', textTransform: 'uppercase',
              color: 'var(--ink-500)',
            }}>Subtotal</span>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--noir)',
              fontVariantNumeric: 'oldstyle-nums',
            }}>${subtotal}</span>
          </div>
          <div style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14,
            color: 'var(--ink-600)', marginBottom: 18,
          }}>Shipped in linen, hand-tied. Free over $120.</div>
          <button disabled={items.length === 0} style={{
            width: '100%', background: 'var(--noir)', color: 'var(--pearl)', border: 0,
            fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
            letterSpacing: '0.24em', textTransform: 'uppercase',
            padding: '18px', cursor: items.length === 0 ? 'not-allowed' : 'pointer',
            opacity: items.length === 0 ? 0.35 : 1,
            transition: 'opacity 220ms ease',
          }}
            onMouseEnter={e=>{ if(items.length>0) e.target.style.opacity=0.78; }}
            onMouseLeave={e=>{ if(items.length>0) e.target.style.opacity=1; }}>
            To checkout
          </button>
        </footer>
      </aside>
    </React.Fragment>
  );
}

const qtyBtn = {
  width: 24, height: 24, border: '1px solid var(--border-soft)',
  background: 'transparent', cursor: 'pointer',
  fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--noir)',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  padding: 0, lineHeight: 1,
};

window.CartDrawer = CartDrawer;
