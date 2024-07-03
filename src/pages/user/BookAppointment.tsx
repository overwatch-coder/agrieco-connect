import { appointments } from "@/constants";
import {
  ArrowLeft,
  ArrowRight,
  CircleHelp,
  MessageSquareText,
  X,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Calendar, dayjsLocalizer, Event, SlotInfo } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import CustomFormField from "@/components/shared/CustomFormField";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import { axiosInstance } from "@/lib/utils";
import { toast } from "react-toastify";

const BookAppointment = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams() as {
    appointmentId: string;
  };

  // find appointment by id
  const appointment = appointments.find(
    (appointment) => appointment.id === parseInt(appointmentId)
  );

  // check if appointment exists
  if (!appointment) {
    navigate("/user/appointments");
    return null;
  }

  return (
    <div className="w-full">
      {/* Title */}
      <Helmet>
        <title> Book An Appointment | Appointments - Agrieco-Connect </title>
        <meta name="description" content="Book An Appointment" />
      </Helmet>

      <div className="md:gap-6 flex flex-col w-full gap-10 p-5">
        <Link
          to="/user/appointments"
          className="text-primary-brown flex items-center gap-2"
        >
          <ArrowLeft size={20} className="text-primary-brown" />
          <span>Go Back</span>
        </Link>

        <section className="flex items-center justify-between w-full gap-5">
          <h2 className="text-lg md:text-2xl font-bold font-[poppins] text-primary-brown">
            Book Appointment with {appointment.fullname}
          </h2>
        </section>

        {/* Appointment Calender */}
        <section className="md:flex-row md:items-start md:gap-5 flex flex-col items-center gap-3">
          {/* Doctor Information */}
          <div className="flex flex-col items-center w-full md:max-w-[200px] gap-3">
            <div className="border-primary-brown flex items-center justify-center w-32 h-32 p-2 bg-white border-2 rounded-full">
              <img
                src={appointment.image}
                alt={appointment.fullname}
                className="object-cover w-full h-full rounded-full"
              />
            </div>

            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-base font-semibold text-black">
                {appointment.fullname}
              </p>
              <Link
                to={`mailto:${appointment.fullname.toLowerCase().split(".")[1].split(" ").join("")}@agrieco.com`}
                target="_blank"
                className="text-secondary-gray text-xs font-semibold lowercase"
              >
                {`${appointment.fullname.split(".")[1].split(" ").join("")}@agrieco.com`}
              </Link>

              <Link
                to={"#"}
                className="flex items-center justify-between w-full gap-4"
              >
                <span className="flex items-center gap-2">
                  <MessageSquareText
                    size={16}
                    className="text-secondary-gray"
                  />
                  <span className="text-secondary-gray text-sm">
                    Send Feedback
                  </span>
                </span>
                <ArrowRight size={16} className="text-secondary-gray" />
              </Link>

              <Link
                to={"#"}
                className="flex items-center justify-between w-full gap-4"
              >
                <span className="flex items-center gap-2">
                  <CircleHelp size={16} className="text-secondary-gray" />
                  <span className="text-secondary-gray text-sm">
                    Expert Help
                  </span>
                </span>
                <ArrowRight size={16} className="text-secondary-gray" />
              </Link>
            </div>
          </div>

          {/* Booking Calendar */}
          <div className="scrollbar-hide flex-grow w-full p-4 bg-white rounded-lg shadow-md">
            <BookAppointmentCalendar />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookAppointment;

const BookAppointmentCalendar = () => {
  const [openFormModal, setOpenFormModal] = useState(false);
  const [slotInfo, setSlotInfo] = useState<SlotInfo>({
    start: dayjs().toDate(),
    end: dayjs().toDate(),
    slots: [dayjs().toDate()],
    action: "click",
  });
  const [selectedEvent, setSelectedEvent] = useState<Event>({
    start: dayjs().toDate(),
    end: dayjs().toDate(),
    title: "Appointment 1",
  });
  const [openSelectedEventModal, setSelectedEventModal] = useState(false);

  const localizer = dayjsLocalizer(dayjs);
  const [events, setEvents] = useState<Event[]>([
    {
      start: dayjs(dayjs().toDate()).add(1, "hours").toDate(),
      end: dayjs(dayjs().toDate()).add(2, "hours").toDate(),
      title: "Appointment 1",
    },
    {
      start: dayjs(dayjs().toDate()).add(3, "hours").toDate(),
      end: dayjs(dayjs().toDate()).add(4, "hours").toDate(),
      title: "Appointment 2",
    },
    {
      start: dayjs(dayjs().toDate()).add(5, "hours").toDate(),
      end: dayjs(dayjs().toDate()).add(6, "hours").toDate(),
      title: "Appointment 3",
    },
    {
      start: dayjs(dayjs().toDate()).add(7, "hours").toDate(),
      end: dayjs(dayjs().toDate()).add(8, "hours").toDate(),
      title: "Appointment 4",
    },
  ]);

  return (
    <>
      <Calendar
        localizer={localizer}
        defaultView="week"
        defaultDate={dayjs().format("YYYY-MM-DD")}
        events={events}
        startAccessor={"start"}
        endAccessor={"end"}
        style={{ height: "100%" }}
        selectable={true}
        onSelectSlot={(slotInfo) => {
          setSlotInfo(slotInfo);
          setOpenFormModal(true);
        }}
        onSelectEvent={(event) => {
          setSelectedEvent(event);
          setSelectedEventModal(true);
        }}
      />

      <AppointmentForm
        slotInfo={slotInfo}
        openModal={openFormModal}
        setOpenModal={setOpenFormModal}
        events={events}
        setEvents={setEvents}
      />

      <SelectedEvent
        openModal={openSelectedEventModal}
        setOpenModal={setSelectedEventModal}
        event={selectedEvent}
      />
    </>
  );
};

type AppointmentFormProps = {
  slotInfo: SlotInfo;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
};

const AppointmentBookingFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  note: z.string().min(1, "Note is required"),
});

type AppointmentBookingForm = z.infer<typeof AppointmentBookingFormSchema>;

const AppointmentForm = ({
  slotInfo,
  openModal,
  setOpenModal,
  events,
  setEvents,
}: AppointmentFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentBookingForm>({
    resolver: zodResolver(AppointmentBookingFormSchema),
    mode: "all",
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: AppointmentBookingForm) => {
      const res = await axiosInstance.post("/users", data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      setOpenModal(false);
      setEvents([
        ...events,
        {
          start: slotInfo.start,
          end: slotInfo.end,
          title: variables.note,
        },
      ]);

      toast.success("Appointment booked successfully");

      reset();
    },
  });

  const handleFormSubmit = async (data: AppointmentBookingForm) => {
    console.log({ ...data });
    await mutateAsync(data);
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="md:max-w-md w-full p-4 bg-white border-2 border-black rounded shadow">
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown text-lg font-bold">
              Confirm Booking
            </span>
          </DialogTitle>

          <DialogClose
            onClick={() => reset()}
            className="flex items-center justify-center w-6 h-6 border border-red-500 rounded-full"
          >
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        <form
          method="post"
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col w-full gap-4"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-base font-medium text-black">Selected Slot</h2>
            <p className="text-xs text-black">
              Start: {slotInfo.start.toLocaleString()}
            </p>
            <p className="text-xs text-black">
              End: {slotInfo.end.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <CustomFormField
              register={register}
              labelName="Name"
              inputName="name"
              placeholderText="Enter name"
              errors={errors}
              inputType="text"
            />

            <CustomFormField
              register={register}
              labelName="Email"
              inputName="email"
              placeholderText="Enter your email"
              errors={errors}
              inputType="text"
            />

            <CustomFormField
              register={register}
              labelName="Note"
              inputName="note"
              placeholderText="Enter note"
              errors={errors}
              inputType="text"
            />
          </div>

          <Button
            disabled={isPending}
            className="bg-primary-green w-full py-2 mt-3 text-white rounded-none"
            type="submit"
          >
            {isPending ? (
              <ClipLoader size={28} loading={isPending} color="white" />
            ) : (
              "Confirm"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

type SelectedEventProps = {
  event: Event;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const SelectedEvent = ({
  event,
  openModal,
  setOpenModal,
}: SelectedEventProps) => {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="md:max-w-md w-full p-4 bg-white border-2 border-black rounded shadow">
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown text-lg font-bold">
              {event.title}
            </span>
          </DialogTitle>

          <DialogClose
            onClick={() => setOpenModal(false)}
            className="flex items-center justify-center w-6 h-6 border border-red-500 rounded-full"
          >
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        <div className="flex flex-col w-full gap-4">
          <div className="place-content-start place-items-start text-secondary-gray grid grid-cols-2 gap-5 text-sm">
            <h3>Start:</h3>
            <p>{event?.start?.toLocaleString()}</p>
          </div>

          <div className="place-content-start place-items-start text-secondary-gray grid grid-cols-2 gap-5 text-sm">
            <h3>End:</h3>
            <p>{event?.end?.toLocaleString()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
