import { formatINR } from "../../utils/format";

export default function AccountCard({ account }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <p className="text-sm font-semibold text-slate-600">{account.name}</p>
      <p className="mt-2 text-2xl font-extrabold text-slate-900">{formatINR(account.balance)}</p>
      <p className="mt-1 text-xs text-slate-500">Updated automatically with transactions & transfers</p>
    </div>
  );
}
