const pillStyles = {
  paid: "bg-[#E9F2EE] text-[#3E6358]", 
  delivered: "bg-[#E8F3EF] text-[#4A7D6E]", 
  "In Transit": "bg-[#EEEEEE] text-[#757575]",
  shipped: "bg-[#E3F2FD] text-[#1E88E5]",
  processing: "bg-[#E8F1EE] text-[#6A8B81]",
  // Soft Lavender/Blue for Preparing
  preparing: "bg-[#F0F2FA] text-[#5C6E91]", 
  cancelled: "bg-[#FEECEB] text-[#C15B56]",
  pending: "bg-[#F5F5F5] text-[#7A7A7A]",
  "In Stock": "bg-[#E8F3EF] text-[#4A7D6E]",
  "Low Stock": "bg-[#FEECEB] text-[#C15B56]",
};


const dotStyles = {
  paid: "bg-[#3E6358]",
  delivered: "bg-[#4A7D6E]",
  "In Transit": "bg-[#757575]",
  shipped: "bg-[#1E88E5]",
  processing: "bg-[#6A8B81] animate-pulse",
  // Steady dot for Preparing
  preparing: "bg-[#5C6E91]", 
  cancelled: "bg-[#C15B56]",
  pending: "bg-[#7A7A7A]",
  "In Stock": "bg-[#4A7D6E]",
  "Low Stock": "bg-[#C15B56]",
};

export default function StatusBadge({ status, variant = "pill" }) {
  // Case-insensitive matching ke liye lower case use karna safe rehta hai
  const normalizedStatus = status?.toLowerCase();

  if (variant === "text") {
    return (
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#888888]">
        {status}
      </span>
    );
  }

  // Matching logic (check for direct match or lower case match)
  const currentPillStyle = pillStyles[status] || pillStyles[normalizedStatus] || "bg-[#F5F5F5] text-[#757575]";
  const currentDotStyle = dotStyles[status] || dotStyles[normalizedStatus] || "bg-[#757575]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${currentPillStyle}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${currentDotStyle}`} />
      {status}
    </span>
  );
}