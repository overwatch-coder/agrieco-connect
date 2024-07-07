import UserManagementTable from "@/components/admin/UserManagementTable";
import { recentActivities, reports } from "@/constants";
import { Calendar, CalendarRange, Trash2, UserRoundCheck } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { GoPeople } from "react-icons/go";
import { GrPowerCycle } from "react-icons/gr";
import { IoCheckboxOutline } from "react-icons/io5";
import { userManagement } from "@/constants";

export type UserManagement = (typeof userManagement)[number];

const Dashboard = () => {
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
          Welcome Josephine
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
            <p className="text-2xl font-bold text-black">{100}</p>
            <p className="text-primary-brown text-sm font-medium">
              Total Users
            </p>
          </div>
          <GoPeople size={30} className="text-primary-green" />
        </div>

        <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-bold text-black">{200}</p>
            <p className="text-primary-brown text-sm font-medium">
              Sub Communities
            </p>
          </div>
          <GoPeople size={30} className="text-primary-green" />
        </div>

        <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-bold text-black">{250}</p>
            <p className="text-primary-brown text-sm font-medium">Events</p>
          </div>
          <CalendarRange size={30} className="text-primary-green" />
        </div>

        <div className="rounded-xl bg-primary-brown 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5">
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-bold text-white">{150}</p>
            <p className="text-sm font-medium text-white">Total Experts</p>
          </div>
          <UserRoundCheck size={30} className="text-primary-green" />
        </div>
      </section>

      {/* User Management, Recent Activities & Reports */}
      <section className="md:grid-cols-3 grid w-full grid-cols-1 gap-5">
        {/* User Management */}
        <div className="md:col-span-2 flex flex-col w-full h-full col-span-1 gap-5 bg-white rounded-md shadow">
          <h2 className="flex items-center justify-between gap-2 px-5 py-3">
            <span className="text-primary-brown font-medium">
              User Management
            </span>
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          {/* User List */}
          <UserManagementTable users={userManagement} />
        </div>

        <div className="flex flex-col w-full col-span-1 gap-5">
          {/* Recent Activities */}
          <div>
            <div className="md:col-span-2 w-full h-full col-span-1 bg-white rounded-md shadow">
              <h2 className="flex items-center justify-between gap-2 px-3 py-3">
                <span className="text-secondary-gray font-medium">
                  Recent Activities
                </span>
                <p className="flex items-center gap-4">
                  <GrPowerCycle
                    size={20}
                    className="text-red-500 cursor-pointer"
                  />

                  <Trash2
                    size={20}
                    className="text-primary-green cursor-pointer"
                  />
                </p>
              </h2>

              <hr className="w-full bg-secondary-gray h-0.5" />

              <div className="flex flex-col gap-3 px-3 py-5">
                {recentActivities.slice(0, 5).map((activity, idx) => (
                  <div
                    key={idx}
                    className="text-secondary-gray flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <IoCheckboxOutline size={22} className="text-black" />

                        <div className="flex flex-col gap-2">
                          <h3 className="2xl:text-base text-xs font-semibold">
                            {activity.title}
                          </h3>
                          <p className="2xl:text-sm text-xs font-light opacity-50">
                            {activity.description}
                          </p>

                          <p className="sm:hidden text-xs font-semibold text-red-300">
                            {activity.timeAgo}
                          </p>
                        </div>
                      </div>

                      <p className="sm:block 2xl:text-sm hidden text-xs font-semibold text-red-300">
                        {activity.timeAgo}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reports */}
          <div>
            <div className="md:col-span-2 w-full h-full col-span-1 bg-white rounded-md shadow">
              <h2 className="flex items-center justify-between gap-2 px-3 py-3">
                <span className="text-secondary-gray font-medium">
                  Recent Activities
                </span>
                <p className="flex items-center gap-2">
                  <GrPowerCycle
                    size={20}
                    className="text-red-500 cursor-pointer"
                  />
                </p>
              </h2>
              <hr className="w-full bg-secondary-gray h-0.5" />

              <div className="flex flex-col gap-3 px-3 py-5">
                {reports.slice(0, 6).map((report, idx) => (
                  <div
                    key={idx}
                    className="text-secondary-gray flex flex-col gap-3"
                  >
                    <h3 className="2xl:text-base text-sm font-semibold">
                      {report.title}
                    </h3>
                    <p className="2xl:text-sm text-xs font-light opacity-50">
                      {report.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
