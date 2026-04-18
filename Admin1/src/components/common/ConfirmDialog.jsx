// ── Confirm / Alert Dialog ────────────────────────────────────────────────
const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div
    className="animate-fade-in"
    style={{
      position: 'fixed', inset: 0,
      background: 'rgba(12,15,15,.45)',
      backdropFilter: 'blur(4px)',
      zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
  >
    <div
      style={{
        background: 'var(--color-surface-container-lowest)',
        padding: 40, maxWidth: 400, width: '90%',
        borderRadius: 4, boxShadow: '0 40px 80px rgba(0,0,0,.12)',
      }}
    >
      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: 24, lineHeight: 1.5 }}>
        {message}
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={onConfirm}
          style={{
            flex: 1, padding: '14px 0',
            background: 'var(--color-error)', color: '#fff',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', borderRadius: 2,
          }}
        >
          Delete
        </button>
        <button
          onClick={onCancel}
          style={{
            flex: 1, padding: '14px 0',
            background: 'var(--color-surface-container-low)',
            color: 'var(--color-secondary)',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', borderRadius: 2,
            border: '1px solid var(--color-outline-variant)',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)

export default ConfirmDialog
