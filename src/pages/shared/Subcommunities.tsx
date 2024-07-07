import CreateSubcommunity from "@/components/CreateSubcommunity";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { subcommunities as subcommunitiesData } from "@/constants";
import { Link } from "react-router-dom";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@/components/ui/button";
import { slugifyData, UrlPath } from "@/lib/utils";
import SubcommunityAnalytics from "@/components/admin/SubcommunityAnalytics";
import { Search, Trash2 } from "lucide-react";
import DeleteItemModal from "@/components/DeleteItemModal";

export type SubcommunitiesItemType = (typeof subcommunitiesData)[number];

const Subcommunities = () => {
  const [subcommunities, setSubcommunities] = useState<
    SubcommunitiesItemType[]
  >(subcommunitiesData.slice(0, 2));
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<number>(0);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (e.target.value.length > 0) {
      const filtered = subcommunitiesData.filter(
        (subcommunities) =>
          subcommunities.title
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          subcommunities.description
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
      );
      setSubcommunities(filtered);
    } else {
      setSubcommunities(subcommunitiesData);
    }
  };

  // fetch more subcommunities when user scrolls to the bottom
  const fetchMore = (): void => {
    if (subcommunities.length >= subcommunitiesData.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setSubcommunities(
        subcommunities.concat(
          subcommunitiesData.slice(
            subcommunities.length,
            subcommunities.length + 2
          )
        )
      );
    }, 500);
  };

  // handle join subcommunity
  const handleJoinSubcommunity = (id: number) => {
    setSubcommunities((prevSubcommunities) =>
      prevSubcommunities.map((sub) =>
        sub.id === id ? { ...sub, joined: true } : sub
      )
    );
  };

  // handle leave subcommunity
  const handleLeaveSubcommunity = (id: number) => {
    setSubcommunities((prevSubcommunities) =>
      prevSubcommunities.map((sub) =>
        sub.id === id ? { ...sub, joined: false } : sub
      )
    );
  };

  // handle delete subcommunity
  const handleDelete = (id: number) => {
    const filtered = subcommunities.filter((sub) => sub.id !== id);
    setSubcommunities(filtered);

    setOpenModal(false);
  };

  return (
    <div className="w-full">
      {/* Title */}
      <Helmet>
        <title>
          {" "}
          {UrlPath() === "admin"
            ? "Subcommunity Management"
            : "Subcommunities"}{" "}
          - Agrieco-Connect{" "}
        </title>
        <meta
          name="description"
          content={
            UrlPath() === "admin" ? "Subcommunity Management" : "Subcommunities"
          }
        />
      </Helmet>

      <div
        className={`md:gap-6 ${UrlPath() === "admin" ? "w-full" : "xl:max-w-4xl"} flex flex-col w-full gap-10 p-5 mx-auto`}
      >
        {UrlPath() === "admin" && <SubcommunityAnalytics />}

        {UrlPath() !== "admin" && (
          <>
            <section className="md:items-center md:flex-row md:justify-between flex flex-col items-start w-full gap-5">
              <h2 className="text-sm sm:text-lg md:text-2xl font-bold font-[poppins] text-primary-brown">
                Explore Subcommunities
              </h2>

              <CreateSubcommunity />
            </section>

            <p className="text-sm font-normal text-black">
              Connect with fellow enthusiasts and experts in various
              agricultural fields.
            </p>
          </>
        )}

        <section
          className={`flex flex-col w-full gap-5 ${UrlPath() === "admin" ? "2xl:max-w-4xl mx-auto" : "w-full"}`}
        >
          <Tabs defaultValue="all">
            {UrlPath() !== "admin" && (
              <TabsList className="bg-transparent">
                <TabsTrigger
                  value="all"
                  className="text-black data-[state=active]:text-primary-green data-[state=active]:bg-transparent data-[state=active]:border-b-2 rounded-none bg-transparent data-[state=active]:border-primary-green pb-2"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="subcommunities"
                  className="pb-2 text-black data-[state=active]:text-primary-green data-[state=active]:bg-transparent data-[state=active]:border-b-2 rounded-none bg-transparent data-[state=active]:border-primary-green"
                >
                  Your Subcommunities
                </TabsTrigger>
              </TabsList>
            )}

            {UrlPath() === "admin" && (
              <div className="flex flex-col w-full gap-5 pb-5">
                <h2 className="text-primary-brown">All Communities</h2>

                <div className="bg-black/50 h-[1px] w-full" />

                <div className="bg-secondary-gray/20 md:w-1/2 flex items-center justify-between w-full gap-3 px-3 py-1 rounded-full">
                  <input
                    type="text"
                    className="placeholder:text-secondary-gray/50 focus:outline-none placeholder:text-xs w-full px-3 py-2 text-sm text-black bg-transparent border-none"
                    placeholder="Search for users by name or username"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <Search size={20} className="me-3 text-black" />
                </div>
              </div>
            )}

            <TabsContent value="all">
              <section
                id="subcommunities"
                className="flex flex-col w-full gap-5"
              >
                <InfiniteScroll
                  key={crypto.randomUUID()}
                  pageStart={0}
                  loadMore={fetchMore}
                  hasMore={hasMore}
                  loader={
                    <div className="flex items-center justify-center">
                      <ClipLoader
                        key={0}
                        size={30}
                        color="black"
                        loading={true}
                      />
                    </div>
                  }
                  className="gap-7 flex flex-col w-full"
                >
                  {subcommunities.map((sub) => (
                    <SubcommunitiesItem
                      key={sub.id}
                      item={sub}
                      type="all"
                      handleJoinSubcommunity={handleJoinSubcommunity}
                      handleLeaveSubcommunity={handleLeaveSubcommunity}
                      setOpenModal={setOpenModal}
                      setItemToDeleteId={setItemToDeleteId}
                    />
                  ))}
                </InfiniteScroll>
              </section>
            </TabsContent>

            <TabsContent value="subcommunities">
              <section className="gap-7 flex flex-col w-full">
                {subcommunities.filter((sub) => sub.joined === true).length ===
                0 ? (
                  <p className="text-black">
                    You haven't joined any subcommunities yet.
                  </p>
                ) : (
                  subcommunities
                    .filter((sub) => sub.joined === true)
                    .map((sub) => (
                      <SubcommunitiesItem
                        key={sub.id}
                        item={sub}
                        type="subcommunities"
                        handleJoinSubcommunity={handleJoinSubcommunity}
                        handleLeaveSubcommunity={handleLeaveSubcommunity}
                        setOpenModal={setOpenModal}
                        setItemToDeleteId={setItemToDeleteId}
                      />
                    ))
                )}
              </section>
            </TabsContent>
          </Tabs>

          <DeleteItemModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            handleDelete={() => handleDelete(itemToDeleteId)}
            modalTitle="Delete Subcommunity"
            modalDescription="Are you sure you want to delete this community?"
            toastMessage="Subcommunity has been deleted successfully"
          />
        </section>
      </div>
    </div>
  );
};

export default Subcommunities;

type SubcommunitiesItemProps = {
  item: SubcommunitiesItemType;
  type: "all" | "subcommunities";
  handleJoinSubcommunity: (id: number) => void;
  handleLeaveSubcommunity: (id: number) => void;
  setOpenModal: (open: boolean) => void;
  setItemToDeleteId: (id: number) => void;
};
const SubcommunitiesItem = ({
  item,
  type,
  handleJoinSubcommunity,
  handleLeaveSubcommunity,
  setOpenModal,
  setItemToDeleteId,
}: SubcommunitiesItemProps) => {
  const viewSubcommunityPath =
    UrlPath() === "admin"
      ? "/admin/subcommunity-management"
      : "/user/subcommunities";
  return (
    <div className="flex flex-col w-full h-full gap-3 p-4 bg-white rounded-md shadow-md">
      <section className="flex items-center justify-between gap-2">
        <div className="text-black/80 flex items-center gap-2 text-sm">
          <span className="bg-primary-green/40 flex items-center justify-center w-12 h-12 p-4 font-medium text-center text-white uppercase rounded-full">
            {item.title.split(" ")[0][0] + item.title.split(" ")[1][0]}
          </span>
          <span>{item.title}</span>
        </div>

        {UrlPath() === "admin" && (
          <Link to={`${viewSubcommunityPath}/${slugifyData(item.title)}`}>
            <Button className="border-primary-brown hover:bg-transparent text-secondary-gray py-2 bg-transparent border rounded-none">
              View Activity
            </Button>
          </Link>
        )}
      </section>

      <div className="flex flex-col flex-grow gap-4 pb-5">
        <p className="text-sm font-light leading-relaxed text-black">
          {item.description}
        </p>

        <section className="flex items-center gap-2">
          <span className="text-primary-brown font-semibold">
            {item.category}
          </span>
          <span className="w-[1px] h-5 bg-primary-brown" />
          <span className="text-primary-brown/80 font-semibold">
            {item.members.length} Members
          </span>
        </section>

        <section className="md:flex-row md:items-center md:justify-between flex flex-col gap-4 mt-auto">
          <p className="text-sm text-black">Active {item.lastActive}</p>

          {/* Delete Subcommunity Button */}
          {UrlPath() === "admin" && (
            <button
              onClick={() => {
                setItemToDeleteId(item.id);
                setOpenModal(true);
              }}
            >
              <Trash2 size={20} className="text-red-500" />
            </button>
          )}

          {UrlPath() !== "admin" && (
            <div className="flex items-center gap-3">
              {type === "all" &&
                (item.joined ? (
                  <Button
                    onClick={() => handleLeaveSubcommunity(item.id)}
                    className="bg-primary-green py-2 text-white rounded-none"
                  >
                    Leave
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleJoinSubcommunity(item.id)}
                    className="bg-primary-green py-2 text-white rounded-none"
                  >
                    Join
                  </Button>
                ))}

              <Link
                to={`/${UrlPath()}/subcommunities/${slugifyData(item.title)}`}
              >
                <Button className="border-primary-brown hover:bg-transparent text-secondary-gray py-2 bg-transparent border rounded-none">
                  View Activity
                </Button>
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
