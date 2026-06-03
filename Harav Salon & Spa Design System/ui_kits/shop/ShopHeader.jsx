// ShopHeader.jsx — top header for the boutique landing.
function ShopHeader() {
  return (
    <header style={{ padding: '120px 56px 32px', background: 'var(--bg-page)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
          <span style={{ width: 64, height: 1, background: 'var(--champagne-deep)' }} />
          <span style={{
            fontFamily: 'var(--font-label)', fontSize: 11,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'var(--champagne-deep)',
          }}>The boutique</span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 96,
          lineHeight: 1.0, letterSpacing: '-0.02em',
          margin: '0 0 24px', color: 'var(--noir)',
        }}>
          Take a little of it <em style={{ fontStyle: 'italic', fontWeight: 400 }}>home.</em>
        </h1>
        <p style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22,
          color: 'var(--ink-600)', maxWidth: 560, margin: 0, lineHeight: 1.55,
        }}>
          The oils, balms, and rituals we use in the rooms — for the hours between visits.
        </p>
      </div>
    </header>
  );
}
window.ShopHeader = ShopHeader;
