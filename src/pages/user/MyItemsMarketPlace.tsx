import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { marketplaceProducts } from "@/constants";
import MarketPlaceAddItem from "@/components/MarketPlaceAddItem";
import CustomDropdown from "@/components/CustomDropdown";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import MarketPlaceEditItem from "@/components/MarketPlaceEditItem";
import DeleteItemModal from "@/components/DeleteItemModal";

export type MarketPlaceItemType = (typeof marketplaceProducts)[number];

const dropdownItemsOne = ["Popular", "New", "Sale", "All"];

const dropdownItemsTwo = [
  "Recently Added",
  "Most Liked",
  "Most Viewed",
  "Most Commented",
  "Most Shared",
];

const MyItemsMarketPlace = () => {
  return (
    <div className="w-full">
      {/* Title */}
      <Helmet>
        <title> My Items | Market Place - Agrieco-Connect </title>
        <meta name="description" content="My Items - Market Place" />
      </Helmet>

      <div className="flex flex-col gap-10 md:gap-6 p-5 w-full">
        <section className="flex items-center justify-between w-full gap-5">
          <h2 className="text-lg md:text-2xl font-bold font-[poppins] text-primary-brown">
            My Items
          </h2>

          <MarketPlaceAddItem />
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

export default MyItemsMarketPlace;

const MarketPlaceItem = ({ item }: { item: MarketPlaceItemType }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
        <p className="text-sm flex items-center gap-1">
          <span className="font-normal text-primary-brown">Seller:</span>
          <span className="text-secondary-gray">{item.seller}</span>
        </p>

        <div className="flex items-center gap-4">
          <button onClick={() => setOpenEditModal(true)}>
            <Edit size={20} className="text-green-500" />
          </button>

          <button onClick={() => setOpenDeleteModal(true)}>
            <Trash2 size={20} className="text-red-500" />
          </button>
        </div>
      </div>

      <MarketPlaceEditItem
        item={item}
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
      />

      <DeleteItemModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
      />
    </div>
  );
};
