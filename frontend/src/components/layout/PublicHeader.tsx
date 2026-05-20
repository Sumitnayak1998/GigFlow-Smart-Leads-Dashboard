import { BarChart3 } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { APP_NAME } from "../../utils/constants";
import ThemeToggle from "../common/ThemeToggle";

const PublicHeader = () => {
  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-600 text-white">
            <BarChart3 size={24} />
          </div>

          <div>
            <p className="text-lg font-bold text-ink-900 dark:text-white">
              {APP_NAME}
            </p>
            <p className="text-xs font-medium text-ink-500 dark:text-slate-400">
              Smart Leads Dashboard
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <ThemeToggle />

          <NavLink
            to="/login"
            className="rounded-md px-4 py-2 text-sm font-semibold text-ink-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Sign up
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default PublicHeader;
