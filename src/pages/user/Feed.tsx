import { Helmet } from "react-helmet-async";

import FeedItem from "@/components/FeedItem";
import { useEffect, useState } from "react";
import FeedTopicsSidebar from "@/components/FeedTopicsSidebar";
import InfiniteScroll from "react-infinite-scroller";
import ClipLoader from "react-spinners/ClipLoader";
import CreateFeedPost from "@/components/CreateFeedPost";
import { useFetch } from "@/hooks/useFetch";
import RenderContentLoading from "@/components/shared/RenderContentLoading";

const Feed = () => {
  const {
    data: userFeeds,
    isLoading,
    refetch: refetchFeeds,
  } = useFetch<IFeed[]>({
    url: "/feeds",
    queryKey: "feeds",
  });

  const [feeds, setFeeds] = useState<IFeed[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [openCreateFeedPost, setOpenCreateFeedPost] = useState(false);

  useEffect(() => {
    if (userFeeds) {
      setFeeds(userFeeds.length > 5 ? userFeeds.slice(0, 2) : userFeeds);
    }
  }, [userFeeds]);

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

  // fetch more feeds when user scrolls to the bottom
  const fetchMoreFeeds = async () => {
    if (userFeeds?.length <= feeds.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setFeeds(feeds.concat(userFeeds?.slice(feeds.length, feeds.length + 2)));
    }, 500);
  };

  return (
    <div>
      {/* Title */}
      <Helmet>
        <title>User Feed - Agrieco-Connect </title>
        <meta name="description" content="User Feed" />
      </Helmet>

      <section className="md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-10 relative grid w-full xl:w-[90%] 2xl:w-full grid-cols-1 gap-5 pb-20 2xl:max-w-7xl 2xl:mx-auto">
        <main className="md:col-span-2 xl:col-span-3 2xl:col-span-4 flex flex-col w-full col-span-1 gap-5 mt-5">
          {/* Post Something */}
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
              key={crypto.randomUUID()}
              pageStart={0}
              loadMore={fetchMoreFeeds}
              hasMore={hasMore}
              loader={
                <div className="flex items-center justify-center">
                  <ClipLoader key={0} size={30} color="black" loading={true} />
                </div>
              }
              className="flex flex-col w-full gap-5"
            >
              {feeds
                .filter((feed) => feed.id !== null)
                .map((feed) => (
                  <FeedItem key={feed.id} {...feed} />
                ))}
            </InfiniteScroll>
          </div>
        </main>

        {/* Sidebar */}
        <FeedTopicsSidebar />
      </section>
    </div>
  );
};

export default Feed;
