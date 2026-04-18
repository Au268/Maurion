import TopBar from "../components/layout/TopBar";
import StatusBadge from "../components/ui/StatusBadge";
import { products } from "../data/mockData";

export default function Products() {
  return (
    <>
      <TopBar placeholder="Search catalog..." />
      <div className="pt-32 pb-16 px-10">
        {/* Header Section */}
        <section className="mb-14 px-12">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#888888] mb-6 px-2">
            <span>Inventory Management</span>
          </div>

          <div className="flex justify-between items-center">
            <h1 className="text-[56px] font-bold tracking-[-0.04em] text-[#1A1A1A] leading-none">
              Product Catalog
            </h1>
            <button className="flex items-center gap-2 px-2 py-2 text-[#1A1A1A] hover:bg-gray-50 transition-all font-bold text-sm">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add New Product
            </button>
          </div>
        </section>

        {/* Stats Row with Vertical Dividers */}
        {/* Stats Row with Vertical Dividers */}
        <section className="grid grid-cols-4 gap-0 mb-20 px-12">
          {[
            { label: "Total SKUs", value: "1,284" },
            { label: "Low Stock", value: "12", isThick: true },
            { label: "Out of Stock", value: "0" },
            { label: "Active Categories", value: "08" },
          ].map((s, index) => (
            <div
              key={index}
              className={`flex flex-col flex-1 gap-1 py-2 px-8 first:pl-0 border-gray-200 ${
                index !== 0 ? "border-l" : ""
              } ${s.isThick ? "border-l-2 border-l-[#1A1A1A] -ml-px" : ""}`}
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888]">
                {s.label}
              </span>
              <span className="text-[48px] font-bold text-[#1A1A1A] leading-none">
                {s.value}
              </span>
            </div>
          ))}
        </section>

        {/* Table Section */}
        <section className="px-12">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                {[
                  "Product",
                  "Category",
                  "Price",
                  "Stock",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className={`py-6 text-[11px] font-bold text-[#888888] tracking-[0.15em] uppercase ${h === "Actions" ? "text-right" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-transparent hover:bg-gray-50/40 transition-colors group"
                >
                  {/* Product Info */}
                  <td className="py-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-[#F5F5F5] rounded-sm overflow-hidden flex items-center justify-center p-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-[#1A1A1A] text-[15px]">
                          {product.name}
                        </span>
                        <span className="text-[10px] text-[#999999] font-bold tracking-widest uppercase">
                          {product.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-8 text-[14px] text-[#444444] font-medium">
                    {product.category}
                  </td>

                  {/* Price */}
                  <td className="py-8 text-[16px] font-bold text-[#1A1A1A]">
                    {product.price}
                  </td>

                  {/* Stock */}
                  <td
                    className={`py-8 text-[14px] font-medium ${product.stock <= 10 ? "text-[#C15B56] font-bold" : "text-[#444444]"}`}
                  >
                    {product.stock} Units
                  </td>

                  {/* Status */}
                  <td className="py-8">
                    <StatusBadge status={product.status} />
                  </td>

                  {/* Actions - Now Always Visible */}
                  <td className="py-8 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-[18px] text-[#666666]">
                          edit
                        </span>
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-[18px] text-[#C15B56]">
                          delete
                        </span>
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
