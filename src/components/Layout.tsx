import { type ReactNode, useEffect } from "react";

import Navigation from "./NavBar";
import Header from "./header/Header";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import router, { useRouter } from "next/router";
import Aside from "./Aside";

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useRouter();
  const { data, status } = useSession();

  const { data: user } = api.user.info.useQuery(undefined, {
    enabled: data?.user !== undefined,
    networkMode: "always",
  });

  useEffect(() => {
    if (!user) {
      void router.push("/login");
    }
  }, [user]);

  return (
    <div className="grid min-h-full grid-cols-4 md:mx-12 md:grid-cols-12">
      <Aside />
      <main className="relative col-span-11 flex min-h-screen flex-col bg-white dark:bg-black">
        {pathname.includes("[slug]") ? <></> : user?.username && <Header />}
        {children}
        {status !== "loading" &&
          status !== "unauthenticated" &&
          user?.username && <Navigation />}
      </main>
    </div>
  );
};

export default Layout;
