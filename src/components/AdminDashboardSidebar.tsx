import { Link, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import Logout from "@/components/shared/Logout";
import { adminDashboardLinks } from "@/constants";
const AdminDashboardSidebar = () => {
  const pathname = useLocation().pathname;

  return (
    <div className="bg-primary-brown scrollbar-hide pb-7 lg:w-60 lg:items-start fixed top-0 left-0 flex flex-col items-center w-16 h-full gap-3 px-5 overflow-y-scroll">
      <div className="flex flex-col gap-3 pt-10 pb-5">
        <Link to={"/"} className="flex items-end gap-1 pb-2">
          <img
            src="/icons/logo-white.svg"
            alt="agrieco-connect logo"
            className="object-contain w-10 h-10"
          />
          <p className="lg:block hidden text-lg font-extrabold text-white">
            Agri<span className="text-primary-green">eco-Connect</span>
          </p>
        </Link>
        <Separator className="my-1 bg-white" />
      </div>

      {/* Dashboard Menu Items */}
      <ul className="flex flex-col gap-6 mb-auto text-sm">
        {adminDashboardLinks.map((link, index) => {
          const activePath = pathname.startsWith(link.path);
          return (
            <Link
              key={index}
              to={link.path}
              className={`${
                activePath
                  ? "bg-white text-primary-brown rounded"
                  : "hover:rounded text-white hover:bg-white hover:text-primary-brown"
              } px-4 py-2 font-semibold hover:scale-105 transition flex items-center gap-3 group`}
            >
              <link.icon
                size={20}
                className={`${
                  activePath
                    ? "text-primary-brown"
                    : "group-hover:text-primary-brown text-white"
                }`}
              />
              <span className="lg:block hidden">{link.name}</span>
            </Link>
          );
        })}
      </ul>

      <Logout />
    </div>
  );
};

export default AdminDashboardSidebar;
