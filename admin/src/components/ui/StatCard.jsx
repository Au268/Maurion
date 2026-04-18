export default function StatCard({ label, value, icon, trend, trendColor }) {
  // Check if this card needs the "Attention" styling from the image
  const isAttention = trend === "Requires Attention";

  return (
    <div className="bg-white p-8 rounded-lg border border-[#F0F0F0] shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col gap-1.5">
      {/* Label: Small, bold, and spaced out */}
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#999999] font-bold">
        {label}
      </p>

      {/* Value: Large and tight */}
      <h3 className="text-[42px] font-bold text-[#1A1A1A] leading-tight tracking-[-0.03em]">
        {value}
      </h3>

      {/* Trend Row */}
      <div 
        className={`flex items-center gap-2 mt-2 ${
          isAttention ? "text-[#C15B56]" : "text-[#666666]"
        }`}
      >
        {/* Icon: Using the dot for attention or the passed icon */}
        <span className="material-symbols-outlined text-[16px] leading-none">
          {isAttention ? "error" : icon}
        </span>
        
        {/* Trend Text: Bold & Italic for attention, medium for others */}
        <span className={`text-[11px] ${isAttention ? "font-bold italic" : "font-medium"}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}