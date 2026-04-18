const pillStyles = {
  // Light Teal
  Delivered: "bg-[#E8F3EF] text-[#4A7D6E]", 
  // Neutral Grey
  "In Transit": "bg-[#EEEEEE] text-[#757575]",
  // Light Blue-Grey
  Shipped: "bg-[#EBF1F4] text-[#5B7A8B]",
  // Soft Sage
  Processing: "bg-[#E8F1EE] text-[#6A8B81]",
  // Soft Red
  Cancelled: "bg-[#FEECEB] text-[#C15B56]",
  Pending: "bg-[#F5F5F5] text-[#7A7A7A]",
  "In Stock": "bg-[#E8F3EF] text-[#4A7D6E]",
  "Low Stock": "bg-[#FEECEB] text-[#C15B56]",
};

const dotStyles = {
  Delivered: "bg-[#4A7D6E]",
  "In Transit": "bg-[#757575]",
  Shipped: "bg-[#5B7A8B]",
  Processing: "bg-[#6A8B81] animate-pulse",
  Cancelled: "bg-[#C15B56]",
  Pending: "bg-[#7A7A7A]",
  "In Stock": "bg-[#4A7D6E]",
  "Low Stock": "bg-[#C15B56]",
};

export default function StatusBadge({ status, variant = "pill" }) {
  if (variant === "text") {
    return (
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#888888]">
        {status}
      </span>
    );
  }

  // Matching key with the status prop
  const currentPillStyle = pillStyles[status] || "bg-[#F5F5F5] text-[#757575]";
  const currentDotStyle = dotStyles[status] || "bg-[#757575]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${currentPillStyle}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${currentDotStyle}`} />
      {status}
    </span>
  );
}