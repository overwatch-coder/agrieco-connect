import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { subcommunities, userFeeds as subcommunityActivity } from "@/constants";
import { IsAuth, slugifyData, UrlPath } from "@/lib/utils";
import SubcommunityActivities from "@/components/SubcommunityActivities";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@/components/ui/button";
import CreateFeedPost from "@/components/CreateFeedPost";
import { useFetch } from "@/hooks/useFetch";
import { useAuth } from "@/hooks/useAuth";
import FeedItem from "@/components/FeedItem";

const ViewSubcommunity = () => {
  const [subcommunityActivities, setSubcommunityActivities] = useState([]);

  const location = useLocation();
  const id = location.state?.id || 0;

  const [hasMore, setHasMore] = useState(true);
  const [openCreateFeedPost, setOpenCreateFeedPost] = useState(false);

  const { slug } = useParams();

  const { data: subcommunity } = useFetch<any>({
    queryKey: `communities-${slug}`,
    url: `/communities/${id}`,
    enabled: true,
  });

  const {
    data: communityFeeds,
    isLoading,
    refetch: refetchFeeds,
  } = useFetch<IFeed[]>({
    url: "/feeds",
    queryKey: "feeds",
  });

  useEffect(() => {
    if (!communityFeeds) return;

    // const subcommunityFeeds = userFeeds.filter(
    //   (feed:ANY) => feed.community_id === id
    // );
    console.log("FEEDSXXXXXXXXX", communityFeeds);

  }, [id, communityFeeds]);

  const fetchMore = (): void => {
    if (communityFeeds?.length === 0) {
      setHasMore(false);
      return;
    }
  };

  return (
    <div className="w-full">
      {/* Title */}
      <Helmet>
        <title>
          {" "}
          {`${subcommunity?.name}`} | Subcommunity - Agrieco-Connect{" "}
        </title>
        <meta
          name="description"
          content={`${subcommunity?.name} | Subcommunity - Agrieco-Connect`}
        />
      </Helmet>
      {subcommunity && !isLoading ? (
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
            <span>{subcommunity?.name}</span>
          </Link>

          <p className="text-sm leading-relaxed text-black">
            {subcommunity?.description}
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
                    hasMore={communityFeeds?.length === 0 ? false : hasMore}
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
                    {communityFeeds?.map((activity: any) => (
                      // <SubcommunityActivities
                      //   key={activity.id}
                      //   description={activity?.content}
                      //   title={activity?.title}
                      //   authorName={""}
                      //   numberOfComments={0}
                      //   numberOfLikes={0}
                      //   numberOfShares={0}
                      //   images={activity?.images}
                      //   authorImage={"/images/avatar.jpg"}
                      //   datePosted={activity?.created_at}
                      // />
                      <FeedItem key={activity.id} {...activity} />
                    ))}


                  </InfiniteScroll>
                </section>
              </TabsContent>
              <TabsContent
                value="members"
                className="gap-7 flex flex-col w-full pt-5 pb-10"
              >
                <MembersTab />
              </TabsContent>
            </Tabs>
          </section>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <ClipLoader color="black" size={30} />
        </div>
      )}
    </div>
  );
};

const MembersTab = () => {
  const [auth] = useAuth();
  const location = useLocation();

  const id = location.state?.id || 0;

  const { slug } = useParams();

  const { data: subcommunityMembers, isLoading } = useFetch<any>({
    queryKey: `communities-${slug}-members`,
    url: `/communities/${id}/members`,
    enabled: true,
  });

  const followersQuery = useFetch<IFeedUser[]>({
    queryKey: "followers",
    url: `/users/following`,
    token: auth?.user?.token,
  });
  const [allFollowers, setAllFollowers] = useState<number[]>([]);

  useEffect(() => {
    if (followersQuery.data) {
      console.log("FOLLOWERS", followersQuery.data);
      setAllFollowers(followersQuery.data.map((follower) => follower.id));
    }

  }, [followersQuery.data]);

  useEffect(() => {
    console.log("MEMBERS", subcommunityMembers);
  }, [subcommunityMembers]);

  const isAuth = IsAuth();
  return (
    <>
      {subcommunityMembers?.map((member: any) => (
        <div key={member.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={member?.image || "/images/avatar.jpg"}
              alt="profile"
              className="object-cover w-10 h-10 rounded-full"
            />
            <div className="flex flex-col gap-1">
              <p className="text-primary-green text-sm font-medium">
                {member?.fullname}
              </p>
              <p className="text-secondary-gray text-xs">
                {member?.profession}
                {member?.interested_topics?.length > 0 &&
                  member?.interested_topics?.map((topic: any) => (
                    <span>#{topic?.name}&nbsp;</span>
                  ))}
              </p>
            </div>
          </div>

          {isAuth && (member.id !== auth?.user.id) && (
            <Button
            // onClick={(e) => handleFollowSubmit(e)}
            variant={"link"}
            className="text-primary-green hover:no-underline"
          >
            {allFollowers.some((follower) => follower === member.id)
              ? "Following"
              : "Follow"}
          </Button>
          )}
        </div>
      ))}
      {subcommunityMembers?.length === 0 && (
        <p className="text-black">
          No members yet. Join the community to start sharing knowledge and
          experiences.
        </p>
      )}
    </>
  );
};

export default ViewSubcommunity;
