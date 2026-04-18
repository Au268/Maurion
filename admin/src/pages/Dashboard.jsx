import TopBar from "../components/layout/TopBar";
import StatusBadge from "../components/ui/StatusBadge";
import { recentOrders, topSellers } from "../data/mockData";

export default function Dashboard() {
  return (
    <>
      <TopBar placeholder="Search insights..." />
      <main className="pt-32 pb-20 px-12 ms-20">

        {/* Header */}
        <section className="py-8 flex justify-between items-end mb-8">
          <div>
            <p className="text-secondary font-label uppercase tracking-[0.3em] text-xs mb-2">Executive Summary</p>
            <h2 className="text-5xl font-headline font-bold tracking-tighter text-on-surface">Dashboard</h2>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3  text-on-surface text-xs uppercase tracking-widest transition-colors font-bold bg-[#E8EDEB] hover:bg-[#DDE4E1] ">
              Export Report
            </button>
            
          </div>
        </section>

        {/* Metrics Grid */}
        <section className="grid grid-cols-12 gap-6 mb-16">
          {/* Large Revenue Card */}
          <div className="col-span-4 bg-surface-container-lowest p-8 flex flex-col justify-between">
            <div>
              <p className="text-sm text-outline font-label uppercase tracking-widest mb-1">Total Revenue</p>
              <h3 className="text-5xl font-headline font-black text-on-surface">$142,850.00</h3>
            </div>
          </div>

          {/* Bento Cards */}
          <div className="col-span-8 grid grid-cols-2 gap-6">
            <div className="bg-surface-container-low p-8 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-8 ">
                <p className="text-xs text-outline font-label uppercase tracking-widest">Total Orders</p>
                <span className="material-symbols-outlined text-primary">shopping_cart</span>
              </div>
              <div className="flex items-baseline gap-4 ">
                <h4 className="text-3xl font-headline font-bold text-on-surface">1,284</h4>
                <span className="text-xs text-secondary italic">Units Sold</span>
              </div>
            </div>
            <div className="bg-surface-container-low p-8 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-8">
                <p className="text-xs text-outline font-label uppercase tracking-widest">Avg Order Value</p>
                <span className="material-symbols-outlined text-primary">analytics</span>
              </div>
              <div className="flex items-baseline gap-4 ">
                <h4 className="text-3xl font-headline font-bold text-on-surface">$111.25</h4>
                <span className="text-xs text-secondary italic">Avg / Cart</span>
              </div>
            </div>
            <div className="col-span-2 bg-surface-container-low p-8 flex items-center justify-between">
              <div>
                <p className="text-xs text-outline font-label uppercase tracking-widest mb-1">Conversion Rate</p>
                <h4 className="text-3xl font-headline font-bold text-on-surface">3.82%</h4>
              </div>
              <div className="w-2/3 h-12 flex items-end gap-1 px-4">
                {["h-1/2", "h-2/3", "h-1/3", "h-4/5", "h-full", "h-1/2"].map((h, i) => (
                  <div key={i} className={`w-full ${i === 4 ? "bg-primary" : "bg-primary-container"} ${h}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Row */}
        <div className="grid grid-cols-12 gap-12">
          {/* Recent Orders Table */}
          <section className="col-span-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-headline font-bold tracking-tight">Recent Orders</h3>
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-secondary border-b-2 border-secondary pb-1">View All</a>
            </div>
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Order ID", "Customer", "Date", "Total", "Status"].map((h) => (
                    <th key={h} className="py-5 px-6 text-[10px] uppercase tracking-[0.2em] font-label text-outline">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-6 px-6 font-headline font-bold text-sm">{order.id}</td>
                    <td className="py-6 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-secondary">
                          {order.initials}
                        </div>
                        <span className="text-sm font-medium">{order.customer}</span>
                      </div>
                    </td>
                    <td className="py-6 px-6 text-sm text-outline">{order.date}</td>
                    <td className="py-6 px-6 text-sm font-bold">{order.total}</td>
                    <td className="py-6 px-6">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Top Sellers */}
          <section className="col-span-4">
            <h3 className="text-2xl font-headline font-bold tracking-tight mb-8">Top Sellers</h3>
            <div className="flex flex-col gap-6">
              {topSellers.map((item) => (
                <div key={item.name} className="bg-surface-container-low p-4 flex gap-5 group">
                  <div className="w-24 h-24 bg-secondary-container overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-center ">
                    <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">{item.category}</p>
                    <h4 className="font-headline font-bold text-on-surface">{item.name}</h4>
                    <p className="text-sm text-outline mt-1">
                      {item.units} Units • <span className="font-bold text-on-surface">{item.revenue}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-primary p-8 text-on-primary">
              <p className="font-headline font-light italic text-lg leading-tight mb-4">
                "Success is not final, failure is not fatal: it is the courage to continue that counts."
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">Daily Inspiration</p>
            </div>
          </section>
        </div>

      </main>
    </>
  );
}