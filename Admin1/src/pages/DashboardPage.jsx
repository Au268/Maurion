import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllProducts } from '../apis/getProducts.jsx'
import { getAllOrders } from '../apis/getOrders.jsx'
import StatCard from '../components/common/StatCard.jsx'
import RecentOrders from '../components/dashboard/RecentOrders.jsx'
import TopSellers from '../components/dashboard/TopSellers.jsx'

// ── Dashboard Page ────────────────────────────────────────────────────────
const DashboardPage = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [orders,   setOrders]   = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [p, o] = await Promise.all([getAllProducts(), getAllOrders()])
        setProducts(p)
        setOrders(o)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Derived metrics
  const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0)
  const avgOrder     = orders.length ? (totalRevenue / orders.length).toFixed(2) : '0.00'
  const recentOrders = orders.slice(0, 4)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* Header */}
      <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-secondary)', marginBottom: 8 }}>
            Executive Summary
          </p>
          <h2
            className="font-headline"
            style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--color-on-surface)', fontStyle: 'italic' }}
          >
            Dashboard
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            style={{
              padding: '12px 24px',
              background: 'var(--color-surface-container-high)',
              color: 'var(--color-on-surface)',
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 2,
            }}
          >
            Export Report
          </button>
          <button
            onClick={() => navigate('/products')}
            style={{
              padding: '12px 24px',
              background: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 2,
            }}
          >
            Add New Product
          </button>
        </div>
      </section>

      {/* Metrics */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        <StatCard
          label="Total Revenue"
          value={`$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          sub="+12.5% this month"
          subIcon="trending_up"
          subColor="var(--color-tertiary)"
        />
        <StatCard
          label="Total Orders"
          value={orders.length.toLocaleString()}
          sub="Units sold"
          subIcon="shopping_cart"
          subColor="var(--color-secondary)"
        />
        <StatCard
          label="Avg Order Value"
          value={`$${avgOrder}`}
          sub="Per cart"
          subIcon="analytics"
          subColor="var(--color-secondary)"
        />
        <StatCard
          label="Conversion Rate"
          value="3.82%"
          sub="Steady trend"
          subIcon="show_chart"
          subColor="var(--color-tertiary)"
        />
      </section>

      {/* Bottom row */}
      <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40 }}>
        {loading
          ? <p style={{ color: 'var(--color-secondary)', fontSize: 13 }}>Loading data…</p>
          : <RecentOrders orders={recentOrders} />
        }
        {!loading && <TopSellers products={products} />}
      </section>
    </div>
  )
}

export default DashboardPage
