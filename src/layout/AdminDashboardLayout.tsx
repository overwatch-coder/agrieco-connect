import { Outlet } from "react-router-dom";
import AdminDashboardSidebar from "@/components/AdminDashboardSidebar";
import DashboardHeader from "@/components/shared/DashboardHeader";

const AdminDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminDashboardSidebar />

      <section className="md:ml-16 lg:ml-60 flex flex-col flex-grow min-h-screen">
        {/* Dashboard Header */}
        <DashboardHeader />
        {/* Main Content */}
        <main className="w-full px-4 mb-auto">
          <Outlet />
        </main>
        {/* Footer */}
        <footer className="text-primary-green px-4 pt-5 pb-5 text-sm font-medium">
          &copy; copyright agrieco-connect {new Date().getFullYear()} All rights
          reserved.
        </footer>
      </section>
    </div>
  );
};

export default AdminDashboardLayout;
