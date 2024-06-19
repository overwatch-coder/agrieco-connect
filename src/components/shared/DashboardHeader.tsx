import Notifications from "@/components/Notifications";
import DashboardMobile from "@/components/shared/DashboardMobile";
import { useAuth } from "@/hooks/useAuth";
import { Settings, Bell } from "lucide-react";
import { AiOutlineUserAdd, AiOutlineSearch } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

const DashboardHeader = () => {
  const [auth] = useAuth();
  const isUser = auth?.email !== "Sincere@april.biz";
  const pathname = useLocation().pathname;

  return (
    <header
      className={`${
        isUser
          ? "border-b-secondary-gray fixed top-0 left-0 right-0"
          : "border-b-primary-brown"
      }  z-50 w-full px-4 py-3 bg-white border-b-2`}
    >
      <div className="relative flex items-center justify-between">
        <h2 className="md:text-2xl text-primary-brown text-xl font-bold capitalize">
          {isUser ? (
            <Link to="/" className="flex items-center gap-1">
              <img
                src="/icons/logo-brown.svg"
                alt="Agrieco-Connect"
                className="object-contain w-10 h-10"
              />
              <h1 className="text-primary-green md:text-2xl text-xl font-extrabold">
                <span className="text-primary-brown">Agri</span>eco-Connect
              </h1>
            </Link>
          ) : (
            "Dashboard"
          )}
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

          <Notifications />

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

          <div
            className={`${
              isUser ? "bg-transparent" : "bg-secondary-gray/10"
            } flex items-center gap-3 px-3 py-1 rounded-md cursor-pointer`}
          >
            <img
              src={"/images/avatar.png"}
              alt="avatar"
              className="object-contain w-10 h-10 rounded-full"
            />

            {!isUser && (
              <p className="text-primary-brown flex flex-col gap-1">
                <span className="font-bold capitalize">
                  {"Josepine Ekhator"}
                </span>
                <span className="text-secondary-gray text-sm font-normal">
                  {"Admin"}
                </span>
              </p>
            )}
          </div>
        </ul>
      </div>
    </header>
  );
};

export default DashboardHeader;
