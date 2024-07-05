import AddAppointmentAvailability from "@/components/AddAppointmentAvailability";
import DeleteItemModal from "@/components/DeleteItemModal";
import EditAppointmentAvailability from "@/components/EditAppointmentAvailability";
import { appointments } from "@/constants";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

export type AppointmentsItemType = (typeof appointments)[number];

const MyAppointments = () => {
  const [filteredAppointments, setFilteredAppointments] = useState(
    appointments.filter((item) => item.isUser === true)
  );

  const handleDeleteItem = (id: string) => {
    const newAppointments = filteredAppointments.filter(
      (item) => item.id.toString() !== id
    );
    setFilteredAppointments(newAppointments);
  };

  return (
    <div className="w-full">
      {/* Title */}
      <Helmet>
        <title> My Appointments | Appointments - Agrieco-Connect </title>
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

        <section className="md:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-5">
          {filteredAppointments.slice(0, 6).map((item) => (
            <AppointmentItem
              key={item.id}
              item={item}
              handleDeleteItem={handleDeleteItem}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default MyAppointments;

type AppointmentItemProps = {
  item: AppointmentsItemType;
  handleDeleteItem: (id: string) => void;
};

const AppointmentItem = ({ item, handleDeleteItem }: AppointmentItemProps) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <div className="flex flex-col w-full h-full gap-3 p-4 bg-white rounded-md shadow-md">
        {/* Rating */}
        <div className="flex items-center gap-3">
          <Rating experienceLevel={parseInt(item.experienceLevel)} />
          <p className="text-sm font-normal text-black">
            ({item.experienceLevel}/5)
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
            Next Available Slot: {item.availabilitySlotDate}
            {", "}
            {item.availabilitySlotTime}
          </p>

          <div className="flex items-center gap-4">
            <button onClick={() => setOpenEditModal(true)}>
              <Edit size={20} className="text-green-500" />
            </button>

            <button onClick={() => setOpenDeleteModal(true)}>
              <Trash2 size={20} className="text-red-500" />
            </button>
          </div>
        </div>
      </div>

      <EditAppointmentAvailability
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        item={{
          companyName: item.fullname,
          specialty: item.specialty,
          location: item.location,
          experienceLevel: item.experienceLevel,
          contactInfo: item.contactDetails,
          availabilitySlotStart: `${item.availabilitySlotDate}, ${item.availabilitySlotTime.split("-")[0]}`,
          availabilitySlotEnd: `${item.availabilitySlotDate}, ${item.availabilitySlotTime.split("-")[1]}`,
          bio: item.bio,
        }}
      />

      <DeleteItemModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        modalTitle="Delete Appointment"
        modalDescription="Are you sure you want to delete this appointment?"
        handleDelete={() => handleDeleteItem(item.id.toString())}
        toastMessage="Appointment has been deleted successfully"
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
