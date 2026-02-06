export default function Select({ label, className="", children, ...props }) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <select
        className={`w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
