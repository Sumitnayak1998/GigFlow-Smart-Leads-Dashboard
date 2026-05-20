import { ArrowRight, Filter, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-wide text-primary-600">
          Dashboard
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-ink-900 dark:text-white">
          Lead management workspace
        </h2>
        <p className="mt-3 max-w-2xl text-ink-500 dark:text-slate-400">
          Track your leads, filter by source and status, and export qualified
          prospects for your sales workflow.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {[
          {
            icon: Users,
            color: "text-primary-600",
            title: "Lead CRM",
            text: "Create, update, inspect, and organize leads in one dashboard.",
          },
          {
            icon: Filter,
            color: "text-violet-600",
            title: "Smart filters",
            text: "Combine status, source, search, sorting, and pagination.",
          },
          {
            icon: ShieldCheck,
            color: "text-emerald-600",
            title: "Secure access",
            text: "JWT authentication with admin and sales user permissions.",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <Icon className={`mb-5 ${item.color}`} size={28} />
              <p className="text-2xl font-bold text-ink-900 dark:text-white">
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-ink-500 dark:text-slate-400">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-bold text-ink-900 dark:text-white">
              Start managing leads
            </h3>
            <p className="mt-2 text-sm text-ink-500 dark:text-slate-400">
              Go to the leads module to create your first lead.
            </p>
          </div>

          <Link
            to="/dashboard/leads"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 px-5 py-3 text-sm font-bold text-white hover:bg-primary-700"
          >
            Open leads
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
