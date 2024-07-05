import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { marketplaceProducts } from "@/constants";
import MarketPlaceAddItem from "@/components/MarketPlaceAddItem";
import CustomDropdown from "@/components/CustomDropdown";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const [selectedItem, setSelectedItem] = useState("Popular");
  const [selectedItem2, setSelectedItem2] = useState("New");

  const [filteredItems, setFilteredItems] = useState(marketplaceProducts);
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  console.log(searchParams.get("product"));

  const filterItems = useCallback(() => {
    const product = searchParams.get("product");

    if (product) {
      setFilteredItems(
        marketplaceProducts.filter((item) =>
          item.name.toLowerCase().includes(product.toLowerCase())
        )
      );
    } else {
      setFilteredItems(marketplaceProducts);
    }
  }, [searchParams]);

  useEffect(() => {
    filterItems();

    return () => {
      setFilteredItems(marketplaceProducts);
    };
  }, [filterItems, searchParams]);

  return (
    <div className="w-full">
      {/* Title */}
      <Helmet>
        <title> Market Place - Agrieco-Connect </title>
        <meta name="description" content="Market Place" />
      </Helmet>

      <div className="md:gap-6 flex flex-col w-full gap-10 p-5">
        <section className="flex items-center justify-between w-full gap-5">
          <h2 className="text-lg md:text-2xl font-bold font-[poppins] text-primary-brown">
            Market Place
          </h2>

          <MarketPlaceAddItem />
        </section>

        <section className="md:flex-row md:items-center md:justify-between md:gap-5 flex flex-col w-full gap-3">
          <h2 className="text-secondary-gray text-lg font-semibold">
            Available Items For Sale
          </h2>

          <div className="md:items-center md:justify-center flex flex-wrap gap-5">
            <CustomDropdown
              items={dropdownItemsOne}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
            <CustomDropdown
              items={dropdownItemsTwo}
              selectedItem={selectedItem2}
              setSelectedItem={setSelectedItem2}
            />
            <Link
              to="/user/marketplace/my-items"
              className="border-primary-brown w-fit px-7 flex items-center gap-2 py-2 font-medium text-center bg-white border"
            >
              <span className="text-secondary-gray text-sm">My Items</span>
            </Link>
          </div>
        </section>

        {filteredItems.length > 0 ? (
          <section className="md:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-5">
            {filteredItems.map((item) => (
              <MarketPlaceItem key={item.id} item={item} />
            ))}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5 text-center">
            <h2 className="text-primary-brown text-lg font-bold">
              No Items Found
            </h2>

            <p className="text-secondary-gray text-sm">
              Try changing the search term or filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPlace;

const MarketPlaceItem = ({ item }: { item: MarketPlaceItemType }) => {
  const [openModal, setOpenModal] = useState(false);

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
        <button className="flex items-center gap-1 text-sm">
          <span className="text-primary-brown font-normal">Seller:</span>
          <span className="text-secondary-gray">{item.seller}</span>
        </button>

        <Button
          onClick={() => setOpenModal(true)}
          className="bg-primary-green hover:bg-primary-green md:w-1/2 hover:scale-105 w-full px-5 py-2 text-center text-white transition rounded-none"
        >
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
