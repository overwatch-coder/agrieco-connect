import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import RootLayout from "@/layout/RootLayout";
import NotFound from "@/pages/NotFound";
import AuthRoutes from "@/routes/auth.route";
import UserRoutes from "@/routes/user.route";
import AdminRoutes from "@/routes/admin.route";
import AboutUs from "@/pages/AboutUs";

export default function ConfigureRoutes() {
  const routes = createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Navigate to="/user/feed" />} />
      <Route path="about-us" element={<AboutUs />} />

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
