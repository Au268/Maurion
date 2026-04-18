import { useState } from 'react'
import Icon from '../common/Icon.jsx'

const CATEGORIES = [
  'Polo Shirts', 'Tracksuits', 'T-Shirts',
  'Accessories', 'Footwear', 'Outerwear',
]

const EMPTY_PRODUCT = {
  name: '', description: '', category: 'Polo Shirts',
  price: '', stock: '', sku: '', imageUrl: '',
}

// ── Field helpers ─────────────────────────────────────────────────────────
const FieldLabel = ({ children }) => (
  <label
    style={{
      fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
      textTransform: 'uppercase', color: 'var(--color-secondary)',
      display: 'block', marginBottom: 10,
    }}
  >
    {children}
  </label>
)

const FieldInput = ({ value, onChange, placeholder, type = 'text', big, disabled }) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange && onChange(e.target.value)}
    placeholder={placeholder}
    disabled={disabled}
    style={{
      width: '100%',
      background: disabled ? 'transparent' : 'var(--color-surface-container-low)',
      border: 'none',
      borderBottom: '1px solid rgba(173,179,180,.2)',
      padding: '16px',
      fontSize: big ? 18 : 14,
      fontWeight: big ? 700 : 400,
      color: disabled ? 'var(--color-outline)' : 'var(--color-on-surface)',
    }}
  />
)

// ── Product Add / Edit Panel ──────────────────────────────────────────────
const ProductPanel = ({ product, onClose, onSave, loading }) => {
  const isEdit = !!product?._id
  const [form, setForm] = useState(
    product
      ? {
          name:        product.name        || '',
          description: product.description || '',
          category:    product.category    || 'Polo Shirts',
          price:       product.price       || '',
          stock:       product.stock       || '',
          sku:         product.sku         || '',
          imageUrl:    product.imageUrl    || '',
          _id:         product._id,
        }
      : { ...EMPTY_PRODUCT }
  )

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleSave = () => {
    onSave({
      ...form,
      price: parseFloat(form.price) || 0,
      stock: parseInt(form.stock)   || 0,
    })
  }

  return (
    <div
      className="animate-fade-in"
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(12,15,15,.4)',
        backdropFilter: 'blur(4px)',
        zIndex: 100, display: 'flex', justifyContent: 'flex-end',
      }}
    >
      <div
        className="animate-slide-right"
        style={{
          width: '100%', maxWidth: 640,
          background: 'var(--color-surface)',
          height: '100%', display: 'flex', flexDirection: 'column',
          boxShadow: '-40px 0 80px rgba(0,0,0,.08)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '48px 48px 24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          }}
        >
          <div>
            <p
              style={{
                fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--color-secondary)', marginBottom: 6,
              }}
            >
              Curate Item
            </p>
            <h2
              className="font-headline"
              style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--color-on-surface)' }}
            >
              {isEdit ? 'Edit Product' : 'Add Product'}
            </h2>
          </div>
          <button onClick={onClose} style={{ padding: 8 }}>
            <Icon name="close" size={24} color="var(--color-secondary)" />
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1, overflowY: 'auto',
            padding: '0 48px 24px',
            display: 'flex', flexDirection: 'column', gap: 28,
          }}
        >
          {/* Image Preview */}
          <div>
            <FieldLabel>Image URL</FieldLabel>
            {form.imageUrl && (
              <div
                style={{
                  width: '100%', aspectRatio: '4/3',
                  background: 'var(--color-secondary-container)',
                  marginBottom: 12, overflow: 'hidden',
                }}
              >
                <img
                  src={form.imageUrl}
                  alt="preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => (e.target.style.display = 'none')}
                />
              </div>
            )}
            <FieldInput
              value={form.imageUrl}
              onChange={(v) => set('imageUrl', v)}
              placeholder="https://..."
            />
          </div>

          {/* Form fields grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Article Name */}
            <div style={{ gridColumn: '1 / -1' }}>
              <FieldLabel>Article Name</FieldLabel>
              <FieldInput
                value={form.name}
                onChange={(v) => set('name', v)}
                placeholder="Product name"
                big
              />
            </div>

            {/* Description */}
            <div style={{ gridColumn: '1 / -1' }}>
              <FieldLabel>Narrative Description</FieldLabel>
              <textarea
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                rows={4}
                placeholder="Describe the product…"
                style={{
                  width: '100%',
                  background: 'var(--color-surface-container-low)',
                  border: 'none',
                  borderBottom: '1px solid rgba(173,179,180,.2)',
                  padding: '16px',
                  fontSize: 14,
                  color: 'var(--color-on-surface)',
                  resize: 'none',
                  fontFamily: 'var(--font-body)',
                }}
              />
            </div>

            {/* Category */}
            <div>
              <FieldLabel>Collection Category</FieldLabel>
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--color-surface-container-low)',
                  border: 'none',
                  borderBottom: '1px solid rgba(173,179,180,.2)',
                  padding: '16px',
                  fontSize: 14,
                  color: 'var(--color-on-surface)',
                  appearance: 'none',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Price */}
            <div>
              <FieldLabel>Valuation (USD)</FieldLabel>
              <FieldInput
                value={form.price}
                onChange={(v) => set('price', v)}
                placeholder="0.00"
                type="number"
              />
            </div>

            {/* Stock */}
            <div>
              <FieldLabel>Stock Allocation</FieldLabel>
              <FieldInput
                value={form.stock}
                onChange={(v) => set('stock', v)}
                placeholder="0"
                type="number"
              />
            </div>

            {/* SKU */}
            <div>
              <FieldLabel>SKU Reference</FieldLabel>
              <FieldInput
                value={form.sku}
                onChange={(v) => set('sku', v)}
                placeholder="MN-XX-000"
                disabled={isEdit}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '24px 48px',
            background: 'var(--color-surface-container-lowest)',
            display: 'flex', gap: 16,
          }}
        >
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              flex: 1, padding: '20px 0',
              background: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              borderRadius: 2, opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Saving…' : 'Publish Changes'}
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '20px 32px',
              color: 'var(--color-secondary)',
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              border: '1px solid rgba(173,179,180,.2)', borderRadius: 2,
            }}
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductPanel
