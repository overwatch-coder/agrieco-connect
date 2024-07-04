import { Button } from "@/components/ui/button";
import { UserFeedsType } from "@/pages/user/Feed";
import { MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FeedItem = ({
  authorImage,
  authorName,
  datePosted,
  description,
  images,
  numberOfComments,
  numberOfLikes,
  numberOfShares,
}: UserFeedsType) => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(comment);
    setComment("");
  };
  return (
    <section className="rounded-2xl text-start flex flex-col w-full gap-5 p-4 bg-white">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <UserBio
            authorImage={authorImage}
            authorName={authorName}
            connections={numberOfLikes}
            profession={
              [
                "Agriculture",
                "Livestock",
                "Crop Production",
                "Farming",
                "Selling",
                "Marketing",
              ][Math.floor(Math.random() * 6)]
            }
            bio={description}
          />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-normal">{authorName}</p>
            <p className="text-secondary-gray/50 text-xs">{datePosted}</p>
          </div>
        </div>
        <Button
          variant={"link"}
          className="text-primary-green hover:no-underline"
        >
          Following
        </Button>
      </div>

      {/* Description */}
      <p className="text-black/80 text-sm font-normal">{description}</p>

      {/* Featured Images */}
      <div className="md:grid-cols-3 border-b-secondary-gray grid grid-cols-1 gap-5 pb-5 border-b">
        {/* Large Image */}
        <div className="group md:col-span-2 w-full h-full col-span-1 overflow-hidden rounded-lg">
          <img
            src={images[0]}
            alt="Image"
            className="group-hover:scale-110 object-cover w-full h-full transition"
          />
        </div>

        {/* Small Images */}
        <div className="md:flex-col md:justify-start flex flex-row items-center justify-center col-span-1 gap-5">
          {images.slice(1).map((image, index) => (
            <div
              key={index}
              className="group w-full h-full overflow-hidden rounded-lg"
            >
              <img
                src={image}
                alt="Image"
                className="group-hover:scale-110 object-cover w-full h-full transition"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="border-b-secondary-gray text-start md:justify-between md:gap-4 flex flex-wrap items-center w-full gap-1 pb-5 border-b">
        <Button
          variant={"link"}
          className="hover:no-underline md:gap-2 flex items-center gap-1"
        >
          <MessageCircle size={20} className="text-primary-brown" />
          <span className="text-primary-brown flex items-center gap-1 text-sm font-normal">
            {numberOfComments} <span className="md:block hidden">comments</span>
          </span>
        </Button>

        <Button
          variant={"link"}
          className="hover:no-underline md:gap-2 flex items-center gap-1"
        >
          <ThumbsUp size={20} className="text-primary-brown" />
          <span className="text-primary-brown flex items-center gap-1 text-sm font-normal">
            {numberOfLikes} <span className="md:block hidden">likes</span>
          </span>
        </Button>

        <Button
          variant={"link"}
          className="hover:no-underline md:gap-2 flex items-center gap-1"
        >
          <Share2 size={20} className="text-primary-brown" />
          <span className="text-primary-brown flex items-center gap-1 text-sm font-normal">
            {numberOfShares} <span className="md:block hidden">shares</span>
          </span>
        </Button>
      </div>

      {/* Leave a comment */}
      <form
        onSubmit={handleCommentSubmit}
        className="flex items-center gap-3 py-3"
      >
        <img
          src={"/images/avatar.png"}
          alt={"avatar"}
          className="w-10 h-10 rounded-full"
        />
        <input
          type="text"
          placeholder="Comment on this"
          className="text-primary-gray placeholder:text-primary-brown/50 bg-secondary-gray/10 flex-grow w-full px-3 py-3 text-sm rounded-full outline-none"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </form>
    </section>
  );
};

export default FeedItem;

type UserBioProps = {
  authorImage: string;
  authorName: string;
  connections: number;
  profession: string;
  bio: string;
};

const UserBio = ({ ...userInfo }: UserBioProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <img
            src={userInfo.authorImage}
            alt={userInfo.authorName}
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        </TooltipTrigger>

        <TooltipContent
          align="start"
          className="md:w-2/3 w-full p-3 bg-white rounded"
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-primary-brown text-xl font-normal">Bio</h2>
            <p className="text-sm font-normal text-black">{userInfo.bio}</p>

            <div className="flex items-center gap-5 pt-2">
              <p className="text-primary-brown text-sm font-normal">
                {userInfo.connections} connections
              </p>
              <span className="w-[1.5px] h-5 bg-primary-brown" />
              <p className="text-primary-brown text-sm font-normal">
                Professor in {userInfo.profession}
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
