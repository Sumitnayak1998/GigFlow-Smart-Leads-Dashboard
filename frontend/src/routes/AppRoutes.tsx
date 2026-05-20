import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import PublicLayout from "../components/layout/PublicLayout";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import DashboardPage from "../pages/DashboardPage";
import HomePage from "../pages/HomePage";
import LeadDetailsPage from "../pages/LeadDetailsPage";
import LeadsPage from "../pages/LeadsPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="leads/:id" element={<LeadDetailsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
