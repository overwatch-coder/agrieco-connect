import { Outlet } from "react-router-dom";
import DashboardHeader from "@/components/shared/DashboardHeader";
import UserDashboardSidebar from "@/components/UserDashboardSidebar";

const UserDashboardLayout = () => {
  return (
    <section className="flex flex-col min-h-screen">
      {/* Dashboard Header */}
      <DashboardHeader />

      <div className="flex w-full min-h-screen">
        {/* Sidebar */}
        <UserDashboardSidebar />

        {/* Main Content */}
        <section className="lg:ml-60 relative flex flex-col flex-grow min-h-screen mt-24 ml-16">
          <main className="ps-1 md:ps-4 relative w-full h-full mb-auto">
            <Outlet />
          </main>
        </section>
      </div>
    </section>
  );
};

export default UserDashboardLayout;
