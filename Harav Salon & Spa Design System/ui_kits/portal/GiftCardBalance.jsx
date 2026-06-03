// GiftCardBalance.jsx — compact balance card for sidebar / dashboard.
function GiftCardBalance() {
  return (
    <div style={{
      background: 'var(--bordeaux)', color: 'var(--pearl)', padding: '32px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle gold rule decoration */}
      <div style={{
        position: 'absolute', top: 32, right: 32, width: 40, height: 1,
        background: 'var(--champagne)',
      }} />
      <div style={{
        fontFamily: 'var(--font-label)', fontSize: 9,
        letterSpacing: '0.32em', textTransform: 'uppercase',
        color: 'var(--champagne)', marginBottom: 28,
      }}>Gift card balance</div>
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 64,
        fontVariantNumeric: 'oldstyle-nums', lineHeight: 1.0,
        color: 'var(--pearl)', marginBottom: 6,
      }}>$185</div>
      <div style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 15,
        color: 'rgba(251,247,238,0.72)',
      }}>From Hélène · March 2026</div>
      <a style={{
        display: 'inline-block', marginTop: 24,
        fontFamily: 'var(--font-body)', fontSize: 11,
        letterSpacing: '0.24em', textTransform: 'uppercase',
        color: 'var(--champagne)', borderBottom: '1px solid var(--champagne)',
        paddingBottom: 3, cursor: 'pointer',
      }}>Activity</a>
    </div>
  );
}
window.GiftCardBalance = GiftCardBalance;
