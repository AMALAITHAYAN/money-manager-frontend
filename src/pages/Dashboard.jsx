import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AppShell from "../components/layout/AppShell.jsx";
import SummaryCards from "../components/dashboard/SummaryCards.jsx";
import PeriodSelector from "../components/dashboard/PeriodSelector.jsx";
import FiltersBar from "../components/dashboard/FiltersBar.jsx";
import IncomeExpenseChart from "../components/dashboard/IncomeExpenseChart.jsx";
import HistoryTable from "../components/dashboard/HistoryTable.jsx";
import Button from "../components/common/Button.jsx";
import Loader from "../components/common/Loader.jsx";

import { analyticsApi } from "../api/analyticsApi";
import { accountApi } from "../api/accountApi";
import AddTransactionModal from "../components/transactions/AddTransactionModal.jsx";
import { transactionApi } from "../api/transactionApi";

export default function Dashboard() {
  const [period, setPeriod] = useState("MONTH");
  const [division, setDivision] = useState("PERSONAL");

  const [loading, setLoading] = useState(true);

  // Backend shape (DashboardSummaryResponse):
  // { start, end, totalIncome, totalExpense, net, points: [], recent: [] }
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    net: 0,
    points: [],
    recent: [],
  });

  const [accounts, setAccounts] = useState([]);
  const [addOpen, setAddOpen] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const [dash, acc] = await Promise.all([
        analyticsApi.dashboard({ period, division }),
        accountApi.list(),
      ]);
      setSummary(dash || {});
      setAccounts(acc || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, division]);

  const addTx = async (payload) => {
    try {
      await transactionApi.create(payload);
      toast.success("Saved!");
      setAddOpen(false);
      load();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to save");
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Dashboard</h2>
            <p className="text-sm text-slate-600">Period-wise income and expenditure with quick history.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <PeriodSelector value={period} onChange={setPeriod} />
            <FiltersBar division={division} setDivision={setDivision} />
          </div>
        </div>

        {loading ? (
          <Loader label="Loading dashboard..." />
        ) : (
          <>
            <SummaryCards
              income={summary?.totalIncome ?? 0}
              expense={summary?.totalExpense ?? 0}
              net={summary?.net ?? 0}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <IncomeExpenseChart points={summary?.points || []} />
              <HistoryTable items={summary?.recent || []} />
            </div>
          </>
        )}

        <div className="fixed bottom-6 right-6">
          <Button onClick={() => setAddOpen(true)} className="h-12 w-12 rounded-full p-0 text-xl">
            +
          </Button>
        </div>

        <AddTransactionModal
          open={addOpen}
          onClose={() => setAddOpen(false)}
          onSubmit={addTx}
          accounts={accounts}
        />
      </div>
    </AppShell>
  );
}
