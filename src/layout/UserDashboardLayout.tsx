import { Outlet } from "react-router-dom";
import DashboardHeader from "@/components/shared/DashboardHeader";
import UserDashboardSidebar from "@/components/UserDashboardSidebar";

const UserDashboardLayout = () => {
  return (
    <section>
      {/* Dashboard Header */}
      <DashboardHeader />

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <UserDashboardSidebar />

        {/* Main Content */}
        <section className="lg:ml-60 flex flex-col flex-grow min-h-screen ml-16">
          <main className="w-full px-4 mb-auto">
            <Outlet />
          </main>

          {/* Footer */}
          <footer className="text-primary-green px-4 pb-5 text-sm font-medium">
            &copy; {new Date().getFullYear()} campusguardian. All rights
            reserved.
          </footer>
        </section>
      </div>
    </section>
  );
};

export default UserDashboardLayout;
