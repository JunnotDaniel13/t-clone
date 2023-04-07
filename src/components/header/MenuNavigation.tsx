import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  ProfileIcon,
  TopicsIcon,
  BookmarksIcon,
  ListsIcon,
  TwitterCircleIcon,
  LogoIcon,
  HomeActiveIcon,
  ProfileActiveIcon,
  HomeIcon,
} from "~/pages/icons";
import { api, RouterOutputs } from "~/utils/api";

function MenuNavigation() {
  const { pathname } = useRouter();
  const { data: sessionData } = useSession();

  const { data: user } = api.user.info.useQuery(undefined, {
    enabled: sessionData?.user ? true : false,
    networkMode: "always",
  });

  const menuMap = [
    {
      icon: pathname.includes("/@") ? (
        <ProfileActiveIcon className="menu-icon" />
      ) : (
        <ProfileIcon className="menu-icon" />
      ),
      value: "profile",
      link: `@${user?.username}`,
    },
    // {
    //   icon: <TopicsIcon className="menu-icon" />,
    //   value: "topics",
    //   link: `topics`,
    // },
    // {
    //   icon: <BookmarksIcon className="menu-icon" />,
    //   link: `bookmarks`,
    //   value: "bookmarks",
    // },
    // {
    //   icon: <ListsIcon className="menu-icon" />,
    //   value: "lists",
    //   link: `lists`,
    // },
    // {
    //   icon: <TwitterCircleIcon className="menu-icon" />,
    //   value: "twitter circle",
    //   link: `twitter-circle`,
    // },
  ];

  return (
    <div className="b-border md:border-none">
      <Link href="/home" className="menu-hover hidden md:block">
        <div className="flex gap-6 py-4 md:flex md:aspect-square md:items-center md:justify-center md:gap-2 md:p-2">
          <LogoIcon className="menu-icon h-7 w-7" />
          <p className="text-xl font-bold md:hidden">Home</p>
        </div>
      </Link>
      <Link href="/home">
        <div className="menu-hover flex gap-6 py-4 md:flex md:aspect-square md:items-center md:justify-center md:gap-2 md:p-2">
          {pathname.includes("home") ? (
            <HomeActiveIcon className="menu-icon h-7 w-7" />
          ) : (
            <HomeIcon className="menu-icon h-7 w-7" />
          )}
          <p className="text-xl font-bold md:hidden">Profil</p>
        </div>
      </Link>
      {menuMap.map((menu) => (
        <Link href={menu.link} key={menu.link} className="menu-hover">
          <div
            className="menu-hover flex gap-6 py-4 md:flex md:aspect-square md:items-center md:justify-center md:gap-2 md:p-2"
            key={menu.value}
          >
            {menu.icon}
            <p className="text-xl font-bold md:hidden">{menu.value}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MenuNavigation;
