const AdminTopicsAnalytics = ({ topics }: { topics: ITopic[] }) => {
  return (
    <section className="sm:grid-cols-2 lg:grid-cols-4 grid grid-cols-1 gap-10">
      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">{topics.length}</p>
          <p className="text-primary-brown text-sm font-medium">Total Topics</p>
        </div>
      </div>

      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">
            {Math.floor(Math.random() * topics.length)}
          </p>
          <p className="text-primary-brown text-sm font-medium">
            Subscribed Topics
          </p>
        </div>
      </div>

      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">
            {Math.floor(Math.random() * topics.length)}
          </p>
          <p className="text-primary-brown text-sm font-medium">New Topics</p>
        </div>
      </div>

      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-xl font-bold text-black">
            {Math.floor(Math.random() * topics.length)}
          </p>
          <p className="text-primary-brown text-sm font-medium">
            Trending Topic
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminTopicsAnalytics;
