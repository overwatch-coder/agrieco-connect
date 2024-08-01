const AppointmentAnalytics = ({
  appointments,
}: {
  appointments: IAppointment[];
}) => {
  return (
    <section className="sm:grid-cols-2 lg:grid-cols-4 grid grid-cols-1 gap-10">
      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">{appointments.length}</p>
          <p className="text-primary-brown text-sm font-medium">Total</p>
          <p className="text-primary-brown text-sm font-medium">Appointments</p>
        </div>
      </div>

      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">
            {
              appointments.filter(
                (appointment) => appointment.is_booked === false
              ).length
            }
          </p>
          <p className="text-primary-brown text-sm font-medium">Pending</p>
          <p className="text-primary-brown text-sm font-medium">Appointments</p>
        </div>
      </div>

      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">
            {appointments.filter((appointment) => appointment.is_booked).length}
          </p>
          <p className="text-primary-brown text-sm font-medium">Approved</p>
          <p className="text-primary-brown text-sm font-medium">Appointments</p>
        </div>
      </div>

      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-xl font-bold text-black">
            {appointments[0].company_name}
          </p>
          <p className="text-primary-brown text-sm font-medium">Top Expert</p>
          <p className="text-primary-brown text-sm font-medium">
            (Most Booked)
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppointmentAnalytics;
