import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "@/pages/Home";
import { AuthLayout } from "@/layout/AuthLayout";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import AdminDashboardLayout from "@/layout/AdminDashboardLayout";
import RootLayout from "@/layout/RootLayout";

const routes = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index element={<Home />} />
    <Route element={<AuthLayout />}>
      <Route index path="login" element={<Login />} />s
      <Route path="signup" element={<Signup />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
    </Route>
    <Route path="dashboard" element={<AdminDashboardLayout />}>
      <Route index element={<Home />} />
    </Route>
  </Route>
);

export const router = createBrowserRouter(routes);
