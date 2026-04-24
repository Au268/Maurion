import { useState } from 'react';
import OrderRow from "./OrderRow";

export default function OrdersTable({ orders,onStatusUpdate }) {
  // 1. State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 2. Calculate pagination logic
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, orders.length);
  const currentOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  // Helper for generating page numbers (e.g., [1, 2, 3, ...])
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className="bg-surface-container-low rounded-2xl overflow-hidden p-1 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
      <div className="bg-surface-container-lowest overflow-x-auto rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-container-low">
              {["Order ID", "Customer", "Items", "Date","Address", "Total", "Status", "Action"].map((h, i) => (
                <th
                  key={h}
                  className={`py-6 ${i === 0 ? "px-8" : "px-6"} text-[10px] uppercase tracking-widest text-secondary font-bold ${h === "Action" ? "text-right px-8" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low">
            {/* 3. Render only the current slice of orders */}
            {currentOrders.map((order) => (
              <OrderRow key={order._id} order={order} onStatusUpdate={onStatusUpdate} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="bg-surface-container-lowest border-t border-surface-container-low px-8 py-6 flex justify-between items-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">
          Showing {startIndex + 1}-{endIndex} of {orders.length} Orders
        </p>
        
        <div className="flex gap-2">
          {/* Previous Button */}
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/20 hover:bg-surface-container-low transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>

          {/* Page Numbers */}
          {pageNumbers.map((n) => (
            <button
              key={n}
              onClick={() => setCurrentPage(n)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-xs font-bold ${
                n === currentPage 
                  ? "bg-primary text-on-primary" 
                  : "border border-outline-variant/20 hover:bg-surface-container-low"
              }`}
            >
              {n}
            </button>
          ))}

          {/* Next Button */}
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/20 hover:bg-surface-container-low transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
}