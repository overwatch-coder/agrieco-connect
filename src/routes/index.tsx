import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Home from "@/pages/Home";
import { AuthLayout } from "@/layout/AuthLayout";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import AdminDashboardLayout from "@/layout/AdminDashboardLayout";
import RootLayout from "@/layout/RootLayout";
import { useAuth } from "@/hooks/useAuth";

export default function ConfigureRoutes() {
  const [auth] = useAuth();

  const routes = createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={auth ? <Home /> : <Navigate to="/login" />} />
      <Route element={auth ? <Navigate to="/dashboard" /> : <AuthLayout />}>
        <Route index path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
      <Route
        path="dashboard"
        element={auth ? <AdminDashboardLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<Home />} />
      </Route>
    </Route>
  );

  const router = createBrowserRouter(routes);
  return {
    router,
  };
}
