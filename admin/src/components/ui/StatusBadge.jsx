const pillStyles = {
  Delivered: "bg-tertiary-container text-on-tertiary-container",
  "In Transit": "bg-primary-container text-on-primary-container",
  Shipped: "bg-surface-container-highest text-secondary",
  Processing: "bg-secondary-container text-on-secondary-container",
  Cancelled: "bg-error-container/20 text-error",
  Pending: "bg-surface-container-highest text-on-surface-variant",
  "In Stock": "bg-tertiary-container text-on-tertiary-container",
  "Low Stock": "bg-error-container text-on-error-container",
};

const dotStyles = {
  Delivered: "bg-tertiary",
  "In Transit": "bg-primary",
  Shipped: "bg-secondary",
  Processing: "bg-secondary animate-pulse",
  Cancelled: "bg-error",
  Pending: "bg-secondary",
  "In Stock": "bg-tertiary",
  "Low Stock": "bg-error",
};

// variant="pill" (default) → colored rounded badge with dot
// variant="text" → plain uppercase text, no background
export default function StatusBadge({ status, variant = "pill" }) {
  if (variant === "text") {
    return (
      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
        {status}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
        pillStyles[status] || "bg-surface-container text-secondary"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${dotStyles[status] || "bg-secondary"}`}
      />
      {status}
    </span>
  );
}