import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { marketplaceProducts } from "@/constants";
import MarketPlaceAddItem from "@/components/MarketPlaceAddItem";
import CustomDropdown from "@/components/CustomDropdown";
import { useState } from "react";
import { Link } from "react-router-dom";
import SellerInformation from "@/components/SellerInformation";

type MarketPlaceItemType = (typeof marketplaceProducts)[number];

const dropdownItemsOne = ["Popular", "New", "Sale", "All"];

const dropdownItemsTwo = [
  "Recently Added",
  "Most Liked",
  "Most Viewed",
  "Most Commented",
  "Most Shared",
];

const MarketPlace = () => {
  return (
    <div className="w-full">
      {/* Title */}
      <Helmet>
        <title> Market Place - Agrieco-Connect </title>
        <meta name="description" content="Market Place" />
      </Helmet>

      <div className="flex flex-col gap-10 md:gap-6 p-5 w-full">
        <section className="flex items-center justify-between w-full gap-5">
          <h2 className="text-lg md:text-2xl font-bold font-[poppins] text-primary-brown">
            Market Place
          </h2>

          <MarketPlaceAddItem />
        </section>

        <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between w-full md:gap-5">
          <h2 className="font-semibold text-secondary-gray text-lg">
            Available Items For Sale
          </h2>

          <div className="flex md:items-center gap-5 flex-wrap md:justify-center">
            <CustomDropdown
              initialSelectedItem="Popular"
              items={dropdownItemsOne}
            />
            <CustomDropdown
              initialSelectedItem="New"
              items={dropdownItemsTwo}
            />
            <Link
              to="/user/marketplace/my-items"
              className="border-primary-brown w-fit px-7 flex items-center gap-2 py-2 font-medium text-center bg-white border"
            >
              <span className="text-secondary-gray text-sm">My Items</span>
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {marketplaceProducts.map((item) => (
            <MarketPlaceItem key={item.id} item={item} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default MarketPlace;

const MarketPlaceItem = ({ item }: { item: MarketPlaceItemType }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-white col-span-1 w-full rounded-xl shadow p-4 flex flex-col gap-5 relative">
      <div className="flex items-center gap-5">
        <img
          src={item.image}
          alt-={item.name}
          className="w-14 h-14 object-cover rounded-full"
        />
        <p className="flex items-center gap-1 text-base">
          <span className="font-normal text-primary-brown">Price:</span>
          <span className="text-secondary-gray">{item.price}</span>
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-normal text-primary-green">{item.name}</h2>
        <p className="text-sm text-secondary-gray">{item.location}</p>
      </div>

      <p className="text-secondary-gray/50 text-sm text-start leading-normal">
        {item.description}
      </p>

      <div className="flex flex-col gap-3 w-full mt-auto">
        <button
          className="text-sm flex items-center gap-1"
          onClick={() => setOpenModal(true)}
        >
          <span className="font-normal text-primary-brown">Seller:</span>
          <span className="text-secondary-gray">{item.seller}</span>
        </button>

        <Button className="bg-primary-green text-white text-center py-2 px-5 rounded-none hover:bg-primary-green w-full md:w-1/2 hover:scale-105 transition">
          Purchase
        </Button>
      </div>

      <SellerInformation
        item={item}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};
