import TopBar from "../components/layout/TopBar";
import StatCard from "../components/ui/StatCard";
import OrdersTable from "../components/orders/OrdersTable";
import { orders } from "../data/mockData";

export default function Orders() {
  return (
    <>
      <TopBar placeholder="Search orders, IDs or customers..." />
      <div className="pt-32 pb-16 px-12 max-w-7xl">

        {/* Breadcrumb + Title */}
        <section className="mb-12">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-secondary mb-4">
            <span>Admin</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-primary font-bold">Order Management</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-5xl font-headline font-black tracking-tighter text-[#1A1A1A] mb-2">Orders</h2>
              <p className="text-secondary max-w-md font-body leading-relaxed">
                Curating fulfillment operations for the seasonal collection.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 h-12 bg-surface-container-highest text-on-surface rounded-lg hover:bg-surface-container-high transition-colors font-semibold text-sm">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                Filter
              </button>
              <button className="flex items-center gap-2 px-8 h-12 bg-primary text-on-primary rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm">
                <span className="material-symbols-outlined text-sm">download</span>
                Export Data
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-4 gap-6 mb-16">
          <StatCard label="Total Orders" value="1,284" icon="trending_up" trend="+12.4% vs last month" />
          <StatCard label="Pending Approval" value="24" icon="schedule" trend="Requires Attention" trendColor="text-error" />
          <StatCard label="Active Shipments" value="156" icon="local_shipping" trend="On Schedule" />
          <StatCard label="Average Order Value" value="$422.00" icon="payments" trend="Steady Trend" trendColor="text-secondary" />
        </section>

        {/* Table */}
        <OrdersTable orders={orders} />

        {/* Bottom Section */}
        <section className="mt-20 grid grid-cols-12 gap-8">
          {/* Logistics Banner */}
          <div className="col-span-8 bg-primary rounded-2xl p-12 text-on-primary flex justify-between items-center relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-3xl font-headline font-black tracking-tight mb-4 leading-none">
                Global Logistics<br />Performance
              </h4>
              <p className="text-on-primary/60 max-w-sm text-sm font-body mb-8">
                Maurion's logistics network is operating at 98.4% efficiency. All international shipments are moving through custom gateways on schedule.
              </p>
              <button className="px-8 py-3 bg-on-primary text-primary font-bold text-xs uppercase tracking-widest rounded hover:opacity-90 transition-all">
                View Logistics Map
              </button>
            </div>
            <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          </div>

          {/* Alerts */}
          <div className="col-span-4 flex flex-col gap-8">
            <div className="bg-surface-container-lowest p-8 rounded-2xl flex-1 flex flex-col justify-center">
              <h5 className="text-xs uppercase tracking-widest text-secondary font-bold mb-4">Recent Alerts</h5>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="material-symbols-outlined text-error text-sm">warning</span>
                  <p className="text-xs font-body leading-relaxed text-on-surface">
                    3 high-value orders currently held in London sorting facility.
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="material-symbols-outlined text-tertiary text-sm">check_circle</span>
                  <p className="text-xs font-body leading-relaxed text-on-surface">
                    Warehouse inventory sync successful. No discrepancies found.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}