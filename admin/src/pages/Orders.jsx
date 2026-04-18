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
        <section className="grid grid-cols-4 gap-6 mb-16 px-12">
          <StatCard
            label="Total Orders"
            value="1,284"
            icon="trending_up"
            trend="+12.4% vs last month"
          />
          <StatCard
            label="Pending Approval"
            value="24"
            icon="schedule"
            trend="Requires Attention"
            trendColor="text-error"
          />
          <StatCard
            label="Active Shipments"
            value="156"
            icon="local_shipping"
            trend="On Schedule"
          />
          <StatCard
            label="Average Order Value"
            value="$422.00"
            icon="payments"
            trend="Steady Trend"
            trendColor="text-secondary"
          />
        </section>

        {/* Table */}
        <OrdersTable orders={orders} />

        {/* Bottom Section */}
        <section className="mt-20 grid grid-cols-12 gap-8 px-10">
  {/* Logistics Banner */}
  <div className="col-span-8 bg-[#5E5E5E] bg-linear-to-br from-[#666666] to-[#4D4D4D] rounded-2xl p-12 text-white flex justify-between items-center relative overflow-hidden min-h-100">
    
    <div className="relative z-10">
      <h4 className="text-[44px] font-bold tracking-tight mb-4 leading-none">
        Global Logistics
        <br />
        Performance
      </h4>
      <p className="text-white/60 max-w-sm text-sm mb-8 leading-relaxed">
        Maurion's logistics network is operating at 98.4% efficiency. 
        All international shipments are moving through custom gateways on schedule.
      </p>
      <button className="px-8 py-3 bg-white text-[#333333] font-bold text-[11px] uppercase tracking-widest rounded hover:opacity-90 transition-all">
        View Logistics Map
      </button>
    </div>

    {/* Exact React Implementation of your Image Setting */}
    <div className="relative w-64 h-48 rounded-xl overflow-hidden shadow-2xl rotate-2 z-10 mr-4">
      <img 
        alt="Logistics Map View" 
        className="w-full h-full object-cover grayscale opacity-50 contrast-125" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEfmUKONMlOEV49hP_BIEuosGOP2XSbyOwQKk3egmrcPLuhJRj4_t-VL9dpHXuIKNxUmRziNXdOJxYRKBAvPLR5W6SpwOFTbq9dvU_cLvyn3he--8vb8_FtmVnjXVm9vz__esbzYlnNWFG1m4Shgo0GQAbqHTZYChkk5lHjCZkwAiY08YbAWuEWd-nDhfMjr_qbqrs0A0AsINsN97sMEGE20F23x-TxYNcpKofClzBAbxpH4lR5fGg2eE0F4diVXsz8rZMK5VR2uOs"
      />
    </div>

    {/* Decorative Gradient from your setting */}
    <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-[#71877E]/20 rounded-full blur-3xl" />
  </div>

  {/* Alerts Section */}
  <div className="col-span-4 flex flex-col gap-8">
    <div className="bg-white p-8 rounded-2xl flex-1 flex flex-col justify-center shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-[#F5F5F5]">
      <h5 className="text-[11px] uppercase tracking-widest text-[#999999] font-bold mb-4">
        Recent Alerts
      </h5>
      <ul className="space-y-4">
        <li className="flex gap-4">
          <span className="material-symbols-outlined text-[#C15B56] text-sm">warning</span>
          <p className="text-[13px] leading-relaxed text-[#444444]">
            3 high-value orders currently held in London sorting facility.
          </p>
        </li>
        <li className="flex gap-4">
          <span className="material-symbols-outlined text-[#6A8B81] text-sm">check_circle</span>
          <p className="text-[13px] leading-relaxed text-[#444444]">
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
