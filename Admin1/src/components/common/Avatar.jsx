// ── Avatar with initials fallback ─────────────────────────────────────────
const Avatar = ({ name, size = 32 }) => {
  const initials = name
    ?.split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || '?'

  return (
    <div
      style={{
        width: size, height: size, borderRadius: '50%',
        background: 'var(--color-secondary-container)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, fontWeight: 700,
        color: 'var(--color-secondary)', flexShrink: 0,
      }}
    >
      {initials}
    </div>
  )
}

export default Avatar
