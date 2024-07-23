import { Search } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useCallback, useEffect, useMemo, useState } from "react";
import TopicItem from "@/components/TopicItem";
import SubscribeModal from "@/components/SubscribeModal";
import CustomDropdown from "@/components/CustomDropdown";
import InfiniteScroll from "react-infinite-scroller";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import ResponsiveArticle from "react-content-loader";

const topicDropdownItems = [
  "All",
  "Activity",
  "New Post",
  "Cash Crops",
  "Poultry",
];

const Topics = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const [selectedItem, setSelectedItem] = useState("All");

  const { data: userTopics, isLoading } = useFetch<ITopic[]>({
    queryKey: "topics",
    url: "/topics",
    enabled: true,
  });

  const [topics, setTopics] = useState<ITopic[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchTopic, setSearchTopic] = useState("");
  const [subscribedTopics, setSubscribedTopics] = useState<string[]>(["All"]);

  // === Set topics ===
  useEffect(() => {
    if (userTopics) {
      setTopics(userTopics.length > 2 ? userTopics.slice(0, 2) : userTopics);
    }
  }, [userTopics]);

  // === Set subscribed topics ===
  useEffect(() => {
    if (!userTopics) return;

    setTopics(userTopics.slice(0, 2));
    setSubscribedTopics((prev) => [
      ...prev,
      ...userTopics.map((topic) => topic.name),
    ]);
  }, [userTopics]);

  // === Fetch more topics when user scrolls to the bottom ===
  const fetchMoreTopics = (): void => {
    if (!userTopics) return;

    if (userTopics?.length <= topics.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setTopics(
        topics.concat(userTopics.slice(topics.length, topics.length + 2))
      );
    }, 500);
  };

  // === Filter topics based on search ===
  const filterTopics = useCallback(() => {
    const search = searchParams.get("search");

    if (!userTopics) return;

    if (search) {
      setTopics(
        userTopics.filter(
          (topic) =>
            topic.name.toLowerCase().includes(search.toLowerCase()) ||
            topic?.description?.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setTopics(userTopics);
    }
  }, [searchParams, userTopics]);

  // === Filter topics based on search ===
  useEffect(() => {
    filterTopics();

    return () => {
      setTopics(userTopics ?? []);
    };
  }, [filterTopics, searchTopic, userTopics]);

  // === Filer based on selected dropdown item ===
  useEffect(() => {
    if (!userTopics) return;

    if (selectedItem.toLowerCase() === "all") {
      setSelectedItem("All");
      navigate(`/user/topics`);
    }

    if (selectedItem.toLowerCase() !== "all") {
      navigate(`/user/topics?search=${selectedItem}`);
    }
  }, [navigate, selectedItem, userTopics]);

  // === Loading spinner when topics are loading ===
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
        <title>Topics - Agrieco-Connect </title>
        <meta name="description" content="Topics" />
      </Helmet>

      <div className="md:gap-6 xl:max-w-4xl flex flex-col w-full gap-10 p-5 mx-auto">
        <section className="md:flex-row md:items-center md:justify-between md:gap-5 flex flex-col w-full gap-3">
          <CustomDropdown
            items={topicDropdownItems}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />

          <div className="flex items-center flex-grow w-full gap-3 px-4 bg-white rounded-lg">
            <Search size={25} className="text-secondary-gray" />
            <input
              type="search"
              value={searchTopic}
              onChange={(e) => {
                setSearchTopic(e.target.value);
                navigate(`/user/topics?search=${e.target.value}`);
              }}
              placeholder="Search"
              className="placeholder-secondary-gray/80 w-full px-1 py-3 text-sm bg-transparent outline-none"
            />
          </div>
        </section>

        <section className="flex items-center justify-between w-full gap-5">
          <h2 className="text-lg md:text-2xl capitalize font-bold font-[poppins] text-primary-brown">
            {searchParams.get("search")
              ? `${searchParams.get("search")} Topics`
              : "All Topics"}
          </h2>

          <SubscribeModal
            subscribedTopics={subscribedTopics}
            setSubscribedTopics={setSubscribedTopics}
          />
        </section>

        <section className="md:gap-5 flex flex-row flex-wrap items-center w-full gap-3">
          {Array.from(new Set(subscribedTopics)).map((topic) => (
            <Link
              to={
                topic.toLowerCase() === "all"
                  ? `/user/topics`
                  : `/user/topics?search=${topic.toLowerCase()}`
              }
              key={topic}
              className="border-primary-brown text-secondary-gray px-5 py-2 text-sm font-normal bg-white border"
            >
              {topic}
            </Link>
          ))}
        </section>

        {topics.length > 0 ? (
          <section id="topics" className="flex flex-col w-full gap-5">
            <InfiniteScroll
              key={crypto.randomUUID()}
              pageStart={0}
              loadMore={fetchMoreTopics}
              hasMore={hasMore}
              loader={
                <div className="flex items-center justify-center">
                  <ClipLoader key={0} size={30} color="black" loading={true} />
                </div>
              }
              className="flex flex-col w-full gap-5"
            >
              {topics.map((topic) => (
                <TopicItem key={topic.id} {...topic} />
              ))}
            </InfiniteScroll>
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5 text-center">
            <h2 className="text-primary-brown text-lg font-bold">
              No Topics Found
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

export default Topics;
