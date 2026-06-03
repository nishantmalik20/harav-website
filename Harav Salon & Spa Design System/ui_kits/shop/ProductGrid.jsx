// ProductGrid.jsx — responsive 4-col grid for ProductCard.
function ProductGrid({ products, onOpen, onAdd }) {
  return (
    <section style={{ padding: '8px 56px 96px', background: 'var(--bg-page)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 36,
        }}>
          {products.map(p => (
            <ProductCard key={p.id} product={p} onOpen={onOpen} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  );
}
window.ProductGrid = ProductGrid;
