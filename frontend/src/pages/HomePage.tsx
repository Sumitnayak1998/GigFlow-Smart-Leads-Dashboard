import {
  ArrowRight,
  CheckCircle2,
  Filter,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto grid min-h-[calc(100vh-153px)] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-wide text-primary-600">
            GigFlow - Smart Leads Dashboard
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-ink-900 dark:text-white md:text-5xl">
            Manage, filter, and convert your sales leads with clarity.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-500 dark:text-slate-400">
            A clean lead management system for sales teams to track prospects,
            search records, manage lead status, and export data quickly.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 px-6 py-3 text-sm font-bold text-white hover:bg-primary-700"
            >
              Get started
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-ink-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Login to dashboard
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-ink-500 dark:text-slate-400">
                Pipeline
              </p>
              <h2 className="text-2xl font-bold text-ink-900 dark:text-white">
                Lead Overview
              </h2>
            </div>

            <div className="rounded-md bg-primary-50 px-3 py-2 text-sm font-bold text-primary-700 dark:bg-slate-800 dark:text-white">
              Live
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Users, color: "text-primary-600", value: "240+", label: "Leads tracked" },
              { icon: CheckCircle2, color: "text-emerald-600", value: "68", label: "Qualified leads" },
              { icon: Filter, color: "text-violet-600", value: "Multi", label: "Filter support" },
              { icon: ShieldCheck, color: "text-amber-600", value: "RBAC", label: "Admin and sales roles" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-lg border border-slate-200 p-5 dark:border-slate-800"
                >
                  <Icon className={`mb-4 ${item.color}`} size={26} />
                  <p className="text-2xl font-bold text-ink-900 dark:text-white">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-ink-500 dark:text-slate-400">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
