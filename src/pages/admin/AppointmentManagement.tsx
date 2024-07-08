import { Helmet } from "react-helmet-async";
import { appointmentManagement } from "@/constants";
import AppointmentAnalytics from "@/components/admin/AppointmentAnalytics";
import AppointmentManagementTable from "@/components/admin/AppointmentManagementTable";
import { useEffect, useState } from "react";
import AddAppointment from "@/components/admin/AddAppointment";

export type AppointmentManagement = (typeof appointmentManagement)[number];

const AppointmentManagement = () => {
  const [appointmentType, setAppointmentType] = useState<string>("all");
  const [filteredAppointments, setFilteredAppointments] = useState(
    appointmentManagement
  );

  useEffect(() => {
    if (appointmentType === "all") {
      setFilteredAppointments(appointmentManagement);
    } else if (appointmentType === "approved") {
      setFilteredAppointments(
        appointmentManagement.filter(
          (appointment) => appointment.status.toLowerCase() === "approved"
        )
      );
    }
  }, [appointmentType]);

  return (
    <div className="flex flex-col gap-5 py-6">
      {/* Title */}
      <Helmet>
        <title>Appointment Management - Agrieco-Connect </title>
        <meta
          name="description"
          content="Manage all the appointments of the users"
        />
      </Helmet>

      {/* Analytics */}
      <AppointmentAnalytics />

      <section className="grid w-full grid-cols-1 gap-5">
        {/* Appointment Management */}
        <div className="flex flex-col w-full h-full col-span-1 gap-5 bg-white rounded-md shadow">
          <div className="flex items-center justify-between gap-5 px-5 py-3">
            <h2 className="flex items-center gap-4 px-5 py-3">
              <button
                onClick={() => setAppointmentType("all")}
                className={`text-primary-brown border-b-2 pb-2 font-medium ${appointmentType === "all" ? "border-b-2 border-primary-green" : "border-transparent"}`}
              >
                All Appointments
              </button>

              <button
                onClick={() => setAppointmentType("approved")}
                className={`text-primary-brown font-medium pb-2 border-b-2 ${appointmentType === "approved" ? "border-b-2 border-primary-green" : " border-transparent"}`}
              >
                Approved Appointments
              </button>
            </h2>

            <AddAppointment />
          </div>

          {/* User List */}
          <AppointmentManagementTable
            filteredAppointments={filteredAppointments}
            setFilteredAppointments={setFilteredAppointments}
            appointments={appointmentManagement}
            appointmentType={appointmentType}
          />
        </div>
      </section>
    </div>
  );
};

export default AppointmentManagement;
