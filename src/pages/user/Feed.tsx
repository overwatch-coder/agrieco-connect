import { Button } from "@/components/ui/button";
import { Edit, MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { userFeeds } from "@/constants";
import FeedItem from "@/components/FeedItem";
import { useState } from "react";
import FeedTopicsSidebar from "@/components/FeedTopicsSidebar";

export type UserFeedsType = (typeof userFeeds)[number];

const Feed = () => {
  const [newPost, setNewPost] = useState("");

  const handleNewPostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newPost);
    setNewPost("");
  };

  return (
    <div>
      {/* Title */}
      <Helmet>
        <title>User Feed - Agrieco-Connect </title>
        <meta name="description" content="User Feed" />
      </Helmet>

      <section className="md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-10 relative grid w-full xl:w-[90%] 2xl:w-full grid-cols-1 gap-5 pb-20">
        <main className="md:col-span-2 xl:col-span-3 2xl:col-span-4 flex flex-col w-full col-span-1 gap-5 mt-5">
          {/* Post Something */}
          <form
            onSubmit={handleNewPostSubmit}
            className="rounded-2xl flex flex-col gap-3 py-4 bg-white shadow"
          >
            <h2 className="text-primary-green border-b-secondary-gray px-4 pb-3 text-xl font-normal border-b">
              Post Something
            </h2>

            <div className="flex items-center gap-3 px-4 py-3">
              <img
                src="/images/avatar.png"
                alt="User Icon"
                className="w-10 h-10 rounded-full"
              />
              <input
                type="text"
                placeholder="What's trending in agriculture today?"
                className="text-primary-gray flex-grow w-full px-3 py-4 text-sm bg-transparent outline-none"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />

              <button>
                <Edit size={25} className="text-secondary-gray" />
              </button>
            </div>
          </form>

          <div className="flex flex-col w-full gap-5">
            {userFeeds.map((feed) => (
              <FeedItem key={feed.id} {...feed} />
            ))}
          </div>
        </main>

        {/* Sidebar */}
        <FeedTopicsSidebar />
      </section>
    </div>
  );
};

export default Feed;
