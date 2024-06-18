import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Home from "@/pages/Home";
import AuthLayout from "@/layout/AuthLayout";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import AdminDashboardLayout from "@/layout/AdminDashboardLayout";
import RootLayout from "@/layout/RootLayout";
import { useAuth } from "@/hooks/useAuth";
import UserDashboardLayout from "@/layout/UserDashboardLayout";
import Feed from "@/pages/user/Feed";
import Dashboard from "@/pages/admin/Dashboard";

export default function ConfigureRoutes() {
  const [auth] = useAuth();

  const routes = createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={auth ? <Navigate to="/user/feed" /> : <Navigate to="/login" />}
      />

      {/* Auth Routes */}
      <Route element={auth ? <Navigate to="/dashboard" /> : <AuthLayout />}>
        <Route index path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* User Routes */}
      <Route
        path="user"
        element={
          !auth ? (
            <Navigate to="/login" />
          ) : auth.email === "Sincere@april.biz" ? (
            <UserDashboardLayout />
          ) : (
            <Navigate to="/admin/dashboard" />
          )
        }
      >
        <Route path="feed" element={<Feed />} />
        <Route path="topics" element={<Home />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="admin"
        element={
          !auth ? (
            <Navigate to="/login" />
          ) : auth.email !== "Sincere@april.biz" ? (
            <AdminDashboardLayout />
          ) : (
            <Navigate to="/user/feed" />
          )
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user-management" element={<Home />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  );

  const router = createBrowserRouter(routes);
  return {
    router,
  };
}
