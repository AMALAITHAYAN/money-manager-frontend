export default function Button({ variant="primary", className="", ...props }) {
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition";
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800",
    secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300 active:bg-slate-400",
    danger: "bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100"
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
