import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import LoginForm from "../components/auth/LoginForm.jsx";
import { authApi } from "../api/authApi";
import { authStore } from "../store/authStore";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = async (payload) => {
    try {
      setLoading(true);
      const res = await authApi.login(payload);
      authStore.setSession(res.token, res.user);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full grid place-items-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900">Sign in</h1>
        <p className="mt-1 text-sm text-slate-600">Manage income, expenses, budgets and reports.</p>

        <div className="mt-6">
          <LoginForm onSubmit={submit} loading={loading} />
        </div>

        <p className="mt-4 text-sm text-slate-600">
          New here?{" "}
          <Link className="font-semibold text-emerald-700 hover:underline" to="/register">
            Create an account
          </Link>
        </p>

        <p className="mt-6 text-xs text-slate-500">
          Crafted with React + vite + Springboot + mongoDB 
        </p>
      </div>
    </div>
  );
}
