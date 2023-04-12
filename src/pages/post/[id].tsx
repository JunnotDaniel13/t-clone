import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingSpinner from "~/components/LoadingSpinner";
import TweetItem from "~/components/tweet/TweetItem";

import { Back } from "~/icons";
import { api } from "~/utils/api";

function SingleTweet() {
  const [id, setId] = useState("");
  const { back, query, push } = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (query.id) {
      setId(query.id as string);
    }
  }, [query]);

  useEffect(() => {
    if (status === "unauthenticated") {
      void push("/login");
    }
  }, [status, push]);
  const { data: tweet, isLoading } = api.tweet.getSingleTweet.useQuery(
    {
      tweet_id: id,
    },
    { networkMode: "always" }
  );

  if (isLoading) return <LoadingSpinner />;

  if (!tweet) return <>Something went wrong</>;

  return (
    <div className="md:x-border h-full">
      <div className="b-border flex items-center gap-4 p-2">
        <div
          className="flex h-10 w-10 items-center justify-center"
          onClick={() => back()}
        >
          <Back className="icon" />
        </div>
        <div></div>
      </div>
      {tweet ? <TweetItem tweet={tweet} /> : ""}
    </div>
  );
}

export default SingleTweet;
