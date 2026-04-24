import { useState, useRef } from "react";

const CATEGORIES = [
  "Accessories", "Electronics", "Furniture", "Clothing", "Books",
  "Sports", "Home & Garden", "Toys", "Health & Beauty", "Automotive",
];

const PRESET_COLORS = [
  { hex: "#1A1A1A", label: "Black" },
  { hex: "#FFFFFF", label: "White" },
  { hex: "#C15B56", label: "Red" },
  { hex: "#4A90D9", label: "Blue" },
  { hex: "#7CB87C", label: "Green" },
  { hex: "#E8A838", label: "Yellow" },
  { hex: "#9B59B6", label: "Purple" },
  { hex: "#E8975A", label: "Orange" },
];

const EMPTY_FORM = {
  title: "", category: "", description: "", price: "", stock: "", colors: [],
};

export default function AddProductModal({ onClose, onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  };

  const applyFiles = (files) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!valid.length) return;
    setImageFiles((prev) => [...prev, ...valid]);
    setImagePreviews((prev) => [
      ...prev,
      ...valid.map((f) => ({ url: URL.createObjectURL(f), name: f.name })),
    ]);
  };
  const handleFileChange = (e) => applyFiles(e.target.files);
  const handleDrop = (e) => { e.preventDefault(); setDragging(false); applyFiles(e.dataTransfer.files); };
  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleColor = (hex) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.includes(hex) ? prev.colors.filter((c) => c !== hex) : [...prev.colors, hex],
    }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Product name is required";
    if (!form.category) errs.category = "Category is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.price.trim() || isNaN(Number(form.price))) errs.price = "Valid price is required";
    if (form.stock === "" || isNaN(Number(form.stock))) errs.stock = "Valid stock count is required";
    return errs;
  };

  const handleAdd = () => {
    setApiError("");
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onAdd({
      title: form.title,
      category: form.category,
      description: form.description,
      price: form.price,
      stock: Number(form.stock),
      colors: form.colors,
      imageFiles, // array of File objects → AddProduct.js appends each as 'images'
    });
    onClose();
  };

  const inputClass = (name) =>
    `w-full border rounded-sm px-4 py-2.5 text-[14px] text-[#1A1A1A] focus:outline-none transition-colors ${
      errors[name] ? "border-[#C15B56] bg-[#FEF9F9]" : "border-gray-200 focus:border-[#1A1A1A]"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-sm shadow-xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 flex-shrink-0">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#888888] mb-1">Inventory Management</p>
            <h2 className="text-[22px] font-bold tracking-[-0.03em] text-[#1A1A1A]">Add New Product</h2>
          </div>
          <button onClick={onClose} disabled={loading} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <span className="material-symbols-outlined text-[20px] text-[#666666]">close</span>
          </button>
        </div>

        {/* Preview strip */}
        <div className="flex items-center gap-4 px-8 py-4 bg-[#F9F9F9] border-b border-gray-100 flex-shrink-0 overflow-x-auto">
          {imagePreviews.length > 0
            ? imagePreviews.map((img, i) => (
                <div key={i} className="w-11 h-11 flex-shrink-0 bg-white rounded-sm border border-gray-100 p-1 overflow-hidden">
                  <img src={img.url} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
              ))
            : (
              <div className="w-11 h-11 bg-white rounded-sm border border-gray-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] text-[#CCCCCC]">image</span>
              </div>
            )
          }
          <div className="min-w-0 flex-shrink-0">
            <p className={`font-bold text-[14px] truncate ${form.title ? "text-[#1A1A1A]" : "text-[#CCCCCC]"}`}>
              {form.title || "Product name"}
            </p>
            <p className="text-[10px] text-[#CCCCCC] font-bold tracking-widest uppercase">New Product</p>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6 flex flex-col gap-5 overflow-y-auto">

          {apiError && (
            <div className="flex items-center gap-2 px-4 py-3 bg-[#FEF9F9] border border-[#C15B56] rounded-sm">
              <span className="material-symbols-outlined text-[16px] text-[#C15B56]">error</span>
              <p className="text-[12px] text-[#C15B56] font-medium">{apiError}</p>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888]">Product Name</label>
            <input name="title" value={form.title} onChange={handleChange} className={inputClass("title")} placeholder="e.g. Wooden Laptop Stand" />
            {errors.title && <p className="text-[11px] text-[#C15B56] font-medium">{errors.title}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888]">Category</label>
            <div className="relative">
              <select name="category" value={form.category} onChange={handleChange}
                className={`${inputClass("category")} appearance-none cursor-pointer pr-10`}>
                <option value="" disabled>Select a category</option>
                {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-[#888888] pointer-events-none">expand_more</span>
            </div>
            {errors.category && <p className="text-[11px] text-[#C15B56] font-medium">{errors.category}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888]">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3}
              className={`${inputClass("description")} resize-none leading-relaxed`} placeholder="e.g. This is the wooden laptop stand" />
            {errors.description && <p className="text-[11px] text-[#C15B56] font-medium">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888]">Price ($)</label>
              <input name="price" value={form.price} onChange={handleChange} className={inputClass("price")} placeholder="19.99" />
              {errors.price && <p className="text-[11px] text-[#C15B56] font-medium">{errors.price}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888]">Stock Units</label>
              <input name="stock" type="number" value={form.stock} onChange={handleChange} className={inputClass("stock")} placeholder="0" />
              {errors.stock && <p className="text-[11px] text-[#C15B56] font-medium">{errors.stock}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888]">
              Colors <span className="ml-2 text-[#BBBBBB] normal-case tracking-normal font-medium">(select all that apply)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map(({ hex, label }) => {
                const selected = form.colors.includes(hex);
                return (
                  <button key={hex} type="button" onClick={() => toggleColor(hex)} title={label}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-[12px] font-medium transition-all ${
                      selected ? "border-[#1A1A1A] bg-[#F5F5F5]" : "border-gray-200 hover:border-gray-400"
                    }`}>
                    <span className={`w-3.5 h-3.5 rounded-full flex-shrink-0 ${hex === "#FFFFFF" ? "border border-gray-300" : ""}`}
                      style={{ backgroundColor: hex }} />
                    <span className="text-[#444444]">{label}</span>
                    {selected && <span className="material-symbols-outlined text-[13px] text-[#1A1A1A]">check</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Multi-image upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888]">
              Product Images <span className="ml-2 text-[#BBBBBB] normal-case tracking-normal font-medium">(up to 10)</span>
            </label>
            <div
              onClick={() => fileInputRef.current.click()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-sm py-7 cursor-pointer transition-colors group ${
                dragging ? "border-[#1A1A1A] bg-gray-50" : "border-gray-200 hover:border-[#1A1A1A]"
              }`}
            >
              <span className="material-symbols-outlined text-[32px] text-[#CCCCCC] group-hover:text-[#1A1A1A] transition-colors">upload_file</span>
              <p className="text-[13px] font-bold text-[#888888] group-hover:text-[#1A1A1A] transition-colors">Click to upload or drag & drop</p>
              <p className="text-[11px] text-[#BBBBBB]">PNG, JPG, WEBP — multiple files allowed</p>
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
            </div>

            {imagePreviews.length > 0 && (
              <>
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {imagePreviews.map((img, i) => (
                    <div key={i} className="relative group/img">
                      <div className="aspect-square bg-gray-50 border border-gray-100 rounded-sm overflow-hidden p-1">
                        <img src={img.url} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <button onClick={() => removeImage(i)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#C15B56] text-white rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-[12px]">close</span>
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-[#888888]">{imagePreviews.length} image{imagePreviews.length > 1 ? "s" : ""} selected</p>
              </>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-gray-100 flex-shrink-0">
          <button onClick={onClose} disabled={loading}
            className="px-5 py-2 text-[13px] font-bold text-[#666666] hover:bg-gray-50 rounded-sm transition-colors disabled:opacity-40">
            Cancel
          </button>
          <button onClick={handleAdd} disabled={loading}
            className="flex items-center gap-2 px-5 py-2 text-[13px] font-bold text-white bg-[#1A1A1A] hover:bg-[#333] rounded-sm transition-colors disabled:opacity-60 min-w-[130px] justify-center">
            {loading
              ? <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</>
              : <><span className="material-symbols-outlined text-[16px]">add</span>Add Product</>
            }
          </button>
        </div>

      </div>
    </div>
  );
}