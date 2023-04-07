import { api } from "~/utils/api";
import LoadingSpinner from "../LoadingSpinner";
import TweetItem from "./TweetItem";

function Tweets() {
  const { data: tweets, isLoading: isTweetLoading } =
    api.tweet.getAllTweet.useQuery(undefined, {
      networkMode: "always",
    });

  if (isTweetLoading) return <LoadingSpinner />;

  return (
    <>
      {tweets?.map((tweet) => (
        <TweetItem tweet={tweet} key={tweet.tweet_id} />
      ))}
    </>
  );
}

export default Tweets;
