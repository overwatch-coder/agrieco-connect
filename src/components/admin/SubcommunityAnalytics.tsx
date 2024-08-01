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
            {subcommunities.filter((sub) => sub.is_active).length}
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
            {
              subcommunities.filter(
                (sub) =>
                  new Date(
                    sub.created_at
                      .split(" ")[0]
                      .concat("T")
                      .concat(sub.created_at.split(" ")[1])
                  ).getMonth() === new Date().getMonth()
              ).length
            }
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
            {subcommunities.length > 0
              ? subcommunities.sort(
                  (a, b) => b.members_count - a.members_count
                )[0]?.members_count
              : "N/A"}{" "}
            Members
          </p>
          <p className="text-primary-brown text-sm font-medium">Popular</p>
          <p className="text-primary-brown text-sm font-medium">Subcommunity</p>
        </div>
      </div>
    </section>
  );
};

export default SubcommunityAnalytics;
