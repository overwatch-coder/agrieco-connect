import { Helmet } from "react-helmet-async";
import { marketplaceEvents } from "@/constants";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import DeleteItemModal from "@/components/DeleteItemModal";
import { useState } from "react";
import { slugifyData, UrlPath } from "@/lib/utils";
import { Link } from "react-router-dom";
import MarketPlaceEditEvent from "@/components/MarketPlaceEditEvent";
import AddEvent from "@/components/AddEvent";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useMutateData } from "@/hooks/useFetch";

export type MarketPlaceEventType = (typeof marketplaceEvents)[number];

type MyEventsProps = {
  adminFilteredEvents?: MarketPlaceEventType[];
  handleAdminEventDelete?: (id?: string) => Promise<void>;
};

const MyEvents = ({
  adminFilteredEvents,
  handleAdminEventDelete,
}: MyEventsProps) => {
  const [filteredEvents, setFilteredEvents] = useState(
    marketplaceEvents.filter((item) => item.isUser === true)
  );
  const [itemToBeDeleteId, setItemToBeDeleteId] = useState<number>(0);

  const [auth] = useAuth();
  const queryClient = useQueryClient();

  const {
    mutateAsync,
    isPending: pending,
    error,
  } = useMutateData<null, any>({
    url: `/events/${itemToBeDeleteId}`,
    config: {
      method: "DELETE",
      token: auth?.user.token,
      queryKey: "events",
    },
  });

  const handleDeleteItem = async () => {
    await mutateAsync(null, {
      onError: () => {
        toast.error("Something went wrong");
        console.log({ error });
      },
    });

    toast.success("Event deleted successfully");

    queryClient.invalidateQueries({
      queryKey: ["events", "/events/my-events"],
    });

    // refetchEvents();
  };

  return (
    <div className="w-full">
      {/* Title */}
      <Helmet>
        <title>
          {" "}
          My Events | {UrlPath() === "admin" ? "Event Management" : "Events"} -
          Agrieco-Connect{" "}
        </title>
        <meta
          name="description"
          content={UrlPath() === "admin" ? "Event Management" : "Events"}
        />
      </Helmet>

      <div
        className={`md:gap-6 flex flex-col w-full gap-10 ${UrlPath() !== "admin" ? "p-5" : "p-0"}`}
      >
        {UrlPath() !== "admin" && (
          <>
            <Link
              to="/user/events"
              className="text-primary-brown flex items-center gap-2"
            >
              <ArrowLeft size={20} className="text-primary-brown" />
              <span>Go Back</span>
            </Link>

            <section className="flex items-center justify-between w-full gap-5">
              <h2 className="text-lg md:text-2xl font-bold font-[poppins] text-primary-brown">
                My Events
              </h2>

              <AddEvent />
            </section>
          </>
        )}

        <section className="md:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-5">
          {UrlPath() === "admin" ? (
            adminFilteredEvents && adminFilteredEvents.length > 0 ? (
              adminFilteredEvents.map((item) => (
                <MarketPlaceEventItem
                  key={item.id}
                  item={item}
                  handleDeleteItem={handleAdminEventDelete!}
                />
              ))
            ) : (
              <div className="md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center col-span-1 gap-5 mx-auto text-center">
                <h2 className="text-primary-brown text-lg font-bold">
                  No Events Found
                </h2>

                <p className="text-secondary-gray text-sm">
                  Try changing the search term or filter
                </p>
              </div>
            )
          ) : (
            filteredEvents.map((item) => (
              <MarketPlaceEventItem
                key={item.id}
                item={item}
                handleDeleteItem={handleDeleteItem}
                setItemToBeDeleteId={setItemToBeDeleteId}
              />
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default MyEvents;

type MarketPlaceEventItemProps = {
  item: MarketPlaceEventType;
  handleDeleteItem: (id?: string) => Promise<void>;
  setItemToBeDeleteId?: (id: number) => void;
  pending?: boolean;
};

const MarketPlaceEventItem = ({
  item,
  handleDeleteItem,
  setItemToBeDeleteId,
  pending,
}: MarketPlaceEventItemProps) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div className="rounded-xl relative flex flex-col w-full h-full col-span-1 gap-3 p-4 bg-white shadow">
      {item.isFree && (
        <p className="top-5 left-5 text-primary-green absolute z-50 px-3 py-1 text-sm uppercase bg-white rounded-md">
          Free
        </p>
      )}

      <div className="rounded-md group w-full h-full md:h-[250px] xl:h-[300px] overflow-hidden">
        <img
          src={item.image}
          alt-={item.title}
          className="rounded-xl group-hover:scale-105 object-cover object-center w-full h-full transition-transform"
        />
      </div>

      <div className="flex flex-col flex-1 gap-4 pb-3">
        <Link
          to={`/user/events/${slugifyData(item.title)}`}
          className="max-w-xs mb-auto text-base font-normal text-black capitalize"
        >
          {item.title}
        </Link>
        <p className="text-primary-brown text-sm">{item.date}</p>

        <div className="md:flex-row md:justify-between md:items-center flex flex-col gap-2">
          <p className="text-secondary-gray text-xs uppercase">
            {item.eventType === "online" ? "Online Event" : "In-person"} -{" "}
            <span className="capitalize">{item.location}</span>
          </p>

          <div className="flex items-center gap-4">
            <button onClick={() => setOpenEditModal(true)}>
              <Edit size={20} className="text-green-500" />
            </button>

            <button
              onClick={() => {
                if (setItemToBeDeleteId) {
                  setItemToBeDeleteId(item.id);
                }

                setOpenDeleteModal(true);
              }}
            >
              <Trash2 size={20} className="text-red-500" />
            </button>
          </div>
        </div>
      </div>

      <MarketPlaceEditEvent
        item={item}
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
      />

      <DeleteItemModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        modalTitle="Delete Event"
        modalDescription="Are you sure you want to delete this event?"
        deleteFn={() => handleDeleteItem()}
        pending={pending}
      />
    </div>
  );
};
