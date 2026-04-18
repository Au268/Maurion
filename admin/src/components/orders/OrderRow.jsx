import StatusBadge from "../ui/StatusBadge";

export default function OrderRow({ order }) {
  return (
    <tr className="hover:bg-surface-container-low/30 transition-colors group">
      {/* Order ID */}
      <td className="py-6 px-8 font-headline font-bold text-sm tracking-tight text-primary">
        {order.id}
      </td>

      {/* Customer */}
      <td className="py-6 px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-secondary">
            {order.customer.initials}
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface">{order.customer.name}</p>
            <p className="text-[10px] text-secondary">{order.customer.email}</p>
          </div>
        </div>
      </td>

      {/* Items */}
      <td className="py-6 px-6 text-sm text-secondary">
        {order.items}
        {order.tag && (
          <span className="ml-1 text-[10px] bg-secondary-fixed text-on-secondary-fixed px-1 rounded">
            {order.tag}
          </span>
        )}
      </td>

      {/* Date */}
      <td className="py-6 px-6 text-sm text-secondary font-medium">{order.date}</td>

      {/* Total */}
      <td className="py-6 px-6 text-sm font-bold text-on-surface">{order.total}</td>

      {/* Status */}
      <td className="py-6 px-6">
        <StatusBadge status={order.status} />
      </td>

      {/* Action */}
      <td className="py-6 px-8 text-right">
        <button className="flex items-center gap-2 px-3 py-1.5 border-b border-outline-variant/15 text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-all ml-auto">
          Update Status
          <span className="material-symbols-outlined text-xs">expand_more</span>
        </button>
      </td>
    </tr>
  );
}