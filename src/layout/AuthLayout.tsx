import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <section className="flex flex-col min-h-screen">
      <Outlet />
    </section>
  );
};
