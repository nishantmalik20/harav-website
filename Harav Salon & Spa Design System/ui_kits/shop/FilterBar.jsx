// FilterBar.jsx — sort + concern filter row above the grid.
function FilterBar({ count, sort, setSort }) {
  const concerns = ['Dry', 'Coloured', 'Sensitive', 'Mature', 'Curly'];
  return (
    <div style={{
      padding: '24px 56px',
      background: 'var(--bg-page)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-label)', fontSize: 10,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'var(--ink-500)', marginRight: 6,
          }}>Concern</span>
          {concerns.map(c => (
            <button key={c} style={{
              background: 'transparent', cursor: 'pointer',
              border: '1px solid var(--border-soft)',
              padding: '8px 14px',
              fontFamily: 'var(--font-body)', fontSize: 11,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--noir)',
              transition: 'background 220ms ease, color 220ms ease',
            }}
              onMouseEnter={e=>{ e.target.style.background='var(--noir)'; e.target.style.color='var(--pearl)'; }}
              onMouseLeave={e=>{ e.target.style.background='transparent'; e.target.style.color='var(--noir)'; }}>
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{
            fontFamily: 'var(--font-label)', fontSize: 10,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'var(--ink-500)',
          }}>{String(count).padStart(2,'0')} products</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontFamily: 'var(--font-label)', fontSize: 10,
              letterSpacing: '0.32em', textTransform: 'uppercase',
              color: 'var(--ink-500)',
            }}>Sort</span>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{
              background: 'transparent', border: 0, borderBottom: '1px solid var(--border-soft)',
              fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--noir)',
              padding: '4px 24px 4px 4px', cursor: 'pointer', outline: 'none',
              appearance: 'none', WebkitAppearance: 'none',
              backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M1 1l4 4 4-4' stroke='%23A8854C' stroke-width='1' fill='none'/></svg>\")",
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 4px center',
            }}>
              <option>Curated</option>
              <option>Price · low</option>
              <option>Price · high</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
window.FilterBar = FilterBar;
