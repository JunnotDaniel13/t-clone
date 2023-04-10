import toast from "react-hot-toast";
import { Reply, Retweet, Like, Share } from "~/icons";

interface Tweet {
  tweet: {
    reply_count: number;
    retweet_count: number;
    like_count: number;
  };
}

function TweetActions({ tweet }: Tweet) {
  const notify = () =>
    toast.error(
      "Oops! We're working to fix it ASAP. Thanks for your patience!"
    );
  return (
    <div className="mt-4 flex justify-between">
      <div className="flex items-center gap-1" onClick={notify}>
        <Reply className="icon" />
        <span>{tweet.reply_count}</span>
      </div>
      <div className="flex items-center gap-1" onClick={notify}>
        <Retweet className="icon" />
        <span>{tweet.retweet_count}</span>
      </div>
      <div className="flex items-center gap-1" onClick={notify}>
        <Like className="icon" />
        <span>{tweet.like_count}</span>
      </div>
      <div className="flex items-center gap-1" onClick={notify}>
        <Share className="icon" />
        <span></span>
      </div>
    </div>
  );
}

export default TweetActions;
