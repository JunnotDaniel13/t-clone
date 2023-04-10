import dayjs from "dayjs";
import Image from "next/image";
import { Reply, Retweet, Like, Share } from "~/icons";
import type { RouterOutputs } from "~/utils/api";

import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import toast from "react-hot-toast";

type Tweet = RouterOutputs["tweet"]["getAllTweet"][number];

dayjs.extend(relativeTime);

interface Props {
  tweet: Tweet;
}

function TweetItem({ tweet }: Props) {
  const notify = () =>
    toast.error(
      "Oops! We're working to fix it ASAP. Thanks for your patience!"
    );

  return (
    <div className="b-border grid grid-cols-6 gap-2 p-2 md:flex ">
      <div className="aspect-square h-12 w-12 ">
        <Link href={`@${tweet.user.username ? tweet.user.username : ""}`}>
          <Image
            src={tweet?.user?.image ? tweet?.user?.image : ""}
            alt="Profile picture"
            width="50"
            height="50"
            className="rounded-full"
          />
        </Link>
      </div>
      <div className="col-span-5 w-full">
        <div className="flex items-center justify-between gap-2 ">
          <div className="flex gap-1 truncate">
            <Link
              href={`@${tweet.user.username ? tweet.user.username : ""}`}
              className="truncate hover:underline"
            >
              <span className="w-max  font-bold">{tweet.user.name}</span>
            </Link>
            <Link
              href={`@${tweet.user.username ? tweet.user.username : ""}`}
              className="truncate hover:underline"
            >
              <span className=" text-slate-800 dark:text-slate-400">{`@${
                tweet.user.username ? tweet.user.username : ""
              } `}</span>
            </Link>
            <span className="truncate text-slate-800 dark:text-slate-400">
              &middot;
            </span>
            <span className="truncate text-slate-800 dark:text-slate-400">
              {dayjs(tweet.tweet_date).fromNow()}
            </span>
          </div>
        </div>

        <div className="">{tweet.tweet_text}</div>

        <div className="mt-2 flex justify-between">
          <div className="flex items-center gap-1" onClick={notify}>
            <Reply className="icon" />
            <span>{tweet.reply_count !== 0 ? tweet.reply_count : ""}</span>
          </div>
          <div className="flex items-center gap-1" onClick={notify}>
            <Retweet className="icon" />
            <span>{tweet.retweet_count !== 0 ? tweet.retweet_count : ""}</span>
          </div>
          <div className="flex items-center gap-1" onClick={notify}>
            <Like className="icon" />
            <span>{tweet.like_count !== 0 ? tweet.like_count : ""}</span>
          </div>
          <div className="flex items-center gap-1" onClick={notify}>
            <Share className="icon" />
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetItem;
