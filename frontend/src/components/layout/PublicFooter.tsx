import { APP_NAME } from "../../utils/constants";

const PublicFooter = () => {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-ink-500 dark:text-slate-400">
          © 2026 {APP_NAME}. Built for modern sales teams.
        </p>

        <div className="flex gap-5 text-sm font-medium text-ink-500 dark:text-slate-400">
          <span>Secure CRM</span>
          <span>Role Based Access</span>
          <span>CSV Export</span>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
