import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { marketplaceProducts } from "@/constants";
import MarketPlaceAddItem from "@/components/MarketPlaceAddItem";
import CustomDropdown from "@/components/CustomDropdown";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SellerInformation from "@/components/SellerInformation";
import DeleteItemModal from "@/components/DeleteItemModal";
import { UrlPath } from "@/lib/utils";
import MarketplaceAnalytics from "@/components/admin/MarketplaceAnalytics";
import { Search, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import LoginModal from "@/components/shared/LoginModal";
import ResponsiveArticle from "react-content-loader";
import { useFetch } from "@/hooks/useFetch";
import { faker } from "@faker-js/faker";

const dropDownItems = ["Popular", "New", "Sale", "All"];

const MarketPlace = () => {
  const [auth] = useAuth();

  const {
    data: marketplaceProducts,
    isLoading,
    refetch: refetchMarketplaceProducts,
  } = useFetch<IMarketPlace[]>({
    queryKey: "marketplace",
    url: "/marketplaces/items",
    enabled: true,
  });

  const [selectedItem, setSelectedItem] = useState("Popular");
  const [openModal, setOpenModal] = useState(false);
  const [itemToBeDeleteId, setItemToBeDeleteId] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredItems, setFilteredItems] = useState<IMarketPlace[]>([]);
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  useEffect(() => {
    if (marketplaceProducts) {
      setFilteredItems(marketplaceProducts);
    }
  }, [marketplaceProducts]);

  // handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!marketplaceProducts) return;

    setSearchTerm(e.target.value);

    if (e.target.value.length > 0) {
      const filtered = marketplaceProducts.filter(
        (item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.description.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(marketplaceProducts);
    }
  };

  const filterItems = useCallback(() => {
    if (!marketplaceProducts) return;

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
  }, [marketplaceProducts, searchParams]);

  useEffect(() => {
    if (!marketplaceProducts) return;

    filterItems();

    return () => {
      setFilteredItems(marketplaceProducts);
    };
  }, [filterItems, marketplaceProducts, searchParams]);

  // handle delete item
  const handleDelete = (id: number) => {
    const filtered = filteredItems.filter((item) => item.id !== id);
    setFilteredItems(filtered);

    setOpenModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-5 mx-auto">
        <ResponsiveArticle width={500} height={500} backgroundColor="#dddddd" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Title */}
      <Helmet>
        <title>
          {" "}
          {UrlPath() === "admin" ? "Market Place Management" : "Market Place"} -
          Agrieco-Connect{" "}
        </title>
        <meta
          name="description"
          content={
            UrlPath() === "admin" ? "Market Place Management" : "Market Place"
          }
        />
      </Helmet>

      <div className="md:gap-6 flex flex-col w-full gap-10 p-5">
        {UrlPath() === "admin" && <MarketplaceAnalytics />}

        {UrlPath() !== "admin" && (
          <>
            <section className="flex items-center justify-between w-full gap-5">
              <h2 className="text-lg md:text-2xl font-bold font-[poppins] text-primary-brown">
                Market Place
              </h2>

              <MarketPlaceAddItem refetch={refetchMarketplaceProducts} />
            </section>

            <section className="md:flex-row md:items-center md:justify-between md:gap-5 flex flex-col w-full gap-3">
              <h2 className="text-secondary-gray text-lg font-semibold">
                Available Items For Sale
              </h2>

              <div className="md:items-center md:justify-center flex flex-wrap gap-5">
                <CustomDropdown
                  items={dropDownItems}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />

                {auth && (
                  <Link
                    to="/user/marketplace/my-items"
                    className="border-primary-brown w-fit px-7 flex items-center gap-2 py-2 font-medium text-center bg-white border"
                  >
                    <span className="text-secondary-gray text-sm">
                      My Items
                    </span>
                  </Link>
                )}
              </div>
            </section>
          </>
        )}

        {UrlPath() === "admin" && (
          <div className="flex flex-col w-full gap-5 pb-5">
            <h2 className="text-primary-brown">All Items</h2>

            <div className="bg-black/50 h-[1px] w-full" />

            <div className="bg-secondary-gray/20 md:w-1/2 flex items-center justify-between w-full gap-3 px-3 py-1 rounded-full">
              <input
                type="text"
                className="placeholder:text-secondary-gray/50 focus:outline-none placeholder:text-xs w-full px-3 py-2 text-sm text-black bg-transparent border-none"
                placeholder="Search for items"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search size={20} className="me-3 text-black" />
            </div>
          </div>
        )}

        {filteredItems.length > 0 ? (
          <section className="md:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-5">
            {filteredItems.map((item) => (
              <MarketPlaceItem
                key={item.id}
                item={item}
                setDeleteOpenModal={setOpenModal}
                setItemToBeDeleteId={setItemToBeDeleteId}
              />
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

      <DeleteItemModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleDelete={() => handleDelete(itemToBeDeleteId)}
        modalTitle="Delete Item"
        modalDescription="Are you sure you want to delete this item?"
        toastMessage="Item has been deleted successfully"
      />
    </div>
  );
};

export default MarketPlace;

type MarketPlaceItemProps = {
  item: IMarketPlace;
  setDeleteOpenModal: (open: boolean) => void;
  setItemToBeDeleteId: (id: number) => void;
};

const MarketPlaceItem = ({
  item,
  setDeleteOpenModal,
  setItemToBeDeleteId,
}: MarketPlaceItemProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [auth] = useAuth();

  return (
    <div className="rounded-xl relative flex flex-col w-full col-span-1 gap-5 p-4 bg-white shadow">
      <div className="flex items-center gap-5">
        <img
          src={item.image}
          alt-={item.name}
          onError={(e) => (e.currentTarget.src = faker.image.avatar())}
          className="w-14 h-14 object-cover rounded-full"
        />
        <p className="flex items-center gap-1 text-base">
          <span className="text-primary-brown font-normal">Price:</span>
          <span className="text-secondary-gray">{item.price}</span>
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-primary-green text-lg font-normal">{item.name}</h2>
        <p className="text-secondary-gray text-sm">{faker.location.city()}</p>
      </div>

      <p className="text-secondary-gray/50 text-start text-sm leading-normal">
        {item.description}
      </p>

      <div className="flex flex-col w-full gap-3 mt-auto">
        <button className="flex items-center gap-1 text-sm">
          <span className="text-primary-brown font-normal">Seller:</span>
          <span className="text-secondary-gray">{faker.company.name()}</span>
        </button>

        <div className="flex items-center justify-between w-full gap-3 mt-auto">
          {auth ? (
            <Button
              onClick={() => setOpenModal(true)}
              className="bg-primary-green hover:bg-primary-green md:w-1/2 hover:scale-105 w-full px-5 py-3 text-sm text-center text-white transition rounded-none"
            >
              Contact Seller
            </Button>
          ) : (
            <LoginModal
              className="bg-primary-green hover:bg-primary-green md:w-1/2 hover:scale-105 w-full px-5 py-3 text-sm text-center text-white transition rounded-none"
              hasChildren={true}
            >
              Contact Seller
            </LoginModal>
          )}

          {UrlPath() === "admin" && (
            <button
              onClick={() => {
                setItemToBeDeleteId(item.id);
                setDeleteOpenModal(true);
              }}
            >
              <Trash2 size={20} className="text-red-500" />
            </button>
          )}
        </div>
      </div>

      <SellerInformation
        item={item}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};
