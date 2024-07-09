import Logout from "@/components/shared/Logout";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { userDashboardLinks } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { CgMenuLeftAlt } from "react-icons/cg";
import { useLocation, Link } from "react-router-dom";

const UserSidebarMobile = () => {
  const pathname = useLocation().pathname;
  const [auth] = useAuth();

  return (
    <Sheet>
      <SheetTrigger>
        <CgMenuLeftAlt size={25} className="text-secondary-gray" />
      </SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col gap-5 bg-white">
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

        {/* Dashboard Menu Items */}
        <ul className="flex flex-col flex-1 gap-6 pt-5 mb-auto text-sm">
          {userDashboardLinks.map((link, index) => {
            const activePath = pathname.startsWith(link.path);
            return (
              <SheetClose asChild key={index}>
                <Link
                  key={index}
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
                  <span>{link.name}</span>
                </Link>
              </SheetClose>
            );
          })}

          <div className="mt-auto">
            {!auth && (
              <Link to={`/login`} className="flex items-center">
                <Button className="bg-primary-brown hover:bg-primary-brown w-full px-10 py-3 text-white rounded-none">
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

export default UserSidebarMobile;
