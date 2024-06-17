import React from "react";
import { Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md">
          <div className="p-6 rounded-lg shadow-xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
