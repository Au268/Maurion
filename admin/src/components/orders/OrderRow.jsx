import StatusBadge from "../ui/StatusBadge";

export default function OrderRow({ order }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors group">
      {/* Order ID */}
      <td className="py-8 px-8 font-bold text-sm text-[#4A4A4A]">
        {order.id}
      </td>

      {/* Customer */}
      <td className="py-8 px-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#E8EDEB] flex items-center justify-center text-xs font-bold text-[#71877E]">
            {order.customer.initials}
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-bold text-[#2D2D2D] leading-tight">{order.customer.name}</p>
            <p className="text-xs text-[#8E8E8E]">{order.customer.email}</p>
          </div>
        </div>
      </td>

      {/* Items */}
      <td className="py-8 px-6 text-sm text-[#6B6B6B] leading-relaxed max-w-45">
        {order.items}
        {order.tag && (
          <div className="mt-1">
            <span className="text-[10px] bg-[#E8EDEB] text-[#71877E] px-2 py-0.5 rounded font-medium italic">
              {order.tag}
            </span>
          </div>
        )}
      </td>

      {/* Date */}
      <td className="py-8 px-6 text-sm text-[#6B6B6B]">
        {order.date}
      </td>

      {/* Total */}
      <td className="py-8 px-6 text-sm font-bold text-[#2D2D2D]">
        {order.total}
      </td>

      {/* Status */}
      <td className="py-8 px-6">
        <StatusBadge status={order.status} />
      </td>

      {/* Action */}
      <td className="py-8 px-8 text-right">
        <button className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B] hover:text-black transition-all">
          <span className="border-b border-transparent hover:border-gray-300 pb-0.5">
            Update Status
          </span>
          <span className="material-symbols-outlined text-sm leading-none">expand_more</span>
        </button>
      </td>
    </tr>
  );
}