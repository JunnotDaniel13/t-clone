import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useEffect } from "react";
import Loading from "~/components/Loading";

const Home: NextPage = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [sessionData]);

  const {
    data: user,
    isLoading,
    isFetched,
  } = api.user.info.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
    networkMode: "always",
  });

  if (isLoading) return <Loading />;

  if (isFetched && !user?.username) return <Loading />;

  return (
    <>
      <Head>
        <title>Twitter</title>
        <meta
          name="description"
          content="Twitter clone created with love by Junnot Daniel"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default Home;
