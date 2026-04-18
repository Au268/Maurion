import { useState, useEffect, useRef } from 'react'
import Icon from '../common/Icon.jsx'

const ORDER_STATUSES = [
  'Pending', 'Processing', 'Shipped',
  'In Transit', 'Delivered', 'Cancelled',
]

// ── Inline status update dropdown ─────────────────────────────────────────
const StatusDropdown = ({ current, onChange }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 12px',
          borderBottom: '1px solid rgba(173,179,180,.2)',
          fontSize: 10, fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--color-secondary)',
        }}
      >
        Update Status
        <Icon name="expand_more" size={16} color="var(--color-secondary)" />
      </button>

      {open && (
        <div
          className="animate-slide-up"
          style={{
            position: 'absolute', right: 0, top: '100%', marginTop: 4,
            background: 'var(--color-surface-container-lowest)',
            boxShadow: '0 8px 32px rgba(0,0,0,.12)',
            zIndex: 50, minWidth: 160, borderRadius: 4, overflow: 'hidden',
          }}
        >
          {ORDER_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => { onChange(s); setOpen(false) }}
              style={{
                display: 'block', width: '100%', padding: '12px 16px',
                textAlign: 'left',
                background: s === current ? 'var(--color-surface-container-low)' : 'transparent',
                fontSize: 11,
                fontWeight: s === current ? 700 : 500,
                color: s === current ? 'var(--color-primary)' : 'var(--color-secondary)',
                letterSpacing: '0.05em',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default StatusDropdown
