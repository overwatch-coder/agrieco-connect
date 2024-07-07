import { Helmet } from "react-helmet-async";
import { marketplaceEvents as events } from "@/constants";
import CustomDropdown from "@/components/CustomDropdown";
import { Link } from "react-router-dom";
import { slugifyData, UrlPath } from "@/lib/utils";
import AddEvent from "@/components/AddEvent";
import { useState } from "react";
import EventManagementAnalytics from "@/components/admin/EventManagementAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyEvents from "@/pages/shared/MyEvents";
import { Search, Trash2 } from "lucide-react";
import DeleteItemModal from "@/components/DeleteItemModal";

type EventsItemType = (typeof events)[number];

const dropdownItemsOne = ["Event Type", "New", "Sale", "All"];

const dropdownItemsTwo = [
  "Activity",
  "Most Liked",
  "Most Viewed",
  "Most Commented",
  "Most Shared",
];

const Events = () => {
  const [selectedItem, setSelectedItem] = useState("Event Type");
  const [selectedItem2, setSelectedItem2] = useState("Activity");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [openModal, setOpenModal] = useState(false);
  const [itemToBeDeleteId, setItemToBeDeleteId] = useState<number>(0);

  // handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (e.target.value.length > 0) {
      const filtered = filteredEvents.filter(
        (item) =>
          item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.eventType.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  };

  // handle delete item
  const handleDelete = (id: string) => {
    const filtered = filteredEvents.filter((item) => item.id.toString() !== id);
    setFilteredEvents(filtered);

    setOpenModal(false);
  };

  return (
    <div className="w-full">
      {/* Title */}
      <Helmet>
        <title>
          {" "}
          {UrlPath() === "admin" ? "Event Management" : "Events"} -
          Agrieco-Connect{" "}
        </title>
        <meta
          name="description"
          content={UrlPath() === "admin" ? "Event Management" : "Events"}
        />
      </Helmet>

      <div className="md:gap-6 flex flex-col w-full gap-10 p-5">
        {UrlPath() === "admin" && <EventManagementAnalytics />}

        {UrlPath() !== "admin" && (
          <>
            <section className="flex items-center justify-between w-full gap-5">
              <h2 className="text-lg md:text-2xl font-bold font-[poppins] text-primary-brown">
                All Events
              </h2>

              <AddEvent />
            </section>

            <section className="md:flex-row md:items-center md:justify-between md:gap-5 flex flex-col w-full gap-3">
              <h2 className="text-primary-green text-xl font-medium">
                <span className="text-primary-brown">Upcoming</span> Events
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
                  to="/user/events/my-events"
                  className="border-primary-brown w-fit px-7 flex items-center gap-2 py-2 font-medium text-center bg-white border"
                >
                  <span className="text-secondary-gray text-sm">My Events</span>
                </Link>
              </div>
            </section>
          </>
        )}

        <Tabs defaultValue="all-events">
          {UrlPath() === "admin" && (
            <TabsList className="flex items-center justify-between gap-2 bg-transparent">
              <div className="flex items-center gap-3">
                <TabsTrigger
                  value="all-events"
                  className="text-primary-brown data-[state=active]:text-primary-brown data-[state=active]:bg-transparent data-[state=active]:border-b-2 rounded-none bg-transparent data-[state=active]:border-primary-green pb-2"
                >
                  All Events
                </TabsTrigger>

                <TabsTrigger
                  value="my-events"
                  className="pb-2 text-primary-brown data-[state=active]:text-primary-brown data-[state=active]:bg-transparent data-[state=active]:border-b-2 rounded-none bg-transparent data-[state=active]:border-primary-green"
                >
                  My Events
                </TabsTrigger>
              </div>

              <AddEvent />
            </TabsList>
          )}

          {UrlPath() === "admin" && (
            <div className="flex flex-col w-full gap-5 pt-5 pb-5">
              <div className="bg-black/50 h-[1px] w-full" />

              <div className="bg-secondary-gray/20 md:w-1/2 flex items-center justify-between w-full gap-3 px-3 py-1 rounded-full">
                <input
                  type="text"
                  className="placeholder:text-secondary-gray/50 focus:outline-none placeholder:text-xs w-full px-3 py-2 text-sm text-black bg-transparent border-none"
                  placeholder="Search for events by name"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Search size={20} className="me-3 text-black" />
              </div>
            </div>
          )}

          <TabsContent value="all-events">
            <section className="flex flex-col w-full gap-5">
              {filteredEvents.length > 0 ? (
                <section className="md:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-5">
                  {filteredEvents.map((item) => (
                    <EventsItem
                      key={item.id}
                      item={item}
                      setOpenModal={setOpenModal}
                      setItemToBeDeleteId={setItemToBeDeleteId}
                    />
                  ))}
                </section>
              ) : (
                <div className="flex flex-col items-center justify-center w-full gap-5 mx-auto text-center">
                  <h2 className="text-primary-brown text-lg font-bold">
                    No Events Found
                  </h2>

                  <p className="text-secondary-gray text-sm">
                    Try changing the search term or filter
                  </p>
                </div>
              )}
            </section>
          </TabsContent>

          <TabsContent value="my-events">
            <MyEvents
              adminFilteredEvents={filteredEvents.filter(
                (item) => item.isUser === true
              )}
              handleAdminEventDelete={handleDelete}
            />
          </TabsContent>
        </Tabs>

        {UrlPath() !== "admin" && (
          <section className="md:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-5">
            {filteredEvents.map((item) => (
              <EventsItem
                key={item.id}
                item={item}
                setOpenModal={setOpenModal}
                setItemToBeDeleteId={setItemToBeDeleteId}
              />
            ))}
          </section>
        )}
      </div>

      <DeleteItemModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleDelete={() => handleDelete(itemToBeDeleteId.toString())}
        modalTitle="Delete Event"
        modalDescription="Are you sure you want to delete this event?"
        toastMessage="Event has been deleted successfully"
      />
    </div>
  );
};

export default Events;

type EventsItemProps = {
  item: EventsItemType;
  setOpenModal: (open: boolean) => void;
  setItemToBeDeleteId: (id: number) => void;
};
const EventsItem = ({
  item,
  setOpenModal,
  setItemToBeDeleteId,
}: EventsItemProps) => {
  return (
    <div className="rounded-xl relative flex flex-col w-full h-full col-span-1 gap-3 p-4 bg-white shadow">
      {item.isFree && (
        <p className="top-5 left-5 text-primary-green absolute z-30 px-3 py-1 text-sm uppercase bg-white rounded-md">
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

        <div className="flex items-center justify-between gap-4">
          <p className="text-secondary-gray text-sm uppercase">
            {item.eventType === "online" ? "Online Event" : "In-person"} -{" "}
            <span className="capitalize">{item.location}</span>
          </p>

          {UrlPath() === "admin" && (
            <button
              onClick={() => {
                setItemToBeDeleteId(item.id);
                setOpenModal(true);
              }}
            >
              <Trash2 size={20} className="text-red-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
