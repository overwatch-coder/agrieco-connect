import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section className="flex flex-col min-h-screen">
      <Outlet />
    </section>
  );
};

export default AuthLayout;
