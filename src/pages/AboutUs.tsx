import ContactUsForm from "@/components/shared/ContactUsForm";
import Footer from "@/components/shared/Footer";
import TestimonialCarousel from "@/components/shared/TestimonialCarousel";
import { Button } from "@/components/ui/button";
import {
  aboutUsImages,
  whyChooseUs,
  aboutUsServices,
  aboutUsBenefits,
} from "@/constants";
import { useFetch } from "@/hooks/useFetch";
import HeroLayout from "@/layout/HeroLayout";
import { slugifyData } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  // Fetch data
  const { data: usersData } = useFetch<IFeedUser[]>({
    queryKey: "users",
    url: "/users",
  });

  const { data: eventsData } = useFetch<IEvent[]>({
    queryKey: "events",
    url: "/events",
  });
  const { data: marketplaceProductsData } = useFetch<IMarketPlace[]>({
    queryKey: "marketplace",
    url: "/marketplaces/items",
  });

  const [users, setUsers] = useState<IFeedUser[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [marketplaceProducts, setMarketplaceProducts] = useState<
    IMarketPlace[]
  >([]);

  useEffect(() => {
    if (usersData) {
      setUsers(usersData);
    }
    if (eventsData) {
      setEvents(eventsData);
    }
    if (marketplaceProductsData) {
      setMarketplaceProducts(marketplaceProductsData);
    }
  }, [eventsData, marketplaceProductsData, usersData]);

  const getUser = (id: number) => {
    return users.filter((user) => user.id === id)[0];
  };

  return (
    <section className="flex flex-col min-h-screen overflow-hidden">
      {/* Header */}
      <HeroLayout />

      {/* Main */}
      <main className="flex flex-col mb-auto">
        {/* About Us */}
        <section id="about-us" className="bg-primary-darkgreen">
          <div className="content flex flex-col gap-5 py-12">
            <h2 className="text-primary-yellow text-sm font-medium">
              About Us
            </h2>
            <section className="lg:grid-cols-2 grid grid-cols-1 gap-8">
              <h3 className="lg:text-3xl text-2xl font-bold text-white">
                Driving Sustainable Agricultural Growth and Community
                Empowerment Across Nigeria
              </h3>

              <p className="text-sm font-normal leading-relaxed text-white">
                Agrieco-Connect is dedicated to revolutionizing the agricultural
                landscape by connecting farmers, experts, and communities
                through innovative technology and collaborative efforts. Our
                platform serves as a hub for sharing knowledge, resources, and
                opportunities, fostering a supportive environment for
                sustainable farming practices and rural development.
              </p>
            </section>

            <section className="flex flex-wrap items-center justify-center gap-5 pt-5">
              {aboutUsImages.map(({ id, name, image }) => (
                <div key={id} className="flex flex-col items-center gap-2">
                  <img
                    src={image}
                    alt={name}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                  <h2 className="text-xs font-light text-center text-white">
                    {name}
                  </h2>
                </div>
              ))}
            </section>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why-choose-us" className="bg-black">
          <div className="content flex flex-col gap-5 py-16">
            <div className="md:grid-cols-2 2xl:gap-16 grid grid-cols-1 gap-8">
              <img
                src="/images/why-choose-us.png"
                alt="why choose us"
                width={1000}
                height={1000}
                className="object-cover w-full h-full"
              />

              <section className="flex flex-col gap-5">
                <h2 className="text-primary-yellow text-sm font-medium">
                  Why Choose Us
                </h2>

                <h3 className="md:text-2xl xl:text-3xl text-xl font-bold text-white">
                  Leading the Way in Sustainable Agriculture and Community
                  Empowerment
                </h3>

                <p className="text-sm font-normal leading-relaxed text-white">
                  At Agrieco-Connect, we are committed to transforming the
                  agricultural sector by providing unparalleled support,
                  resources, and opportunities for farmers and communities.Our
                  platform is designed to foster growth, innovation, and
                  collaboration, making us the trusted partner in your
                  agricultural journey.
                </p>

                <div className="gap-7 flex flex-col px-5">
                  {whyChooseUs.map(({ id, title }) => (
                    <div
                      key={id}
                      className="flex items-center gap-2 pb-2 border-b border-white"
                    >
                      <Plus size={20} className="text-white" />
                      <p className="font-medium text-white">{title}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>

        {/* Trusted By */}
        <section
          id="trusted-by"
          className="bg-forest-image bg-center bg-no-repeat bg-cover"
        >
          <div className="content flex flex-col gap-5 py-16">
            <div className="md:grid-cols-2 place-items-center grid grid-cols-1 gap-8">
              <h2 className="md:text-start md:text-3xl xl:text-4xl w-full text-2xl font-bold text-center text-white">
                Trusted By
              </h2>

              <div className="flex items-center gap-5">
                <img src="/icons/alu.svg" alt="alu" width={150} height={150} />

                <img
                  src="/icons/farm4me.svg"
                  alt="farm4me"
                  width={150}
                  height={150}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="bg-black">
          <div className="content flex flex-col gap-5 py-16">
            <div className="xl:grid xl:grid-cols-2 xl:place-items-center flex flex-col items-center gap-5">
              <section className="lg:items-center lg:text-center xl:text-start xl:items-start flex flex-col gap-5">
                <h2 className="text-primary-yellow text-sm font-medium">
                  Services
                </h2>

                <h3 className="md:text-2xl xl:text-3xl text-xl font-bold text-white">
                  Comprehensive Support for Every Aspect of Your Agricultural
                  Journey
                </h3>

                <p className="text-sm font-normal leading-relaxed text-white">
                  Agrieco-Connect is dedicated to providing a wide range of
                  services designed to empower farmers, foster innovation, and
                  enhance community collaboration. Our services are tailored to
                  meet the diverse needs of the agricultural community, ensuring
                  that you have the tools and support necessary for success.
                </p>
              </section>

              <section className="md:grid-cols-2 lg:grid-cols-3 grid grid-cols-1 gap-5">
                {aboutUsServices.map((service) => (
                  <div
                    key={service.id}
                    className="border-l-white/40 flex flex-col gap-5 px-4 py-5 border-t-4 border-b-4 border-l border-r-4 border-white"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      width={30}
                      height={30}
                    />

                    <h3 className="text-primary-yellow text-sm font-medium">
                      {service.title}
                    </h3>

                    <p className="text-xs font-normal leading-relaxed text-white">
                      {service.description}
                    </p>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </section>

        {/* Marketplace */}
        <section className="bg-primary-darkgreen" id="marketplace">
          <div className="content flex flex-col gap-5 py-16">
            <div className="xl:grid-cols-2 xl:place-items-center xl:grid xl:gap-10 flex flex-col-reverse gap-5">
              <section className="md:grid-cols-2 grid grid-cols-1 gap-10">
                {marketplaceProducts.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    className="border-l-white/40 flex flex-col w-full col-span-1 gap-5 px-4 py-5 border-t-4 border-b-4 border-l border-r-4 border-white xl:w-[250px]"
                  >
                    <div className="flex items-center gap-5">
                      <img
                        src={item.image ?? "/images/login-bg.png"}
                        alt-={item.name}
                        className="object-cover w-10 h-10 rounded-full"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/images/login-bg.png";
                        }}
                      />
                      <p className="flex items-center gap-1 text-xs">
                        <span className="text-primary-yellow font-normal">
                          Price:
                        </span>
                        <span className="text-white/50">{item.price}</span>
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h2 className="text-primary-yellow text-base font-medium">
                        {item.name}
                      </h2>

                      <p className="text-xs leading-normal text-white">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex flex-col w-full gap-3 mt-auto">
                      <button className="flex items-center gap-1 text-sm">
                        <span className="font-normal text-white">Seller:</span>
                        <span className="text-white">
                          {getUser(item.user_id).fullname}
                        </span>
                      </button>

                      <Link to={"/user/marketplace"}>
                        <Button className="bg-primary-brown hover:bg-primary-brown md:w-1/2 hover:scale-105 sm:w-fit w-full px-5 py-2 text-center text-white transition rounded-none">
                          Purchase
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </section>

              <section className="flex flex-col gap-5">
                <h2 className="text-primary-yellow text-sm font-medium">
                  Marketplace
                </h2>

                <h3 className="md:text-2xl xl:text-3xl text-xl font-bold text-white">
                  Your Gateway to Agricultural Products and Services
                </h3>

                <p className="text-sm font-normal leading-relaxed text-white">
                  Discover a dynamic marketplace where farmers, buyers, and
                  service providers connect to trade high-quality agricultural
                  products and essential services.
                </p>
              </section>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="bg-black">
          <div className="content flex flex-col gap-5 py-16">
            <div className="flex flex-col items-center gap-5">
              <section className="flex flex-col items-center gap-5">
                <h2 className="text-primary-yellow text-sm font-medium text-center">
                  Benefits
                </h2>

                <h3 className="md:text-2xl xl:text-3xl text-xl font-bold text-center text-white">
                  Unlock the Full Potential of Your Agricultural Endeavors
                </h3>
              </section>

              <section className="md:grid-cols-2 xl:grid-cols-4 grid grid-cols-1 gap-5 pt-5">
                {aboutUsBenefits.map((benefit) => (
                  <div
                    key={benefit.id}
                    className="border-l-white/40 flex flex-col gap-5 px-4 py-5 border-t-4 border-b-4 border-l border-r-4 border-white"
                  >
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      width={30}
                      height={30}
                    />

                    <h3 className="text-primary-yellow text-sm font-medium">
                      {benefit.title}
                    </h3>

                    <p className="text-xs font-normal leading-relaxed text-white">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          className="bg-forest-image bg-center bg-no-repeat bg-cover"
        >
          <div className="content flex flex-col gap-5 py-16">
            <div className="lg:max-w-2xl lg:mx-auto flex flex-col items-center gap-4 text-center">
              <h2 className="text-primary-yellow text-sm font-medium text-center">
                Testimonials
              </h2>

              <h3 className="md:text-2xl text-lg font-semibold text-white">
                Hear What Our Community Has to Say
              </h3>

              <TestimonialCarousel />
            </div>
          </div>
        </section>

        {/* Events */}
        <section id="events" className="bg-black">
          <div className="content flex flex-col gap-5 py-16">
            <div className="flex flex-col items-center gap-5">
              <section className="flex flex-col items-center gap-5">
                <h2 className="text-primary-yellow text-sm font-medium text-center">
                  Events
                </h2>

                <h3 className="md:text-2xl xl:text-3xl text-xl font-bold text-center text-white">
                  Upcoming Events
                </h3>

                <p className="text-sm font-normal leading-relaxed text-white">
                  Discover a vibrant calendar of events designed to inspire,
                  educate, and connect the agricultural community.
                </p>
              </section>

              <section className="md:grid-cols-3 grid grid-cols-1 gap-5 pt-5">
                {events.slice(0, 3).map((item) => (
                  <div className="rounded-xl relative flex flex-col w-full h-full col-span-1 gap-3 p-3 bg-white shadow">
                    {item.price === 0 && (
                      <p className="top-5 left-5 text-primary-green absolute z-30 px-3 py-1 text-sm uppercase bg-white rounded-md">
                        Free
                      </p>
                    )}

                    <div className="rounded-md group w-full h-[200px] overflow-hidden">
                      <img
                        src={item.image ?? "/images/why-choose-us.png"}
                        alt-={item.title}
                        className="rounded-xl group-hover:scale-105 md:object-center object-cover object-top w-full h-full transition-transform"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/images/why-choose-us.png";
                        }}
                      />
                    </div>

                    <div className="flex flex-col flex-1 gap-4 pb-3">
                      <Link
                        to={`/user/events/${slugifyData(item.title)}`}
                        className="max-w-xs mb-auto text-base font-normal text-black capitalize"
                      >
                        {item.title}
                      </Link>
                      <p className="text-primary-brown text-sm">{item.date}</p>

                      <div className="flex items-center justify-between gap-4">
                        <p className="text-secondary-gray text-sm uppercase">
                          {item.location.toLowerCase() === "online"
                            ? "Online Event"
                            : "In-person"}{" "}
                          - <span className="capitalize">{item.location}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section id="contact-us" className="bg-black">
          <div className="content flex flex-col gap-5 py-16">
            <div className="lg:grid-cols-2 2xl:gap-16 lg:grid flex flex-col-reverse gap-8">
              <section className="flex flex-col gap-5">
                <h2 className="text-primary-yellow text-sm font-medium">
                  Contact Us
                </h2>

                <h3 className="md:text-2xl xl:text-3xl text-xl font-bold text-white">
                  Get in Touch with Agrieco-Connect
                </h3>

                <p className="text-sm font-normal leading-relaxed text-white">
                  We're here to help! Reach out to us with any questions,
                  feedback, or inquiries, and our dedicated team will be happy
                  to assist you.
                </p>

                <ContactUsForm />
              </section>

              <img
                src="/images/contact-us.png"
                alt="why choose us"
                width={1000}
                height={1000}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* Join Now */}
        <section
          id="join-now"
          className="bg-forest-image bg-center bg-no-repeat bg-cover"
        >
          <div className="content flex flex-col gap-5 py-16">
            <div className="flex flex-col items-center max-w-4xl gap-6 mx-auto text-center">
              <h2 className="md:text-2xl text-xl font-semibold text-white">
                Become a Part of Agrieco-Connect Today
              </h2>

              <p className="text-sm leading-relaxed text-white">
                Join Agrieco-Connect and be part of a dynamic and supportive
                agricultural community. Share your experiences, learn from
                experts, and gain access to valuable resources and opportunities
                that will help you thrive. Together, we can achieve sustainable
                growth and innovation in agriculture.
              </p>

              <Link to="#">
                <Button className="hover:bg-tranparent hover:border-white px-10 py-3 text-center text-white bg-transparent border-2 border-white rounded-none">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </section>
  );
};

export default AboutUs;
