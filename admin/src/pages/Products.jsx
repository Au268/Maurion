import { useMemo, useState } from "react";
import TopBar from "../components/layout/TopBar";
import StatusBadge from "../components/ui/StatusBadge";
import EditProductModal from "../components/modals/EditProductModal";
import DeleteProductWarning from "../components/modals/DeleteProductWarning";
import AddProductModal from "../components/modals/Addproductmodal";

// ── swap these with your real API functions ──────────────────────────────────
// import { createProduct, updateProduct, deleteProduct } from "../api/products_api";
// ─────────────────────────────────────────────────────────────────────────────

export default function Products({ products, onRefresh }) {
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const { lowStock, outOfStock } = useMemo(() => ({
    lowStock: products.filter((p) => p.stock > 0 && p.stock <= 10).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  }), [products]);

  /* ── handlers: call API then let App re-fetch ── */
  const handleSave = async (updated) => {
    try {
      // If a new image file was picked, build FormData; otherwise send JSON
      if (updated.imageFile) {
        const fd = new FormData();
        fd.append("image", updated.imageFile);
        fd.append("title", updated.title);
        fd.append("category", updated.category);
        fd.append("description", updated.description);
        fd.append("price", updated.price);
        fd.append("stock", updated.stock);
        updated.colors.forEach((c) => fd.append("colors", c));
        await updateProduct(updated._id, fd);
      } else {
        const { imageFile, ...payload } = updated;
        await updateProduct(updated._id, payload);
      }
      onRefresh();
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      onRefresh();
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const handleAdd = async (newProduct) => {
    try {
      const fd = new FormData();
      if (newProduct.imageFile) fd.append("image", newProduct.imageFile);
      fd.append("title", newProduct.title);
      fd.append("category", newProduct.category);
      fd.append("description", newProduct.description);
      fd.append("price", newProduct.price);
      fd.append("stock", newProduct.stock);
      newProduct.colors.forEach((c) => fd.append("colors", c));
      await createProduct(fd);
      onRefresh();
    } catch (err) {
      console.error("Failed to create product:", err);
    }
  };

  return (
    <>
      {/* ── Modals ── */}
      <EditProductModal
        product={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleSave}
      />
      <DeleteProductWarning
        product={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
      {showAdd && (
        <AddProductModal
          onClose={() => setShowAdd(false)}
          onAdd={handleAdd}
        />
      )}

      {/* ── Page ── */}
      <TopBar placeholder="Search catalog..." />
      <div className="pt-32 pb-16 px-10">

        {/* Header */}
        <section className="mb-14 px-12">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#888888] mb-6 px-2">
            <span>Inventory Management</span>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-[56px] font-bold tracking-[-0.04em] text-[#1A1A1A] leading-none">
              Product Catalog
            </h1>
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-2 px-2 py-2 text-[#1A1A1A] hover:bg-gray-50 transition-all font-bold text-sm"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add New Product
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-4 gap-0 mb-20 px-12">
          {[
            { label: "Total SKUs", value: products.length },
            { label: "Low Stock", value: lowStock, isThick: true },
            { label: "Out of Stock", value: outOfStock },
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

        {/* Table */}
        <section className="px-12">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className={`py-6 text-[11px] font-bold text-[#888888] tracking-[0.15em] uppercase ${
                      h === "Actions" ? "text-right" : ""
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-transparent hover:bg-gray-50/40 transition-colors group"
                >
                  {/* Product Info */}
                  <td className="py-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-[#F5F5F5] rounded-sm overflow-hidden flex items-center justify-center p-2">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-[#1A1A1A] text-[15px]">
                          {product.title}
                        </span>
                        <span className="text-[10px] text-[#999999] font-bold tracking-widest uppercase">
                          {product._id}
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
                    ${product.price}
                  </td>

                  {/* Stock */}
                  <td
                    className={`py-8 text-[14px] font-medium ${
                      product.stock <= 10 ? "text-[#C15B56] font-bold" : "text-[#444444]"
                    }`}
                  >
                    {product.stock} Units
                  </td>

                  {/* Status */}
                  <td className="py-8">
                    <StatusBadge
                      status={
                        product.stock === 0
                          ? "Out of Stock"
                          : product.stock <= 10
                          ? "Low Stock"
                          : "In Stock"
                      }
                    />
                  </td>

                  {/* Actions */}
                  <td className="py-8 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setEditTarget(product)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        title="Edit product"
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#666666]">
                          edit
                        </span>
                      </button>
                      <button
                        onClick={() => setDeleteTarget(product)}
                        className="p-2 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete product"
                      >
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