import UserManagementTable from "@/components/admin/UserManagementTable";
import { Helmet } from "react-helmet-async";
import { GoPeople } from "react-icons/go";
import { userManagement } from "@/constants";
import { RiChatQuoteLine } from "react-icons/ri";

export type UserManagement = (typeof userManagement)[number];

const UserManagement = () => {
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
            <p className="text-2xl font-bold text-black">{200}</p>
            <p className="text-primary-brown text-sm font-medium">
              Total Users
            </p>
          </div>
          <GoPeople size={30} className="text-primary-green" />
        </div>

        <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-bold text-black">{120}</p>
            <p className="text-primary-brown text-sm font-medium">
              Active Users
            </p>
          </div>
          <GoPeople size={30} className="text-primary-green" />
        </div>

        <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-bold text-black">{70}</p>
            <p className="text-primary-brown text-sm font-medium">New Users</p>
          </div>
          <GoPeople size={30} className="text-primary-green" />
        </div>

        <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-bold text-black">{4.5}</p>
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
