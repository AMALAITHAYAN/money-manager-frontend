import { formatINR } from "../../utils/format";

export default function SummaryCards({ income = 0, expense = 0, net = 0 }) {
  const cards = [
    { label: "Total Income", value: income },
    { label: "Total Expense", value: expense },
    { label: "Net Savings", value: net },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((c) => (
        <div key={c.label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold text-slate-600">{c.label}</p>
          <p className="mt-2 text-2xl font-extrabold text-slate-900">{formatINR(c.value)}</p>
        </div>
      ))}
    </div>
  );
}
