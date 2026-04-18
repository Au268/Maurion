import Icon from '../components/common/Icon.jsx'

// ── Customers Page (placeholder) ──────────────────────────────────────────
const CustomersPage = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
    <div>
      <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-secondary)', marginBottom: 8 }}>
        Client Management
      </p>
      <h2
        className="font-headline"
        style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-0.03em', color: '#1A1A1A' }}
      >
        Customers
      </h2>
    </div>

    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: 320, gap: 16,
        background: 'var(--color-surface-container-lowest)', borderRadius: 12,
      }}
    >
      <Icon name="group" size={48} color="var(--color-outline-variant)" />
      <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-on-surface)' }}>Coming Soon</p>
      <p style={{ fontSize: 13, color: 'var(--color-secondary)' }}>Customer management section is under development.</p>
    </div>
  </div>
)

export default CustomersPage
