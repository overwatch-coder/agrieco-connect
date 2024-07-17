const EventManagementAnalytics = ({ events }: { events: IEvent[] }) => {
  return (
    <section className="sm:grid-cols-2 lg:grid-cols-4 grid grid-cols-1 gap-10">
      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">{events.length}</p>
          <p className="text-primary-brown text-sm font-medium">Total</p>
          <p className="text-primary-brown text-sm font-medium">Events</p>
        </div>
      </div>

      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">
            {Math.floor(Math.random() * events.length)}
          </p>
          <p className="text-primary-brown text-sm font-medium">Upcoming</p>
          <p className="text-primary-brown text-sm font-medium">Events</p>
        </div>
      </div>

      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">
            {Math.floor(Math.random() * events.length)}
          </p>
          <p className="text-primary-brown text-sm font-medium">New</p>
          <p className="text-primary-brown text-sm font-medium">Events</p>
        </div>
      </div>

      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-xl font-bold text-black">
            {events.length > 0 ? "Mastering Organic Farming" : "N/A"}
          </p>
          <p className="text-primary-brown text-sm font-medium">Most Popular</p>
          <p className="text-primary-brown text-sm font-medium">Events</p>
        </div>
      </div>
    </section>
  );
};

export default EventManagementAnalytics;
