import { Button } from "@/components/ui/button";
import { MessageCircle, Share2, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import LoginModal from "@/components/shared/LoginModal";
import { faker } from "@faker-js/faker";
import { useFetch, useMutateData } from "@/hooks/useFetch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Form } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment-timezone";

// const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const timezone = "Etc/GMT-4"
moment.tz.setDefault(timezone);

const FeedItem = ({ images, content, id, user_id, created_at }: IFeed) => {
  // === Get Auth ===
  const [auth] = useAuth();

  // === Comments Query ===
  const commentQuery = useFetch<IComment[]>({
    queryKey: "comments",
    url: `/feeds/${id}/comments`,
  });

  // === Likes Query ===
  const likeQuery = useFetch<Omit<IAuthUser, "token">[]>({
    queryKey: "likes",
    url: `/feeds/${id}/likes`,
  });

  // === User Query ===
  const userQuery = useFetch<IFeedUser>({
    queryKey: "user",
    url: `/users/${user_id}`,
  });

  // === Followers Query ===
  const followersQuery = useFetch<IFeedUser[]>({
    queryKey: "followers",
    url: `/users/following`,
    token: auth?.user?.token,
  });

  // === State ===
  const [comment, setComment] = useState("");
  const [allLikes, setAllLikes] = useState<IFeedUser[]>([]);
  const [allComments, setAllComments] = useState<IComment[]>([]);
  const [allFollowers, setAllFollowers] = useState<number[]>([]);
  const [feedUser, setFeedUser] = useState<IFeedUser>({
    id: 0,
    fullname: "",
    email: "",
    username: "",
  });

  // === UseEffect ===
  useEffect(() => {
    if (likeQuery.data) {
      setAllLikes(likeQuery.data);
    }

    if (commentQuery.data) {
      setAllComments(commentQuery.data);
    }

    if (followersQuery.data) {
      console.log("Followers=====", followersQuery.data);
      setAllFollowers(followersQuery.data.map((follower) => follower.id));
    }

    if (userQuery.data) {
      console.log("User=====", userQuery.data);
      setFeedUser(userQuery.data);
    }
  }, [commentQuery.data, followersQuery.data, likeQuery.data, userQuery.data]);

  // === Get the right images ===
  const arrayOfImages = images ? images.split(",") : [];
  const filteredImages = arrayOfImages.filter((image) =>
    image.includes("res.cloudinary.com")
  );

  // === Mutations ===
  // === Likes ===
  const { mutateAsync: mutateLikes } = useMutateData<any, IFeed>({
    url: `/feeds/${id}/likes`,
    config: {
      method: "PUT",
      contentType: "application/json",
      token: auth?.user?.token,
      queryKey: "feeds",
    },
  });

  const handleLikeSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const res = await mutateLikes(null);

    console.log({ res });

    likeQuery.refetch();

    setAllLikes(res.likes);
  };

  // === Comments ===
  const { mutateAsync: mutateComments, isPending: isCommentPending } =
    useMutateData<{ content: string }, IComment>({
      url: `/feeds/${id}/comments`,
      config: {
        method: "POST",
        contentType: "application/json",
        token: auth?.user?.token,
        queryKey: "feeds",
      },
    });

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment) return;

    const res = await mutateComments({ content: comment });
    setComment("");

    commentQuery.refetch();

    setAllComments((prev) => [...prev, res]);
  };

  // === Following ===
  const { mutateAsync: mutateFollows } = useMutateData<any, IFeedUser>({
    url: `/users/${user_id}/follow`,
    config: {
      method: "PUT",
      contentType: "application/json",
      token: auth?.user?.token,
      queryKey: "followers",
    },
  });

  const handleFollowSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await mutateFollows(null);

    followersQuery.refetch();

    setAllFollowers((prev) => [...prev, user_id]);
  };

  return (
    <section className="rounded-2xl text-start flex flex-col w-full gap-5 p-4 bg-white">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <UserBio
            authorImage={faker.image.avatar()}
            authorName={feedUser.fullname}
            connections={faker.number.int({ min: 0, max: 1000 })}
            profession={faker.person.jobTitle()}
            bio={faker.person.bio()}
          />

          <div className="flex flex-col gap-1">
            <p className="text-sm font-normal">{feedUser.fullname}</p>
            <p className="text-secondary-gray/50 text-xs">
              {new Date(
                created_at
                  .split(" ")[0]
                  .concat("T")
                  .concat(created_at.split(" ")[1])
                  .concat("Z")
              ).toLocaleString("en", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>

        {auth ? (
          user_id !== auth?.user?.id && (
            <Button
              onClick={(e) => handleFollowSubmit(e)}
              variant={"link"}
              className="text-primary-green hover:no-underline"
            >
              {allFollowers.some((follower) => follower === user_id)
                ? "Following"
                : "Follow"}
            </Button>
          )
        ) : (
          <LoginModal hasChildren={true}>
            <Button
              variant={"link"}
              className="text-primary-green hover:no-underline"
            >
              Follow
            </Button>
          </LoginModal>
        )}
      </div>

      {/* Description */}
      <p className="text-black/80 text-wrap overflow-hidden text-sm font-normal">
        {content}
      </p>
      {/* Featured Images */}
      <div className="md:grid-cols-3 border-b-secondary-gray grid grid-cols-1 gap-5 pb-5 border-b">
        {/* Large Image */}
        {filteredImages.length > 0 && (
          <div className="group md:col-span-2 w-full h-full col-span-1 overflow-hidden rounded-lg">
            <img
              src={
                filteredImages.length > 0
                  ? filteredImages[0]
                  : faker.image.urlLoremFlickr()
              }
              alt="Image"
              className="group-hover:scale-110 object-cover w-full h-full transition"
            />
          </div>
        )}

        {/* Small Images */}
        {filteredImages.length > 1 && (
          <div className="md:flex-col md:justify-start flex flex-row items-center justify-center col-span-1 gap-5">
            {filteredImages.length >= 1 &&
              filteredImages.slice(1).map((image, index) => (
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
        )}
      </div>

      <div className="border-b-secondary-gray text-start md:justify-between md:gap-4 flex flex-wrap items-center w-full gap-1 pb-5 border-b">
        {/* Comments */}
        {auth ? (
          <CommentButton numberOfComments={allComments.length} />
        ) : (
          <LoginModal hasChildren={true}>
            <CommentButton numberOfComments={allComments.length} />
          </LoginModal>
        )}

        {/* Likes */}
        {auth ? (
          <LikeButton
            onClick={(e) => handleLikeSubmit(e)}
            numberOfLikes={allLikes.length}
            userLiked={allLikes.some((like) => like.id === auth?.user?.id)}
          />
        ) : (
          <LoginModal hasChildren={true}>
            <LikeButton numberOfLikes={allLikes.length} />
          </LoginModal>
        )}

        {/* Shares */}
        {auth ? (
          <ShareButton numberOfShares={faker.seed(10)} />
        ) : (
          <LoginModal hasChildren={true}>
            <ShareButton numberOfShares={faker.seed(20)} />
          </LoginModal>
        )}
      </div>

      {allComments.length > 0 && (
        <ScrollArea className="h-[200px] w-full p-4 flex flex-col">
          <div className="flex flex-col gap-5">
            {allComments.map((comment, index) => (
              <CommentItem key={index} comment={comment} />
            ))}
          </div>
        </ScrollArea>
      )}

      {/* Leave a comment */}
      {auth ? (
        <LeaveAComment
          isCommentPending={isCommentPending}
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

        <TooltipContent align="start" className="w-full p-3 bg-white rounded">
          <div className="flex flex-col gap-4">
            <h2 className="text-primary-brown text-xl font-normal">Bio</h2>
            <p className="text-sm font-normal text-black">{userInfo.bio}</p>

            <div className="flex items-center gap-5 pt-2">
              <p className="text-primary-brown text-sm font-normal">
                {userInfo.connections} connections
              </p>
              <span className="w-[1.5px] h-5 bg-primary-brown" />
              <p className="text-primary-brown text-sm font-normal">
                {userInfo.profession}
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface CommentButtonProps extends React.ComponentProps<typeof Button> {
  numberOfComments: number;
}

export const CommentButton: React.FC<CommentButtonProps> = ({
  numberOfComments,
  ...props
}) => {
  return (
    <Button
      {...props}
      variant={"link"}
      className="hover:no-underline md:gap-2 flex items-center gap-1"
    >
      <MessageCircle size={20} className="text-primary-brown" />
      {numberOfComments > 0 ? (
        <span className="text-primary-brown flex items-center gap-1 text-sm font-normal">
          {numberOfComments}{" "}
          <span className="md:block hidden">
            {numberOfComments > 1 ? "comments" : "comment"}
          </span>
        </span>
      ) : (
        <span className="text-primary-brown flex items-center gap-1 text-sm font-normal">
          Comment
        </span>
      )}
    </Button>
  );
};

interface LikeButtonProps extends React.ComponentProps<typeof Button> {
  numberOfLikes: number;
  userLiked?: boolean;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  numberOfLikes,
  userLiked,
  ...props
}) => {
  return (
    <Button
      {...props}
      variant={"link"}
      className="hover:no-underline md:gap-2 flex items-center gap-1"
    >
      <ThumbsUp
        size={20}
        className={userLiked ? "text-primary-green" : "text-primary-brown"}
      />
      {numberOfLikes > 0 ? (
        <span
          className={`flex items-center gap-1 text-sm font-normal ${userLiked ? "text-primary-green" : "text-primary-brown"}`}
        >
          {numberOfLikes}{" "}
          <span className="md:block hidden">
            {numberOfLikes > 1 ? "likes" : "like"}
          </span>
        </span>
      ) : (
        <span className="text-primary-brown flex items-center gap-1 text-sm font-normal">
          Like
        </span>
      )}
    </Button>
  );
};

interface ShareButtonProps extends React.ComponentProps<typeof Button> {
  numberOfShares: number;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  numberOfShares,
  ...props
}) => {
  return (
    <Button
      {...props}
      variant={"link"}
      className="hover:no-underline md:gap-2 flex items-center gap-1"
    >
      <Share2 size={20} className="text-primary-brown" />
      {numberOfShares > 0 ? (
        <span className="text-primary-brown flex items-center gap-1 text-sm font-normal">
          {numberOfShares}{" "}
          <span className="md:block hidden">
            {numberOfShares > 1 ? "shares" : "share"}
          </span>
        </span>
      ) : (
        <span className="text-primary-brown flex items-center gap-1 text-sm font-normal">
          Share
        </span>
      )}
    </Button>
  );
};

interface LeaveACommentProps extends React.ComponentProps<typeof Form> {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  handleCommentSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  image?: string;
  isCommentPending?: boolean;
}

export const LeaveAComment: React.FC<LeaveACommentProps> = ({
  comment,
  setComment,
  handleCommentSubmit,
  image,
  isCommentPending,
  ...props
}) => {
  return (
    <form
      {...props}
      onSubmit={handleCommentSubmit}
      className="flex items-center gap-3 py-3"
    >
      <img
        src={image ?? "/images/avatar.jpg"}
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

      {isCommentPending && (
        <div>
          <ClipLoader size={20} color="#333333" loading={isCommentPending} />
        </div>
      )}
    </form>
  );
};

export const CommentItem = ({ comment }: { comment: IComment }) => {
  function addHoursToDate(dateString: string, hoursToAdd:number): string {
    const date = new Date(dateString.replace(' ', 'T'));

    date.setHours(date.getHours() + hoursToAdd);
  
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  return (
    <div className="flex items-start w-full gap-3">
      <div className="bg-secondary-gray flex items-center justify-center w-10 h-10 p-3 text-center text-white rounded-full">
        {comment.user.fullname.split(" ")[0].charAt(0)}
        {comment.user.fullname.split(" ")[1].charAt(0)}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-primary-brown bg-secondary-gray/40 flex items-center gap-1 p-3 text-sm font-normal rounded-md">
          {comment.content}
        </p>

        <div className="md:gap-2 flex flex-wrap items-center">
          <p className="text-primary-brown flex items-center gap-1 text-sm font-normal">
            {moment(new Date(addHoursToDate(comment.created_at, 4))).fromNow()} 
          </p>
        </div>
      </div>
    </div>
  );
};
