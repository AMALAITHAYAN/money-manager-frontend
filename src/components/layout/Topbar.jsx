import Button from "../common/Button";
import { authStore } from "../../store/authStore";

export default function Topbar() {
  const user = authStore.getUser();

  return (
    <header className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3">
      <div className="md:hidden">
        <h1 className="text-lg font-extrabold text-slate-900">Money Manager</h1>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden sm:block text-right">
          <p className="text-xs text-slate-500">Signed in as</p>
          <p className="text-sm font-semibold text-slate-900">{user?.email || "User"}</p>
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            authStore.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
