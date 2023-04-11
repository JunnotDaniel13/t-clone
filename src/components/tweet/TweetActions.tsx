import type { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Reply, Retweet, Like, Liked } from "~/icons";
import { api } from "~/utils/api";

interface Tweet {
  tweet: {
    reply_count: number;
    retweet_count: number;
    like_count: number;
    userId: string;
    tweet_id: string;
    likes: {
      user: User;
      userId: string;
      like_id: string;
    }[];
  };
}

function TweetActions({ tweet }: Tweet) {
  const ctx = api.useContext();
  const [isLiked, setLike] = useState(false);
  const { data: sessionData } = useSession();
  const { reply_count, retweet_count, tweet_id, likes } = tweet;

  const { mutate } = api.tweet.like.useMutation({
    networkMode: "always",
    onSuccess() {
      void ctx.tweet.invalidate();
    },
  });
  const { mutate: dislike } = api.tweet.dislike.useMutation({
    networkMode: "always",
    onSuccess() {
      void ctx.tweet.invalidate();
    },
  });
  const likePost = () => {
    setLike(true);
    const userLikedTweet = tweet.likes.filter(
      (like) => like.userId === sessionData?.user.id
    );
    const userLiked = userLikedTweet.length;
    if (userLiked === 1) {
      setLike(false);
      return dislike({ like_id: userLikedTweet[0]?.like_id || "" });
    }
    mutate({ userId: sessionData ? sessionData?.user.id : "", tweet_id });
  };
  const notify = (message: string) =>
    toast.error(
      `Oops! ${message} is not working right now, we're fixing it ASAP. Thanks for your patience!`
    );
  const like = likes.filter((like) => like.userId === sessionData?.user.id)[0];

  if (!sessionData) return <></>;
  return (
    <div className="mt-4 flex justify-between">
      <div className="flex items-center gap-1" onClick={() => notify("Reply")}>
        <Reply className="icon" />
        <span>{reply_count}</span>
      </div>
      <div
        className="flex items-center gap-1"
        onClick={() => notify("Retweet")}
      >
        <Retweet className="icon" />
        <span>{retweet_count}</span>
      </div>
      <div
        className="flex items-center gap-1 rounded-full py-1 px-3 transition-all hover:bg-pink-600/30 dark:hover:bg-pink-600/20 "
        onClick={() => likePost()}
      >
        {isLiked || sessionData?.user.id === like?.user.id ? (
          <Liked className="icon" />
        ) : (
          <Like className="icon" />
        )}
        <span className="transition-all">{likes.length}</span>
      </div>
      <div className="flex items-center gap-1"></div>
    </div>
  );
}

export default TweetActions;
