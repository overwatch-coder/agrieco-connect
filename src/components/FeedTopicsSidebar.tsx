import {
  agriculturalTrends,
  subcommunities,
  marketplaceProducts,
} from "@/constants";
import { slugifyData } from "@/lib/utils";
import { Link } from "react-router-dom";

const agriculturalTrendHashtags = Array.from(
  new Set(agriculturalTrends.map((trend) => trend.category))
).slice(0, 5);

const FeedTopicsSidebar = () => {
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
              {agriculturalTrendHashtags.map((trend) => (
                <Link
                  className="text-black/80 text-sm"
                  to={`/user/agriculture-trends?trend=${trend}`}
                >
                  #{trend}
                </Link>
              ))}
            </div>
          </section>

          {/* Your Subcommunities */}
          <section className="flex flex-col gap-5">
            <h2 className="text-primary-brown/50 text-lg font-medium">
              Your Subcommunities
            </h2>

            <div className="flex flex-col gap-5">
              {subcommunities.slice(0, 4).map((sub) => (
                <Link
                  className="text-black/80 flex items-center gap-2 text-sm"
                  to={`/user/subcommunities/${slugifyData(sub.title)}`}
                >
                  <span className="bg-primary-green/40 flex items-center justify-center w-12 h-12 p-4 font-medium text-center text-white rounded-full">
                    {sub.title.split(" ")[0][0] + sub.title.split(" ")[1][0]}
                  </span>
                  <span>{sub.title}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Marketplace */}
          <section className="flex flex-col gap-5">
            <h2 className="text-primary-brown/50 text-lg font-medium">
              Marketplace
            </h2>

            <div className="flex flex-col gap-6">
              {marketplaceProducts.slice(0, 4).map((item) => (
                <MarketplaceItem key={item.id} item={item} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
};

export default FeedTopicsSidebar;

const MarketplaceItem = ({
  item,
}: {
  item: (typeof marketplaceProducts)[number];
}) => {
  return (
    <div className="flex flex-col gap-3">
      <Link
        className="text-black/80 flex items-center gap-2 text-sm"
        to={`/user/marketplace?product=${item.name.toLowerCase()}`}
      >
        <img
          src="/icons/plant.svg"
          alt="plant"
          className="object-contain w-10 h-10 rounded-full"
        />
        <span className="text-primary-green">{item.name}</span>
      </Link>

      <p className="text-secondary-gray/50 text-sm">
        <span className="text-primary-brown">Price: </span>
        {item.price}
      </p>
      <p className="text-secondary-gray/50 text-sm">
        <span className="text-primary-brown">Description: </span>
        {item.description}
      </p>
      <p className="text-secondary-gray/50 text-sm">
        <span className="text-primary-brown">Seller: </span>
        {item.seller}
      </p>
      <p className="text-secondary-gray/50 text-sm">
        <span className="text-primary-brown">Contact: </span>
        {item.contact}
      </p>
    </div>
  );
};
