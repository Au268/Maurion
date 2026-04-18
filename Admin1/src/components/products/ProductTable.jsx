import Icon from '../common/Icon.jsx'

// ── Stock status helper ───────────────────────────────────────────────────
const getStockStatus = (stock) => {
  if (stock === 0)    return { label: 'Out of Stock', bg: 'rgba(159,64,61,.1)', color: 'var(--color-error)' }
  if (stock <= 10)    return { label: 'Low Stock',    bg: 'var(--color-error-container)', color: 'var(--color-on-error-container)' }
  return               { label: 'In Stock',    bg: 'var(--color-tertiary-container)', color: 'var(--color-on-tertiary-container)' }
}

// ── Products data table ───────────────────────────────────────────────────
const ProductTable = ({ products, loading, onEdit, onDelete }) => (
  <div
    style={{
      background: 'var(--color-surface-container-lowest)',
      borderRadius: 4, overflow: 'hidden',
      boxShadow: '0 40px 80px rgba(0,0,0,.02)',
    }}
  >
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: 'var(--color-surface-container-low)' }}>
          {['Product', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map((h, i) => (
            <th
              key={h}
              style={{
                padding: '24px 32px',
                fontSize: 10, fontWeight: 700,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--color-secondary)',
                textAlign: i === 5 ? 'right' : 'left',
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {loading && (
          <tr>
            <td colSpan={6} style={{ padding: 56, textAlign: 'center', color: 'var(--color-secondary)', fontSize: 13 }}>
              Loading catalog…
            </td>
          </tr>
        )}

        {!loading && products.length === 0 && (
          <tr>
            <td colSpan={6} style={{ padding: 56, textAlign: 'center', color: 'var(--color-secondary)', fontSize: 13 }}>
              No products found.
            </td>
          </tr>
        )}

        {products.map((p) => {
          const stock = getStockStatus(p.stock ?? 0)
          return (
            <tr
              key={p._id}
              style={{ borderTop: '1px solid var(--color-surface-container-low)', transition: 'background .15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-surface-container-low)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {/* Product */}
              <td style={{ padding: '24px 32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div
                    style={{
                      width: 56, height: 72,
                      background: 'var(--color-secondary-container)',
                      overflow: 'hidden', flexShrink: 0,
                    }}
                  >
                    {p.imageUrl
                      ? <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon name="image" size={24} color="var(--color-outline-variant)" />
                        </div>
                      )
                    }
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-on-surface)' }}>{p.name}</p>
                    <p style={{ fontSize: 10, color: 'var(--color-outline)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{p.sku}</p>
                  </div>
                </div>
              </td>

              {/* Category */}
              <td style={{ padding: '24px 32px', color: 'var(--color-secondary)', fontWeight: 500, fontSize: 13 }}>
                {p.category}
              </td>

              {/* Price */}
              <td style={{ padding: '24px 32px', fontWeight: 700, fontSize: 14, color: 'var(--color-on-surface)' }}>
                ${Number(p.price).toFixed(2)}
              </td>

              {/* Stock count */}
              <td
                style={{
                  padding: '24px 32px', fontSize: 13,
                  fontWeight: (p.stock ?? 0) <= 10 ? 700 : 500,
                  color: (p.stock ?? 0) <= 10 ? 'var(--color-error)' : 'var(--color-on-surface)',
                }}
              >
                {p.stock ?? 0} Units
              </td>

              {/* Status badge */}
              <td style={{ padding: '24px 32px' }}>
                <span
                  style={{
                    padding: '4px 12px',
                    background: stock.bg, color: stock.color,
                    fontSize: 10, fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}
                >
                  {stock.label}
                </span>
              </td>

              {/* Actions */}
              <td style={{ padding: '24px 32px', textAlign: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
                  <button onClick={() => onEdit(p)} style={{ padding: 8 }}>
                    <Icon name="edit" size={18} color="var(--color-secondary)" />
                  </button>
                  <button onClick={() => onDelete(p._id)} style={{ padding: 8 }}>
                    <Icon name="delete" size={18} color="var(--color-error)" />
                  </button>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

export default ProductTable
