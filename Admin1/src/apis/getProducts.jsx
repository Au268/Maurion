import API_BASE from './config.js'

// ── Get all products ──────────────────────────────────────────────────────
export const getAllProducts = async () => {
  const res = await fetch(`${API_BASE}/products/get`)
  if (!res.ok) throw new Error('Failed to fetch products')
  const data = await res.json()
  return Array.isArray(data) ? data : data.products || []
}

// ── Get single product ────────────────────────────────────────────────────
export const getProductById = async (id) => {
  const res = await fetch(`${API_BASE}/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}

// ── Add new product ───────────────────────────────────────────────────────
export const addProduct = async (productData) => {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  })
  if (!res.ok) throw new Error('Failed to add product')
  return res.json()
}

// ── Update product ────────────────────────────────────────────────────────
export const updateProduct = async (id, productData) => {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  })
  if (!res.ok) throw new Error('Failed to update product')
  return res.json()
}

// ── Delete product ────────────────────────────────────────────────────────
export const deleteProduct = async (id) => {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete product')
  return res.json()
}
