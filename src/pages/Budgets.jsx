import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AppShell from "../components/layout/AppShell.jsx";
import Select from "../components/common/Select.jsx";
import Input from "../components/common/Input.jsx";
import Button from "../components/common/Button.jsx";
import Loader from "../components/common/Loader.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import { CATEGORIES, DIVISIONS } from "../utils/constants";
import { budgetApi } from "../api/budgetApi";
import { formatINR } from "../utils/format";

function currentMonthKey() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${d.getFullYear()}-${mm}`; // YYYY-MM
}

export default function Budgets() {
  const [month, setMonth] = useState(currentMonthKey());
  const [division, setDivision] = useState("PERSONAL");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [limit, setLimit] = useState("");

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState([]);

  const load = async () => {
    try {
      setLoading(true);
      const data = await budgetApi.status({ month, division });
      setStatus(data || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to load budgets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, division]);

  const save = async () => {
    try {
      await budgetApi.upsert({
        month,
        division,
        category,
        limitAmount: Number(limit), // backend expects limitAmount
      });
      toast.success("Budget saved");
      setLimit("");
      load();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to save budget");
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Budgets</h2>
          <p className="text-sm text-slate-600">Set category-wise monthly budgets and track overspending.</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Input
              label="Month (YYYY-MM)"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="2026-02"
            />
            <Select label="Division" value={division} onChange={(e) => setDivision(e.target.value)}>
              {DIVISIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
            <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
            <div className="flex items-end gap-2">
              <Input
                label="Limit Amount"
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                placeholder="3000"
              />
              <Button onClick={save} disabled={!limit}>
                Save
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <Loader label="Loading budget status..." />
        ) : status?.length ? (
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-sm font-semibold text-slate-700">Budget Status</h3>
            <div className="mt-4 overflow-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-slate-500">
                  <tr>
                    <th className="py-2">Category</th>
                    <th className="py-2 text-right">Limit</th>
                    <th className="py-2 text-right">Spent</th>
                    <th className="py-2 text-right">Remaining</th>
                    <th className="py-2 text-right">Used %</th>
                    <th className="py-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {status.map((r) => {
                    const limitAmount = r.limitAmount ?? 0;
                    const spent = r.spent ?? 0;
                    const remaining = r.remaining ?? (limitAmount - spent);
                    const percentUsed = r.percentUsed ?? (limitAmount <= 0 ? 0 : (spent / limitAmount) * 100);
                    const statusText = r.status ?? (remaining < 0 ? "OVER" : percentUsed >= 80 ? "WARN" : "OK");
                    const statusClass =
                      statusText === "OVER" ? "text-rose-600" : statusText === "WARN" ? "text-amber-600" : "text-emerald-700";

                    return (
                      <tr key={r.category} className="border-t border-slate-100">
                        <td className="py-2 font-semibold">{r.category}</td>
                        <td className="py-2 text-right">{formatINR(limitAmount)}</td>
                        <td className="py-2 text-right">{formatINR(spent)}</td>
                        <td className={`py-2 text-right font-extrabold ${remaining < 0 ? "text-rose-600" : "text-emerald-700"}`}>
                          {formatINR(remaining)}
                        </td>
                        <td className="py-2 text-right">{percentUsed.toFixed(1)}%</td>
                        <td className={`py-2 text-right font-extrabold ${statusClass}`}>{statusText}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <EmptyState title="No budgets yet" subtitle="Set a budget above to see tracking here." />
        )}
      </div>
    </AppShell>
  );
}
