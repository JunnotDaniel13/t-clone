import Image from "next/image";
import { useSession } from "next-auth/react";
import { SwitchIcon } from "~/pages/icons";
import { api } from "~/utils/api";

function AccountInfo() {
  const { data: sessionData } = useSession();

  const { data: user } = api.user.info.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
    networkMode: "always",
  });

  if (!sessionData) return <></>;
  return (
    <>
      <div className="flex items-center justify-between pb-2">
        <Image
          src={sessionData.user.image ? sessionData.user.image : ""}
          alt="Profile picture"
          width="40"
          height="40"
          className="rounded-full"
        />
        <SwitchIcon className="h-7 w-7 rounded-full border border-gray-400 fill-black p-1 dark:fill-white" />
      </div>
      <div>
        <h3 className="font-bold">{user?.name}</h3>
        <p className="text-sm">
          @{user?.username ? user.username : "nousernameyet"}
        </p>
      </div>
      <div className="flex gap-4 py-4">
        <p className="text-sm">
          <strong>{user?.following.length}</strong> Following
        </p>
        <p className="text-sm">
          <strong>{user?.followers.length} </strong>
          {user?.followers.length !== undefined && user?.followers?.length > 1
            ? "Followers"
            : "Follower"}
        </p>
      </div>
    </>
  );
}

export default AccountInfo;
