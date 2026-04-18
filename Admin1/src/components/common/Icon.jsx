// ── Material Symbol Icon wrapper ──────────────────────────────────────────
const Icon = ({ name, size = 20, color, style = {} }) => (
  <span
    className="material-symbols-outlined"
    style={{ fontSize: size, color, lineHeight: 1, ...style }}
  >
    {name}
  </span>
)

export default Icon
