import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Back } from "../icons";
import CreateTweet from "~/components/tweet/CreateTweet";

function Tweet() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { setTheme, theme } = useTheme();

  if (!sessionData) return <></>;

  return (
    <div className="px-4">
      <div className="flex h-12 items-center justify-between py-2">
        <div onClick={() => router.back()}>
          <Back className="icon" />
        </div>
      </div>
      <CreateTweet />
      <button
        onClick={() =>
          theme === "dark" ? setTheme("light") : setTheme("dark")
        }
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
}

export default Tweet;
