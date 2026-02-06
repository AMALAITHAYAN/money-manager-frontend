import { useState } from "react";
import { toast } from "react-toastify";
import AppShell from "../components/layout/AppShell.jsx";
import Input from "../components/common/Input.jsx";
import Select from "../components/common/Select.jsx";
import Button from "../components/common/Button.jsx";
import Loader from "../components/common/Loader.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import { DIVISIONS } from "../utils/constants";
import { reportApi } from "../api/reportApi";
import { formatINR } from "../utils/format";

export default function Reports() {
  // Reports endpoints allow division as optional (null). We'll support ALL.
  const [division, setDivision] = useState("PERSONAL");

  // Backend requires start & end (ISO date-time strings) for reports.
  const [start, setStart] = useState("2026-01-07T13:58:23.463100Z");
  const [end, setEnd] = useState("2026-02-06T13:58:23.463100Z");

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const safeDivision = (d) => (d === "ALL" ? undefined : d);

  const run = async () => {
    if (!start || !end) {
      toast.error("Please provide start and end date-time (ISO).");
      return;
    }
    try {
      setLoading(true);
      const data = await reportApi.categorySummary({ division: safeDivision(division), start, end });
      setRows(data || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  const exportCsv = async () => {
    if (!start || !end) {
      toast.error("Please provide start and end date-time (ISO).");
      return;
    }
    try {
      const blob = await reportApi.exportCsv({ division: safeDivision(division), start, end });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "transactions.csv";
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("CSV downloaded");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Export failed");
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Reports</h2>
          <p className="text-sm text-slate-600">Category summary between dates + CSV export.</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Select label="Division" value={division} onChange={(e) => setDivision(e.target.value)}>
              <option value="ALL">ALL</option>
              {DIVISIONS.map((d) => <option key={d} value={d}>{d}</option>)}
            </Select>

            <Input
              label="Start (ISO)"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              placeholder="2026-02-01T00:00:00Z"
            />
            <Input
              label="End (ISO)"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              placeholder="2026-02-06T23:59:59Z"
            />

            <div className="flex items-end gap-2">
              <Button onClick={run}>Run</Button>
              <Button variant="secondary" onClick={exportCsv}>Export CSV</Button>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Default range is last 30 days. You can change start/end to any ISO time (example: 2026-02-01T00:00:00Z).
          </p>
        </div>

        {loading ? (
          <Loader label="Loading report..." />
        ) : rows?.length ? (
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-sm font-semibold text-slate-700">Category Summary</h3>
            <div className="mt-4 overflow-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-slate-500">
                  <tr>
                    <th className="py-2">Category</th>
                    <th className="py-2 text-right">Income</th>
                    <th className="py-2 text-right">Expense</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.category} className="border-t border-slate-100">
                      <td className="py-2 font-semibold">{r.category}</td>
                      <td className="py-2 text-right">{formatINR(r.income)}</td>
                      <td className="py-2 text-right">{formatINR(r.expense)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <EmptyState title="No report data" subtitle="Click Run to generate the category summary." />
        )}
      </div>
    </AppShell>
  );
}
