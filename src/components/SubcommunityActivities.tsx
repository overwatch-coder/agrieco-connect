import { Button } from "@/components/ui/button";
import { UserFeedsType } from "@/pages/user/Feed";
import { MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { useState } from "react";
import LoginModal from "@/components/shared/LoginModal";
import { IsAuth } from "@/lib/utils";
import {
  CommentButton,
  LikeButton,
  ShareButton,
  LeaveAComment,
} from "@/components/FeedItem";

const SubcommunityActivities = ({
  authorName,
  images,
  description,
  numberOfComments,
  numberOfLikes,
  numberOfShares,
  title,
}: UserFeedsType & { title: string }) => {
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
          <div className="flex flex-col gap-1">
            <p className="text-primary-green text-sm font-normal">
              Posted {Math.floor(Math.random() * 60)}{" "}
              {
                ["mins", "hours", "days", "months"][
                  Math.floor(Math.random() * 4)
                ]
              }{" "}
              ago
            </p>
            <p className="text-secondary-gray/50 text-xs">By {authorName}</p>
          </div>
        </div>
      </div>

      {/* Description and Title */}
      <div className="flex flex-col gap-2">
        <p className="text-primary-brown md:text-xl text-lg font-semibold">
          {title}
        </p>

        <p className="text-black/90 text-sm">{description}</p>
      </div>

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

      <div className="border-b-secondary-gray text-start md:justify-between md:gap-4 border-t-secondary-gray flex flex-wrap items-center w-full gap-2 pt-3 pb-3 border-t border-b">
        {/* Comments */}
        {IsAuth() ? (
          <CommentButton numberOfComments={numberOfComments} />
        ) : (
          <LoginModal hasChildren={true}>
            <CommentButton numberOfComments={numberOfComments} />
          </LoginModal>
        )}

        {/* Likes */}
        {IsAuth() ? (
          <LikeButton numberOfLikes={numberOfLikes} />
        ) : (
          <LoginModal hasChildren={true}>
            <LikeButton numberOfLikes={numberOfLikes} />
          </LoginModal>
        )}

        {/* Shares */}
        {IsAuth() ? (
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
            {IsAuth() ? (
              <CommentButton numberOfComments={0} />
            ) : (
              <LoginModal hasChildren={true}>
                <CommentButton numberOfComments={0} />
              </LoginModal>
            )}

            {IsAuth() ? (
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
      {IsAuth() ? (
        <LeaveAComment
          setComment={setComment}
          comment={comment}
          handleCommentSubmit={handleCommentSubmit}
        />
      ) : (
        <LoginModal hasChildren={true}>
          <LeaveAComment
            comment={comment}
            handleCommentSubmit={handleCommentSubmit}
            setComment={setComment}
          />
        </LoginModal>
      )}
    </section>
  );
};

export default SubcommunityActivities;
