import Icon from './Icon.jsx'

// ── Metric stat card ──────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, subIcon, subColor }) => (
  <div
    style={{
      background: 'var(--color-surface-container-lowest)',
      padding: 32, borderRadius: 12,
      display: 'flex', flexDirection: 'column', gap: 8,
    }}
  >
    <p
      style={{
        fontSize: 10, letterSpacing: '0.2em',
        textTransform: 'uppercase', fontWeight: 700,
        color: 'var(--color-secondary)',
      }}
    >
      {label}
    </p>
    <h3
      className="font-headline"
      style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-on-surface)' }}
    >
      {value}
    </h3>
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 4,
        color: subColor || 'var(--color-tertiary)', marginTop: 8,
      }}
    >
      {subIcon && <Icon name={subIcon} size={14} color={subColor || 'var(--color-tertiary)'} />}
      <span style={{ fontSize: 10, fontWeight: 700 }}>{sub}</span>
    </div>
  </div>
)

export default StatCard
