// ── Order Status Badge ────────────────────────────────────────────────────
const STATUS_CONFIG = {
  Delivered:    { bg: 'var(--color-tertiary-container)',       color: 'var(--color-on-tertiary-container)', dot: 'var(--color-tertiary)' },
  'In Transit': { bg: 'var(--color-primary-container)',        color: 'var(--color-on-primary-container)',  dot: 'var(--color-primary)' },
  Shipped:      { bg: 'var(--color-surface-container-highest)',color: 'var(--color-secondary)',             dot: 'var(--color-secondary)' },
  Processing:   { bg: 'var(--color-secondary-container)',      color: 'var(--color-on-secondary-container)',dot: 'var(--color-secondary)', pulse: true },
  Pending:      { bg: 'var(--color-secondary-fixed)',          color: 'var(--color-on-secondary-fixed)',    dot: 'var(--color-secondary)' },
  Cancelled:    { bg: 'rgba(254,137,131,.18)',                 color: 'var(--color-error)',                 dot: 'var(--color-error)' },
}

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || {
    bg: 'var(--color-surface-container)',
    color: 'var(--color-outline)',
    dot: 'var(--color-outline)',
  }

  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '4px 12px', borderRadius: 99,
        background: cfg.bg, color: cfg.color,
        fontSize: 10, fontWeight: 700,
        letterSpacing: '0.1em', textTransform: 'uppercase',
      }}
    >
      <span
        className={cfg.pulse ? 'animate-pulse-dot' : ''}
        style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot }}
      />
      {status}
    </span>
  )
}

export default StatusBadge
