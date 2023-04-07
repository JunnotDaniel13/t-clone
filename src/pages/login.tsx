import { useSession, signOut, signIn } from "next-auth/react";
import router from "next/router";
import React, { useEffect } from "react";

function Login() {
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [sessionData, status]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="bg-green/10 rounded-full border px-10 py-3 font-semibold text-green-400 no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}

export default Login;
