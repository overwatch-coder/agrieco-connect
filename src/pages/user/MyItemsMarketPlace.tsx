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

      <div className="md:gap-6 flex flex-col w-full gap-10 p-5">
        <section className="flex items-center justify-between w-full gap-5">
          <h2 className="text-lg md:text-2xl font-bold font-[poppins] text-primary-brown">
            My Items
          </h2>

          <MarketPlaceAddItem />
        </section>

        <section className="md:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-5">
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
    <div className="rounded-xl relative flex flex-col w-full col-span-1 gap-5 p-4 bg-white shadow">
      <div className="flex items-center gap-5">
        <img
          src={item.image}
          alt-={item.name}
          className="w-14 h-14 object-cover rounded-full"
        />
        <p className="flex items-center gap-1 text-base">
          <span className="text-primary-brown font-normal">Price:</span>
          <span className="text-secondary-gray">{item.price}</span>
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-primary-green text-lg font-normal">{item.name}</h2>
        <p className="text-secondary-gray text-sm">{item.location}</p>
      </div>

      <p className="text-secondary-gray/50 text-start text-sm leading-normal">
        {item.description}
      </p>

      <div className="flex flex-col w-full gap-3 mt-auto">
        <p className="flex items-center gap-1 text-sm">
          <span className="text-primary-brown font-normal">Seller:</span>
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
