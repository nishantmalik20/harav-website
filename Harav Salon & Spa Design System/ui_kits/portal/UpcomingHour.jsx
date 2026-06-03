// UpcomingHour.jsx — the dashboard hero card.
function UpcomingHour() {
  return (
    <section style={{
      background: 'var(--noir)', color: 'var(--pearl)',
      padding: '48px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '40%', height: '100%',
        backgroundImage: "url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=85')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.55,
        filter: 'saturate(.7) sepia(.15)',
        maskImage: 'linear-gradient(90deg, transparent, black 60%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 60%)',
      }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 560 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <span style={{ width: 48, height: 1, background: 'var(--champagne)' }} />
          <span style={{
            fontFamily: 'var(--font-label)', fontSize: 10,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'var(--champagne)',
          }}>Your next hour</span>
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 72,
          lineHeight: 1.0, letterSpacing: '-0.02em', margin: '0 0 24px',
        }}>
          Wednesday<br /><em style={{ fontStyle: 'italic', fontWeight: 400 }}>at 10:30.</em>
        </h2>
        <p style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 19,
          color: 'rgba(251,247,238,0.78)', margin: '0 0 32px', lineHeight: 1.5,
        }}>
          The Quiet Hour with Mireille. We've put your usual rosemary tea on the list.
        </p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 36, marginBottom: 36,
        }}>
          {[
            ['Service', 'The Quiet Hour'],
            ['Stylist', 'Mireille'],
            ['Duration', '60 min · $135'],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{
                fontFamily: 'var(--font-label)', fontSize: 9,
                letterSpacing: '0.32em', textTransform: 'uppercase',
                color: 'var(--champagne)', marginBottom: 8,
              }}>{k}</div>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: 15,
                color: 'rgba(251,247,238,0.92)',
              }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          <button style={{
            background: 'var(--pearl)', color: 'var(--noir)', border: 0,
            fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.24em', textTransform: 'uppercase',
            padding: '13px 24px', cursor: 'pointer',
            transition: 'opacity 220ms ease',
          }}
            onMouseEnter={e=>e.target.style.opacity=0.78}
            onMouseLeave={e=>e.target.style.opacity=1}>
            Add to calendar
          </button>
          <button style={{
            background: 'transparent', color: 'var(--pearl)',
            border: '1px solid rgba(251,247,238,0.45)',
            fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.24em', textTransform: 'uppercase',
            padding: '13px 24px', cursor: 'pointer',
            transition: 'background 220ms ease, color 220ms ease',
          }}
            onMouseEnter={e=>{ e.target.style.background='var(--pearl)'; e.target.style.color='var(--noir)'; }}
            onMouseLeave={e=>{ e.target.style.background='transparent'; e.target.style.color='var(--pearl)'; }}>
            Reschedule
          </button>
        </div>
      </div>
    </section>
  );
}
window.UpcomingHour = UpcomingHour;
