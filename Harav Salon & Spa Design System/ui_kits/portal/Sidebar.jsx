// Sidebar.jsx — left rail navigation.
function Sidebar({ active = 'hours' }) {
  const items = [
    { id: 'hours', label: 'Hours', count: 1 },
    { id: 'past', label: 'Past visits' },
    { id: 'favorites', label: 'Favorites' },
    { id: 'gifts', label: 'Gift cards' },
    { id: 'profile', label: 'Profile' },
  ];
  return (
    <aside style={{
      width: 240, flexShrink: 0,
      padding: '40px 0 40px 40px',
      borderRight: '1px solid var(--border-hairline)',
      minHeight: 'calc(100vh - 72px)',
      background: 'var(--bg-page)',
    }}>
      <div style={{
        fontFamily: 'var(--font-label)', fontSize: 10,
        letterSpacing: '0.32em', textTransform: 'uppercase',
        color: 'var(--champagne-deep)', marginBottom: 20,
      }}>Your account</div>
      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map(item => {
          const isActive = active === item.id;
          return (
            <a key={item.id} style={{
              padding: '14px 0', cursor: 'pointer',
              borderTop: '1px solid var(--border-hairline)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.2,
              color: isActive ? 'var(--noir)' : 'var(--ink-500)',
              transition: 'color 220ms ease',
              position: 'relative',
            }}>
              <span>
                {isActive && (
                  <span style={{
                    display: 'inline-block', width: 16, height: 1,
                    background: 'var(--champagne-deep)',
                    verticalAlign: 'middle', marginRight: 10,
                  }} />
                )}
                {item.label}
              </span>
              {item.count && (
                <span style={{
                  fontFamily: 'var(--font-label)', fontSize: 10,
                  letterSpacing: '0.32em', color: 'var(--champagne-deep)',
                }}>{String(item.count).padStart(2,'0')}</span>
              )}
            </a>
          );
        })}
        <div style={{ borderTop: '1px solid var(--border-hairline)' }} />
      </nav>
    </aside>
  );
}
window.Sidebar = Sidebar;
