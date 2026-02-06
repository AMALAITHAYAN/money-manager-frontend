import AccountCard from "./AccountCard";

export default function AccountList({ accounts = [] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {accounts.map((a) => <AccountCard key={a.id} account={a} />)}
    </div>
  );
}
