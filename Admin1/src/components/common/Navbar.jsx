import { NavLink } from 'react-router-dom'
import Icon from './Icon.jsx'

// ── Nav link config ───────────────────────────────────────────────────────
const NAV_LINKS = [
  { to: '/dashboard',  icon: 'dashboard',    label: 'Dashboard' },
  { to: '/products',   icon: 'inventory_2',  label: 'Products' },
  { to: '/orders',     icon: 'shopping_bag', label: 'Orders' },
  { to: '/customers',  icon: 'group',        label: 'Customers' },
  { to: '/settings',   icon: 'settings',     label: 'Settings' },
]

// ── Sidebar Navigation ────────────────────────────────────────────────────
const Navbar = () => (
  <aside
    style={{
      position: 'fixed', left: 0, top: 0,
      height: '100%', width: 288, zIndex: 50,
      background: 'var(--color-surface)',
      display: 'flex', flexDirection: 'column',
      padding: '40px 24px',
      borderRight: '1px solid rgba(173,179,180,.1)',
    }}
  >
    {/* Brand */}
    <div style={{ marginBottom: 32 }}>
      <h1
        className="font-headline"
        style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}
      >
        Maurion Noir
      </h1>
      <p
        style={{
          fontSize: 10, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-secondary)',
        }}
      >
        Admin Portal
      </p>
    </div>

    {/* Nav Links */}
    <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {NAV_LINKS.map(({ to, icon, label }) => (
        <NavLink key={to} to={to}>
          {({ isActive }) => (
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '12px 16px',
                background: isActive
                  ? 'var(--color-surface-container-lowest)'
                  : 'transparent',
                color: isActive
                  ? 'var(--color-primary)'
                  : 'var(--color-secondary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: 12, letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRight: isActive
                  ? '4px solid var(--color-secondary)'
                  : '4px solid transparent',
                transition: 'all .2s',
              }}
            >
              <Icon
                name={icon}
                size={20}
                color={isActive ? 'var(--color-primary)' : 'var(--color-secondary)'}
              />
              {label}
            </div>
          )}
        </NavLink>
      ))}
    </nav>

    {/* Footer Links */}
    <div
      style={{
        display: 'flex', flexDirection: 'column', gap: 4,
        borderTop: '1px solid rgba(173,179,180,.1)', paddingTop: 24,
      }}
    >
      {[
        { icon: 'help',   label: 'Support' },
        { icon: 'logout', label: 'Logout' },
      ].map(({ icon, label }) => (
        <button
          key={label}
          style={{
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '12px 16px', color: 'var(--color-secondary)',
            fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
            textAlign: 'left',
          }}
        >
          <Icon name={icon} size={20} color="var(--color-secondary)" />
          {label}
        </button>
      ))}
    </div>
  </aside>
)

export default Navbar
