import TopBar from "../components/layout/TopBar";
import StatusBadge from "../components/ui/StatusBadge";
import { products } from "../data/mockData";

export default function Products() {
  return (
    <>
      <TopBar placeholder="Search catalog..." />
      <div className="pt-32 pb-16 px-12">

        {/* Header */}
        <section className="flex justify-between items-end mb-12">
          <div className="flex flex-col gap-2">
            <span className="text-secondary font-medium tracking-widest text-xs uppercase">Inventory Management</span>
            <h1 className="text-4xl font-headline font-black tracking-tighter text-on-surface">Product Catalog</h1>
          </div>
          <button className="bg-primary text-on-primary px-8 py-4 font-bold flex items-center gap-3 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-xl">add</span>
            Add New Product
          </button>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total SKUs", value: "1,284" },
            { label: "Low Stock", value: "12", highlight: true },
            { label: "Out of Stock", value: "0" },
            { label: "Active Categories", value: "08" },
          ].map((s) => (
            <div key={s.label} className={`bg-surface-container-low p-8 flex flex-col gap-2 ${s.highlight ? "border-l-4 border-secondary" : ""}`}>
              <span className="text-xs font-bold text-secondary tracking-widest uppercase">{s.label}</span>
              <span className={`text-3xl font-headline font-black ${s.highlight ? "text-error" : ""}`}>{s.value}</span>
            </div>
          ))}
        </section>

        {/* Table */}
        <section className="bg-surface-container-lowest shadow-[0_40px_80px_rgba(0,0,0,0.02)] p-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low">
                {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                  <th key={h} className={`py-6 px-8 text-xs font-bold text-secondary tracking-widest uppercase ${h === "Actions" ? "text-right" : ""}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="group hover:bg-surface-container-low transition-colors duration-300">
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-20 bg-secondary-container flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-on-surface text-lg">{product.name}</span>
                        <span className="text-xs text-outline font-medium tracking-tight uppercase">{product.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-8 text-on-surface-variant font-medium">{product.category}</td>
                  <td className="py-6 px-8 font-headline font-bold text-on-surface">{product.price}</td>
                  <td className={`py-6 px-8 font-medium ${product.stock <= 10 ? "text-error font-bold" : ""}`}>
                    {product.stock} Units
                  </td>
                  <td className="py-6 px-8">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="py-6 px-8 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-surface-container-high transition-colors">
                        <span className="material-symbols-outlined text-secondary">edit</span>
                      </button>
                      <button className="p-2 hover:bg-error-container/20 transition-colors">
                        <span className="material-symbols-outlined text-error">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </div>
    </>
  );
}