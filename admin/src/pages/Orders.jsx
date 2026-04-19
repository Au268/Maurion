import TopBar from "../components/layout/TopBar";
import StatCard from "../components/ui/StatCard";
import OrdersTable from "../components/orders/OrdersTable";



export default function Orders({orders,onStatusUpdate}) {


  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const activeShipments = orders.filter(o => o.status === 'shipped').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : "0.00";


  return (
    <>
      <TopBar placeholder="Search orders, IDs or customers..." />
      <div className="pt-32 pb-16 px-12 max-w-7xl">
        {/* Breadcrumb + Title */}
        <div className="w-full px-10 py-10">
          <section className="mb-14">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#8E8E8E] mb-8">
              <span className="hover:text-black cursor-pointer transition-colors">
                Admin
              </span>
              <span className="material-symbols-outlined text-[10px] scale-90">
                chevron_right
              </span>
              <span className="text-[#1A1A1A] font-bold">Order Management</span>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-4">
                {/* Title: Very large, tight tracking, no extra line height */}
                <h2 className="text-[72px] font-bold tracking-[-0.05em] text-[#1A1A1A] leading-[0.8] mb-1">
                  Orders
                </h2>
                {/* Subtitle */}
                <p className="text-[#666666] text-[19px] font-normal tracking-tight">
                  Curating fulfillment operations for the seasonal collection.
                </p>
              </div>

              {/* Action Buttons: rounded-[6px] for that soft-square look */}
              <div className="flex gap-3 pt-6">
                {/* Filter Button */}
                <button className="flex items-center gap-2.5 px-6 h-11.5 bg-[#E8EDEB] text-[#2D2D2D] rounded-md hover:bg-[#DDE4E1] transition-all font-bold text-[13px]">
                  <span className="material-symbols-outlined text-[20px]">
                    filter_list
                  </span>
                  Filter
                </button>

                {/* Export Button */}
                <button className="flex items-center gap-2.5 px-6 h-11.5 bg-[#5E5D5C] text-white rounded-md hover:bg-[#4E4D4C] transition-all font-bold text-[13px]">
                  <span className="material-symbols-outlined text-[20px]">
                    download
                  </span>
                  Export Data
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Stats */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-4 md:px-8 lg:px-12">
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

        {/* Table */}
        <OrdersTable orders={orders} onStatusUpdate={onStatusUpdate} />

        
      </div>
    </>
  );
}
