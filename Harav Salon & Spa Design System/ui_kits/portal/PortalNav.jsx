// PortalNav.jsx — slim top bar for the portal.
function PortalNav() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 40px',
      background: 'rgba(242,235,221,0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-hairline)',
      color: 'var(--noir)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
        <img src="../../assets/logo-wordmark.svg"
             style={{ height: 30, width: 'auto', color: 'var(--noir)' }} />
      </div>
      <div style={{
        flex: 1, maxWidth: 480, margin: '0 48px',
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 14px',
        background: 'rgba(251,247,238,0.5)',
        border: '1px solid var(--border-hairline)',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1.25" style={{ color: 'var(--ink-500)' }}>
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
        <input placeholder="Search services, stylists, or notes"
               style={{
                 border: 0, background: 'transparent', outline: 'none', flex: 1,
                 fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--noir)',
               }} />
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '6px 14px 6px 6px',
        border: '1px solid var(--border-hairline)',
        background: 'var(--pearl)', cursor: 'pointer',
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 999,
          background: 'var(--bordeaux)', color: 'var(--pearl)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontSize: 15,
        }}>A</div>
        <div style={{
          fontFamily: 'var(--font-label)', fontSize: 10,
          letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--noir)',
        }}>Anouk</div>
      </div>
    </header>
  );
}
window.PortalNav = PortalNav;
