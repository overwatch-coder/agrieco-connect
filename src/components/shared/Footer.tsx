import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MapPin, PhoneCall } from "lucide-react";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email"),
});

type NewsletterType = z.infer<typeof newsletterSchema>;

const Footer = () => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterType>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
    mode: "all",
  });

  const { mutateAsync, isPending: pending } = useMutation({
    mutationFn: async (data: NewsletterType) => {
      const response = await axiosInstance.post("/users", data);
      return data;
    },
    onSuccess: (data) => {
      reset();
      toast({
        description:
          "Thank you for subscribing!. We will get back to you shortly.",
      });
    },
  });

  const onSubmit = async (data: NewsletterType) => {
    console.log({ data });
    await mutateAsync(data);
  };

  return (
    <footer className="bg-primary-darkgreen content w-full pt-10 pb-5">
      <div className="xl:grid-cols-4 sm:grid-cols-2 grid grid-cols-1 gap-10">
        {/* Logo */}
        <div className="flex flex-col w-full gap-5">
          <Link to={"/"} className="flex items-center gap-2">
            <img
              src={"/icons/logo-white.svg"}
              alt="Logo"
              width={50}
              height={50}
            />

            <h1 className="text-primary-green flex items-center text-xl font-bold">
              <span className={"text-white"}>Agri</span>
              eco-Connect
            </h1>
          </Link>

          <p className="text-xs font-light leading-loose text-white">
            Agrieco-Connect is a pioneering platform dedicated to empowering
            farmers, experts, and communities through knowledge sharing,
            innovative technology, and collaboration. Our mission is to drive
            sustainable agricultural practices, enhance market access, and
            foster community growth across Nigeria and beyond. Join us in
            transforming the agricultural landscape for a prosperous future.
          </p>
        </div>

        {/* Services */}
        <div className="xl:items-center flex flex-col">
          <div className="flex flex-col gap-3">
            <h2 className="text-primary-yellow text-start py-2 text-xl font-bold">
              Quick Links
            </h2>
            <ul className="text-start flex flex-col gap-3 font-light">
              <Link
                to={"#events"}
                className="text-white/80 hover:text-white w-fit"
              >
                Events
              </Link>
              <Link
                to={"#about-us"}
                className="text-white/80 hover:text-white w-fit"
              >
                About Us
              </Link>
              <Link
                to={"#services"}
                className="text-white/80 hover:text-white w-fit"
              >
                Services
              </Link>
              <Link
                to={"#testimonials"}
                className="text-white/80 hover:text-white w-fit"
              >
                Testimonials
              </Link>
            </ul>
          </div>
        </div>

        {/* Contact Us */}
        <div className="gap-7 flex flex-col">
          <h2 className="text-primary-yellow text-start py-2 text-xl font-bold">
            Contact Us
          </h2>

          <p className="text-white/80 flex items-center gap-2 text-sm font-normal">
            <MapPin size={20} className="text-white" />
            <span>Benin City, Edo State, Nigeria</span>
          </p>

          <p className="text-white/80 flex items-center gap-2 text-sm font-normal">
            <PhoneCall size={20} className="text-white" />
            <span>Tel: +234 813 555 5555</span>
          </p>

          <p className="text-white/80 flex items-center gap-2 text-sm font-normal">
            <MdEmail size={20} className="text-white" />
            <span>agrieo-connect@gmail.com</span>
          </p>
        </div>

        {/* Join Our Newsletter */}
        <div className="flex flex-col gap-3">
          <h2 className="text-primary-yellow text-start py-2 text-xl font-bold">
            Join Our Newsletter
          </h2>
          <p className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-white">
              Follow the latest trends
            </span>
            <span className="text-secondary-gray text-sm font-normal">
              With our daily newsletter
            </span>
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
            className="flex flex-col gap-4 pt-3"
          >
            <label htmlFor="email" className="text-sm text-white">
              Email
            </label>

            <input
              type="email"
              id="email"
              {...register("email")}
              className="border-b-white/80 focus:border-b-white focus:outline-none placeholder:text-sm placeholder:text-white/60 w-full py-2 text-white bg-transparent border-b-2 rounded"
              placeholder="Enter your email address"
            />

            {errors.email && (
              <p className="py-2 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}

            <SubmitButton pending={pending} />
          </form>
        </div>
      </div>

      <hr className="my-10 border border-white" />
      <p className="text-sm font-light text-center text-white">
        &copy; Copyright@agrieco-connect, {new Date().getFullYear()}. All Rights
        Reserved
      </p>
    </footer>
  );
};

export default Footer;

const SubmitButton = ({ pending }: { pending: boolean }) => {
  return (
    <div className="flex flex-col items-center w-full gap-5">
      <Button
        disabled={pending}
        className="bg-primary-yellow/80 hover:bg-primary-yellow/70 w-full py-3 text-center text-white"
      >
        {pending ? (
          <ClipLoader size={28} loading={pending} color="white" />
        ) : (
          "Submit"
        )}
      </Button>
    </div>
  );
};
