// CategoryRail.jsx — horizontal category nav above the grid.
function CategoryRail({ active, onPick }) {
  const cats = ['All', 'Hair', 'Skin', 'Body', 'Home & ritual', 'Gift'];
  return (
    <div style={{
      padding: '0 56px 0',
      background: 'var(--bg-page)',
      borderBottom: '1px solid var(--border-hairline)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', gap: 0,
      }}>
        {cats.map(c => {
          const isActive = active === c;
          return (
            <button key={c} onClick={() => onPick(c)} style={{
              background: 'transparent', border: 0, cursor: 'pointer',
              padding: '24px 28px 24px 0',
              marginRight: 8,
              position: 'relative',
              fontFamily: 'var(--font-display)', fontSize: 26,
              fontStyle: isActive ? 'italic' : 'normal',
              fontWeight: 400,
              color: isActive ? 'var(--noir)' : 'var(--ink-500)',
              transition: 'color 220ms ease',
            }}>
              {c}
              {isActive && (
                <span style={{
                  position: 'absolute', bottom: -1, left: 0, width: 'calc(100% - 8px)',
                  height: 1, background: 'var(--champagne-deep)',
                }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
window.CategoryRail = CategoryRail;
