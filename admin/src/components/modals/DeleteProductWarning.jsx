export default function DeleteProductWarning({ product, onClose, onConfirm }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-sm shadow-xl">
        {/* Header */}
        <div className="flex items-start gap-4 px-8 pt-8 pb-6">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] text-[#C15B56]">
              warning
            </span>
          </div>
          <div>
            <h2 className="text-[18px] font-bold tracking-[-0.02em] text-[#1A1A1A] mb-1">
              Delete Product
            </h2>
            <p className="text-[13px] text-[#666666] leading-relaxed">
              This action cannot be undone. This will permanently remove the
              product from your inventory.
            </p>
          </div>
        </div>

        {/* Product Card */}
        <div className="mx-8 mb-6 flex items-center gap-4 p-4 border border-[#FECACA] bg-[#FEF2F2] rounded-sm">
          <div className="w-12 h-12 bg-white rounded-sm border border-red-100 flex items-center justify-center p-1.5 flex-shrink-0">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[#1A1A1A] text-[14px] truncate">
              {product.title}
            </p>
            <p className="text-[11px] text-[#999999] font-bold tracking-widest uppercase mt-0.5">
              {product._id}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-bold text-[#1A1A1A] text-[14px]">{product.price}</p>
            <p className="text-[11px] text-[#999999] mt-0.5">{product.stock} units</p>
          </div>
        </div>

        {/* Warning text */}
        <div className="px-8 pb-6">
          <p className="text-[12px] text-[#888888]">
            Type{" "}
            <span className="font-bold text-[#C15B56] bg-[#FEF2F2] px-1.5 py-0.5 rounded-sm font-mono">
              DELETE
            </span>{" "}
            in the field below to confirm.
          </p>
          <input
            type="text"
            placeholder="DELETE"
            className="mt-3 w-full border border-gray-200 focus:border-[#C15B56] rounded-sm px-4 py-2.5 text-[14px] text-[#1A1A1A] focus:outline-none transition-colors placeholder:text-gray-300 tracking-widest font-bold"
            onChange={(e) => {
              const btn = document.getElementById("confirm-delete-btn");
              if (btn) {
                btn.disabled = e.target.value !== "DELETE";
                btn.className =
                  e.target.value === "DELETE"
                    ? "px-5 py-2 text-[13px] font-bold text-white bg-[#C15B56] hover:bg-[#a84843] rounded-sm transition-colors"
                    : "px-5 py-2 text-[13px] font-bold text-white bg-[#E5A5A2] rounded-sm cursor-not-allowed";
              }
            }}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2 text-[13px] font-bold text-[#666666] hover:bg-gray-50 rounded-sm transition-colors"
          >
            Cancel
          </button>
          <button
            id="confirm-delete-btn"
            disabled
            onClick={() => {
              onConfirm(product._id);
              onClose();
            }}
            className="px-5 py-2 text-[13px] font-bold text-white bg-[#E5A5A2] rounded-sm cursor-not-allowed"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}