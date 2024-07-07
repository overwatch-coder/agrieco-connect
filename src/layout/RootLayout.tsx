import ContextProvider from "@/providers/ContextProvider";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <ContextProvider>
      <section>
        <Outlet />
      </section>
    </ContextProvider>
  );
};

export default RootLayout;
