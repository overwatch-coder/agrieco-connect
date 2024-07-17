import UserManagementTable from "@/components/admin/UserManagementTable";
import { Helmet } from "react-helmet-async";
import { GoPeople } from "react-icons/go";
import { userManagement } from "@/constants";
import { RiChatQuoteLine } from "react-icons/ri";
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import RenderContentLoading from "@/components/shared/RenderContentLoading";

export type UserManagement = (typeof userManagement)[number];

const UserManagement = () => {
  const { data: users, isLoading } = useFetch<IFeedUser[]>({
    queryKey: "users",
    url: "/users",
    enabled: true,
  });
  const [usersData, setUsersData] = useState<IFeedUser[]>([]);

  useEffect(() => {
    if (users) {
      setUsersData(users);
    }
  }, [users]);

  if (isLoading) {
    return <RenderContentLoading />;
  }

  if (!users) {
    return (
      <RenderContentLoading>
        <div className="flex flex-col items-center justify-center gap-5 mx-auto">
          <p className="text-primary-brown text-base">
            Sorry, we couldn't find any users. Please try again later.
          </p>
        </div>
      </RenderContentLoading>
    );
  }

  return (
    <div className="flex flex-col gap-5 py-6">
      {/* Title */}
      <Helmet>
        <title>User Management - Agrieco-Connect </title>
        <meta
          name="description"
          content="Manage all the activities of the users"
        />
      </Helmet>

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
              {Math.floor(Math.random() * usersData.length)}
            </p>
            <p className="text-primary-brown text-sm font-medium">
              Active Users
            </p>
          </div>
          <GoPeople size={30} className="text-primary-green" />
        </div>

        <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-bold text-black">
              {Math.floor(Math.random() * usersData.length)}
            </p>
            <p className="text-primary-brown text-sm font-medium">New Users</p>
          </div>
          <GoPeople size={30} className="text-primary-green" />
        </div>

        <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-bold text-black">
              {(Math.random() * 5).toFixed(1)}
            </p>
            <p className="text-primary-brown text-sm font-medium">
              User Feedback
            </p>
          </div>
          <RiChatQuoteLine size={30} className="text-primary-green" />
        </div>
      </section>

      {/* User Management, Recent Activities & Reports */}
      <section className="grid w-full grid-cols-1 gap-5">
        {/* User Management */}
        <div className="flex flex-col w-full h-full col-span-1 gap-5 bg-white rounded-md shadow">
          <h2 className="flex items-center justify-between gap-2 px-5 py-3">
            <span className="text-primary-brown font-medium">
              User Management
            </span>
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          {/* User List */}
          <UserManagementTable users={userManagement} />
        </div>
      </section>
    </div>
  );
};

export default UserManagement;
