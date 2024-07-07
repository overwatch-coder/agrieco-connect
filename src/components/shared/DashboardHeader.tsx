import { useEffect, useState } from "react";
import Notifications from "@/components/Notifications";
import AdminSidebarMobile from "@/components/shared/AdminSidebarMobile";
import DashboardMobile from "@/components/shared/DashboardMobile";
import UserSidebarMobile from "@/components/shared/UserSidebarMobile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { Settings } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddUser from "@/components/shared/AddUser";
import SearchBox from "@/components/shared/SearchBox";
import { UrlPath } from "@/lib/utils";

const DashboardHeader = () => {
  const [auth] = useAuth();
  const isUser = !auth?.email.toLowerCase().startsWith("admin");
  const pathname = useLocation().pathname;

  const [headerName, setHeaderName] = useState("Dashboard");

  useEffect(() => {
    setHeaderName(pathname.split("/")[2].split("-").join(" "));
  }, [pathname]);

  return (
    <header
      className={`${
        isUser
          ? "border-b-secondary-gray fixed top-0 left-0 right-0"
          : "border-b-primary-brown"
      }  z-50 w-full px-4 py-3 bg-white border-b-2`}
    >
      <div className="relative flex items-center justify-between">
        {/* MobileNav */}
        {isUser && (
          <div className="md:hidden">
            <UserSidebarMobile />
          </div>
        )}

        {!isUser && (
          <div className="md:hidden">
            <AdminSidebarMobile />
          </div>
        )}

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
            <p className="capitalize">
              {headerName.toLowerCase() === "admin" ? "Dashboard" : headerName}
            </p>
          )}
        </h2>

        {/* MobileNav */}
        <div className="md:hidden">
          <DashboardMobile />
        </div>

        <ul className="md:flex items-center hidden gap-5">
          <SearchBox />

          <AddUser />

          <Notifications />

          <Link
            to={`/${UrlPath()}/settings`}
            className="hover:scale-105 bg-secondary-gray/10 flex flex-col items-center p-4 transition rounded-full"
          >
            <Settings
              size={20}
              className={
                pathname === `/${UrlPath()}/settings`
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
            <UserProfile />

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

export const UserProfile = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <img
            src={"/images/avatar.png"}
            alt="avatar"
            className="object-contain w-10 h-10 overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem
          onClick={() => navigate(`/${UrlPath()}/settings`)}
          className="cursor-pointer"
        >
          Settings
        </DropdownMenuItem> */}
        <DropdownMenuItem className="cusror-pointer">Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cusror-pointer">Report</DropdownMenuItem>
        {/* <p className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground">
          <Logout headerLogout={true} />
        </p> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
