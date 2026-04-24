import { useMemo, useState } from "react";
import TopBar from "../components/layout/TopBar";
import StatusBadge from "../components/ui/StatusBadge";
import EditProductModal from "../components/modals/EditProductModal";
import DeleteProductWarning from "../components/modals/DeleteProductWarning";
import AddProductModal from "../components/modals/Addproductmodal";
import { addProductAPI } from "../../api/AddProduct";
import { editProductAPI } from "../../api/EditProduct";
import { deleteProductAPI } from "../../api/DeleteProduct";

export default function Products({ products, onRefresh, onMenuOpen }) {
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const { lowStock, outOfStock } = useMemo(() => ({
    lowStock: products.filter((p) => p.stock > 0 && p.stock <= 10).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  }), [products]);

  // Supports both old single-image schema and new multi-image schema
  const getFirstImage = (product) =>
    product.images?.[0]?.url || product.image || null;

  const handleSave = async (updated) => {
    try {
      await editProductAPI(updated._id, {
        title: updated.title,
        category: updated.category,
        description: updated.description,
        price: updated.price,
        stock: updated.stock,
        colors: updated.colors,
        keepImages: updated.keepImages,
        newImageFiles: updated.newImageFiles,
      });
      onRefresh();
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProductAPI(id);
      onRefresh();
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const handleAdd = async (newProduct) => {
    try {
      await addProductAPI(newProduct);
      onRefresh();
    } catch (err) {
      console.error("Failed to create product:", err);
    }
  };

  return (
    <>
      <EditProductModal product={editTarget} onClose={() => setEditTarget(null)} onSave={handleSave} />
      <DeleteProductWarning product={deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />
      {showAdd && <AddProductModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}

      <TopBar placeholder="Search catalog..." onMenuClick={onMenuOpen} />

      <div className="pt-24 md:pt-32 pb-16 px-4 md:px-10 lg:px-16 max-w-400 mx-auto">

        {/* Header */}
        <section className="mb-10 md:mb-14">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#888888] mb-4 md:mb-6">
            <span>Inventory Management</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <h1 className="text-4xl md:text-[56px] font-bold tracking-[-0.04em] text-[#1A1A1A] leading-none">
              Product Catalog
            </h1>
            <button
              onClick={() => setShowAdd(true)}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white md:bg-transparent md:text-[#1A1A1A] hover:bg-gray-100 transition-all font-bold text-sm rounded-lg md:rounded-none"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add New Product
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-0 mb-16 md:mb-20">
          {[
            { label: "Total SKUs", value: products.length },
            { label: "Low Stock", value: lowStock, isThick: true },
            { label: "Out of Stock", value: outOfStock },
            { label: "Active Categories", value: "08" },
          ].map((s, index) => (
            <div
              key={index}
              className={`flex flex-col gap-1 py-2 px-4 md:px-8 border-gray-200 
                ${index % 2 !== 0 ? "border-l" : "lg:border-l-0"} 
                ${index >= 2 ? "lg:border-l" : ""}
                ${s.isThick ? "md:border-l-2 md:border-l-[#1A1A1A] md:-ml-px" : ""}
              `}
            >
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888]">
                {s.label}
              </span>
              <span className="text-3xl md:text-[48px] font-bold text-[#1A1A1A] leading-none">
                {s.value}
              </span>
            </div>
          ))}
        </section>

        {/* Table */}
        <section className="overflow-hidden">
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <table className="w-full text-left border-collapse min-w-200">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                    <th key={h} className={`py-6 text-[11px] font-bold text-[#888888] tracking-[0.15em] uppercase ${h === "Actions" ? "text-right" : ""}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const firstImage = getFirstImage(product);
                  const imageCount = product.images?.length ?? (product.image ? 1 : 0);

                  return (
                    <tr key={product._id} className="border-b border-transparent hover:bg-gray-50/40 transition-colors group">

                      <td className="py-6 md:py-8">
                        <div className="flex items-center gap-4 md:gap-6">

                          {/* Thumbnail with image count badge */}
                          <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#F5F5F5] rounded-sm overflow-hidden flex items-center justify-center p-2">
                              {firstImage
                                ? <img src={firstImage} alt={product.title} className="w-full h-full object-contain mix-blend-multiply" />
                                : <span className="material-symbols-outlined text-[20px] text-[#CCCCCC]">image</span>
                              }
                            </div>
                            {imageCount > 1 && (
                              <span className="absolute -bottom-1 -right-1 bg-[#1A1A1A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm leading-none">
                                +{imageCount}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="font-bold text-[#1A1A1A] text-sm md:text-[15px]">{product.title}</span>
                            <span className="text-[9px] text-[#999999] font-bold tracking-widest uppercase truncate max-w-25">
                              {product._id}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-6 md:py-8 text-[13px] md:text-[14px] text-[#444444] font-medium">{product.category}</td>

                      <td className="py-6 md:py-8 text-sm md:text-[16px] font-bold text-[#1A1A1A]">${product.price}</td>

                      <td className={`py-6 md:py-8 text-[13px] md:text-[14px] font-medium ${product.stock <= 10 ? "text-[#C15B56] font-bold" : "text-[#444444]"}`}>
                        {product.stock} <span className="hidden md:inline">Units</span>
                      </td>

                      <td className="py-6 md:py-8">
                        <StatusBadge status={product.stock === 0 ? "Out of Stock" : product.stock <= 10 ? "Low Stock" : "In Stock"} />
                      </td>

                      <td className="py-6 md:py-8 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => setEditTarget(product)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <span className="material-symbols-outlined text-[18px] text-[#666666]">edit</span>
                          </button>
                          <button onClick={() => setDeleteTarget(product)} className="p-2 hover:bg-red-50 rounded-full transition-colors">
                            <span className="material-symbols-outlined text-[18px] text-[#C15B56]">delete</span>
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </>
  );
}