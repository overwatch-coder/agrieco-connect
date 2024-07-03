import { Helmet } from "react-helmet-async";
import { marketplaceEvents as events } from "@/constants";
import CustomDropdown from "@/components/CustomDropdown";
import { Link } from "react-router-dom";
import { slugifyData } from "@/lib/utils";
import AddEvent from "@/components/AddEvent";

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
  return (
    <div className="w-full">
      {/* Title */}
      <Helmet>
        <title> Events - Agrieco-Connect </title>
        <meta name="description" content="Events" />
      </Helmet>

      <div className="md:gap-6 flex flex-col w-full gap-10 p-5">
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
              initialSelectedItem="Event Type"
              items={dropdownItemsOne}
            />
            <CustomDropdown
              initialSelectedItem="Activity"
              items={dropdownItemsTwo}
            />

            <Link
              to="/user/events/my-events"
              className="border-primary-brown w-fit px-7 flex items-center gap-2 py-2 font-medium text-center bg-white border"
            >
              <span className="text-secondary-gray text-sm">My Events</span>
            </Link>
          </div>
        </section>

        <section className="md:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-5">
          {events.map((item) => (
            <EventsItem key={item.id} item={item} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Events;

const EventsItem = ({ item }: { item: EventsItemType }) => {
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

        <p className="text-secondary-gray text-sm uppercase">
          {item.eventType === "online" ? "Online Event" : "In-person"} -{" "}
          <span className="capitalize">{item.location}</span>
        </p>
      </div>
    </div>
  );
};
