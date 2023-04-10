import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Reply, Retweet, Like, Share, Liked } from "~/icons";
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
  const { data: sessionData } = useSession();
  const { reply_count, retweet_count, tweet_id, userId, likes } = tweet;

  const { mutate } = api.tweet.like.useMutation({
    networkMode: "always",
    onSuccess() {
      ctx.tweet.invalidate();
    },
  });
  const likePost = () => {
    const userLiked = tweet.likes.filter(
      (like) => like.userId === userId
    ).length;
    if (userLiked >= 1) return;
    mutate({ userId: sessionData ? sessionData?.user.id : "", tweet_id });
  };
  const notify = () =>
    toast.error(
      "Oops! We're working to fix it ASAP. Thanks for your patience!"
    );
  const like = likes.filter((like) => like.userId === sessionData?.user.id)[0];

  if (!sessionData) return <></>;
  return (
    <div className="mt-4 flex justify-between">
      <div className="flex items-center gap-1" onClick={notify}>
        <Reply className="icon" />
        <span>{reply_count}</span>
      </div>
      <div className="flex items-center gap-1" onClick={notify}>
        <Retweet className="icon" />
        <span>{retweet_count}</span>
      </div>
      <div className="flex items-center gap-1" onClick={() => likePost()}>
        {sessionData?.user.id === like?.user.id ? (
          <Liked className="icon" />
        ) : (
          <Like className="icon" />
        )}
        <span>{likes.length}</span>
      </div>
      <div className="flex items-center gap-1" onClick={notify}>
        <Share className="icon" />
        <span></span>
      </div>
    </div>
  );
}

export default TweetActions;
