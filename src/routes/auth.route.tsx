import { Navigate, Route } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import { useAuth } from "@/hooks/useAuth";

const AuthRoutes = () => {
  const [auth] = useAuth();
  const isAdmin = auth && auth?.user?.role === "admin";
  return (
    <>
      <Route
        element={
          auth ? (
            isAdmin ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Navigate to="/user/feed" />
            )
          ) : (
            <AuthLayout />
          )
        }
      >
        <Route index path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
    </>
  );
};

export default AuthRoutes;
