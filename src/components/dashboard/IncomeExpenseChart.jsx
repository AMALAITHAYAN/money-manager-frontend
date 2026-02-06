import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import EmptyState from "../common/EmptyState";

export default function IncomeExpenseChart({ points = [] }) {
  if (!points?.length) {
    return <EmptyState title="No chart data" subtitle="Add some transactions to see trends." />;
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h3 className="text-sm font-semibold text-slate-700">Income vs Expense Trend</h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={points}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" />
            <Line type="monotone" dataKey="expense" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
