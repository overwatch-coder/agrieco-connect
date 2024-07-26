import AddToCalendarButton from "@/components/AddToCalendarButton";
import CustomFormField from "@/components/shared/CustomFormField";
import LoginModal from "@/components/shared/LoginModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { marketplaceEvents as events } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { axiosInstance, slugifyData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaLinkedin, FaFacebook, FaWhatsapp, FaTwitter } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { z } from "zod";

const socialIcons = [
  {
    name: "Facebook",
    icon: FaFacebook,
    color: "#3b5998",
    url: "https://www.facebook.com/agrieco-connect",
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    color: "#25d366",
    url: "https://wa.me/91996656789999",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    color: "#0077b5",
    url: "https://www.linkedin.com/company/agrieco-connect",
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    color: "#1da1f2",
    url: "https://twitter.com/agrieconnect",
  },
];

export type EventType = (typeof events)[number];

const EventDetails = () => {
  const { data: events } = useFetch<IEvent[]>({
    queryKey: "events",
    url: "/events",
    enabled: true,
  });

  const [auth] = useAuth();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [eventInfo, setEventInfo] = useState<IEvent>();

  useEffect(() => {
    if (events) {
      setEventInfo(events.find((event) => slugifyData(event.title) === slug));
    }
  }, [events, slug]);

  if (!eventInfo) {
    navigate("/user/events");
    return null;
  }

  return (
    <div className="w-full">
      {/* Title */}
      <Helmet>
        <title> {eventInfo.title} | Events - Agrieco-Connect </title>
        <meta
          name="description"
          content={`${eventInfo.title} - ${eventInfo.location}`}
        />
      </Helmet>

      <div className="md:gap-6 2xl:p-10 flex flex-col w-full gap-5 p-5 mx-auto -mt-5">
        <section className="flex items-center justify-between w-full gap-5">
          <h2 className="text-lg md:text-2xl font-bold font-[poppins] text-primary-brown capitalize">
            {eventInfo.title}
          </h2>
        </section>

        <section className="flex flex-col w-full gap-5">
          {/* Cover Image */}
          <div className="w-full overflow-hidden rounded relative h-[110vh] sm:h-[90vh] md:h-[80vh] 2xl:h-[50vh]">
            <div className="bg-black/50 absolute flex items-center justify-center w-full h-full" />

            <img
              src={eventInfo.image ?? "https://placehold.co/400"}
              alt-={eventInfo.title}
              className="object-cover object-center w-full h-full"
            />

            <div className="2xl:p-10 absolute top-0 flex flex-col w-full h-full gap-5 p-5 text-white">
              {/* Back Button */}
              <Link to="/user/events" className="flex items-center gap-2">
                <Button className="bg-primary-brown w-fit hover:bg-primary-brown flex items-center gap-2 text-center text-white rounded">
                  <ChevronLeft size={20} className="text-white" />
                  <span>Back</span>
                </Button>
              </Link>

              <div className="md:flex-row md:justify-between 2xl:justify-around md:pt-8 flex flex-col w-full gap-5">
                {/* Event Description */}
                <section className="2xl:w-auto flex flex-col w-full gap-5">
                  <h2 className="lg:text-4xl text-2xl font-bold text-white">
                    {eventInfo.title}
                  </h2>
                  <p className="text-xl text-white capitalize">
                    {eventInfo.location}
                  </p>

                  <p className="max-w-xl text-sm leading-loose text-white">
                    {eventInfo.description}
                  </p>

                  <button className="flex items-center gap-2">
                    <MapPin size={20} className="text-white" />
                    <span>View Map</span>
                  </button>
                </section>

                {/* Event Booking */}
                <section className="md:max-w-xs md:pt-0 2xl:w-auto sm:pt-10 w-full">
                  <div className="flex flex-col items-start gap-5 p-5 bg-white rounded-md shadow-xl">
                    <h2 className="text-2xl font-bold text-black">
                      Date & Time
                    </h2>
                    <p className="text-primary-gray/60">
                      {new Date(
                        `${eventInfo.date}T${eventInfo.start_time.slice(0, 5)}:00`
                      ).toLocaleString("en-US", {
                        dateStyle: "full",
                        timeStyle: "short",
                      })}
                    </p>

                    {auth && <AddToCalendarButton event={eventInfo} />}

                    <div className="flex flex-col w-full gap-4">
                      <RegisterEvent eventInfo={eventInfo} />

                      <ContactUs />
                    </div>

                    <div className="items-centter flex justify-center w-full">
                      <p className="text-primary-gray/60 text-center">
                        No refunds
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="md:grid-cols-2 grid w-full grid-cols-1 gap-5">
            {/* Event Description & Organizer Details */}
            <div className="flex flex-col w-full col-span-1 gap-5">
              {/* Event Description */}
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-black">Description</h2>

                <p className="text-secondary-gray text-sm leading-loose">
                  {eventInfo.description}
                </p>
              </div>

              {/* Hours */}
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-black">Hours</h2>

                <div className="flex flex-col gap-2">
                  <p className="text-secondary-gray text-sm">
                    Weekday hours:{" "}
                    <span className="text-primary-brown text-base font-semibold">
                      {eventInfo.start_time} - {eventInfo.end_time}
                    </span>
                  </p>
                  <p className="text-secondary-gray text-sm">
                    Weekend hours:{" "}
                    <span className="text-primary-brown text-base font-semibold">
                      {eventInfo.start_time} - {eventInfo.end_time}
                    </span>
                  </p>
                </div>
              </div>

              {/* Organizer Contact*/}
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-black">
                  Organizer Contact
                </h2>

                <p className="text-secondary-gray text-sm">
                  Please call{" "}
                  <span className="text-primary-brown">+234 098765 097623</span>{" "}
                  for more detail
                </p>
              </div>
            </div>

            {/* Event Location & Social Icons */}
            <div className="flex flex-col w-full col-span-1 gap-5">
              {/* Event Location */}
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-black">
                  Event Location
                </h2>

                {/* <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126093.84170376923!2d7.367464676956561!3d9.02424682048499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e745f4cd62fd9%3A0x53bd17b4a20ea12b!2sKano%2C%20Federal%20Capital%20Territory%2C%20Nigeria!5e0!3m2!1sen!2sma!4v1719966333827!5m2!1sen!2sma"
                  className="w-full h-[300px]"
                  style={{ border: "0" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe> */}
              </div>

              {/* Event Country */}
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-medium text-black capitalize">
                  {eventInfo.location}
                </h2>

                <p className="text-primary-gray/60 text-sm">
                  {eventInfo.title} is a great event organized by{" "}
                  {eventInfo.user.fullname}. It is being held in{" "}
                  {eventInfo.location} and the event will be held on{" "}
                  {eventInfo.date} at {eventInfo.start_time} to{" "}
                  {eventInfo.end_time}.
                </p>
              </div>

              {/* Event Tags */}
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-medium text-black">Tags</h2>

                <div className="flex flex-wrap items-center gap-2">
                  {[
                    "Farming Event",
                    "Food Security",
                    "Education",
                    "Health",
                    "Community",
                  ].map((tag) => (
                    <p className="p-2 text-sm bg-white rounded" key={tag}>
                      <span className="font-medium text-black">{tag}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Event Social Icons */}
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-medium text-black">
                  Share with Friends
                </h2>

                <div className="flex items-center gap-5">
                  {socialIcons.map((icon, index) => (
                    <Link to={icon.url} target="_blank" key={index}>
                      <icon.icon size={30} color={icon.color} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventDetails;

// Register Event
const RegisterEventSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email().min(1, "Email is required"),
});

type RegisterEventSchemaType = z.infer<typeof RegisterEventSchema>;

const RegisterEvent = ({ eventInfo }: { eventInfo: IEvent }) => {
  const [auth] = useAuth();

  const { data: attendees } = useFetch<any[]>({
    queryKey: "events",
    url: `/events/${eventInfo.id}/attendees`,
    enabled: true,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterEventSchemaType>({
    resolver: zodResolver(RegisterEventSchema),
    mode: "all",
  });

  const { mutateAsync, isPending, error, isError } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.put(
        `/events/${eventInfo.id}/attendees`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth?.user?.token}`,
          },
        }
      );

      return res.data;
    },
    onSuccess: () => {
      toast.success("You have successfully registered for this event");
      reset();
      window.location.reload();
    },
  });

  const handleSubmitForm = async () => {
    await mutateAsync();
  };

  const haveRegistered = attendees?.some(
    (attendee) => attendee.email === auth?.user?.email
  );

  return (
    <Dialog>
      {auth ? (
        haveRegistered ? (
          <span className="px-3 py-2 text-green-900 bg-green-100 rounded-md">
            You have registered for this event
          </span>
        ) : (
          <Button
            onClick={handleSubmitForm}
            className="bg-primary-brown w-full text-center text-white rounded"
          >
            Register
          </Button>
        )
      ) : (
        <LoginModal hasChildren={true}>
          <Button className="bg-primary-brown w-full text-center text-white rounded">
            Register
          </Button>
        </LoginModal>
      )}

      <DialogContent className="scrollbar-hide flex flex-col w-full max-w-xl gap-5 bg-white">
        {/* Header */}
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown md:text-3xl text-2xl font-bold">
              Register
            </span>
            <span className="text-secondary-gray text-sm font-normal">
              Book a slot now for this event
            </span>
          </DialogTitle>

          <DialogClose
            onClick={() => {
              reset();
            }}
            className="flex items-center justify-center w-6 h-6 border border-red-500 rounded-full"
          >
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        {/* form */}
        <form
          method="post"
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-5"
        >
          {isError && (
            <div className="flex items-center justify-center p-4 text-center bg-red-200 rounded-md">
              <p className="text-xs text-red-500">{error.message}</p>
            </div>
          )}

          <div className="flex flex-col w-full gap-5">
            <CustomFormField
              labelName="Name"
              inputName="name"
              placeholderText="Enter your name"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFormField
              labelName="Email"
              inputName="email"
              placeholderText="Enter your email"
              errors={errors}
              register={register}
              inputType="text"
            />

            {/* Submit Button */}
            <div className="flex items-center justify-end w-full">
              <div className="flex items-center gap-4">
                <DialogClose
                  onClick={() => {
                    reset();
                  }}
                  disabled={isPending}
                  className="hover:bg-transparent text-secondary-gray px-7 border-secondary-gray w-full py-2 bg-transparent border rounded-none"
                  type="reset"
                >
                  Cancel
                </DialogClose>

                <Button
                  disabled={isPending}
                  className="bg-primary-green hover:bg-primary-green px-7 w-full py-2 text-white rounded-none"
                >
                  {isPending ? (
                    <ClipLoader size={28} loading={isPending} color="white" />
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Event Booking Contact Details

const ContactUs = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-green w-full text-center text-white rounded">
          Contact Us
        </Button>
      </DialogTrigger>

      <DialogContent className="scrollbar-hide flex flex-col w-full max-w-xl gap-5 bg-white">
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown md:text-3xl text-2xl font-bold">
              Contact Us
            </span>
            <span className="text-secondary-gray text-sm font-normal">
              Contact us to know more about this event
            </span>
          </DialogTitle>

          <DialogClose className="flex items-center justify-center w-6 h-6 border border-red-500 rounded-full">
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        <div className="flex flex-col w-full gap-5">
          <div className="md:gap-5 sm:text-sm grid grid-cols-2 text-xs">
            <p className="text-secondary-gray">Email</p>
            <p className="text-secondary-gray">agrieco-connect@gmail.com</p>
          </div>

          <div className="md:gap-5 sm:text-sm grid grid-cols-2 text-xs">
            <p className="text-secondary-gray">Contact Number</p>
            <p className="text-secondary-gray">+234 096556789999</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
