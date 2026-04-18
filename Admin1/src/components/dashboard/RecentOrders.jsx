import { useNavigate } from 'react-router-dom'
import Avatar from '../common/Avatar.jsx'
import StatusBadge from '../orders/StatusBadge.jsx'

// ── Recent Orders mini-table for dashboard ────────────────────────────────
const RecentOrders = ({ orders }) => {
  const navigate = useNavigate()

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h3 className="font-headline" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-on-surface)' }}>
          Recent Orders
        </h3>
        <button
          onClick={() => navigate('/orders')}
          style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--color-secondary)',
            borderBottom: '2px solid var(--color-secondary)', paddingBottom: 2,
          }}
        >
          View All
        </button>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--color-surface-container-low)' }}>
              {['Order ID', 'Customer', 'Date', 'Total', 'Status'].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '20px 24px', fontSize: 10, fontWeight: 700,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'var(--color-outline)', textAlign: 'left',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ borderTop: 'none' }}>
            {orders.map((o) => {
              const name   = o.customer?.name || o.customerName || 'Unknown'
              const initials = name.split(' ').slice(0, 2).map((w) => w[0]).join('')
              const date   = o.createdAt
                ? new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : '—'

              return (
                <tr
                  key={o._id}
                  style={{ borderTop: '1px solid var(--color-surface-container-low)', transition: 'background .15s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-surface-container-low)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '20px 24px' }}>
                    <span className="font-headline" style={{ fontWeight: 700, fontSize: 13, color: 'var(--color-on-surface)' }}>
                      #{o._id?.slice(-8).toUpperCase() || '—'}
                    </span>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={name} size={30} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-on-surface)' }}>
                        {name.split(' ')[0]} {name.split(' ')[1]?.[0]}.
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px', fontSize: 12, color: 'var(--color-outline)' }}>{date}</td>
                  <td style={{ padding: '20px 24px', fontSize: 13, fontWeight: 700, color: 'var(--color-on-surface)' }}>
                    ${Number(o.total || 0).toFixed(2)}
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <StatusBadge status={o.status || 'Pending'} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default RecentOrders
