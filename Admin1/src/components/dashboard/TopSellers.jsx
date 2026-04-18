import Icon from '../common/Icon.jsx'

// ── Top selling products widget ───────────────────────────────────────────
const TopSellers = ({ products }) => {
  const sorted = [...products]
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))
    .slice(0, 3)

  return (
    <section>
      <h3
        className="font-headline"
        style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-on-surface)', marginBottom: 24 }}
      >
        Top Sellers
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {sorted.length === 0 && (
          <p style={{ fontSize: 13, color: 'var(--color-secondary)' }}>No product data yet.</p>
        )}

        {sorted.map((p) => (
          <div
            key={p._id}
            style={{
              background: 'var(--color-surface-container-low)',
              padding: 16, display: 'flex', gap: 20,
              transition: 'background .15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-surface-container)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-surface-container-low)')}
          >
            {/* Thumbnail */}
            <div
              style={{
                width: 72, height: 72, flexShrink: 0,
                background: 'var(--color-secondary-container)', overflow: 'hidden',
              }}
            >
              {p.imageUrl
                ? <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="inventory_2" size={24} color="var(--color-outline-variant)" />
                  </div>
                )
              }
            </div>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-secondary)', fontWeight: 700, marginBottom: 4 }}>
                {p.category}
              </p>
              <h4
                className="font-headline"
                style={{ fontWeight: 700, color: 'var(--color-on-surface)', fontSize: 14, marginBottom: 4 }}
              >
                {p.name}
              </h4>
              <p style={{ fontSize: 12, color: 'var(--color-outline)' }}>
                {p.stock} Units •{' '}
                <span style={{ fontWeight: 700, color: 'var(--color-on-surface)' }}>
                  ${Number(p.price).toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Inspiration quote block */}
      <div
        style={{
          marginTop: 24,
          background: 'var(--color-primary)',
          padding: 32, color: 'var(--color-on-primary)',
        }}
      >
        <p
          className="font-headline"
          style={{ fontSize: 14, fontStyle: 'italic', lineHeight: 1.6, opacity: 0.85, marginBottom: 12 }}
        >
          "Success is not final, failure is not fatal: it is the courage to continue that counts."
        </p>
        <p style={{ fontSize: 10, opacity: 0.5, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          Daily Inspiration
        </p>
      </div>
    </section>
  )
}

export default TopSellers
