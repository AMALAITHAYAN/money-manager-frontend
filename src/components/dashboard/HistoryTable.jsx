import { formatDateTime, formatINR } from "../../utils/format";
import EmptyState from "../common/EmptyState";

export default function HistoryTable({ items = [] }) {
  if (!items?.length) {
    return <EmptyState title="No history yet" subtitle="Add income/expense to see history here." />;
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">Recent History</h3>
      </div>

      <div className="overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs text-slate-500">
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Type</th>
              <th className="py-2">Category</th>
              <th className="py-2">Division</th>
              <th className="py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="text-slate-800">
            {items.map((t) => (
              <tr key={t.id} className="border-t border-slate-100">
                <td className="py-2">{formatDateTime(t.occurredAt)}</td>
                <td className="py-2 font-semibold">{t.type}</td>
                <td className="py-2">{t.category || "-"}</td>
                <td className="py-2">{t.division || "-"}</td>
                <td className="py-2 text-right font-extrabold">{formatINR(t.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
