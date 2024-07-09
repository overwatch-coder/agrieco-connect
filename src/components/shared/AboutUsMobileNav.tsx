import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { navLinks } from "@/constants";
import { Button } from "@/components/ui/button";

type AboutUsMobileNavProps = {
  scrolled: boolean;
  isAdmin: boolean | undefined;
};

const AboutUsMobileNav = ({ scrolled, isAdmin }: AboutUsMobileNavProps) => {
  const [auth] = useAuth();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu
          size={25}
          className={scrolled ? "text-primary-brown" : "text-white"}
        />
      </SheetTrigger>

      <SheetContent className="bg-primary-brown flex flex-col min-h-screen px-3 pt-10 pb-5 text-white">
        <SheetHeader className="flex flex-col gap-5">
          <SheetTitle className="flex flex-col gap-3 py-3">
            <Link
              to={"/about-us"}
              className="flex items-end justify-center gap-2"
            >
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

          <SheetDescription className="flex flex-col gap-10">
            {navLinks.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={"text-black capitalize py-3 px-4 w-full bg-white"}
                >
                  {item.name}
                </Link>
              );
            })}

            <Link
              to={
                auth ? (isAdmin ? "/admin/dashboard" : "/user/feed") : "/login"
              }
              className="flex-grow mt-auto"
            >
              <Button
                className={`bg-primary-green hover:bg-primary-green px-10 w-full py-2 text-center text-white border-2 border-white rounded-none`}
              >
                {!auth ? "Login" : isAdmin ? "Dashboard" : "Feed"}
              </Button>
            </Link>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AboutUsMobileNav;
