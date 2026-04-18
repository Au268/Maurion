import { useEffect } from 'react'
import Icon from './Icon.jsx'

// ── Toast notification ────────────────────────────────────────────────────
const Toast = ({ message, type = 'success', onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [onDone])

  const bg    = type === 'error' ? 'var(--color-error)' : 'var(--color-primary)'
  const color = 'var(--color-on-primary)'

  return (
    <div
      className="animate-toast-in"
      style={{
        position: 'fixed', bottom: 32, right: 32, zIndex: 9999,
        background: bg, color, padding: '14px 24px', borderRadius: 4,
        fontSize: 13, fontWeight: 600, letterSpacing: '0.02em',
        boxShadow: '0 8px 32px rgba(0,0,0,.15)',
        display: 'flex', gap: 10, alignItems: 'center',
      }}
    >
      <Icon
        name={type === 'error' ? 'error' : 'check_circle'}
        size={18}
        color={color}
      />
      {message}
    </div>
  )
}

export default Toast
