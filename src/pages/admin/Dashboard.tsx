import UserManagementTable from "@/components/admin/UserManagementTable";
import { Calendar, CalendarRange, UserRoundCheck } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { GoPeople } from "react-icons/go";
import { userManagement } from "@/constants";
import DashboardEventCategoriesChart from "@/components/admin/DashboardEventCategoriesChart";
import DashboardUserAnalyticsChart from "@/components/admin/DashboardUserAnalyticsChart";
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export type UserManagement = (typeof userManagement)[number];

const Dashboard = () => {
  const [auth] = useAuth();

  // === fetch data ===
  const { data: events } = useFetch<IEvent[]>({
    queryKey: "events",
    url: "/events",
    enabled: true,
  });

  const { data: users } = useFetch<IFeedUser[]>({
    queryKey: "users",
    url: "/users",
    enabled: true,
  });

  const { data: communities } = useFetch<ICommunity[]>({
    queryKey: "communities",
    url: "/communities",
    enabled: true,
  });

  // use state for data
  const [eventsData, setEventsData] = useState<IEvent[]>([]);
  const [usersData, setUsersData] = useState<IFeedUser[]>([]);
  const [communitiesData, setCommunitiesData] = useState<ICommunity[]>([]);

  // use effect to fetch data
  useEffect(() => {
    if (events) {
      setEventsData(events);
    }

    if (users) {
      setUsersData(users);
    }

    if (communities) {
      setCommunitiesData(communities);
    }
  }, [events, users, communities]);

  return (
    <div className="flex flex-col gap-5 py-6">
      {/* Title */}
      <Helmet>
        <title>Admin Dashboard - Agrieco-Connect </title>
        <meta name="description" content="Admin Dashboard" />
      </Helmet>

      {/* Header */}
      <section className="md:flex-row md:items-center md:justify-between flex flex-col items-start gap-5">
        <h1 className="text-primary-brown text-lg font-normal">
          Welcome {auth?.user?.fullname}
        </h1>
        <div className="rounded-xl border-secondary-gray flex items-center justify-center gap-2 px-5 py-2 border">
          <Calendar size={20} className="text-secondary-gray" />
          <p className="text-primary-brown text-sm">
            {new Date().toLocaleDateString("en", {
              dateStyle: "long",
            })}
          </p>
        </div>
      </section>

      {/* Analytics */}
      <section className="sm:grid-cols-2 lg:grid-cols-4 grid grid-cols-1 gap-10">
        <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-bold text-black">{usersData.length}</p>
            <p className="text-primary-brown text-sm font-medium">
              Total Users
            </p>
          </div>
          <GoPeople size={30} className="text-primary-green" />
        </div>

        <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-bold text-black">
              {communitiesData.length}
            </p>
            <p className="text-primary-brown text-sm font-medium">
              Sub Communities
            </p>
          </div>
          <GoPeople size={30} className="text-primary-green" />
        </div>

        <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-bold text-black">{eventsData.length}</p>
            <p className="text-primary-brown text-sm font-medium">Events</p>
          </div>
          <CalendarRange size={30} className="text-primary-green" />
        </div>

        <div className="rounded-xl bg-primary-brown 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5">
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-bold text-white">
              {Math.floor(Math.random() * usersData.length)}
            </p>
            <p className="text-sm font-medium text-white">Total Experts</p>
          </div>
          <UserRoundCheck size={30} className="text-primary-green" />
        </div>
      </section>

      {/* User Management, Event and User Analytics */}
      <section className="md:grid-cols-3 grid w-full grid-cols-1 gap-5">
        {/* User Management */}
        <div className="md:col-span-2 flex flex-col w-full h-full col-span-1 gap-5 bg-white rounded-md shadow">
          <h2 className="flex items-center justify-between gap-2 px-5 py-3">
            <span className="text-primary-brown font-medium">
              User Management
            </span>
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          {/* User Management */}
          <UserManagementTable users={userManagement} />
        </div>

        <div className="flex flex-col w-full col-span-1 gap-5">
          {/* Events (Categories) */}
          <div className="flex flex-col w-full h-full col-span-1 gap-5 bg-white rounded-md shadow">
            <h2 className="flex items-center justify-between gap-2 px-3 py-3">
              <span className="text-primary-brown font-medium">
                Events (Categories)
              </span>
            </h2>

            <hr className="w-full bg-secondary-gray h-0.5" />

            <div className="flex flex-col h-full gap-3 px-3 py-5">
              <DashboardEventCategoriesChart />
            </div>
          </div>

          {/* Users Analytics */}
          <div className="flex flex-col w-full h-full col-span-1 gap-5 bg-white rounded-md shadow">
            <h2 className="flex items-center justify-between gap-2 px-3 py-3">
              <span className="text-primary-brown font-medium">
                Users Analytics
              </span>
            </h2>
            <hr className="w-full bg-secondary-gray h-0.5" />

            <div className="flex flex-col h-full gap-3 px-3 py-5">
              <DashboardUserAnalyticsChart />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
