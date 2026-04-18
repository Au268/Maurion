import { useState, useEffect, useCallback } from 'react'
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../apis/getProducts.jsx'
import { useAdmin } from '../context/AdminContext.jsx'
import StatCard from '../components/common/StatCard.jsx'
import ProductTable from '../components/products/ProductTable.jsx'
import ProductPanel from '../components/products/ProductPanel.jsx'
import ConfirmDialog from '../components/common/ConfirmDialog.jsx'

// ── Products Page ─────────────────────────────────────────────────────────
const ProductsPage = () => {
  const { search, showToast } = useAdmin()

  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [panel,    setPanel]    = useState(null)   // null | 'new' | product obj
  const [saving,   setSaving]   = useState(false)
  const [confirm,  setConfirm]  = useState(null)   // id to delete

  // ── Load ────────────────────────────────────────────────────────────────
  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getAllProducts()
      setProducts(data)
    } catch {
      showToast('Failed to load products', 'error')
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => { load() }, [load])

  // ── Save (add or edit) ──────────────────────────────────────────────────
  const handleSave = async (form) => {
    setSaving(true)
    try {
      if (form._id) {
        await updateProduct(form._id, form)
        showToast('Product updated!')
      } else {
        await addProduct(form)
        showToast('Product added!')
      }
      setPanel(null)
      load()
    } catch {
      showToast('Save failed', 'error')
    } finally {
      setSaving(false)
    }
  }

  // ── Delete ──────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id)
      showToast('Product deleted')
      load()
    } catch {
      showToast('Delete failed', 'error')
    } finally {
      setConfirm(null)
    }
  }

  // ── Filtered list ───────────────────────────────────────────────────────
  const filtered = products.filter((p) =>
    !search ||
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.sku?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  )

  // ── Stat derivations ────────────────────────────────────────────────────
  const inStock  = products.filter((p) => p.stock > 10).length
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10).length
  const outStock = products.filter((p) => !p.stock || p.stock === 0).length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* Header */}
      <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-secondary)', marginBottom: 8 }}>
            Inventory Management
          </p>
          <h2
            className="font-headline"
            style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-0.03em', color: '#1A1A1A' }}
          >
            Product Catalog
          </h2>
        </div>
        <button
          onClick={() => setPanel('new')}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '16px 32px',
            background: 'var(--color-primary)',
            color: 'var(--color-on-primary)',
            fontSize: 12, fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: 2,
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
          Add New Product
        </button>
      </section>

      {/* Stats */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        <StatCard label="Total SKUs"     value={products.length}  sub={`${inStock} in stock`}   subIcon="check_circle" subColor="var(--color-tertiary)" />
        <StatCard label="Low Stock"      value={lowStock}         sub="Needs restock"            subIcon="warning"      subColor="var(--color-error)" />
        <StatCard label="Out of Stock"   value={outStock}         sub={outStock > 0 ? 'Action required' : 'All clear'} subIcon={outStock > 0 ? 'error' : 'check'} subColor={outStock > 0 ? 'var(--color-error)' : 'var(--color-tertiary)'} />
        <StatCard label="Categories"     value="8"                sub="Active"                   subIcon="category"     subColor="var(--color-secondary)" />
      </section>

      {/* Table */}
      <ProductTable
        products={filtered}
        loading={loading}
        onEdit={(p) => setPanel(p)}
        onDelete={(id) => setConfirm(id)}
      />

      {/* Panel */}
      {panel !== null && (
        <ProductPanel
          product={panel === 'new' ? null : panel}
          onClose={() => setPanel(null)}
          onSave={handleSave}
          loading={saving}
        />
      )}

      {/* Confirm delete */}
      {confirm && (
        <ConfirmDialog
          message="Permanently delete this product? This cannot be undone."
          onConfirm={() => handleDelete(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  )
}

export default ProductsPage
