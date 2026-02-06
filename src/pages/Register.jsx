import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import RegisterForm from "../components/auth/RegisterForm.jsx";
import { authApi } from "../api/authApi";
import { authStore } from "../store/authStore";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = async (payload) => {
    try {
      setLoading(true);
      const res = await authApi.register(payload);
      authStore.setSession(res.token, res.user);
      toast.success("Account created!");
      navigate("/dashboard");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full grid place-items-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900">Create account</h1>
        <p className="mt-1 text-sm text-slate-600">Start tracking your money in minutes.</p>

        <div className="mt-6">
          <RegisterForm onSubmit={submit} loading={loading} />
        </div>

        <p className="mt-4 text-sm text-slate-600">
          Already have an account?{" "}
          <Link className="font-semibold text-emerald-700 hover:underline" to="/">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
