import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

const ProtectedRoute = () => {
  const { isAuthenticated, isAuthLoading } = useAuthStore();

  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="rounded-lg border border-slate-200 bg-white px-6 py-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="font-bold text-ink-900 dark:text-white">
            Restoring session...
          </p>
          <p className="mt-1 text-sm text-ink-500 dark:text-slate-400">
            Please wait a moment.
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
