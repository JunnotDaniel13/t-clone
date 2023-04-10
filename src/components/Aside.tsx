import Image from "next/image";
import { useTheme } from "next-themes";
import MenuNavigation from "./header/MenuNavigation";
import { api } from "~/utils/api";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ThemeSwitch from "./ui/ThemeSwitch";

function Aside() {
  const { setTheme, theme } = useTheme();
  const { data } = useSession();
  const [isOpen, setOpen] = useState(false);

  const { data: user } = api.user.info.useQuery(undefined, {
    enabled: data?.user !== undefined,
    networkMode: "always",
  });

  useEffect(() => {
    document.getElementById("logout")?.classList.toggle("invisible");
  }, [isOpen]);

  if (!user || !user.username) return <></>;

  return (
    <aside className="relative z-20 col-span-1 hidden max-h-full overflow-hidden md:block">
      <div className="fixed flex h-full flex-col items-center justify-between pb-4 md:w-12">
        <MenuNavigation />
        <div className="flex flex-col gap-4">
          <ThemeSwitch />
          <button
            type="button"
            className="relative"
            onClick={() => setOpen((prev) => !prev)}
          >
            <Image
              src={user.image ? user.image : ""}
              width={40}
              height={40}
              alt="Profile Picture"
              className="rounded-full"
            />
            <div
              id="logout"
              className="invisible absolute -top-12 w-max rounded-md bg-white  shadow-md shadow-black dark:bg-black dark:shadow-white"
            >
              <button onClick={() => void signOut()} className="p-2">
                Log Out
              </button>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
