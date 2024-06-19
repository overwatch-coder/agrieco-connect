import { TbMessageChatbot } from "react-icons/tb";
import { Link } from "react-router-dom";

const FeedTopicsSidebar = () => {
  return (
    <aside className="scrollbar-hide w-72 md:flex fixed top-0 right-0 flex-col hidden h-screen col-span-1 gap-5 px-5 mt-16 overflow-y-scroll bg-white">
      <div className="text-start flex flex-col w-full h-full min-h-full pt-10 pb-16">
        <div className="flex flex-col flex-grow gap-5 mb-auto">
          {/* Topics */}
          <section className="flex flex-col gap-5">
            <h2 className="text-primary-brown/50 text-lg font-medium">
              Topics
            </h2>
            <div className="flex flex-col gap-3">
              <Link
                className="text-black/80 text-sm"
                to="/user/topics?topic=Climate-Smart Agriculture"
              >
                #Climate-Smart Agriculture
              </Link>
              <Link
                className="text-black/80 text-sm"
                to="/user/topics?topic=Organic Farming"
              >
                #Organic Farming
              </Link>
              <Link
                className="text-black/80 text-sm"
                to="/user/topics?topic=Crop Rotation Techniques"
              >
                #Crop Rotation Techniques
              </Link>
              <Link
                className="text-black/80 text-sm"
                to="/user/topics?topic=Market Trends and Forecasts"
              >
                #Market Trends and Forecasts
              </Link>
            </div>
          </section>

          {/* Your Subcommunities */}
          <section className="flex flex-col gap-5">
            <h2 className="text-primary-brown/50 text-lg font-medium">
              Your Subcommunities
            </h2>

            <div className="flex flex-col gap-5">
              <Link
                className="text-black/80 flex items-center gap-2 text-sm"
                to="/user/subcommunities?community=sustainable farming"
              >
                <span className="bg-primary-green/40 flex items-center justify-center w-12 h-12 p-4 font-medium text-center text-white rounded-full">
                  SF
                </span>
                <span>Sustainable Farming</span>
              </Link>

              <Link
                className="text-black/80 flex items-center gap-2 text-sm"
                to="/user/subcommunities?community=urban agriculture"
              >
                <span className="bg-primary-green/40 flex items-center justify-center w-12 h-12 p-4 font-medium text-center text-white rounded-full">
                  UA
                </span>
                <span>Urban Agriculture</span>
              </Link>

              <Link
                className="text-black/80 flex items-center gap-2 text-sm"
                to="/user/subcommunities?community=organic farming"
              >
                <span className="bg-primary-green/40 flex items-center justify-center w-12 h-12 p-4 font-medium text-center text-white rounded-full">
                  OF
                </span>
                <span>Organic Farming</span>
              </Link>
            </div>
          </section>

          {/* Marketplace */}
          <section className="flex flex-col gap-5">
            <h2 className="text-primary-brown/50 text-lg font-medium">
              Marketplace
            </h2>

            <div className="flex flex-col gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <MarketplaceItem key={i} />
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col items-end w-full h-full py-10">
          <button className="pb-10">
            <TbMessageChatbot
              size={45}
              strokeWidth={1}
              className="text-primary-green"
            />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default FeedTopicsSidebar;

const MarketplaceItem = () => {
  return (
    <div className="flex flex-col gap-3">
      <Link
        className="text-black/80 flex items-center gap-2 text-sm"
        to="/user/marketplace?product=organic tomato seeds"
      >
        <img
          src="/icons/plant.svg"
          alt="plant"
          className="object-contain w-10 h-10 rounded-full"
        />
        <span className="text-primary-green">Organic Tomato Seeds</span>
      </Link>

      <p className="text-secondary-gray/50 text-sm">
        <span className="text-primary-brown">Price: </span>
        ₦2,500 per pack
      </p>
      <p className="text-secondary-gray/50 text-sm">
        <span className="text-primary-brown">Description: </span>
        High-yield organic tomato seeds suitable for all climates. Certified
        organic and non-GMO.
      </p>
      <p className="text-secondary-gray/50 text-sm">
        <span className="text-primary-brown">Seller: </span>
        Green Farms Nigeria
      </p>
      <p className="text-secondary-gray/50 text-sm">
        <span className="text-primary-brown">Contact: </span>
        greenfarms@example.com
      </p>
    </div>
  );
};
