import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, X } from "lucide-react";
import { AiOutlineSearch } from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import { faker } from "@faker-js/faker";
import { useAuth } from "@/hooks/useAuth";

type SearchType = {
  id: number;
  name: string;
  image: string;
  type: string;
  link: string;
};

const getUrl = (type: string, isAdmin: boolean) => {
  switch (type) {
    case "users":
      return isAdmin ? "user-management" : "feed";
    case "communities":
      return isAdmin ? "subcommunity-management" : "subcommunities";
    case "events":
      return isAdmin ? "event-management" : "events";
    case "marketplace":
      return isAdmin ? "marketplace-management" : "marketplace";
    default:
      return "feed";
  }
};

const SearchBox = ({ size }: { size?: number }) => {
  const [auth] = useAuth();
  const isAdmin = auth?.user?.role === "admin";

  faker.seed(123);

  // Fetch data
  const { data: eventsData } = useFetch<IEvent[]>({
    queryKey: "events",
    url: "/events",
  });
  const { data: usersData } = useFetch<IFeedUser[]>({
    queryKey: "users",
    url: "/users",
  });
  const { data: communitiesData } = useFetch<ICommunity[]>({
    queryKey: "communities",
    url: "/communities",
  });
  const { data: marketplaceProductsData } = useFetch<IMarketPlace[]>({
    queryKey: "marketplace",
    url: "/marketplaces/items",
  });

  const [search, setSearch] = useState("");
  const [allSearchData, setAllSearchData] = useState<SearchType[]>([]);
  const [searchData, setSearchData] = useState<SearchType[]>([]);

  useEffect(() => {
    const mergeData = (data: any[], type: string, link: string) => {
      return data.map((item: any) => ({
        id: item.id,
        name: item.name || item.title || item.fullname,
        image: item.image || item.avatar || faker.image.urlPicsumPhotos(),
        type,
        link,
      }));
    };

    const updatedData = [
      ...(usersData
        ? mergeData(
            usersData,
            isAdmin ? "User management" : "User Feeds",
            getUrl("users", isAdmin)
          )
        : []),
      ...(communitiesData
        ? mergeData(
            communitiesData,
            isAdmin ? "Subcommunity management" : "Subcommunities",
            getUrl("communities", isAdmin)
          )
        : []),
      ...(eventsData
        ? mergeData(
            eventsData,
            isAdmin ? "Event Management" : "Events",
            "/events"
          )
        : []),
      ...(marketplaceProductsData
        ? mergeData(
            marketplaceProductsData,
            isAdmin ? "Marketplace management" : "Marketplace",
            getUrl("marketplace", isAdmin)
          )
        : []),
    ];

    setAllSearchData(updatedData);
  }, [
    usersData,
    communitiesData,
    eventsData,
    marketplaceProductsData,
    isAdmin,
  ]);

  const showFilteredSearches = useCallback(() => {
    if (search.trim() === "") {
      setSearchData([]);
      return;
    }
    setSearchData(
      allSearchData.filter(
        (data) =>
          data.name.toLowerCase().includes(search.toLowerCase()) ||
          data.type.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, allSearchData]);

  useEffect(() => {
    showFilteredSearches();
  }, [search, showFilteredSearches]);

  return (
    <Dialog>
      <DialogTrigger className="md:bg-secondary-gray/10 md:rounded-full hover:scale-105 bg-white/30 md:items-center md:flex-col flex flex-row gap-3 p-4 transition rounded">
        <AiOutlineSearch
          size={size || 20}
          className="md:text-primary-brown text-white"
        />
        <span className="md:hidden text-base text-white">Search</span>
      </DialogTrigger>

      <DialogContent className="w-full max-w-2xl h-[90vh] flex bg-white rounded-none flex-col gap-5 overflow-y-scroll scrollbar-hide">
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown md:text-2xl text-xl font-bold">
              Looking for something?
            </span>
            <span className="text-secondary-gray text-sm font-normal">
              Search for anything you want here
            </span>
          </DialogTitle>
          <DialogClose
            onClick={() => setSearch("")}
            className="flex items-center justify-center w-6 h-6 border border-red-500 rounded-full"
          >
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        <div className="flex flex-col w-full gap-4">
          <div className="border-secondary-gray flex items-center gap-3 px-2 py-1 border rounded-md">
            <input
              type="text"
              placeholder="Search..."
              className="text-primary-gray flex-grow w-full px-3 py-2 text-sm bg-transparent outline-none"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button>
              <Search size={25} className="text-secondary-gray" />
            </button>
          </div>

          {search === "" ? (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-primary-brown font-bold text-center">
                Type a name to search for...
              </p>
            </div>
          ) : (
            <div className="gap-7 flex flex-col w-full pt-5 pb-10">
              {searchData.length === 0 ? (
                <div className="flex items-center justify-center w-full h-full">
                  <p className="text-primary-brown font-bold text-center">
                    No results found for "{search}"
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <p className="text-primary-brown text-start text-sm">
                    Showing {searchData.length} results for "{search}"
                  </p>
                  <div className="flex flex-col gap-5">
                    {searchData.map((data) => (
                      <AddSearchBoxItem
                        key={data.id}
                        data={data}
                        setSearch={setSearch}
                        isAdmin={isAdmin}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

type AddSearchBoxItemProps = {
  data: SearchType;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  isAdmin: boolean;
};

const AddSearchBoxItem = ({
  data,
  setSearch,
  isAdmin,
}: AddSearchBoxItemProps) => {
  const navigate = useNavigate();
  const url = isAdmin ? `/admin/${data.link}` : `/user/${data.link}`;

  const handleClick = () => {
    navigate(url);
    setSearch("");
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={data.image}
          alt={data.name}
          className="object-cover w-10 h-10 rounded-full"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = faker.image.urlLoremFlickr();
          }}
        />
        <div className="flex flex-col gap-1">
          <p className="text-primary-green text-sm font-medium">{data.name}</p>
        </div>
      </div>
      <DialogClose asChild className="flex items-center gap-2">
        <Button
          variant={"link"}
          onClick={handleClick}
          className="text-primary-green hover:no-underline"
        >
          Found in <span className="underline">{data.type}</span>
        </Button>
      </DialogClose>
    </div>
  );
};

export default SearchBox;
