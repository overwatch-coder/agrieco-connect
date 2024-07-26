import { Helmet } from "react-helmet-async";
import FeedItem from "@/components/FeedItem";
import { useEffect, useState, useMemo } from "react";
import FeedTopicsSidebar from "@/components/FeedTopicsSidebar";
import InfiniteScroll from "react-infinite-scroller";
import ClipLoader from "react-spinners/ClipLoader";
import CreateFeedPost from "@/components/CreateFeedPost";
import { useFetch } from "@/hooks/useFetch";
import RenderContentLoading from "@/components/shared/RenderContentLoading";
import { useSearchParams } from "react-router-dom";

const Feed = () => {
  const [searchParams] = useSearchParams();
  const trend = searchParams.get("trend");

  const {
    data: userFeeds,
    isLoading,
    refetch: refetchFeeds,
  } = useFetch<IFeed[]>({
    url: "/feeds",
    queryKey: "feeds",
  });

  const [displayedFeeds, setDisplayedFeeds] = useState<IFeed[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [openCreateFeedPost, setOpenCreateFeedPost] = useState(false);
  const [fact, setFact] = useState<string | null>(null);

  const filteredAndSortedFeeds = useMemo(() => {
    if (!userFeeds) return [];
    console.log("userFeeds-------", userFeeds);
    const _fact = userFeeds.find((feed) => !feed.id);
    setFact(_fact?.content?.split("Fact:").join(" ") || null);

    const filteredFeeds = trend
      ? userFeeds.filter((feed) =>
          feed.topics.some((topic) => topic.name === trend)
        )
      : userFeeds;

    return filteredFeeds.sort((a, b) => {
      const aEngagement = a.likes.length + a.comments.length;
      const bEngagement = b.likes.length + b.comments.length;
      return bEngagement - aEngagement; // Sort in descending order
    });
  }, [userFeeds, trend]);

  useEffect(() => {
    setDisplayedFeeds([]);
    setHasMore(true);
  }, [trend, userFeeds]);

  if (isLoading) {
    return <RenderContentLoading />;
  }

  if (!userFeeds) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-5 mx-auto">
        <p>Sorry, could not fetch feeds</p>
        <h2 className="text-primary-green text-xl font-normal">
          Please try again later
        </h2>
      </div>
    );
  }

  const fetchMoreFeeds = () => {
    if (filteredAndSortedFeeds.length <= displayedFeeds.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setDisplayedFeeds((prevFeeds) => [
        ...prevFeeds,
        ...filteredAndSortedFeeds.slice(prevFeeds.length, prevFeeds.length + 2),
      ]);
    }, 500);
  };

  return (
    <div>
      <Helmet>
        <title>User Feed - Agrieco-Connect </title>
        <meta name="description" content="User Feed" />
      </Helmet>

      <section className="md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-10 relative grid w-full xl:w-[90%] 2xl:w-full grid-cols-1 gap-5 pb-20 2xl:max-w-7xl 2xl:mx-auto">
        <main className="md:col-span-2 xl:col-span-3 2xl:col-span-4 flex flex-col w-full col-span-1 gap-5 mt-5">
          <div className="rounded-2xl flex flex-col gap-3 py-4 bg-white shadow">
            <h2 className="text-primary-green border-b-secondary-gray px-4 pb-3 text-xl font-normal border-b">
              Post Something
            </h2>

            <CreateFeedPost
              setOpen={setOpenCreateFeedPost}
              open={openCreateFeedPost}
              refetchFeeds={refetchFeeds}
            />
          </div>

          <div id="feeds" className="flex flex-col w-full gap-5">
            <InfiniteScroll
              pageStart={0}
              loadMore={fetchMoreFeeds}
              hasMore={hasMore}
              loader={
                <div key={0} className="flex items-center justify-center">
                  <ClipLoader size={30} color="black" loading={true} />
                </div>
              }
              className="flex flex-col w-full gap-5"
            >
              {fact && (
                <div className="rounded-2xl relative px-4 py-8 text-center bg-white shadow">
                  <p className="text-black/80 text-xl">{fact}</p>
                  <span className="bottom-2 right-2 absolute px-2 py-1 text-sm text-white bg-green-500 rounded-md">
                    FACT
                  </span>
                </div>
              )}
              {displayedFeeds
                .filter((feed) => feed.id !== null)
                .map((feed) => (
                  <FeedItem key={feed.id} {...feed} />
                ))}
            </InfiniteScroll>
          </div>
        </main>

        <FeedTopicsSidebar />
      </section>
    </div>
  );
};

export default Feed;
