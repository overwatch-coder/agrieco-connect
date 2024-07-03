import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import RootLayout from "@/layout/RootLayout";
import NotFound from "@/pages/NotFound";
import { useAuth } from "@/hooks/useAuth";
import AuthRoutes from "@/routes/auth.route";
import UserRoutes from "@/routes/user.route";
import AdminRoutes from "@/routes/admin.route";

export default function ConfigureRoutes() {
  const [auth] = useAuth();
  const isAdmin = auth?.email.toLowerCase().startsWith("admin");

  const routes = createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={
          auth ? (
            isAdmin ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Navigate to="/user/feed" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <>
        {/* Auth Routes */}
        {AuthRoutes()}

        {/* User Routes */}
        {UserRoutes()}

        {/* Admin Routes */}
        {AdminRoutes()}
      </>

      {/* Catch all route - Not Found */}
      <Route path="*" element={<NotFound />} />
    </Route>
  );

  const router = createBrowserRouter(routes);
  return {
    router,
  };
}
