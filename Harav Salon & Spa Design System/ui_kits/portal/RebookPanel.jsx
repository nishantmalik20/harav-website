// RebookPanel.jsx — right rail "book the same again".
function RebookPanel() {
  return (
    <aside style={{
      background: 'var(--blush)', padding: '40px 32px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <span style={{ width: 40, height: 1, background: 'var(--noir)' }} />
        <span style={{
          fontFamily: 'var(--font-label)', fontSize: 10,
          letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--noir)',
        }}>Again?</span>
      </div>
      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 34,
        lineHeight: 1.1, margin: '0 0 14px', color: 'var(--noir)',
      }}>The same again, <em style={{ fontStyle: 'italic' }}>same hands.</em></h3>
      <p style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16,
        color: 'var(--ink-700)', lineHeight: 1.5, margin: '0 0 28px',
      }}>Mireille has openings the week after next.</p>

      <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
        {['May 27', 'Jun 03', 'Jun 10'].map((d, i) => (
          <button key={d} style={{
            flex: 1, padding: '14px 8px',
            background: i === 1 ? 'var(--noir)' : 'transparent',
            color: i === 1 ? 'var(--pearl)' : 'var(--noir)',
            border: '1px solid ' + (i === 1 ? 'var(--noir)' : 'rgba(26,23,20,0.25)'),
            fontFamily: 'var(--font-display)', fontSize: 17,
            fontVariantNumeric: 'oldstyle-nums', cursor: 'pointer',
          }}>{d}</button>
        ))}
      </div>

      <button style={{
        width: '100%', background: 'var(--noir)', color: 'var(--pearl)', border: 0,
        fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
        letterSpacing: '0.24em', textTransform: 'uppercase',
        padding: '16px', cursor: 'pointer',
        transition: 'opacity 220ms ease',
      }}
        onMouseEnter={e=>e.target.style.opacity=0.78}
        onMouseLeave={e=>e.target.style.opacity=1}>
        Hold this hour
      </button>

      <div style={{
        marginTop: 28, paddingTop: 24,
        borderTop: '1px solid rgba(26,23,20,0.15)',
      }}>
        <div style={{
          fontFamily: 'var(--font-label)', fontSize: 10,
          letterSpacing: '0.32em', textTransform: 'uppercase',
          color: 'var(--noir)', marginBottom: 14,
        }}>Or try someone new</div>
        <div style={{ display: 'flex', gap: 14 }}>
          {[
            ['Saoirse', 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=200&q=85'],
            ['Inès', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&q=85'],
          ].map(([n, img]) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <img src={img} alt="" style={{
                width: 40, height: 40, objectFit: 'cover',
                filter: 'saturate(.82) sepia(.10)',
              }} />
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--noir)',
              }}>{n}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
window.RebookPanel = RebookPanel;
