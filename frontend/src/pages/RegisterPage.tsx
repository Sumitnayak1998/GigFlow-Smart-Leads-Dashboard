import { BarChart3 } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { UserRole } from "../types/auth.types";
import { getErrorMessage } from "../utils/getErrorMessage";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("sales");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await register({ name, email, password, role });
      navigate("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

  return (
    <section className="mx-auto flex min-h-[calc(100vh-153px)] max-w-7xl items-center justify-center px-6 py-14">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600 text-white">
            <BarChart3 size={24} />
          </div>
          <h1 className="text-2xl font-bold text-ink-900 dark:text-white">
            Create account
          </h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-slate-400">
            Start managing your leads in one place.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink-700 dark:text-slate-200">
              Full name
            </label>
            <input
              type="text"
              required
              minLength={2}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClass}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-ink-700 dark:text-slate-200">
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-ink-700 dark:text-slate-200">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClass}
              placeholder="Minimum 6 characters"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-ink-700 dark:text-slate-200">
              Role
            </label>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as UserRole)}
              className={inputClass}
            >
              <option value="sales">Sales User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full rounded-md bg-primary-600 text-sm font-bold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-primary-600">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
