import AboutUsMobileNav from "@/components/shared/AboutUsMobileNav";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [auth] = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const isAdmin = auth?.email.startsWith("admin");

  // change header background color onscroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-screen fixed flex top-0 left-0 z-50 items-center justify-between py-3 px-5 lg:px-16 xl:px-24 2xl:px-40 overflow-x-hidden transition-colors duration-300 ${
        scrolled ? "bg-white" : "bg-transparent"
      }`}
    >
      <Link to={"/"} className="flex items-center gap-2">
        <img
          src={scrolled ? "/icons/logo-brown.svg" : "/icons/logo-white.svg"}
          alt="Logo"
          width={30}
          height={30}
        />

        <h1 className="text-primary-green sm:text-2xl flex items-center text-lg font-bold">
          <span className={scrolled ? "text-primary-brown" : "text-white"}>
            Agri
          </span>
          eco-Connect
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <nav className="lg:flex items-center hidden gap-5">
        {navLinks.map((item, index) => {
          return (
            <Link
              key={index}
              to={item.path}
              className={`${scrolled ? "text-primary-brown" : "text-white"} ${item.path === "/about-us" ? "font-bold" : "font-medium"} capitalize hover:text-primary-green`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <Link
        to={auth ? (isAdmin ? "/admin/dashboard" : "/user/feed") : "/login"}
      >
        <Button
          className={`bg-primary-brown hover:bg-primary-brown hidden lg:block px-10 py-2 text-center text-white border-2 border-white rounded-none`}
        >
          {!auth ? "Login" : "Dashboard"}
        </Button>
      </Link>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <AboutUsMobileNav scrolled={scrolled} isAdmin={isAdmin} />
      </div>
    </header>
  );
};

export default Header;
