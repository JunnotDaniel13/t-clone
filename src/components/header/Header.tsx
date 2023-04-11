import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useScrollDirection from "~/hooks/useScrollDirection";
import TopHeader from "./TopHeader";
import FeedType from "./FeedType";
import Drawer from "./Drawer";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const scrollDirection = useScrollDirection();
  const { data: sessionData } = useSession();
  const [feed, setFeed] = useState<string>("for you");

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [isMenuOpen]);

  if (!sessionData) return <></>;

  return (
    <>
      <header
        className={`sticky right-0 left-0 transition-all ${
          scrollDirection === "down" ? "-top-10 md:top-0" : "top-0"
        } b-border md:x-border z-20 w-full bg-white bg-opacity-30 px-2 pt-2 backdrop-blur-md backdrop-filter dark:bg-black dark:bg-opacity-30`}
      >
        <div>
          <div className="hidden text-xl font-bold md:block">Home</div>
          <TopHeader
            className="md:hidden"
            onSetMenu={() => setIsMenuOpen((prev) => !prev)}
          />
          <FeedType feed={feed} onFeedTypeClick={(feed) => setFeed(feed)} />
        </div>
      </header>
      <Drawer
        isMenuOpen={isMenuOpen}
        onSetMenuOpen={() => setIsMenuOpen((prev) => !prev)}
      />
    </>
  );
};

export default Header;
