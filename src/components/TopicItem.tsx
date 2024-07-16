import {
  CommentButton,
  LeaveAComment,
  LikeButton,
  ShareButton,
} from "@/components/FeedItem";
import LoginModal from "@/components/shared/LoginModal";
import { Button } from "@/components/ui/button";
import { userFeeds } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { useState } from "react";

type UserFeedsType = (typeof userFeeds)[0];

const TopicItem = ({
  authorName,
  datePosted,
  description,
  numberOfComments,
  numberOfLikes,
  numberOfShares,
}: UserFeedsType) => {
  const [auth] = useAuth();
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
          <div className="bg-secondary-gray flex items-center justify-center w-10 h-10 gap-1 p-3 text-white rounded-full">
            {authorName.split(" ")[0].charAt(0)}
            {authorName.split(" ")[1].charAt(0)}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-normal">{authorName}</p>
            <p className="text-secondary-gray/50 text-xs">{datePosted}</p>
          </div>
        </div>
        {auth ? (
          <Button
            variant={"link"}
            className="text-primary-green hover:no-underline"
          >
            Follow
          </Button>
        ) : (
          <LoginModal hasChildren={true} className="text-primary-green">
            Follow
          </LoginModal>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <p className="text-primary-brown md:text-xl text-lg font-semibold">
          {description}
        </p>
        <p className="text-black/90 text-sm">
          {
            "Etiam tincidunt magna non nibh eleifend, egestas laoreet nisi lacinia. Donec sed interdum dui. Proin porta eu nibh sit amet fringilla. Proin efficitur nulla ut tortor ornare cursus. Nullam quis rhoncus elit. Sed eu rhoncus tortor. Etiam tincidunt magna non nibh eleifend, egestas laoreet nisi lacinia. Donec sed interdum dui. Proin porta eu nibh sit amet fringilla. Proin efficitur nulla ut tortor ornare cursus. Nullam quis rhoncus elit. Sed eu rhoncus tortor."
          }
        </p>
      </div>

      <div className="border-b-secondary-gray text-start md:justify-between md:gap-4 border-t-secondary-gray flex flex-wrap items-center w-full gap-2 pt-3 pb-3 border-t border-b">
        {/* Comments */}
        {auth ? (
          <CommentButton numberOfComments={numberOfComments} />
        ) : (
          <LoginModal hasChildren={true}>
            <CommentButton numberOfComments={numberOfComments} />
          </LoginModal>
        )}

        {/* Likes */}
        {auth ? (
          <LikeButton numberOfLikes={numberOfLikes} />
        ) : (
          <LoginModal hasChildren={true}>
            <LikeButton numberOfLikes={numberOfLikes} />
          </LoginModal>
        )}

        {/* Shares */}
        {auth ? (
          <ShareButton numberOfShares={numberOfShares} />
        ) : (
          <LoginModal hasChildren={true}>
            <ShareButton numberOfShares={numberOfShares} />
          </LoginModal>
        )}
      </div>

      {/* Comments */}
      <div className="flex items-start w-full gap-3">
        <div className="bg-secondary-gray flex items-center justify-center w-10 h-10 p-3 text-center text-white rounded-full">
          JJ
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-primary-brown bg-secondary-gray/40 flex items-center gap-1 p-3 text-sm font-normal rounded-md">
            Donec sollicitudin tortor risus, eget rhoncus diam facilisis et.
            Maecenas vulputate ultricies viverra. Curabitur id nisl molestie
            massa convallis semper a id nibh.
          </p>

          <div className="md:gap-2 flex flex-wrap items-center">
            <p className="text-primary-brown flex items-center gap-1 text-sm font-normal">
              1h
            </p>

            {/* Comment */}
            {auth ? (
              <CommentButton numberOfComments={0} />
            ) : (
              <LoginModal hasChildren={true}>
                <CommentButton numberOfComments={0} />
              </LoginModal>
            )}

            {/* Like */}
            {auth ? (
              <LikeButton numberOfLikes={0} />
            ) : (
              <LoginModal hasChildren={true}>
                <LikeButton numberOfLikes={0} />
              </LoginModal>
            )}
          </div>
        </div>
      </div>

      {/* Leave a comment */}
      {auth ? (
        <LeaveAComment
          comment={comment}
          setComment={setComment}
          handleCommentSubmit={handleCommentSubmit}
        />
      ) : (
        <LoginModal hasChildren={true}>
          <LeaveAComment
            comment={comment}
            setComment={setComment}
            handleCommentSubmit={handleCommentSubmit}
          />
        </LoginModal>
      )}
    </section>
  );
};

export default TopicItem;
