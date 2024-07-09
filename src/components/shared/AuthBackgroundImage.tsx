import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AuthBackgroundImage = () => {
  return (
    <section className="bg-login-bg flex flex-col w-full min-h-screen col-span-1 p-5 bg-center bg-no-repeat bg-cover">
      <Link to={"/about-us"} className="flex items-center gap-2">
        <img
          src="/icons/logo-white.svg"
          alt="Agrieco-Connect"
          className="w-12 h-12"
        />
        <h1 className="text-primary-green md:text-3xl text-xl font-extrabold">
          <span className="text-white">Agri</span>eco-Connect
        </h1>
      </Link>

      {/* Bottom Content */}
      <div className="md:max-w-xs flex flex-col w-full gap-5 mt-auto">
        <p className="font-normal text-white">
          Empowering Nigerian Agriculture Community through Innovation and
          Collaboration
        </p>

        <Link to={"/about-us"}>
          <Button className="hover:bg-transparent border-primary-green md:w-fit hover:scale-105 flex items-center justify-center w-full gap-2 px-6 py-6 transition bg-transparent border-2 rounded-none">
            <span className="font-bold text-white">Discover More</span>
            <ArrowRight size={20} className="text-white" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default AuthBackgroundImage;
