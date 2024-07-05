import { useState } from "react";
import { X } from "lucide-react";
import { Calendar, momentLocalizer, Event, SlotInfo } from "react-big-calendar";
import moment from "moment";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
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
import "react-big-calendar/lib/css/react-big-calendar.css";

type AppointmentFormProps = {
  event: Event;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
};

const AppointmentBookingFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  note: z.string().min(1, "Note is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

type AppointmentBookingForm = z.infer<typeof AppointmentBookingFormSchema>;

// events
const currentEvents: Event[] = [];
const currentDate = moment();

for (let i = 1; i <= 8; i++) {
  const start = currentDate
    .clone()
    .add(i * 2, "days")
    .add(1, "hours")
    .toDate();
  const end = currentDate
    .clone()
    .add(i * 2, "days")
    .add(2, "hours")
    .toDate();

  currentEvents.push({
    start: start,
    end: end,
    title: `Appointment ${i}`,
    resource: {
      name: "John Doe",
      email: "johndoe@gmail.com",
    },
  });
}

const BookAppointmentCalendar = () => {
  const [openFormModal, setOpenFormModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event>({
    start: moment("2015-01-01").toDate(),
    end: moment("2015-01-01").toDate(),
    title: "Appointment 1",
  });

  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState<Event[]>(currentEvents);

  return (
    <div className="flex flex-col h-screen">
      <Calendar
        localizer={localizer}
        defaultView="month"
        views={["month", "week", "day"]}
        defaultDate={moment(new Date().toDateString()).toDate()}
        showMultiDayTimes={true}
        enableAutoScroll={true}
        dayLayoutAlgorithm={"no-overlap"}
        events={events}
        startAccessor={"start"}
        endAccessor={"end"}
        style={{ height: "100%" }}
        selectable={true}
        onSelectEvent={(event) => {
          setSelectedEvent(event);
          setOpenFormModal(true);
        }}
        eventPropGetter={(event) => {
          return {
            className:
              "bg-transparent text-center text-primary-green p-2 rounded",
            style: {
              border: "#4CAF50",
              borderStyle: "solid",
            },
          };
        }}
      />

      <AppointmentForm
        event={selectedEvent}
        openModal={openFormModal}
        setOpenModal={setOpenFormModal}
        events={events}
        setEvents={setEvents}
      />
    </div>
  );
};

export default BookAppointmentCalendar;

const AppointmentForm = ({
  event,
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
          start: event.start,
          end: event.end,
          title: variables.note,
          resource: {
            name: variables.name,
            email: variables.email,
          },
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
          <DialogTitle className="gap-7 flex flex-col">
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

        <DialogDescription>
          <form
            method="post"
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col w-full gap-4"
          >
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-black">Selected Slot</p>
              <p className="text-xs text-black">
                Start: {event.start?.toLocaleString()}
              </p>
              <p className="text-xs text-black">
                End: {event.end?.toLocaleString()}
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

              <input
                type="hidden"
                {...register("startDate")}
                value={event.start?.toISOString()}
              />
              <input
                type="hidden"
                {...register("endDate")}
                value={event.end?.toISOString()}
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
              className="bg-primary-green mt-7 w-full py-2 text-white rounded-none"
              type="submit"
            >
              {isPending ? (
                <ClipLoader size={28} loading={isPending} color="white" />
              ) : (
                "Confirm"
              )}
            </Button>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

// type SelectedEventProps = {
//   event: Event;
//   openModal: boolean;
//   setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
// };

// const SelectedEvent = ({
//   event,
//   openModal,
//   setOpenModal,
// }: SelectedEventProps) => {
//   return (
//     <Dialog open={openModal} onOpenChange={setOpenModal}>
//       <DialogContent className="md:max-w-md w-full p-4 bg-white border-2 border-black rounded shadow">
//         <div className="flex items-start justify-between">
//           <DialogTitle className="gap-7 flex flex-col">
//             <span className="text-primary-brown text-lg font-bold">
//               {event.title}
//             </span>
//           </DialogTitle>

//           <DialogClose
//             onClick={() => setOpenModal(false)}
//             className="flex items-center justify-center w-6 h-6 border border-red-500 rounded-full"
//           >
//             <X size={20} className="text-red-500" />
//           </DialogClose>
//         </div>

//         <DialogDescription>
//           <div className="flex flex-col w-full gap-4">
//             <div className="place-content-start place-items-start text-secondary-gray grid grid-cols-2 gap-5 text-sm">
//               <p>Name:</p>
//               <p>{event.resource?.name}</p>
//             </div>

//             <div className="place-content-start place-items-start text-secondary-gray grid grid-cols-2 gap-5 text-sm">
//               <p>Emal:</p>
//               <p>{event?.resource?.email}</p>
//             </div>

//             <div className="place-content-start place-items-start text-secondary-gray grid grid-cols-2 gap-5 text-sm">
//               <p>Start:</p>
//               <p>{event?.start?.toLocaleString()}</p>
//             </div>

//             <div className="place-content-start place-items-start text-secondary-gray grid grid-cols-2 gap-5 text-sm">
//               <p>End:</p>
//               <p>{event?.end?.toLocaleString()}</p>
//             </div>
//           </div>
//         </DialogDescription>
//       </DialogContent>
//     </Dialog>
//   );
// };
