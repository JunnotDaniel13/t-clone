import Link from "next/link";
import {
  HomeActiveIcon,
  MessagesIcon,
  NotificationsIcon,
  SearchIcon,
  Tweet,
} from "../icons/index";

const Navigation: React.FC = () => {
  return (
    <>
      <Link href="/compose/tweet" className="md:hidden">
        <div className="fixed bottom-16 right-4 z-10 h-12 w-12 rounded-full bg-twitter p-3 ">
          <Tweet className="fill-white" />
        </div>
      </Link>
      <nav className="t-border sticky bottom-0 right-0 left-0 z-10 flex w-full justify-between bg-white dark:bg-black md:hidden">
        <Link href="/home" className="px-6 py-3 ">
          <HomeActiveIcon className="menu-icon " />
        </Link>
        <Link href="/search" className="px-6 py-3">
          <SearchIcon className="menu-icon" />
        </Link>
        <Link href="/notifications" className="px-6 py-3">
          <NotificationsIcon className="menu-icon" />
        </Link>
        <Link href="/messages" className="px-6 py-3">
          <MessagesIcon className="menu-icon" />
        </Link>
      </nav>
    </>
  );
};

export default Navigation;
