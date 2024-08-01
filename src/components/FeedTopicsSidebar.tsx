import { useFetch } from "@/hooks/useFetch";
import { slugifyData } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const FeedTopicsSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTrend = searchParams.get("trend");
  const navigate = useNavigate();

  const handleSearchTrend = (trend: string) => {
    setSearchParams({ trend });
  };
  // === Data Fetching === //
  const { data: trends } = useFetch<ITrend>({
    queryKey: "trending-keywords",
    url: "/feeds/trending-keywords",
    enabled: true,
  });

  const { data: subcommunitiesData } = useFetch<ICommunity[]>({
    queryKey: "communities",
    url: "/communities",
    enabled: true,
  });

  const { data: marketplaceData } = useFetch<IMarketPlace[]>({
    queryKey: "marketplace",
    url: "/marketplaces/items",
    enabled: true,
  });

  // === States === //
  const [allTrends, setAllTrends] = useState<string[]>([]);
  const [subcommunities, setSubcommunities] = useState<ICommunity[]>([]);
  const [marketplace, setMarketplace] = useState<IMarketPlace[]>([]);

  useEffect(() => {
    if (trends) {
      const trendKeys = Object.keys(trends);
      setAllTrends(trendKeys);
      // setAllTrends(trends.length > 4 ? trends.slice(0, 4) : trends);
    }

    if (subcommunitiesData) {
      setSubcommunities(
        subcommunitiesData.length > 4
          ? subcommunitiesData.slice(0, 4)
          : subcommunitiesData
      );
    }

    if (marketplaceData) {
      setMarketplace(
        marketplaceData.length > 4
          ? marketplaceData.slice(0, 4)
          : marketplaceData
      );
    }
  }, [marketplaceData, subcommunitiesData, trends]);

  return (
    <aside className="scrollbar-hide w-72 md:flex fixed top-0 right-0 flex-col hidden h-screen col-span-1 gap-5 px-5 mt-16 overflow-y-scroll bg-white">
      <div className="text-start flex flex-col w-full h-full min-h-full pt-10 pb-16">
        <div className="md:pb-28 flex flex-col flex-grow gap-5 mb-auto">
          {/* Trends */}
          <section className="flex flex-col gap-5">
            <h2 className="text-primary-brown/50 text-lg font-medium">
              Trends
            </h2>
            <div className="flex flex-col gap-3">
              {allTrends.map((trend, index) => (
                <span
                  key={index}
                  onClick={() => handleSearchTrend(trend)}
                  className={`${trend === currentTrend ? "text-green-600 font-bold" : "text-black/80"}  text-sm cursor-pointer`}
                >
                  #{trend}
                </span>
              ))}
            </div>
          </section>

          {/* Your Subcommunities */}
          <section className="flex flex-col gap-5">
            <h2 className="text-primary-brown/50 text-lg font-medium">
              Your Subcommunities
            </h2>

            <div className="flex flex-col gap-5">
              {subcommunities.map((sub, index) => (
                <button
                  key={index}
                  className="text-black/80 flex items-center gap-2 text-sm"
                  onClick={() =>
                    navigate(`/user/subcommunities/${slugifyData(sub.name)}`, {
                      state: { id: sub.id },
                    })
                  }
                >
                  <span className="bg-primary-green/40 flex items-center justify-center w-12 h-12 p-4 font-medium text-center text-white uppercase rounded-full">
                    {sub.name.split(" ")[0][0] + sub.name.split(" ")[1][0]}
                  </span>
                  <span>{sub.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Marketplace */}
          {
            <section className="flex flex-col gap-5">
              <h2 className="text-primary-brown/50 text-lg font-medium">
                Marketplace
              </h2>

              <div className="flex flex-col gap-6">
                {marketplace.length > 0 ? (
                  marketplace.map((item) => (
                    <MarketplaceItem key={item.id} item={item} />
                  ))
                ) : (
                  <p>No products in the marketplace</p>
                )}
              </div>
            </section>
          }
        </div>
      </div>
    </aside>
  );
};

export default FeedTopicsSidebar;

const MarketplaceItem = ({ item }: { item: IMarketPlace }) => {
  faker.seed(123);

  return (
    <div className="flex flex-col gap-3">
      <Link
        className="text-black/80 flex items-center gap-2 text-sm"
        to={`/user/marketplace?product=${item.name.toLowerCase()}`}
      >
        <img
          src={item.image || "/icons/plant.svg"}
          alt="plant"
          onError={(e) => (e.currentTarget.src = "/icons/plant.svg")}
          className="object-contain w-10 h-10 rounded-full"
        />
        <span className="text-primary-green">{item.name}</span>
      </Link>

      <p className="text-secondary-gray/50 text-sm">
        <span className="text-primary-brown">Price: </span>₦{item.price}
      </p>
      <p className="text-secondary-gray/50 text-sm">
        <span className="text-primary-brown">Description: </span>
        {item.description}
      </p>
      <p className="text-secondary-gray/50 text-sm">
        <span className="text-primary-brown">Seller: </span>
        {faker.company.name()}
      </p>
      <p className="text-secondary-gray/50 text-sm">
        <span className="text-primary-brown">Contact: </span>
        {faker.phone.number()}
      </p>
    </div>
  );
};
