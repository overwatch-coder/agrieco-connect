import { Helmet } from "react-helmet-async";
import { marketplaceProducts } from "@/constants";
import MarketPlaceAddItem from "@/components/MarketPlaceAddItem";
import { useEffect, useState } from "react";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import MarketPlaceEditItem from "@/components/MarketPlaceEditItem";
import DeleteItemModal from "@/components/DeleteItemModal";
import { Link } from "react-router-dom";
import { useFetch, useMutateData } from "@/hooks/useFetch";
import { useAuth } from "@/hooks/useAuth";
import ResponsiveArticle from "react-content-loader";
import { faker } from "@faker-js/faker";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export type MarketPlaceItemType = (typeof marketplaceProducts)[number];

const MyItemsMarketPlace = () => {
  const [auth] = useAuth();
  const [openAddItemModal, setOpenAddItemModal] = useState(false);
  const {
    data: marketplaceProducts,
    isLoading,
    refetch: refetchMarketplaceProducts,
  } = useFetch<IMarketPlace[]>({
    queryKey: "marketplace",
    url: "/marketplaces/items",
    enabled: true,
  });

  const [filteredItems, setFilteredItems] = useState<IMarketPlace[]>([]);

  useEffect(() => {
    if (marketplaceProducts) {
      const sortedItems = marketplaceProducts.slice().sort((a, b) => {
        return b.id - a.id;
      });
      setFilteredItems(
        sortedItems.filter((item) => item.user_id === auth?.user.id)
      );
    }
  }, [auth?.user.id, marketplaceProducts]);

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
        <title> My Items | Market Place - Agrieco-Connect </title>
        <meta name="description" content="My Items - Market Place" />
      </Helmet>

      <div className="md:gap-6 flex flex-col w-full gap-10 p-5">
        <Link
          to="/user/marketplace"
          className="text-primary-brown flex items-center gap-2"
        >
          <ArrowLeft size={20} className="text-primary-brown" />
          <span>Go Back</span>
        </Link>

        <section className="flex items-center justify-between w-full gap-5">
          <h2 className="text-lg md:text-2xl font-bold font-[poppins] text-primary-brown">
            My Items
          </h2>

          <MarketPlaceAddItem
            open={openAddItemModal}
            setOpen={setOpenAddItemModal}
            refetch={refetchMarketplaceProducts}
          />
        </section>

        {filteredItems.length > 0 ? (
          <section className="md:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-5">
            {filteredItems.map((item) => (
              <MarketPlaceItem
                key={item.id}
                item={item}
                refetch={refetchMarketplaceProducts}
              />
            ))}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5 text-center">
            <h2 className="text-primary-brown text-lg font-bold">
              You have no items in your marketplace. Please add some items to
              your marketplace to see them here.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyItemsMarketPlace;

type MarketPlaceItemProps = {
  item: IMarketPlace;
  refetch?: () => void;
};

const MarketPlaceItem = ({ item, refetch }: MarketPlaceItemProps) => {
  const [auth] = useAuth();
  const queryClient = useQueryClient();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { mutateAsync, isPending: pending } = useMutateData<null, IMarketPlace>(
    {
      url: `/marketplaces/items/${item.id}`,
      config: {
        method: "DELETE",
        token: auth?.user.token,
        queryKey: "marketplace",
      },
    }
  );

  const handleDeleteItem = async () => {
    await mutateAsync(null, {
      onSuccess: () => {
        toast.success("Item deleted successfully");

        queryClient.invalidateQueries({
          queryKey: ["marketplace", "/marketplaces/items"],
        });

        if (refetch) {
          refetch();
        }

        setOpenDeleteModal(false);
      },
      onError: () => {
        toast.error("Failed to delete item");
      },
    });
  };

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
        <p className="flex items-center gap-1 text-sm">
          <span className="text-primary-brown font-normal">Seller:</span>
          <span className="text-secondary-gray">{faker.company.name()}</span>
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
        open={openEditModal}
        setOpen={setOpenEditModal}
      />

      <DeleteItemModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        modalTitle={`Delete "${item.name}"`}
        modalDescription="Are you sure you want to delete this item?"
        deleteFn={() => handleDeleteItem()}
        pending={pending}
      />
    </div>
  );
};
