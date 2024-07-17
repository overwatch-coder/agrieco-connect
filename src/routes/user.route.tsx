import { Navigate, Route } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import UserDashboardLayout from "@/layout/UserDashboardLayout";
import Settings from "@/components/shared/Settings";
import Feed from "@/pages/user/Feed";
import Topics from "@/pages/user/Topics";
import MarketPlace from "@/pages/shared/MarketPlace";
import Events from "@/pages/shared/Events";
import MyItemsMarketPlace from "@/pages/user/MyItemsMarketPlace";
import EventDetails from "@/pages/user/EventDetails";
import MyEvents from "@/pages/shared/MyEvents";
import Appointments from "@/pages/user/Appointments";
import MyAppointments from "@/pages/user/MyAppointments";
import BookAppointment from "@/pages/user/BookAppointment";
import Subcommunities from "@/pages/shared/Subcommunities";
import AgriculturalTrends from "@/pages/user/AgriculturalTrends";
import ViewSubcommunity from "@/pages/shared/ViewSubcommunity";
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";

const UserRoutes = () => {
  const [auth] = useAuth();
  const isAdmin = auth?.user.role === "admin";

  const { data: events, refetch: refetchEvents } = useFetch<IEvent[]>({
    queryKey: "events",
    url: "/events",
    enabled: true,
  });

  const [allEvents, setAllEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    if (events) {
      setAllEvents(events);
    }
  }, [events]);

  return (
    <>
      <Route path="user" element={<UserDashboardLayout />}>
        <Route
          path="settings"
          element={
            auth ? (
              <Settings />
            ) : (
              <Navigate
                to={`/login?redirect=${isAdmin ? "/admin/settings" : "/user/settings"}`}
              />
            )
          }
        />
        <Route path="feed" element={<Feed />} />
        <Route path="topics" element={<Topics />} />
        <Route path="marketplace" element={<MarketPlace />} />
        <Route
          path="marketplace/my-items"
          element={
            auth ? (
              <MyItemsMarketPlace />
            ) : (
              <Navigate to={`/login?redirect=/user/marketplace/my-items`} />
            )
          }
        />
        <Route path="events" element={<Events />} />
        <Route
          path="events/my-events"
          element={
            auth ? (
              <MyEvents events={allEvents} refetchEvents={refetchEvents} />
            ) : (
              <Navigate to={`/login?redirect=/user/events/my-events`} />
            )
          }
        />
        <Route path="events/:slug" element={<EventDetails />} />
        <Route path="appointments" element={<Appointments />} />
        <Route
          path="appointments/my-appointments"
          element={
            auth ? (
              <MyAppointments />
            ) : (
              <Navigate to="/login?redirect=/user/appointments/my-appointments" />
            )
          }
        />
        <Route
          path="appointments/bookings/:appointmentId"
          element={
            auth ? (
              <BookAppointment />
            ) : (
              <Navigate to="/login?redirect=/user/appointments/bookings/:appointmentId" />
            )
          }
        />
        <Route path="subcommunities" element={<Subcommunities />} />
        <Route path="subcommunities/:slug" element={<ViewSubcommunity />} />
        <Route path="agriculture-trends" element={<AgriculturalTrends />} />
      </Route>
    </>
  );
};

export default UserRoutes;
