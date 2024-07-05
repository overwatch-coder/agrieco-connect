import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "react-router-dom";
import Notifications from "@/components/Notifications";
import { UserProfile } from "@/components/shared/DashboardHeader";
import AddUser from "@/components/shared/AddUser";
import SearchBox from "@/components/shared/SearchBox";

const DashboardMobile = () => {
  const pathname = useLocation().pathname;
  const firstPath = pathname.split("/")[1] === "user" ? "user" : "admin";

  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={25} className="text-secondary-gray" />
      </SheetTrigger>

      <SheetContent className="bg-primary-brown flex flex-col min-h-screen px-3 pt-10 pb-5 text-white">
        <SheetHeader className="mb-auto">
          <SheetTitle className="flex flex-col gap-3 py-5">
            <Link to={"/"} className="flex items-end justify-center gap-2">
              <img
                src="/icons/logo-white.svg"
                alt="agrieco-connect logo"
                className="object-contain w-10 h-10"
              />
              <p className="text-xl font-bold text-white">
                Agri<span className="text-primary-green">eco-Connect</span>
              </p>
            </Link>

            <Separator className="my-1 bg-white" />
          </SheetTitle>

          <SheetDescription>
            {/* Dashboard Menu Items */}
            <div className="flex flex-col gap-6 mb-auto">
              <SearchBox />

              <AddUser />

              <Notifications />

              <Link
                to={`/${firstPath}/settings`}
                className="hover:scale-105 bg-white/30 flex items-center gap-3 p-4 transition rounded"
              >
                <Settings
                  size={20}
                  className={`${
                    pathname === `/${firstPath}/settings`
                      ? "text-primary-green"
                      : "text-white"
                  }`}
                />
                <span
                  className={`${
                    pathname === `/${firstPath}/settings`
                      ? "text-primary-green"
                      : "text-white"
                  } text-base`}
                >
                  Settings
                </span>
              </Link>
            </div>
          </SheetDescription>
        </SheetHeader>

        <div className="bg-white/40 flex items-center gap-5 px-2 py-3 rounded-md">
          <UserProfile />
          <p className="flex flex-col gap-1 text-white">
            <span className="text-lg font-medium capitalize">
              {"Josepine Ekhator"}
            </span>
            <span className="text-white/70 text-base font-normal">
              {firstPath === "user" ? "User" : "Admin"}
            </span>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardMobile;
