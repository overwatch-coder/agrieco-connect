import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { subcommunities, userFeeds as subcommunityActivity } from "@/constants";
import { IsAuth, slugifyData, UrlPath } from "@/lib/utils";
import SubcommunityActivities from "@/components/SubcommunityActivities";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@/components/ui/button";
import CreateFeedPost from "@/components/CreateFeedPost";

const ViewSubcommunity = () => {
  const [subcommunityActivities, setSubcommunityActivities] = useState(
    subcommunityActivity.slice(0, 2)
  );
  const [hasMore, setHasMore] = useState(true);
  const [openCreateFeedPost, setOpenCreateFeedPost] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();

  const subcommunity = subcommunities.find(
    (sub) => slugifyData(sub.title) === slug
  );

  if (!subcommunity) {
    navigate("/user/subcommunities");
    return null;
  }

  // fetch more subcommunities when user scrolls to the bottom
  const fetchMore = (): void => {
    if (subcommunityActivities.length >= subcommunityActivity.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setSubcommunityActivities(
        subcommunityActivities.concat(
          subcommunityActivity.slice(
            subcommunityActivities.length,
            subcommunityActivities.length + 2
          )
        )
      );
    }, 500);
  };

  return (
    <div className="w-full">
      {/* Title */}
      <Helmet>
        <title> {subcommunity.title} | Subcommunity - Agrieco-Connect </title>
        <meta
          name="description"
          content={`${subcommunity.title} | Subcommunity - Agrieco-Connect`}
        />
      </Helmet>
      <div className="md:gap-6 xl:max-w-4xl flex flex-col w-full gap-10 p-5 mx-auto">
        <Link
          to={
            UrlPath() === "admin"
              ? "/admin/subcommunity-management"
              : "/user/subcommunities"
          }
          className="text-primary-brown flex items-center gap-2 text-xl font-bold"
        >
          <ArrowLeft size={20} className="text-primary-brown" />
          <span>{subcommunity.title}</span>
        </Link>

        <p className="text-sm leading-relaxed text-black">
          {subcommunity.description}
        </p>

        <section className="flex flex-col w-full gap-5">
          <Tabs defaultValue="activities">
            {UrlPath() !== "admin" && (
              <TabsList className="bg-transparent">
                <TabsTrigger
                  value="activities"
                  className="text-back data-[state=active]:text-primary-green data-[state=active]:bg-transparent data-[state=active]:border-b-2 rounded-none bg-transparent data-[state=active]:border-primary-green pb-2"
                >
                  Activities
                </TabsTrigger>
                <TabsTrigger
                  value="members"
                  className="pb-2 text-black data-[state=active]:text-primary-green data-[state=active]:bg-transparent data-[state=active]:border-b-2 rounded-none bg-transparent data-[state=active]:border-primary-green"
                >
                  Members
                </TabsTrigger>
              </TabsList>
            )}

            <TabsContent
              value="activities"
              className="flex flex-col w-full gap-5"
            >
              {/* Post Something */}
              {UrlPath() !== "admin" && (
                <div className="rounded-2xl flex flex-col gap-3 py-4 bg-white shadow">
                  <h2 className="text-primary-green border-b-secondary-gray px-4 pb-3 text-xl font-normal border-b">
                    Post Something
                  </h2>

                  <CreateFeedPost
                    setOpen={setOpenCreateFeedPost}
                    open={openCreateFeedPost}
                  />
                </div>
              )}

              <section id="activities" className="flex flex-col w-full gap-5">
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
                  {subcommunityActivities.map((activity) => (
                    <SubcommunityActivities
                      key={activity.id}
                      {...activity}
                      description={subcommunity.description}
                      title={subcommunity.title}
                    />
                  ))}
                </InfiniteScroll>
              </section>
            </TabsContent>
            <TabsContent
              value="members"
              className="gap-7 flex flex-col w-full pt-5 pb-10"
            >
              {subcommunity.members.length === 0 ? (
                <p className="text-black">
                  No members yet. Join the community to start sharing knowledge
                  and experiences.
                </p>
              ) : (
                subcommunity.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={member.image}
                        alt="profile"
                        className="object-cover w-10 h-10 rounded-full"
                      />
                      <div className="flex flex-col gap-1">
                        <p className="text-primary-green text-sm font-medium">
                          {member.name}
                        </p>
                        <p className="text-secondary-gray text-xs">
                          {member.profession}
                        </p>
                      </div>
                    </div>

                    {IsAuth() && (
                      <Button
                        variant={"link"}
                        className="text-primary-green hover:no-underline"
                      >
                        Follow
                      </Button>
                    )}
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
};

export default ViewSubcommunity;
