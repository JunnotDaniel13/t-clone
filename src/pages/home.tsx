import { useEffect } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import SetUsername from "~/components/SetUsername";
import Loading from "~/components/Loading";
import Tweets from "~/components/tweet/TweetList";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CreateTweet from "~/components/tweet/CreateTweet";

dayjs.extend(relativeTime);

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { data: user, isLoading } = api.user.info.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
    networkMode: "always",
  });

  useEffect(() => {
    if (!sessionData) {
      void router.push("/");
    }
  }, [sessionData, router]);

  useEffect(() => {
    if (!user?.username) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [user]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Head>
        <title>Home / Twitter</title>
        <meta name="description" content="Twitter Clone Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {sessionData?.user && !user?.username ? (
        <SetUsername />
      ) : (
        <main className="md:x-border relative flex min-h-screen flex-col bg-white dark:bg-black ">
          <div className="hidden md:block">
            <CreateTweet />
          </div>
          <Tweets />
        </main>
      )}
    </>
  );
};

export default Home;
