import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import { CATEGORIES, DIVISIONS } from "../../utils/constants";

export default function AddTransactionModal({ open, onClose, onSubmit, accounts = [] }) {
  const [tab, setTab] = useState("INCOME");

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [division, setDivision] = useState(DIVISIONS[0]);
  const [accountId, setAccountId] = useState("");

  useEffect(() => {
    if (accounts?.length && !accountId) setAccountId(accounts[0].id);
  }, [accounts, accountId]);

  const reset = () => {
    setAmount("");
    setDescription("");
    setCategory(CATEGORIES[0]);
    setDivision(DIVISIONS[0]);
    if (accounts?.length) setAccountId(accounts[0].id);
  };

  return (
    <Modal open={open} onClose={() => { reset(); onClose(); }} title="Add Transaction">
      <div className="flex gap-2">
        <button
          className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold ${tab==="INCOME" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700"}`}
          onClick={() => setTab("INCOME")}
          type="button"
        >
          Income
        </button>
        <button
          className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold ${tab==="EXPENSE" ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-700"}`}
          onClick={() => setTab("EXPENSE")}
          type="button"
        >
          Expense
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <Input label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 500" />
        <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="One line note" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
          <Select label="Division" value={division} onChange={(e) => setDivision(e.target.value)}>
            {DIVISIONS.map((d) => <option key={d} value={d}>{d}</option>)}
          </Select>
        </div>

        <Select label="Account" value={accountId} onChange={(e) => setAccountId(e.target.value)}>
          {accounts.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
        </Select>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" type="button" onClick={() => { reset(); onClose(); }}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              onSubmit({
                type: tab,
                amount: Number(amount),
                description,
                category,
                division,
                accountId,
                occurredAt: new Date().toISOString(),
              });
              reset();
            }}
            disabled={!amount || !accountId}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
