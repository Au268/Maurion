import TopBar from "../components/layout/TopBar";
import StatCard from "../components/ui/StatCard";
import OrdersTable from "../components/orders/OrdersTable";

export default function Orders({ orders, onStatusUpdate, onMenuOpen }) {
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const activeShipments = orders.filter((o) => o.status === "shipped").length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : "0.00";

  return (
    <>
      <TopBar placeholder="Search orders, IDs or customers..." onMenuClick={onMenuOpen} />
      
      {/* 1. Dynamic Padding: Reduced mobile padding, increased on desktop.
          2. Width: Added mx-auto to center the max-width container.
      */}
      <div className="pt-24 md:pt-32 pb-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        
        {/* Breadcrumb + Title Section */}
        <section className="mb-10 md:mb-14 px-2 md:px-0">
          {/* Breadcrumbs - Hidden on very small screens to save vertical space */}
          <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#8E8E8E] mb-6 md:mb-8">
            <span className="hover:text-black cursor-pointer transition-colors">Admin</span>
            <span className="material-symbols-outlined text-[10px] scale-90">chevron_right</span>
            <span className="text-[#1A1A1A] font-bold">Order Management</span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="flex flex-col gap-3 md:gap-4">
              {/* Responsive Font Size: Smaller on mobile (text-5xl) vs desktop (text-7xl) */}
              <h2 className="text-5xl md:text-[72px] font-bold tracking-[-0.05em] text-[#1A1A1A] leading-[0.8] mb-1">
                Orders
              </h2>
              <p className="text-[#666666] text-base md:text-[19px] font-normal tracking-tight max-w-md">
                Curating fulfillment operations for the seasonal collection.
              </p>
            </div>

            {/* Action Buttons: Stack on mobile, row on tablet+ */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <button className="flex-1 lg:flex-none justify-center items-center flex gap-2.5 px-6 h-11.5 bg-[#E8EDEB] text-[#2D2D2D] rounded-md hover:bg-[#DDE4E1] transition-all font-bold text-[13px]">
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                Filter
              </button>

              <button className="flex-1 lg:flex-none justify-center items-center flex gap-2.5 px-6 h-11.5 bg-[#5E5D5C] text-white rounded-md hover:bg-[#4E4D4C] transition-all font-bold text-[13px]">
                <span className="material-symbols-outlined text-[20px]">download</span>
                Export Data
              </button>
            </div>
          </div>
        </section>

        {/* Stats Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          <StatCard
            label="Total Orders"
            value={totalOrders}
            icon="trending_up"
            trend="Steady Trend"
          />
          <StatCard
            label="Pending Approval"
            value={pendingOrders}
            icon="schedule"
            trend={pendingOrders > 0 ? "Requires Attention" : "All Clear"}
          />
          <StatCard
            label="Active Shipments"
            value={activeShipments}
            icon="local_shipping"
            trend="On Schedule"
          />
          <StatCard
            label="Average Order Value"
            value={`$${avgOrderValue}`}
            icon="payments"
            trend="Steady Trend"
          />
        </section>

        {/* Table Wrapper: Ensure the table can scroll horizontally if it's too wide */}
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <OrdersTable orders={orders} onStatusUpdate={onStatusUpdate} />
        </div>
      </div>
    </>
  );
}