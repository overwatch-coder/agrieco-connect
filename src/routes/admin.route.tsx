import { Navigate, Route } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AdminDashboardLayout from "@/layout/AdminDashboardLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Home from "@/pages/Home";
import Settings from "@/components/shared/Settings";

const AdminRoutes = () => {
  const [auth] = useAuth();
  const isAdmin = auth?.email.toLowerCase().startsWith("admin");
  return (
    <>
      <Route
        path="admin"
        element={
          !auth ? (
            <Navigate to="/login" />
          ) : isAdmin ? (
            <AdminDashboardLayout />
          ) : (
            <Navigate to="/user/feed" />
          )
        }
      >
        <Route path="settings" element={<Settings />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user-management" element={<Home />} />
      </Route>
    </>
  );
};

export default AdminRoutes;
