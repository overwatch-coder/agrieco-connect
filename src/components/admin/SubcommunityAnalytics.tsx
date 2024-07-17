const SubcommunityAnalytics = ({
  subcommunities,
}: {
  subcommunities: ICommunity[];
}) => {
  return (
    <section className="sm:grid-cols-2 lg:grid-cols-4 grid grid-cols-1 gap-10">
      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">
            {subcommunities.length}
          </p>
          <p className="text-primary-brown text-sm font-medium">Total</p>
          <p className="text-primary-brown text-sm font-medium">
            Subcommunities
          </p>
        </div>
      </div>

      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">
            {Math.floor(Math.random() * subcommunities.length)}
          </p>
          <p className="text-primary-brown text-sm font-medium">Active</p>
          <p className="text-primary-brown text-sm font-medium">
            Subcommunities
          </p>
        </div>
      </div>

      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">
            {Math.floor(Math.random() * subcommunities.length)}
          </p>
          <p className="text-primary-brown text-sm font-medium">New</p>
          <p className="text-primary-brown text-sm font-medium">
            Subcommunities
          </p>
        </div>
      </div>

      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">
            {subcommunities.length > 0 ? "1,200 Members" : "N/A"}
          </p>
          <p className="text-primary-brown text-sm font-medium">Popular</p>
          <p className="text-primary-brown text-sm font-medium">
            Subcommunities
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubcommunityAnalytics;
