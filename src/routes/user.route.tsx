import { Navigate, Route } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import UserDashboardLayout from "@/layout/UserDashboardLayout";
import Settings from "@/components/shared/Settings";
import Feed from "@/pages/user/Feed";
import Topics from "@/pages/user/Topics";
import MarketPlace from "@/pages/user/MarketPlace";
import Events from "@/pages/user/Events";
import MyItemsMarketPlace from "@/pages/user/MyItemsMarketPlace";
import EventDetails from "@/pages/user/EventDetails";
import MyEvents from "@/pages/user/MyEvents";
import Appointments from "@/pages/user/Appointments";
import MyAppointments from "@/pages/user/MyAppointments";
import BookAppointment from "@/pages/user/BookAppointment";
import Subcommunities from "@/pages/user/Subcommunities";
import ViewSubcommunity from "@/pages/user/ViewSubcommunity";

const UserRoutes = () => {
  const [auth] = useAuth();
  const isAdmin = auth?.email.toLowerCase().startsWith("admin");

  return (
    <>
      <Route
        path="user"
        element={
          !auth ? (
            <Navigate to="/login" />
          ) : isAdmin ? (
            <Navigate to="/admin/dashboard" />
          ) : (
            <UserDashboardLayout />
          )
        }
      >
        <Route path="settings" element={<Settings />} />
        <Route path="feed" element={<Feed />} />
        <Route path="topics" element={<Topics />} />
        <Route path="marketplace" element={<MarketPlace />} />
        <Route path="marketplace/my-items" element={<MyItemsMarketPlace />} />
        <Route path="events" element={<Events />} />
        <Route path="events/my-events" element={<MyEvents />} />
        <Route path="events/:slug" element={<EventDetails />} />
        <Route path="appointments" element={<Appointments />} />
        <Route
          path="appointments/my-appointments"
          element={<MyAppointments />}
        />
        <Route
          path="appointments/bookings/:appointmentId"
          element={<BookAppointment />}
        />
        <Route path="subcommunities" element={<Subcommunities />} />
        <Route path="subcommunities/:slug" element={<ViewSubcommunity />} />
      </Route>
    </>
  );
};

export default UserRoutes;
