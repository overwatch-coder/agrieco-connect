import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-end flex-1 w-full max-w-2xl px-5 pb-10 mx-auto">
      <div className="flex flex-col items-center gap-5 text-center">
        <p className="text-primary-yellow font-medium">
          Connecting Farmers, Experts, and Communities for a Sustainable Future
        </p>
        <h2 className="md:text-2xl xl:text-3xl text-xl font-semibold text-white">
          Empowering agricultural innovation and collaboration across Nigeria
          and beyond.
        </h2>
        <p className="text-sm font-bold text-white">
          Fostering growth through knowledge, technology, and community.
        </p>

        <Link to="#">
          <Button className="hover:bg-tranparent hover:border-white px-10 py-3 text-center text-white bg-transparent border-2 border-white rounded-none">
            Join Our Community
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
