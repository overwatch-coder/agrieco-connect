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
  const isUser = auth?.user.role === "user";
  const pathname = useLocation().pathname;

  const [headerName, setHeaderName] = useState("Dashboard");

  useEffect(() => {
    setHeaderName(pathname.split("/")[2].split("-").join(" "));
  }, [pathname]);

  return (
    <header
      className={`${
        UrlPath() === "user"
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
            <Link to={"/about-us"} className="flex items-center gap-1">
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
          <SearchBox size={auth ? 20 : 15} />

          {!auth && (
            <Link to={`/login`} className="flex items-center">
              <Button className="bg-primary-green hover:bg-primary-green px-10 py-3 text-white rounded-none">
                Login
              </Button>
            </Link>
          )}

          {auth && (
            <>
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
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default DashboardHeader;

export const UserProfile = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
          aria-label="User Profile"
        >
          <img
            src={"/images/avatar.png"}
            alt="avatar"
            className="object-contain w-10 h-10 overflow-hidden rounded-full"
            loading="lazy"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigate("/about-us")}
          className="cursor-pointer"
        >
          About Us
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Report</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
