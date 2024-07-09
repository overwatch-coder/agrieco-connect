import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, X } from "lucide-react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  userFeeds,
  agriculturalTrends,
  subcommunities,
  marketplaceEvents,
  marketplaceProducts,
} from "@/constants";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { UrlPath } from "@/lib/utils";

type SearchType = {
  id: number;
  name: string;
  image: string;
  type: string;
  link: string;
};

const userData = userFeeds.map((user) => ({
  id: user.id,
  name: user.authorName,
  image: user.authorImage,
  type: "User Feeds",
  link: "/feed",
}));

const agriculturalData = agriculturalTrends.map((agriculture) => ({
  id: agriculture.id,
  name: agriculture.title,
  image: agriculture.image,
  type: "Agricultural Trends",
  link: "/agriculture-trends",
}));

const subcommunityData = subcommunities.map((subcommunity) => ({
  id: subcommunity.id,
  name: subcommunity.title,
  image: "https://picsum.photos/200",
  type: "Subcommunities",
  link: "/subcommunities",
}));

const marketplaceEventData = marketplaceEvents.map((marketplaceEvent) => ({
  id: marketplaceEvent.id,
  name: marketplaceEvent.title,
  image: marketplaceEvent.image,
  type: "Events",
  link: "/events",
}));

const marketplaceProductData = marketplaceProducts.map(
  (marketplaceProduct) => ({
    id: marketplaceProduct.id,
    name: marketplaceProduct.name,
    image: marketplaceProduct.image,
    type: "Marketplace",
    link: "/marketplace",
  })
);

const SearchBox = ({ size }: { size?: number }) => {
  const [search, setSearch] = useState("");
  const allSearchData = useMemo(
    () => [
      ...userData,
      ...agriculturalData,
      ...subcommunityData,
      ...marketplaceEventData,
      ...marketplaceProductData,
    ],
    []
  );

  const [searchData, setSearchData] = useState<SearchType[]>([]);

  const showFilteredSearches = useCallback(() => {
    if (search.trim() === "") {
      setSearchData([]);
      return;
    }
    const filteredSearches: SearchType[] = allSearchData.filter(
      (data: SearchType) => {
        return (
          data.name.toLowerCase().includes(search.toLowerCase()) ||
          data.type.toLowerCase().includes(search.toLowerCase())
        );
      }
    );

    setSearchData(filteredSearches);
  }, [search, allSearchData]);

  useEffect(() => {
    showFilteredSearches();
  }, [search, showFilteredSearches]);

  return (
    <Dialog>
      <DialogTrigger className="md:bg-secondary-gray/10 md:rounded-full hover:scale-105 bg-white/30 md:items-center md:flex-col flex flex-row gap-3 p-4 transition rounded">
        <AiOutlineSearch
          size={size || 20}
          className={"text-white md:text-primary-brown"}
        />
        <span className="md:hidden text-base text-white">Search</span>
      </DialogTrigger>

      <DialogContent className="w-full max-w-2xl h-[90vh] flex bg-white rounded-none flex-col gap-5 overflow-y-scroll scrollbar-hide">
        {/* Header */}
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

export default SearchBox;

type AddSearchBoxItemProps = {
  data: SearchType;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const AddSearchBoxItem = ({ data, setSearch }: AddSearchBoxItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${UrlPath()}${data.link}`);
    setSearch("");
  };

  return (
    <div key={data.id} className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={data.image}
          alt={data.name}
          className="object-cover w-10 h-10 rounded-full"
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
