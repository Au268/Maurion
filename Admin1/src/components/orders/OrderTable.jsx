import Avatar from '../common/Avatar.jsx'
import StatusBadge from './StatusBadge.jsx'
import StatusDropdown from './StatusDropdown.jsx'
import Icon from '../common/Icon.jsx'

// ── Pagination button ─────────────────────────────────────────────────────
const PagBtn = ({ children, active, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      width: 40, height: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: 8, fontSize: 12, fontWeight: 700,
      background: active ? 'var(--color-primary)' : 'transparent',
      color: active ? 'var(--color-on-primary)' : 'var(--color-secondary)',
      border: active ? 'none' : '1px solid rgba(173,179,180,.25)',
      opacity: disabled ? 0.4 : 1,
      cursor: disabled ? 'default' : 'pointer',
    }}
  >
    {children}
  </button>
)

// ── Orders data table ─────────────────────────────────────────────────────
const OrderTable = ({
  orders, loading, onStatusChange,
  page, totalPages, onPageChange, totalCount,
}) => {
  const PAGE_SIZE = 8

  return (
    <div
      style={{
        background: 'var(--color-surface-container-low)',
        borderRadius: 16, overflow: 'hidden', padding: 4,
        boxShadow: '0 20px 50px rgba(0,0,0,.02)',
      }}
    >
      <div
        style={{
          background: 'var(--color-surface-container-lowest)',
          borderRadius: 12, overflowX: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-surface-container-low)' }}>
              {['Order ID', 'Customer', 'Items', 'Date', 'Total', 'Status', 'Action'].map((h, i) => (
                <th
                  key={h}
                  style={{
                    padding: '24px 28px',
                    fontSize: 10, fontWeight: 700,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'var(--color-secondary)',
                    textAlign: i === 6 ? 'right' : 'left',
                    whiteSpace: 'nowrap',
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
                <td colSpan={7} style={{ padding: 56, textAlign: 'center', color: 'var(--color-secondary)', fontSize: 13 }}>
                  Loading orders…
                </td>
              </tr>
            )}

            {!loading && orders.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: 56, textAlign: 'center', color: 'var(--color-secondary)', fontSize: 13 }}>
                  No orders found.
                </td>
              </tr>
            )}

            {orders.map((o) => {
              const items = Array.isArray(o.items)
                ? o.items.map((i) => i.name || i.product || 'Item').join(', ')
                : (o.items || '—')

              const date = o.createdAt
                ? new Date(o.createdAt).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric',
                  })
                : '—'

              const name  = o.customer?.name  || o.customerName  || 'Unknown'
              const email = o.customer?.email || o.customerEmail || ''
              const orderId = o._id?.slice(-8).toUpperCase() || '—'

              return (
                <tr
                  key={o._id}
                  style={{ borderTop: '1px solid var(--color-surface-container-low)', transition: 'background .15s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(242,244,244,.6)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {/* Order ID */}
                  <td style={{ padding: '24px 28px' }}>
                    <span
                      className="font-headline"
                      style={{ fontWeight: 700, fontSize: 13, color: 'var(--color-primary)', letterSpacing: '-0.01em' }}
                    >
                      #{orderId}
                    </span>
                  </td>

                  {/* Customer */}
                  <td style={{ padding: '24px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Avatar name={name} size={32} />
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-on-surface)' }}>{name}</p>
                        {email && <p style={{ fontSize: 10, color: 'var(--color-secondary)' }}>{email}</p>}
                      </div>
                    </div>
                  </td>

                  {/* Items */}
                  <td style={{ padding: '24px 20px', maxWidth: 180 }}>
                    <span
                      style={{
                        display: 'block', fontSize: 12,
                        color: 'var(--color-secondary)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}
                    >
                      {items}
                    </span>
                  </td>

                  {/* Date */}
                  <td style={{ padding: '24px 20px', fontSize: 12, color: 'var(--color-secondary)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    {date}
                  </td>

                  {/* Total */}
                  <td style={{ padding: '24px 20px', fontSize: 13, fontWeight: 700, color: 'var(--color-on-surface)', whiteSpace: 'nowrap' }}>
                    ${Number(o.total || 0).toFixed(2)}
                  </td>

                  {/* Status */}
                  <td style={{ padding: '24px 20px' }}>
                    <StatusBadge status={o.status || 'Pending'} />
                  </td>

                  {/* Action */}
                  <td style={{ padding: '24px 28px', textAlign: 'right' }}>
                    <StatusDropdown
                      current={o.status || 'Pending'}
                      onChange={(s) => onStatusChange(o._id, s)}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Pagination */}
        {!loading && totalCount > 0 && (
          <div
            style={{
              background: 'var(--color-surface-container-lowest)',
              borderTop: '1px solid var(--color-surface-container-low)',
              padding: '24px 32px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}
          >
            <p
              style={{
                fontSize: 10, fontWeight: 700,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--color-secondary)',
              }}
            >
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, totalCount)} of {totalCount} Orders
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <PagBtn onClick={() => onPageChange(page - 1)} disabled={page === 1}>
                <Icon name="chevron_left" size={16} />
              </PagBtn>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((n) => (
                <PagBtn key={n} active={n === page} onClick={() => onPageChange(n)}>{n}</PagBtn>
              ))}
              <PagBtn onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
                <Icon name="chevron_right" size={16} />
              </PagBtn>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderTable
