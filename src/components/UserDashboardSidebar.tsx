import { Link, useLocation } from "react-router-dom";
import Logout from "@/components/shared/Logout";
import { userDashboardLinks } from "@/constants";

const UserDashboardSidebar = () => {
  const pathname = useLocation().pathname;

  return (
    <div className="scrollbar-hide pb-7 lg:w-60 lg:items-start pt-28 fixed top-0 left-0 flex flex-col items-center w-16 h-full gap-3 px-5 overflow-y-scroll bg-white">
      {/* Dashboard Menu Items */}
      <ul className="flex flex-col gap-6 mb-auto text-sm">
        {userDashboardLinks.map((link) => {
          const activePath = pathname.startsWith(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`${
                activePath
                  ? "bg-primary-brown text-white rounded"
                  : "hover:rounded text-primary-brown hover:bg-primary-brown hover:text-white"
              } px-4 py-2 font-semibold hover:scale-105 transition flex items-center gap-3 group`}
            >
              <link.icon
                size={20}
                className={`${
                  activePath
                    ? "text-white"
                    : "group-hover:text-white text-primary-brown"
                }`}
              />
              <span className="lg:block hidden">{link.name}</span>
            </Link>
          );
        })}

        <Logout />
      </ul>
    </div>
  );
};

export default UserDashboardSidebar;
