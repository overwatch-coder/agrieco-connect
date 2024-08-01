import { Helmet } from "react-helmet-async";
import { appointmentManagement } from "@/constants";
import AppointmentAnalytics from "@/components/admin/AppointmentAnalytics";
import AppointmentManagementTable from "@/components/admin/AppointmentManagementTable";
import { useEffect, useState } from "react";
import AddAppointment from "@/components/admin/AddAppointment";
import { useFetch } from "@/hooks/useFetch";
import RenderContentLoading from "@/components/shared/RenderContentLoading";

export type AppointmentManagement = (typeof appointmentManagement)[number];

const AppointmentManagement = () => {
  const { data: appointmentsData, refetch: refetchAppointments } = useFetch<
    IAppointment[]
  >({
    queryKey: "appointments",
    url: "/appointments",
    enabled: true,
  });

  const [appointmentType, setAppointmentType] = useState<string>("all");
  const [filteredAppointments, setFilteredAppointments] = useState<
    IAppointment[]
  >([]);

  useEffect(() => {
    if (appointmentsData) {
      setFilteredAppointments(appointmentsData);
    }
  }, [appointmentsData]);

  useEffect(() => {
    if (!appointmentsData) return;

    if (appointmentType === "all") {
      setFilteredAppointments(appointmentsData);
    } else if (appointmentType === "approved") {
      setFilteredAppointments(
        appointmentsData.filter((appointment) => appointment.is_booked)
      );
    }
  }, [appointmentType, appointmentsData]);

  if (!appointmentsData) {
    return (
      <RenderContentLoading>
        <p className="text-primary-brown text-base">
          Sorry, we couldn't find any appointments. Please try again later.
        </p>
      </RenderContentLoading>
    );
  }

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
      <AppointmentAnalytics appointments={appointmentsData} />

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

            <AddAppointment refetchAppointments={refetchAppointments} />
          </div>

          {/* User List */}
          <AppointmentManagementTable
            filteredAppointments={filteredAppointments}
            setFilteredAppointments={setFilteredAppointments}
            appointments={appointmentsData}
            appointmentType={appointmentType}
          />
        </div>
      </section>
    </div>
  );
};

export default AppointmentManagement;
