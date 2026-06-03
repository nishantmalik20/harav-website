// VisitHistory.jsx — past visits list.
function VisitHistory() {
  const visits = [
    { date: 'Apr 12', service: 'Cut &amp; Colour', stylist: 'Mireille', duration: '120 min', price: '$245', note: '"Worked the warm into the ends — perfect."' },
    { date: 'Mar 04', service: 'The Quiet Hour', stylist: 'Mireille', duration: '60 min', price: '$135', note: '"Brought home the rosemary oil."' },
    { date: 'Feb 16', service: 'Bespoke nails', stylist: 'Inès', duration: '75 min', price: '$95', note: '"Oxblood with a single gold stroke."' },
    { date: 'Jan 22', service: 'Champagne Facial', stylist: 'Saoirse', duration: '75 min', price: '$185', note: null },
    { date: 'Dec 18', service: 'Scalp Ritual', stylist: 'Mireille', duration: '60 min', price: '$145', note: '"Slept through, in the best way."' },
  ];

  return (
    <section style={{ background: 'var(--bg-page)', padding: '48px 48px 56px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-label)', fontSize: 10,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'var(--champagne-deep)', marginBottom: 8,
          }}>The last few hours</div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 36,
            color: 'var(--noir)', margin: 0, lineHeight: 1.1,
          }}>Past visits.</h3>
        </div>
        <a style={{
          fontFamily: 'var(--font-body)', fontSize: 12,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'var(--noir)', borderBottom: '1px solid var(--champagne-deep)',
          paddingBottom: 4, cursor: 'pointer',
        }}>See all visits</a>
      </div>

      <div>
        {visits.map((v, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr auto auto',
            gap: 24, alignItems: 'center',
            padding: '20px 0',
            borderTop: '1px solid var(--border-hairline)',
          }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 20,
              color: 'var(--noir)', fontVariantNumeric: 'oldstyle-nums',
            }}>{v.date}</div>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 22,
                color: 'var(--noir)', marginBottom: 4,
              }} dangerouslySetInnerHTML={{__html: v.service}} />
              {v.note && (
                <div style={{
                  fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14,
                  color: 'var(--ink-600)',
                }}>{v.note}</div>
              )}
            </div>
            <div style={{
              fontFamily: 'var(--font-label)', fontSize: 10,
              letterSpacing: '0.32em', textTransform: 'uppercase',
              color: 'var(--ink-500)',
            }}>{v.stylist} · {v.duration}</div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 18,
              color: 'var(--noir)', fontVariantNumeric: 'oldstyle-nums',
              minWidth: 60, textAlign: 'right',
            }}>{v.price}</div>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--border-hairline)' }} />
      </div>
    </section>
  );
}
window.VisitHistory = VisitHistory;
