import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AppShell from "../components/layout/AppShell.jsx";
import Button from "../components/common/Button.jsx";
import Loader from "../components/common/Loader.jsx";
import AccountList from "../components/accounts/AccountList.jsx";
import CreateAccountModal from "../components/accounts/CreateAccountModal.jsx";
import { accountApi } from "../api/accountApi";

export default function Accounts() {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [open, setOpen] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await accountApi.list();
      setAccounts(data || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to load accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (payload) => {
    try {
      await accountApi.create(payload);
      toast.success("Account created");
      setOpen(false);
      load();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to create account");
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Accounts</h2>
            <p className="text-sm text-slate-600">Cash / Bank / UPI with live balances.</p>
          </div>
          <Button onClick={() => setOpen(true)}>+ Create</Button>
        </div>

        {loading ? <Loader label="Loading accounts..." /> : <AccountList accounts={accounts} />}

        <CreateAccountModal open={open} onClose={() => setOpen(false)} onSubmit={create} />
      </div>
    </AppShell>
  );
}
