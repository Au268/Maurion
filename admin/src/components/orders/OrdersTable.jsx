import OrderRow from "./OrderRow";

export default function OrdersTable({ orders }) {
  return (
    <section className="bg-surface-container-low rounded-2xl overflow-hidden p-1 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
      <div className="bg-surface-container-lowest overflow-x-auto rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-container-low">
              {["Order ID", "Customer", "Items", "Date", "Total", "Status", "Action"].map((h, i) => (
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
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-surface-container-lowest border-t border-surface-container-low px-8 py-6 flex justify-between items-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">
          Showing 1-5 of 1,284 Orders
        </p>
        <div className="flex gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/20 hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-xs font-bold ${n === 1 ? "bg-primary text-on-primary" : "border border-outline-variant/20 hover:bg-surface-container-low"}`}
            >
              {n}
            </button>
          ))}
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/20 hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
}