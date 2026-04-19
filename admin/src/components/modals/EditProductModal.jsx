import { useState, useEffect, useRef } from "react";

const CATEGORIES = [
  "Accessories",
  "Electronics",
  "Furniture",
  "Clothing",
  "Books",
  "Sports",
  "Home & Garden",
  "Toys",
  "Health & Beauty",
  "Automotive",
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

export default function EditProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    colors: [],
    image: "",
    imageFile: null,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        category: product.category || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock ?? "",
        colors: product.colors || [],
        image: product.image || "",
        imageFile: null,
      });
      setImagePreview(product.image || "");
    }
  }, [product]);

  if (!product) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* ── image ── */
  const applyFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImagePreview(URL.createObjectURL(file));
    setForm((prev) => ({ ...prev, imageFile: file }));
  };
  const handleFileChange = (e) => applyFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    applyFile(e.dataTransfer.files[0]);
  };
  const clearImage = (e) => {
    e.stopPropagation();
    setImagePreview(product.image || "");
    setForm((prev) => ({ ...prev, imageFile: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ── colors ── */
  const toggleColor = (hex) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.includes(hex)
        ? prev.colors.filter((c) => c !== hex)
        : [...prev.colors, hex],
    }));
  };

  const handleSave = () => {
    onSave({
      ...product,
      title: form.title,
      category: form.category,
      description: form.description,
      price: form.price,
      stock: Number(form.stock),
      colors: form.colors,
      // If a new file was picked, pass it for upload; otherwise keep existing URL
      image: form.imageFile ? imagePreview : form.image,
      imageFile: form.imageFile,
    });
    onClose();
  };

  const inputClass =
    "w-full border border-gray-200 rounded-sm px-4 py-2.5 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-sm shadow-xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 flex-shrink-0">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#888888] mb-1">
              Inventory Management
            </p>
            <h2 className="text-[22px] font-bold tracking-[-0.03em] text-[#1A1A1A]">
              Edit Product
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <span className="material-symbols-outlined text-[20px] text-[#666666]">close</span>
          </button>
        </div>

        {/* Preview strip */}
        <div className="flex items-center gap-4 px-8 py-4 bg-[#F9F9F9] border-b border-gray-100 flex-shrink-0">
          <div className="w-11 h-11 bg-white rounded-sm border border-gray-100 flex items-center justify-center p-1.5 overflow-hidden flex-shrink-0">
            {imagePreview
              ? <img src={imagePreview} alt={form.title} className="w-full h-full object-contain mix-blend-multiply" />
              : <span className="material-symbols-outlined text-[20px] text-[#CCCCCC]">image</span>
            }
          </div>
          <div className="min-w-0">
            <p className="font-bold text-[#1A1A1A] text-[14px] truncate">{form.title || product.title}</p>
            <p className="text-[10px] text-[#999999] font-bold tracking-widest uppercase">{product._id}</p>
          </div>
        </div>

        {/* Scrollable form body */}
        <div className="px-8 py-6 flex flex-col gap-5 overflow-y-auto">

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888]">Product Name</label>
            <input name="title" value={form.title} onChange={handleChange}
              className={inputClass} placeholder="e.g. Wooden Laptop Stand" />
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888]">Category</label>
            <div className="relative">
              <select
                name="category" value={form.category} onChange={handleChange}
                className={`${inputClass} appearance-none cursor-pointer pr-10`}
              >
                <option value="" disabled>Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-[#888888] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888]">Description</label>
            <textarea
              name="description" value={form.description} onChange={handleChange}
              rows={3}
              className={`${inputClass} resize-none leading-relaxed`}
              placeholder="e.g. This is the wooden laptop stand"
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888]">Price ($)</label>
              <input name="price" value={form.price} onChange={handleChange}
                className={inputClass} placeholder="19.99" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888]">Stock Units</label>
              <input name="stock" type="number" value={form.stock} onChange={handleChange}
                className={inputClass} placeholder="0" />
            </div>
          </div>

          {/* Colors */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888]">
              Colors
              <span className="ml-2 text-[#BBBBBB] normal-case tracking-normal font-medium">
                (select all that apply)
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map(({ hex, label }) => {
                const selected = form.colors.includes(hex);
                const isLight = hex === "#FFFFFF";
                return (
                  <button
                    key={hex}
                    type="button"
                    onClick={() => toggleColor(hex)}
                    title={label}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-[12px] font-medium transition-all ${
                      selected
                        ? "border-[#1A1A1A] bg-[#F5F5F5]"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full flex-shrink-0 ${isLight ? "border border-gray-300" : ""}`}
                      style={{ backgroundColor: hex }}
                    />
                    <span className="text-[#444444]">{label}</span>
                    {selected && (
                      <span className="material-symbols-outlined text-[13px] text-[#1A1A1A]">check</span>
                    )}
                  </button>
                );
              })}
            </div>
            {form.colors.length > 0 && (
              <p className="text-[11px] text-[#888888]">
                {form.colors.length} color{form.colors.length > 1 ? "s" : ""} selected
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888]">Product Image</label>
            <div
              onClick={() => fileInputRef.current.click()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-sm py-7 cursor-pointer transition-colors group ${
                dragging ? "border-[#1A1A1A] bg-gray-50" : "border-gray-200 hover:border-[#1A1A1A]"
              }`}
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="h-24 object-contain mix-blend-multiply" />
                  <p className="text-[11px] text-[#888888] group-hover:text-[#1A1A1A] transition-colors">
                    Click or drag & drop to replace
                  </p>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[32px] text-[#CCCCCC] group-hover:text-[#1A1A1A] transition-colors">
                    upload_file
                  </span>
                  <p className="text-[13px] font-bold text-[#888888] group-hover:text-[#1A1A1A] transition-colors">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-[11px] text-[#BBBBBB]">PNG, JPG, WEBP up to 10 MB</p>
                </>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>

            {form.imageFile && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-100 rounded-sm">
                <span className="material-symbols-outlined text-[16px] text-[#888888]">image</span>
                <span className="text-[12px] text-[#444444] font-medium truncate flex-1">{form.imageFile.name}</span>
                <button onClick={clearImage} className="text-[#AAAAAA] hover:text-[#C15B56] transition-colors flex-shrink-0">
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-gray-100 flex-shrink-0">
          <button onClick={onClose} className="px-5 py-2 text-[13px] font-bold text-[#666666] hover:bg-gray-50 rounded-sm transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="px-5 py-2 text-[13px] font-bold text-white bg-[#1A1A1A] hover:bg-[#333] rounded-sm transition-colors">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}