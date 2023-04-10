import { useSession, signOut, signIn } from "next-auth/react";
import router from "next/router";
import React, { useEffect } from "react";

function Login() {
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/login");
    }
    if (status === "authenticated") {
      void router.push("/home");
    }
  }, [status]);

  if (status === "authenticated") return <></>;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center ">
      <button
        className="btn-lg-primary"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}

export default Login;
