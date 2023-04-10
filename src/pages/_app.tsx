import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { api } from "~/utils/api";

import Layout from "~/components/Layout";

import "~/styles/globals.css";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { pathname } = useRouter();
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" enableSystem={true}>
        <Toaster
          position="bottom-center"
          toastOptions={{
            success: {
              style: { background: "green", color: "white" },
            },
            error: {
              style: { background: "red", color: "white" },
            },
          }}
        />
        {pathname === "/compose/tweet" ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
