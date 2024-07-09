import Header from "@/components/shared/Header";
import Hero from "@/components/shared/Hero";

const HeroLayout = () => {
  return (
    <div className="bg-cover-image bg-origin-content md:h-screen flex flex-col h-[70vh] gap-5 -mt-3 bg-top bg-no-repeat bg-cover 2xl:-mt-5">
      <Header />
      <Hero />
    </div>
  );
};

export default HeroLayout;
