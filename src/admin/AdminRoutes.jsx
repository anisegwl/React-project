import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";

import AdminLayout from "./AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminUsers from "./pages/AdminUsers";
import AdminOrders from "./pages/AdminOrders";
import AdminLogin from "./pages/AdminLogin";

// Auth guard — redirects to login if not admin
const RequireAdmin = () => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return null;
  const isAdminUser = user?.role === "admin";
  if (!isAuthenticated || !isAdminUser) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
};

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public admin login */}
      <Route path="login" element={<AdminLogin />} />

      {/* Protected admin routes */}
      <Route element={<RequireAdmin />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
