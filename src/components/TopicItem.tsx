import { Button } from "@/components/ui/button";
import { UserFeedsType } from "@/pages/user/Feed";
import { MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { useState } from "react";

const TopicItem = ({
  authorName,
  datePosted,
  description,
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
          <div className="flex items-center text-white rounded-full justify-center bg-secondary-gray p-3 gap-1 w-10 h-10">
            {authorName.split(" ")[0].charAt(0)}
            {authorName.split(" ")[1].charAt(0)}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-normal">{authorName}</p>
            <p className="text-secondary-gray/50 text-xs">{datePosted}</p>
          </div>
        </div>
        <Button
          variant={"link"}
          className="text-primary-green hover:no-underline"
        >
          Follow
        </Button>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <p className="text-primary-brown text-lg md:text-xl font-semibold">
          {description}
        </p>
        <p className="text-black/90 text-sm">
          {
            "Etiam tincidunt magna non nibh eleifend, egestas laoreet nisi lacinia. Donec sed interdum dui. Proin porta eu nibh sit amet fringilla. Proin efficitur nulla ut tortor ornare cursus. Nullam quis rhoncus elit. Sed eu rhoncus tortor. Etiam tincidunt magna non nibh eleifend, egestas laoreet nisi lacinia. Donec sed interdum dui. Proin porta eu nibh sit amet fringilla. Proin efficitur nulla ut tortor ornare cursus. Nullam quis rhoncus elit. Sed eu rhoncus tortor."
          }
        </p>
      </div>

      <div className="border-b-secondary-gray text-start border-b flex flex-wrap items-center md:justify-between w-full gap-2 md:gap-4 pb-3 border-t border-t-secondary-gray pt-3">
        <Button
          variant={"link"}
          className="hover:no-underline flex items-center gap-1 md:gap-2"
        >
          <MessageCircle size={20} className="text-primary-brown" />
          <span className="text-primary-brown text-sm font-normal flex items-center gap-1">
            {numberOfComments} <span className="hidden md:block">comments</span>
          </span>
        </Button>

        <Button
          variant={"link"}
          className="hover:no-underline flex items-center gap-1 md:gap-2"
        >
          <ThumbsUp size={20} className="text-primary-brown" />
          <span className="text-primary-brown text-sm font-normal flex items-center gap-1">
            {numberOfLikes} <span className="hidden md:block">likes</span>
          </span>
        </Button>

        <Button
          variant={"link"}
          className="hover:no-underline flex items-center gap-1 md:gap-2"
        >
          <Share2 size={20} className="text-primary-brown" />
          <span className="text-primary-brown text-sm font-normal flex items-center gap-1">
            {numberOfShares} <span className="hidden md:block">shares</span>
          </span>
        </Button>
      </div>

      {/* Comments */}
      <div className="flex items-start w-full gap-3">
        <div className="rounded-full text-center text-white bg-secondary-gray h-10 w-10 p-3 flex items-center justify-center">
          JJ
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-primary-brown text-sm font-normal flex items-center gap-1 bg-secondary-gray/40 p-3 rounded-md">
            Donec sollicitudin tortor risus, eget rhoncus diam facilisis et.
            Maecenas vulputate ultricies viverra. Curabitur id nisl molestie
            massa convallis semper a id nibh.
          </p>

          <div className="flex items-center md:gap-2 flex-wrap">
            <p className="text-primary-brown text-sm font-normal flex items-center gap-1">
              1h
            </p>
            <Button
              variant={"link"}
              className="hover:no-underline flex items-center md:gap-2"
            >
              <MessageCircle size={20} className="text-primary-brown" />
              <span className="text-primary-brown text-sm font-normal md:flex items-center gap-1 hidden">
                comment
              </span>
            </Button>

            <Button
              variant={"link"}
              className="hover:no-underline flex items-center md:gap-2"
            >
              <ThumbsUp size={20} className="text-primary-brown" />
              <span className="text-primary-brown text-sm font-normal items-center gap-1 hidden md:flex">
                like
              </span>
            </Button>
          </div>
        </div>
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

export default TopicItem;
