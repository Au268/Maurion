export default function StatCard({ label, value, icon, trend, trendColor = "text-tertiary" }) {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-xl flex flex-col gap-2">
      <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">{label}</p>
      <h3 className="text-3xl font-headline font-bold">{value}</h3>
      <div className={`flex items-center gap-1 mt-2 ${trendColor}`}>
        <span className="material-symbols-outlined text-xs">{icon}</span>
        <span className="text-[10px] font-bold">{trend}</span>
      </div>
    </div>
  );
}