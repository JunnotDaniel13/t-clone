import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import LoadingSpinner from "~/components/LoadingSpinner";
import TweetItem from "~/components/tweet/TweetItem";
import { api } from "~/utils/api";
import { Back } from "./icons";

function Profile() {
  const { asPath, back } = useRouter();
  const { data } = useSession();

  const user_name = asPath.split("/")[1]?.split("@")[1] || "";

  const { data: userdata, isLoading: isUserLoading } =
    api.user.userinfo.useQuery(
      { username: user_name },
      {
        networkMode: "always",
      }
    );

  const { data: tweets, isLoading: isTweetLoading } =
    api.tweet.getTweetsByUser.useQuery(
      { userId: userdata?.id || "" },
      {
        networkMode: "always",
      }
    );

  if (isTweetLoading) return <LoadingSpinner />;

  if (!userdata) return <></>;

  return (
    <>
      <Head>
        <title>
          {userdata.name} (@{userdata.username}) / Twitter
        </title>
        <meta name="description" content="Twitter Clone Home Page" />
      </Head>
      <div className="x-border min-h-full">
        <div className="flex items-center gap-4  p-2">
          <div
            className="flex h-10 w-10 items-center justify-center"
            onClick={() => back()}
          >
            <Back className="icon" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{userdata.name}</h1>
            <p className="text-sm text-gray-500">
              {userdata.tweets?.length} Tweets
            </p>
          </div>
        </div>
        <div className="relative h-40 bg-slate-200 px-4">
          <Image
            src={userdata.image ? userdata.image : ""}
            width={100}
            height={100}
            alt="Profile Picture"
            className="absolute -bottom-[44px] rounded-full border-4 border-white dark:border-black"
          />
        </div>
        <div className="b-border px-4 pt-14">
          <div className="pb-2">
            <h2 className="text-xl font-bold">{userdata.name}</h2>
            <p className="text-sm text-gray-500">@{userdata.username}</p>
          </div>
          <div className="pb-2">{userdata.bio}</div>
          <div className="flex gap-2 pb-2">
            {userdata.location && (
              <span className="text-sm text-gray-500">{userdata.location}</span>
            )}
            <span className="text-sm text-gray-500">
              joinded {dayjs(userdata.join_date).format("MMMM YYYY")}
            </span>
          </div>
          <div className="flex gap-4 py-4">
            <p className="text-sm text-gray-400">
              <strong className="text-black dark:text-white">
                {userdata?.following.length}
              </strong>{" "}
              Following
            </p>
            <p className="text-sm text-gray-400">
              <strong className="text-black dark:text-white">
                {userdata?.followers.length}{" "}
              </strong>
              {userdata?.followers.length !== undefined &&
              userdata?.followers?.length > 1
                ? "Followers"
                : "Follower"}
            </p>
          </div>
        </div>
        <div>
          {tweets &&
            tweets.map((tweet) => (
              <TweetItem tweet={tweet} key={tweet.tweet_id} />
            ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
