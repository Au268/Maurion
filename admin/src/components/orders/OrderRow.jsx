import { useState } from 'react';
import StatusBadge from "../ui/StatusBadge";

const STATUS_OPTIONS = ['paid', 'preparing', 'shipped', 'in-transit', 'delivered', 'cancelled'];

export default function OrderRow({ order,onStatusUpdate }) {


  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (newStatus) => {
    setIsUpdating(true);
    try {
      const BASE_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${BASE_URL}/api/orders/${order.order_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        onStatusUpdate(); // Call this to refresh the list in parent
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };


  const initials = `${order.shipping?.firstName?.[0] || ''}${order.shipping?.lastName?.[0] || ''}`.toUpperCase();

    const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(order.total)

    const formattedDate = new Date(order.createdAt).toLocaleDateString(undefined, {
      year: 'numeric',
       month: 'short',
       day: 'numeric'
     });

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors group">
      {/* Order ID */}
      <td className="py-4 px-4 font-bold text-sm text-[#4A4A4A]">
        {order.order_id}
      </td>

      {/* Customer */}
      <td className="py-8 px-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#E8EDEB] flex items-center justify-center text-xs font-bold text-[#71877E]">
            {initials}
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-bold text-[#2D2D2D] leading-tight">{order.shipping.firstName} {order.shipping.lastName}</p>
            <p className="text-xs text-[#8E8E8E]">{order.shipping.email}</p>
          </div>
        </div>
      </td>

      {/* Items */}
      {/* Items */}
      <td className="py-8 px-6 text-sm text-[#6B6B6B] leading-relaxed max-w-45">
        {order.items.map((item, index) => (
          <div key={item._id || index} className="mb-1">
            {item.title} <span className="text-xs text-gray-400">x{item.quantity}</span>
          </div>
        ))}
        
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
        {formattedDate}
      </td>

      {/* Total */}
      <td className="py-8 px-6 text-sm font-bold text-[#2D2D2D]">
        {formattedTotal}
      </td>

      {/* Status */}
      <td className="py-8 px-6">
        <StatusBadge status={order.status} />
      </td>

      {/* Action */}
      <td className="py-8 px-8 text-right relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B] hover:text-black transition-all"
        >
          <span>Update Status</span>
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden">
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                disabled={isUpdating || order.status === status}
                onClick={() => handleUpdate(status)}
                className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 capitalize disabled:opacity-50"
              >
                {status.replace('-', ' ')}
              </button>
            ))}
          </div>
        )}
      </td>
    </tr>
  );
}