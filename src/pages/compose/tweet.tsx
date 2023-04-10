import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Back } from "../../icons";
import CreateTweet from "~/components/tweet/CreateTweet";

function Tweet() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  if (!sessionData) return <></>;

  return (
    <div className="px-4">
      <div className="flex h-12 items-center justify-between py-2">
        <div onClick={() => router.back()}>
          <Back className="icon" />
        </div>
      </div>
      <CreateTweet />
    </div>
  );
}

export default Tweet;
