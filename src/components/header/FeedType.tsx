import React from "react";

interface Props {
  feed: string;
  onFeedTypeClick: (feedType: string) => void;
}

function FeedType({ feed, onFeedTypeClick }: Props) {
  return (
    <div className="grid w-full grid-cols-2">
      <button
        onClick={() => onFeedTypeClick("for you")}
        className={`w-fit justify-self-center border-b-4 ${
          feed === "for you" ? "border-twitter font-bold" : "border-transparent"
        } py-2 px-1 font-medium`}
      >
        For you
      </button>
      <button
        onClick={() => onFeedTypeClick("following")}
        className={`w-fit justify-self-center border-b-4 ${
          feed === "following"
            ? "border-twitter font-bold"
            : "border-transparent"
        } py-2 px-1 font-medium`}
      >
        Following
      </button>
    </div>
  );
}

export default FeedType;
