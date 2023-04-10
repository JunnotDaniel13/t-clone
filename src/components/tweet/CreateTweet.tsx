import { type FormEvent, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useSession } from "next-auth/react";
import router from "next/router";
import { api } from "~/utils/api";

const CreateTweet = () => {
  const { data: sessionData } = useSession();
  const [tweet, setTweet] = useState("");
  const tweetRef = useRef<HTMLTextAreaElement>(null);
  const ctx = api.useContext();

  const { mutate, isLoading: isTweeting } = api.tweet.create.useMutation({
    networkMode: "always",
    onSuccess() {
      void ctx.tweet.getAllTweet.invalidate();
      void router.push("/home");
    },
  });

  const onSubmitHandler = (event: MouseEvent | FormEvent) => {
    event.preventDefault();
    const tweet_text = tweet
      .split(" ")
      .filter((tweet) => tweet !== "")
      .join(" ");
    setTweet("");
    mutate({ tweet_text, userId: sessionData?.user.id || "" });
  };

  useEffect(() => {
    if (tweetRef.current) {
      tweetRef.current.rows = Math.floor(tweetRef.current.scrollHeight / 28);
    }
  }, [tweet]);

  if (!sessionData) return <></>;

  return (
    <div className="md:b-border flex w-full gap-2 md:px-2">
      <div className="">
        <Image
          src={sessionData.user.image ? sessionData.user.image : ""}
          alt="Profile picture"
          width="50"
          height="50"
          className="rounded-full"
        />
      </div>
      <form
        className="b-border relative mb-4 h-fit w-full flex-col md:flex md:border-none"
        onSubmit={onSubmitHandler}
      >
        <textarea
          onChange={(event) => {
            setTweet(event.target?.value);
          }}
          ref={tweetRef}
          name="tweet"
          id="tweet"
          value={tweet}
          maxLength={500}
          placeholder="What's happening?"
          className="block w-full resize-none overflow-y-visible rounded-lg bg-transparent p-2 text-lg placeholder-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="btn-primary absolute -top-10 right-0  md:hidden"
        >
          {isTweeting ? "Tweeting" : "Tweet"}
        </button>
        <button type="submit" className="btn-primary hidden self-end md:block">
          {isTweeting ? "Tweeting" : "Tweet"}
        </button>
      </form>
    </div>
  );
};
export default CreateTweet;
