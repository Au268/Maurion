import { useAdmin } from '../../context/AdminContext.jsx'
import Icon from './Icon.jsx'
import Avatar from './Avatar.jsx'

// ── Top Application Bar ───────────────────────────────────────────────────
const TopBar = () => {
  const { search, setSearch } = useAdmin()

  return (
    <header
      style={{
        position: 'fixed', top: 0, right: 0, left: 288, zIndex: 40,
        background: 'rgba(249,249,249,.75)',
        backdropFilter: 'blur(20px)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 48px', height: 96,
        boxShadow: '0 20px 50px rgba(0,0,0,.04)',
      }}
    >
      {/* Search */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 400 }}>
        <Icon
          name="search"
          size={20}
          color="var(--color-outline-variant)"
          style={{
            position: 'absolute', left: 16,
            top: '50%', transform: 'translateY(-50%)',
          }}
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search orders, products, customers…"
          style={{
            width: '100%',
            background: 'var(--color-surface-container-low)',
            border: 'none', height: 48,
            paddingLeft: 48, paddingRight: 16,
            borderRadius: 8, fontSize: 13,
            color: 'var(--color-on-surface)',
          }}
        />
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginLeft: 24 }}>
        <button
          style={{
            width: 40, height: 40, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Icon name="notifications" size={20} color="var(--color-primary)" />
        </button>
        <button
          style={{
            width: 40, height: 40, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Icon name="settings" size={20} color="var(--color-primary)" />
        </button>
        <div style={{ width: 1, height: 32, background: 'var(--color-outline-variant)', opacity: 0.25 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-on-surface)' }}>
              Alex Maurion
            </p>
            <p style={{ fontSize: 10, color: 'var(--color-secondary)', fontWeight: 500 }}>
              Administrator
            </p>
          </div>
          <Avatar name="Alex Maurion" size={40} />
        </div>
      </div>
    </header>
  )
}

export default TopBar
