import { Navigate, Route } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AdminDashboardLayout from "@/layout/AdminDashboardLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Settings from "@/components/shared/Settings";
import UserManagement from "@/pages/admin/UserManagement";
import Subcommunities from "@/pages/shared/Subcommunities";
import ViewSubcommunity from "@/pages/shared/ViewSubcommunity";
import MarketPlace from "@/pages/shared/MarketPlace";
import Events from "@/pages/shared/Events";
import AppointmentManagement from "@/pages/admin/AppointmentManagement";

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
        <Route path="user-management" element={<UserManagement />} />
        <Route path="subcommunity-management" element={<Subcommunities />} />
        <Route
          path="subcommunity-management/:slug"
          element={<ViewSubcommunity />}
        />
        <Route path="marketplace-management" element={<MarketPlace />} />
        <Route path="event-management" element={<Events />} />
        <Route
          path="appointment-management"
          element={<AppointmentManagement />}
        />
      </Route>
    </>
  );
};

export default AdminRoutes;
