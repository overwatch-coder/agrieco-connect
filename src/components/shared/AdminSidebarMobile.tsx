import Logout from "@/components/shared/Logout";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { adminDashboardLinks } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { CgMenuLeftAlt } from "react-icons/cg";
import { useLocation, Link } from "react-router-dom";

const AdminSidebarMobile = () => {
  const pathname = useLocation().pathname;
  const [auth] = useAuth();

  return (
    <Sheet>
      <SheetTrigger>
        <CgMenuLeftAlt size={25} className="text-secondary-gray" />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="bg-primary-brown scrollbar-hide flex flex-col gap-5 overflow-y-scroll"
      >
        <div className="flex flex-col gap-3 pt-8 pb-5">
          <Link to={"/about-us"} className="flex items-end gap-1 pb-2">
            <img
              src="/icons/logo-white.svg"
              alt="agrieco-connect logo"
              className="object-contain w-10 h-10"
            />
            <p className="text-lg font-extrabold text-white">
              Agri<span className="text-primary-green">eco-Connect</span>
            </p>
          </Link>
          <hr />
        </div>

        {/* Dashboard Menu Items */}
        <ul className="gap-7 flex flex-col flex-1 mb-auto text-sm">
          {adminDashboardLinks.map((link, index) => {
            const activePath = pathname.startsWith(link.path);
            return (
              <SheetClose asChild key={index}>
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
                  <span>{link.name}</span>
                </Link>
              </SheetClose>
            );
          })}

          <div className="flex flex-col gap-3 mt-auto">
            {!auth && (
              <Link to={`/login`} className="flex items-center">
                <Button className="hover:bg-white text-primary-brown w-full px-10 py-3 bg-white rounded-none">
                  Login
                </Button>
              </Link>
            )}
            {auth && <Logout showLogoutName />}
          </div>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default AdminSidebarMobile;
