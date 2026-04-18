import API_BASE from './config.js'

// ── Get all orders ────────────────────────────────────────────────────────
export const getAllOrders = async () => {
  const res = await fetch(`${API_BASE}/orders`)
  if (!res.ok) throw new Error('Failed to fetch orders')
  const data = await res.json()
  return Array.isArray(data) ? data : data.orders || []
}

// ── Get single order ──────────────────────────────────────────────────────
export const getOrderById = async (id) => {
  const res = await fetch(`${API_BASE}/orders/${id}`)
  if (!res.ok) throw new Error('Failed to fetch order')
  return res.json()
}

// ── Update order status ───────────────────────────────────────────────────
export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${API_BASE}/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error('Failed to update order status')
  return res.json()
}
