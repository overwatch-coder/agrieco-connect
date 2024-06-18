import DashboardMobile from "@/components/shared/DashboardMobile";
import { Settings, Bell } from "lucide-react";
import { AiOutlineUserAdd, AiOutlineSearch } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

const DashboardHeader = () => {
  const pathname = useLocation().pathname;

  return (
    <header className="border-primary-brown z-50 w-full px-4 py-3 bg-white border-b-2">
      <div className="relative flex items-center justify-between">
        <h2 className="md:text-2xl text-primary-brown text-xl font-bold capitalize">
          {"Dashboard"}
        </h2>

        {/* MobileNav */}
        <div className="md:hidden">
          <DashboardMobile />
        </div>

        <ul className="md:flex items-center hidden gap-5">
          <Link
            to={"/dashboard/help"}
            className="hover:scale-105 bg-secondary-gray/10 flex flex-col items-center p-4 transition rounded-full"
          >
            <AiOutlineSearch
              size={20}
              className={
                pathname === "/dashboard/help"
                  ? "text-primary-green"
                  : "text-primary-brown"
              }
            />
          </Link>

          <Link
            to={"/dashboard/help"}
            className="hover:scale-105 bg-secondary-gray/10 flex flex-col items-center p-4 transition rounded-full"
          >
            <AiOutlineUserAdd
              size={20}
              className={
                pathname === "/dashboard/help"
                  ? "text-primary-green"
                  : "text-primary-brown"
              }
            />
          </Link>

          <Link
            to={"/dashboard/notifications"}
            className="hover:scale-105 bg-secondary-gray/10 relative flex flex-col items-center p-4 transition rounded-full"
          >
            <Bell
              size={20}
              className={
                pathname === "/dashboard/notifications"
                  ? "text-primary-green"
                  : "text-primary-brown"
              }
            />
            <span className="absolute top-0 right-0 flex flex-col items-center w-5 h-5 text-sm text-center text-white bg-red-500 rounded-full">
              4
            </span>
          </Link>

          <Link
            to={"/dashboard/settings"}
            className="hover:scale-105 bg-secondary-gray/10 flex flex-col items-center p-4 transition rounded-full"
          >
            <Settings
              size={20}
              className={
                pathname === "/dashboard/settings"
                  ? "text-primary-green"
                  : "text-primary-brown"
              }
            />
          </Link>

          <div className="bg-secondary-gray/10 flex items-center gap-3 px-3 py-1 rounded-md">
            <img
              src={"/images/avatar.png"}
              alt="avatar"
              className="object-contain w-10 h-10 rounded-full"
            />
            <p className="text-primary-brown flex flex-col gap-1">
              <span className="font-bold capitalize">{"Josepine Ekhator"}</span>
              <span className="text-secondary-gray text-sm font-normal">
                {"Admin"}
              </span>
            </p>
          </div>
        </ul>
      </div>
    </header>
  );
};

export default DashboardHeader;
