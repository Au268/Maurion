import { useState } from 'react';
import StatusBadge from "../ui/StatusBadge";

const STATUS_OPTIONS = ['paid', 'preparing', 'shipped', 'in-transit', 'delivered', 'cancelled'];

export default function OrderRow({ order,onStatusUpdate }) {


  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);

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

           {/* Shipping Address */}
<td className="py-8 px-6">
  <button 
    onClick={() => setShowAddressPopup(true)}
    className="text-xs font-bold text-[#71877E] hover:text-black underline underline-offset-4 transition-colors"
  >
    View Shipping Detail
  </button>

  {/* Full Screen Popup */}
  {showAddressPopup && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
        onClick={() => setShowAddressPopup(false)} 
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-black uppercase tracking-[0.2em]">Shipping Details</h3>
          <button 
            onClick={() => setShowAddressPopup(false)}
            className="text-gray-400 hover:text-black transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Recipient</p>
            <p className="text-sm font-bold text-[#2D2D2D]">{order.shipping.firstName} {order.shipping.lastName}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Address</p>
            <p className="text-sm text-[#2D2D2D] leading-relaxed">
              {order.shipping.address}<br />
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Country</p>
            <p className="text-sm text-[#2D2D2D] leading-relaxed">
              {order.shipping.city}, {order.shipping.county} , {order.shipping.country}<br />
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Zip Code</p>
            <p className="text-sm text-[#2D2D2D] leading-relaxed">
              {order.shipping.postcode}<br />
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Contact</p>
            <p className="text-sm text-[#2D2D2D]">{order.shipping.phone} <br /> {order.shipping.email}</p>
          </div>
        </div>
      </div>
    </div>
  )}
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
        {/* --- Pyara & Compact Button --- */}
        <button 
          onClick={() => setIsOpen(true)}
          className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm hover:border-black transition-all duration-300"
        >
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#6B6B6B] group-hover:text-black">
            Status
          </span>
          <span className="material-symbols-outlined text-[16px] text-gray-400 group-hover:text-black transition-transform group-hover:rotate-12">
            stat_minus_1
          </span>
        </button>

        {/* --- Small Right-Aligned Popup --- */}
        {isOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-end pr-8 md:pr-16">
            
            <div 
              className="absolute inset-0 bg-black/5 backdrop-blur-[1px]"
              onClick={() => setIsOpen(false)} 
            />

            {/* Compact Card Content */}
            <div className="relative bg-white w-64 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 p-5 animate-in fade-in zoom-in-95 slide-in-from-right-4 duration-300">
              
              {/* Mini Header */}
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-50">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black">
                  Change Status
                </span>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-gray-300 hover:text-black transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              {/* Status List: Compact & Clean */}
              <div className="flex flex-col gap-1">
                {STATUS_OPTIONS.map((status) => {
                  const isCurrent = order.status === status;
                  return (
                    <button
                      key={status}
                      disabled={isUpdating || isCurrent}
                      onClick={() => handleUpdate(status)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-tight transition-all
                        ${isCurrent 
                          ? 'bg-gray-50 text-gray-300 cursor-default' 
                          : 'text-[#555] hover:bg-black hover:text-white active:scale-95'
                        }`}
                    >
                      <span className="truncate">{status.replace('-', ' ')}</span>
                      {isCurrent && <span className="material-symbols-outlined text-[14px]">check_circle</span>}
                    </button>
                  );
                })}
              </div>

              {/* Order ID Tag */}
              <div className="mt-4 pt-3 text-center border-t border-gray-50">
                <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">
                  Order ID: {order.order_id.slice(-6)}
                </span>
              </div>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
}