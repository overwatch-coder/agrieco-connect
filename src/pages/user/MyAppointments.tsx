import AddAppointmentAvailability from "@/components/AddAppointmentAvailability";
import DeleteItemModal from "@/components/DeleteItemModal";
import EditAppointmentAvailability from "@/components/EditAppointmentAvailability";
import { appointments } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { useFetch, useMutateData } from "@/hooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export type AppointmentsItemType = (typeof appointments)[number];

const MyAppointments = () => {
  const [auth] = useAuth();
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    refetch: refetchAppointments,
  } = useFetch<AppointmentsItemType[]>({
    queryKey: "appointments",
    url: "/appointments",
    enabled: true,
  });

  const [filteredAppointments, setFilteredAppointments] = useState(
    appointments.filter((item) => item.isUser === true)
  );
  const [itemToDeleteId, setItemToDeleteId] = useState<number>(0);

  const {
    mutateAsync,
    isPending: pending,
    error,
  } = useMutateData<null, AppointmentsItemType>({
    url: `/appointments/${itemToDeleteId}`,
    config: {
      method: "DELETE",
      token: auth?.user.token,
      queryKey: "appointments",
    },
  });

  const handleDeleteItem = async () => {
    await mutateAsync(null, {
      onError: () => {
        toast.error("Something went wrong");
        console.log({ error });
      },
    });

    toast.success("Appointment deleted successfully");

    queryClient.invalidateQueries({
      queryKey: ["appointments", "/appointments"],
    });

    refetchAppointments();
  };

  return (
    <div className="w-full">
      {/* Title */}
      <Helmet>
        <title>My Appointments | Appointments - Agrieco-Connect</title>
        <meta name="description" content="My Appointments" />
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
            My Appointments
          </h2>

          <AddAppointmentAvailability />
        </section>

        <section className="md:flex-row md:items-center md:justify-between md:gap-5 flex flex-col w-full gap-3">
          <h2 className="text-lg font-semibold text-black">
            Manage Your Appointments
          </h2>
        </section>

        {filteredAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 text-center">
            <p className="text-primary-brown text-lg font-medium">
              No appointments found
            </p>

            <p className="text-secondary-gray text-sm">
              You can create a new appointment by clicking on the button above
            </p>
          </div>
        ) : (
          <section className="md:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-5">
            {filteredAppointments.map((item) => (
              <AppointmentItem
                key={item.id}
                item={item}
                handleDeleteItem={handleDeleteItem}
                setItemToDeleteId={setItemToDeleteId}
                pending={pending}
              />
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;

type AppointmentItemProps = {
  item: AppointmentsItemType;
  handleDeleteItem: (id?: string) => Promise<void>;
  setItemToDeleteId: (id: number) => void;
  pending?: boolean;
};

const AppointmentItem = ({
  item,
  handleDeleteItem,
  setItemToDeleteId,
  pending,
}: AppointmentItemProps) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <div className="flex flex-col w-full h-full gap-3 p-4 bg-white rounded-md shadow-md">
        {/* Rating */}
        <div className="flex items-center gap-3">
          <Rating experienceLevel={parseInt(item.experience_level)} />
          <p className="text-sm font-normal text-black">
            ({item.experience_level}/5)
          </p>
        </div>

        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <img
            src={item.image}
            alt-={item.fullname}
            className="object-cover w-16 h-16 rounded-full"
          />

          <div className="flex flex-col gap-1">
            <p className="text-primary-brown text-base font-medium">
              {item.fullname}
            </p>
            <p className="text-sm font-normal text-black">{item.specialty}</p>
            <p className="text-xs text-black">{item.location}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="flex flex-col flex-1 gap-4 pb-3">
          <p className="text-sm font-medium leading-relaxed text-black">
            {`"${item.bio}"`}
          </p>

          <p className="mt-auto text-[10px] font-light text-black">
            {item.availability_slot_start?.split(" ")[0]}
          </p>
          <p className="mt-auto text-[10px] font-light text-black">
            Next Available Slot: {item.availability_slot_start?.split(" ")[0]}{" "}
            {item.availability_slot_start?.split(" ")[1]} -{" "}
            {item.availability_slot_end?.split(" ")[1]}
          </p>

          <div className="flex items-center gap-4">
            <button onClick={() => setOpenEditModal(true)}>
              <Edit size={20} className="text-green-500" />
            </button>

            <button
              onClick={() => {
                setItemToDeleteId(item.id);
                setOpenDeleteModal(true);
              }}
            >
              <Trash2 size={20} className="text-red-500" />
            </button>
          </div>
        </div>
      </div>

      <EditAppointmentAvailability
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        item={{
          company_name: item.fullname,
          specialty: item.specialty,
          location: item.location,
          experience_level: item.experience_level,
          contact_information: item.contact_information,
          availabilitySlotStart: `${item.availability_slot_start}`,
          availabilitySlotEnd: `${item.availability_slot_end}`,
          bio: item.bio,
        }}
      />

      <DeleteItemModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        modalTitle="Delete Appointment"
        modalDescription="Are you sure you want to delete this appointment?"
        deleteFn={() => handleDeleteItem()}
        pending={pending}
      />
    </>
  );
};

const Rating = ({ experienceLevel }: { experienceLevel: number }) => {
  const normalizedExperienceLevel = Math.max(1, Math.min(5, experienceLevel));

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {[...Array(5)].map((_, index) => {
        if (index < normalizedExperienceLevel) {
          return <FaStar key={index} color="#ffc107" />;
        } else {
          return <FaRegStar key={index} color="#e4e5e9" />;
        }
      })}
    </div>
  );
};
