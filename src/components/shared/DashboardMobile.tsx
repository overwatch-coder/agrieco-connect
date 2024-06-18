import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Settings, Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AiOutlineUserAdd, AiOutlineSearch } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import Notifications from "@/components/Notifications";

const DashboardMobile = () => {
  const pathname = useLocation().pathname;

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
              <Link
                to={"/dashboard/search"}
                className="hover:scale-105 bg-white/30 flex items-center gap-3 p-4 transition rounded"
              >
                <AiOutlineSearch
                  size={20}
                  className={`${
                    pathname === "/dashboard/search"
                      ? "text-primary-green"
                      : "text-white"
                  }`}
                />
                <span
                  className={`${
                    pathname === "/dashboard/search"
                      ? "text-primary-green"
                      : "text-white"
                  } text-base`}
                >
                  Search
                </span>
              </Link>

              <Link
                to={"/dashboard/add-new"}
                className="hover:scale-105 bg-white/30 flex items-center gap-3 p-4 transition rounded"
              >
                <AiOutlineUserAdd
                  size={20}
                  className={`${
                    pathname === "/dashboard/add-new"
                      ? "text-primary-green"
                      : "text-white"
                  }`}
                />
                <span
                  className={`${
                    pathname === "/dashboard/add-new"
                      ? "text-primary-green"
                      : "text-white"
                  } text-base`}
                >
                  Add New
                </span>
              </Link>

              <Notifications />

              <Link
                to={"/dashboard/settings"}
                className="hover:scale-105 bg-white/30 flex items-center gap-3 p-4 transition rounded"
              >
                <Settings
                  size={20}
                  className={`${
                    pathname === "/dashboard/settings"
                      ? "text-primary-green"
                      : "text-white"
                  }}`}
                />
                <span
                  className={`${
                    pathname === "/dashboard/settings"
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
          <img
            src={"/images/avatar.png"}
            alt="avatar"
            className="object-contain w-10 h-10 rounded-full"
          />
          <p className="flex flex-col gap-1 text-white">
            <span className="text-lg font-medium capitalize">
              {"Josepine Ekhator"}
            </span>
            <span className="text-white/70 text-base font-normal">
              {"Admin"}
            </span>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardMobile;
