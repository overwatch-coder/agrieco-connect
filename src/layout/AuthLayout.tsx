import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <section className="flex flex-col h-screen">
      <Outlet />
    </section>
  );
};
