import { useMemo } from 'react';
import TopBar from "../components/layout/TopBar";
import StatusBadge from "../components/ui/StatusBadge";

export default function Dashboard({ orders, onMenuOpen }) {
  // Logic remains the same
  const totalRevenue = (orders || []).reduce((acc, order) => acc + (parseFloat(order.total) || 0), 0);
  const formattedRevenue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalRevenue);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const formattedAvgValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(avgOrderValue);

  const topSellers = useMemo(() => {
    const productMap = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!productMap[item.id]) {
          productMap[item.id] = {
            name: item.title,
            category: item.category || 'General',
            image: item.image,
            units: 0,
            revenue: 0,
          };
        }
        productMap[item.id].units += item.quantity;
        productMap[item.id].revenue += item.price * item.quantity;
      });
    });
    return Object.values(productMap).sort((a, b) => b.units - a.units).slice(0, 5);
  }, [orders]);

  return (
    <>
      <TopBar placeholder="Search insights..." onMenuClick={onMenuOpen} />
      
      {/* 1. Adjusted Padding & Margin: Removed fixed 'ms-20', handled by Layout wrapper instead */}
      <main className="pt-24 md:pt-32 pb-20 px-4 md:px-8 lg:px-12 max-w-400 mx-auto transition-all duration-300">

        {/* Header: Stacks on small mobile */}
        <section className="py-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
          <div>
            <p className="text-secondary font-label uppercase tracking-[0.3em] text-[10px] md:text-xs mb-2">Executive Summary</p>
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter text-on-surface">Dashboard</h2>
          </div>
          <button className="w-full sm:w-auto px-6 py-3 text-on-surface text-xs uppercase tracking-widest font-bold bg-[#E8EDEB] hover:bg-[#DDE4E1] transition-colors">
            Export Report
          </button>
        </section>

        {/* Metrics Grid: 1 col mobile, 12 col desktop (4/8 split) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          {/* Revenue Card: Full width on mobile/tablet */}
          <div className="lg:col-span-4 bg-white p-6 md:p-8 flex flex-col justify-between border border-gray-100 shadow-sm">
            <div>
              <p className="text-xs md:text-sm text-outline font-label uppercase tracking-widest mb-1">Total Revenue</p>
              <h3 className="text-4xl md:text-5xl font-headline font-black text-on-surface">{formattedRevenue}</h3>
            </div>
          </div>

          {/* Bento Cards: 1 col mobile, 2 col tablet+ */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#F4F7F6] p-6 md:p-8 flex flex-col justify-between border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <p className="text-[10px] md:text-xs text-outline font-label uppercase tracking-widest">Total Orders</p>
                <span className="material-symbols-outlined text-primary">shopping_cart</span>
              </div>
              <div className="flex items-baseline gap-4">
                <h4 className="text-2xl md:text-3xl font-headline font-bold text-on-surface">{totalOrders}</h4>
                <span className="text-xs text-secondary italic">orders</span>
              </div>
            </div>

            <div className="bg-[#F4F7F6] p-6 md:p-8 flex flex-col justify-between border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <p className="text-[10px] md:text-xs text-outline font-label uppercase tracking-widest">Avg Order Value</p>
                <span className="material-symbols-outlined text-primary">analytics</span>
              </div>
              <div className="flex items-baseline gap-4">
                <h4 className="text-2xl md:text-3xl font-headline font-bold text-on-surface">{formattedAvgValue}</h4>
                <span className="text-xs text-secondary italic">Avg / Cart</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Row: 1 col on mobile/tablet, 12 col on large desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Recent Orders Table: Scrollable on mobile */}
          <section className="lg:col-span-8 overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl md:text-2xl font-headline font-bold tracking-tight">Recent Orders</h3>
              <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-secondary border-b-2 border-secondary pb-1">View All</a>
            </div>

            <div className="overflow-x-auto -mx-4 px-4 md:mx-0">
              <table className="w-full text-left border-collapse min-w-150">
                <thead className="bg-[#F9FAFA]">
                  <tr>
                    {["ID", "Customer", "Date", "Total", "Status"].map((h) => (
                      <th key={h} className="py-5 px-4 text-[10px] uppercase tracking-[0.2em] font-label text-outline">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => {
                    const initials = `${order.shipping?.firstName?.[0] || ''}${order.shipping?.lastName?.[0] || ''}`.toUpperCase();
                    return (
                      <tr key={order.order_id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 font-headline font-bold text-xs uppercase text-gray-400">
                          {order.order_id.slice(-6)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                              {initials}
                            </div>
                            <span className="text-sm font-medium whitespace-nowrap">
                              {order.shipping.firstName}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-xs text-outline">
                          {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </td>
                        <td className="py-4 px-4 text-sm font-bold">${order.total.toFixed(2)}</td>
                        <td className="py-4 px-4">
                          <StatusBadge status={order.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Top Sellers Section */}
          <section className="lg:col-span-4">
            <h3 className="text-xl md:text-2xl font-headline font-bold tracking-tight mb-8">Top Sellers</h3>
            <div className="flex flex-col gap-4 md:gap-6">
              {topSellers.map((item) => (
                <div key={item.name} className="bg-white p-4 flex gap-4 border border-gray-50 group hover:shadow-md transition-shadow">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[9px] uppercase tracking-widest text-secondary font-bold mb-1">{item.category}</p>
                    <h4 className="font-headline font-bold text-sm md:text-base text-on-surface leading-tight">{item.name}</h4>
                    <p className="text-xs text-outline mt-1">
                      {item.units} Sold • <span className="font-bold text-on-surface">${item.revenue.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote Box: Becomes a card on mobile */}
            <div className="mt-8 bg-[#1A1A1A] p-6 md:p-8 text-white rounded-sm">
              <p className="font-headline font-light italic text-base md:text-lg leading-tight mb-4">
                "Success is not final, failure is not fatal..."
              </p>
              <p className="text-[9px] uppercase tracking-[0.3em] opacity-40">Daily Inspiration</p>
            </div>
          </section>
        </div>

      </main>
    </>
  );
}