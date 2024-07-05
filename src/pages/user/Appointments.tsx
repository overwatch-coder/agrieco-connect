import AddAppointmentAvailability from "@/components/AddAppointmentAvailability";
import AppointmentExpertInformation from "@/components/AppointmentExpertInformation";
import CustomDropdown from "@/components/CustomDropdown";
import { Button } from "@/components/ui/button";
import { appointments } from "@/constants";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

export type AppointmentsItemType = (typeof appointments)[number];

const dropdownItemsOne = ["Specialty", "Location", "Experience Level", "All"];

const dropdownItemsTwo = [
  "Availability",
  "Specialty",
  "Location",
  "Experience Level",
  "All",
];

const Appointments = () => {
  const [selectedItem, setSelectedItem] = useState("Specialty");
  const [selectedItem2, setSelectedItem2] = useState("Availability");
  const [filteredAppointments, setFilteredAppointments] =
    useState(appointments);

  return (
    <div className="w-full">
      {/* Title */}
      <Helmet>
        <title> Appointments - Agrieco-Connect </title>
        <meta name="description" content="Appointments" />
      </Helmet>

      <div className="md:gap-6 flex flex-col w-full gap-10 p-5">
        <section className="flex items-center justify-between w-full gap-5">
          <h2 className="text-lg md:text-2xl font-bold font-[poppins] text-primary-brown">
            Appointments
          </h2>

          <AddAppointmentAvailability />
        </section>

        <section className="md:flex-row md:items-center md:justify-between md:gap-5 flex flex-col w-full gap-3">
          <h2 className="text-lg font-semibold text-black">
            Book an Appointment with Experts
          </h2>

          <div className="md:items-center md:justify-center flex flex-wrap gap-5">
            <CustomDropdown
              items={dropdownItemsOne}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />

            <CustomDropdown
              items={dropdownItemsTwo}
              selectedItem={selectedItem2}
              setSelectedItem={setSelectedItem2}
            />

            <Link
              to="/user/appointments/my-appointments"
              className="border-primary-brown w-fit px-7 flex items-center gap-2 py-2 font-medium text-center bg-white border"
            >
              <span className="text-secondary-gray text-sm">
                My Applications
              </span>
            </Link>
          </div>
        </section>

        <p className="text-sm font-normal text-black">
          Connect with agricultural experts for personalized advice and
          consultations.
        </p>

        <section className="md:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-5">
          {filteredAppointments.map((item) => (
            <AppointmentItem key={item.id} item={item} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Appointments;

const AppointmentItem = ({ item }: { item: AppointmentsItemType }) => {
  const [openModal, setOpenModal] = useState(false);

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

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => setOpenModal(true)}
              className="bg-primary-green hover:bg-primary-green w-full text-xs text-center text-white rounded-none"
            >
              Contact Expert
            </Button>

            <Link to={`/user/appointments/bookings/${item.id}`}>
              <Button className="bg-primary-brown hover:bg-primary-brown w-full text-xs text-center text-white rounded-none">
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <AppointmentExpertInformation
        openModal={openModal}
        setOpenModal={setOpenModal}
        item={item}
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
