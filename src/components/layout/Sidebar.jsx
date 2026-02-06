import { NavLink } from "react-router-dom";
import { ChartBarIcon, WalletIcon, BanknotesIcon, DocumentChartBarIcon } from "@heroicons/react/24/outline";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: ChartBarIcon },
  { to: "/accounts", label: "Accounts", icon: WalletIcon },
  { to: "/budgets", label: "Budgets", icon: BanknotesIcon },
  { to: "/reports", label: "Reports", icon: DocumentChartBarIcon },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex h-full flex-col border-r border-slate-200 bg-white p-4">
        <div className="mb-6">
          <h1 className="text-xl font-extrabold text-slate-900">Money Manager</h1>
          <p className="text-xs text-slate-500">Income • Expense • Budget • Reports</p>
        </div>

        <nav className="space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold ${
                    isActive ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 text-xs text-slate-500">
          Built with React + Spring Boot + MongoDB
        </div>
      </div>
    </aside>
  );
}
