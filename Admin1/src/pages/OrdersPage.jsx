import { useState, useEffect, useCallback } from 'react'
import { getAllOrders, updateOrderStatus } from '../apis/getOrders.jsx'
import { useAdmin } from '../context/AdminContext.jsx'
import StatCard from '../components/common/StatCard.jsx'
import OrderTable from '../components/orders/OrderTable.jsx'
import Icon from '../components/common/Icon.jsx'

const PAGE_SIZE = 8

// ── Orders Page ───────────────────────────────────────────────────────────
const OrdersPage = () => {
  const { search, showToast } = useAdmin()

  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(true)
  const [page,    setPage]    = useState(1)

  // ── Load ────────────────────────────────────────────────────────────────
  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getAllOrders()
      setOrders(data)
    } catch {
      showToast('Failed to load orders', 'error')
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => { load() }, [load])

  // ── Update status ────────────────────────────────────────────────────────
  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status)
      // Optimistic update
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)))
      showToast('Status updated!')
    } catch {
      showToast('Update failed', 'error')
    }
  }

  // ── Filter + paginate ────────────────────────────────────────────────────
  const filtered = orders.filter((o) => {
    if (!search) return true
    const name  = (o.customer?.name || o.customerName || '').toLowerCase()
    const email = (o.customer?.email || o.customerEmail || '').toLowerCase()
    const id    = (o._id || '').toLowerCase()
    const q     = search.toLowerCase()
    return name.includes(q) || email.includes(q) || id.includes(q)
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // ── Stat derivations ─────────────────────────────────────────────────────
  const pending   = orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length
  const inTransit = orders.filter((o) => o.status === 'In Transit' || o.status === 'Shipped').length
  const avgVal    = orders.length
    ? (orders.reduce((s, o) => s + (o.total || 0), 0) / orders.length).toFixed(2)
    : '0.00'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* Header */}
      <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-secondary)' }}>Admin</span>
            <Icon name="chevron_right" size={12} color="var(--color-outline-variant)" />
            <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 700 }}>Order Management</span>
          </div>
          <h2
            className="font-headline"
            style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.03em', color: '#1A1A1A', marginBottom: 8 }}
          >
            Orders
          </h2>
          <p style={{ color: 'var(--color-secondary)', fontSize: 13, maxWidth: 360, lineHeight: 1.6 }}>
            Curating fulfillment operations for the seasonal collection.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '0 24px', height: 48,
              background: 'var(--color-surface-container-highest)',
              color: 'var(--color-on-surface)',
              fontSize: 12, fontWeight: 700, borderRadius: 8,
            }}
          >
            <Icon name="filter_list" size={16} color="var(--color-secondary)" />
            Filter
          </button>
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '0 32px', height: 48,
              background: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
              fontSize: 12, fontWeight: 700, borderRadius: 8,
            }}
          >
            <Icon name="download" size={16} color="var(--color-on-primary)" />
            Export Data
          </button>
        </div>
      </section>

      {/* Stats */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        <StatCard label="Total Orders"      value={orders.length.toLocaleString()} sub="+12.4% vs last month" subIcon="trending_up"     subColor="var(--color-tertiary)" />
        <StatCard label="Pending Approval"  value={pending}                        sub="Requires Attention"   subIcon="schedule"         subColor="var(--color-error)" />
        <StatCard label="Active Shipments"  value={inTransit}                      sub="On Schedule"          subIcon="local_shipping"   subColor="var(--color-tertiary)" />
        <StatCard label="Average Order Value" value={`$${avgVal}`}                 sub="Steady Trend"         subIcon="payments"         subColor="var(--color-secondary)" />
      </section>

      {/* Table */}
      <OrderTable
        orders={paged}
        loading={loading}
        onStatusChange={handleStatusChange}
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
        totalCount={filtered.length}
      />
    </div>
  )
}

export default OrdersPage
