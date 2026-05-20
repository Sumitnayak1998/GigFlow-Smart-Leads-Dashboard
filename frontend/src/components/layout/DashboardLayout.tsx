import { BarChart3, LayoutDashboard, LogOut, Users } from "lucide-react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { APP_NAME } from "../../utils/constants";
import ThemeToggle from "../common/ThemeToggle";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold",
      isActive
        ? "bg-primary-50 text-primary-700 dark:bg-slate-800 dark:text-white"
        : "text-ink-500 hover:bg-slate-100 hover:text-ink-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white",
    ].join(" ");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-200 bg-white px-5 py-6 dark:border-slate-800 dark:bg-slate-950 lg:block">
        <Link to="/dashboard" className="mb-8 flex items-center gap-3">
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

        <nav className="space-y-2">
          <NavLink to="/dashboard" end className={navLinkClass}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/dashboard/leads" className={navLinkClass}>
            <Users size={18} />
            Leads
          </NavLink>
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <div className="flex h-20 items-center justify-between px-6">
            <div className="flex items-center gap-3 lg:hidden">
              <Link
                to="/dashboard"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white"
              >
                <BarChart3 size={22} />
              </Link>

              <NavLink
                to="/dashboard/leads"
                className="rounded-md px-3 py-2 text-sm font-bold text-ink-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Leads
              </NavLink>
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-medium text-ink-500 dark:text-slate-400">
                Welcome
              </p>
              <h1 className="text-xl font-bold text-ink-900 dark:text-white">
                {user?.name}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />

              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold text-ink-900 dark:text-white">
                  {user?.email}
                </p>
                <p className="text-xs font-medium capitalize text-ink-500 dark:text-slate-400">
                  {user?.role}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-ink-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
