import { useSession } from "next-auth/react";
import Image from "next/image";
import { LogoIcon } from "~/icons";

interface Props {
  onSetMenu: () => void;
  className: string;
}

function TopHeader({ onSetMenu, className }: Props) {
  const { data: sessionData } = useSession();

  if (!sessionData) return <></>;

  return (
    <div className={`grid w-full grid-cols-3 gap-4 ${className}`}>
      <Image
        src={sessionData.user.image ? sessionData.user.image : ""}
        alt="Profile picture"
        width="25"
        height="25"
        priority={true}
        className="justify-self-start rounded-full"
        onClick={() => onSetMenu()}
      />
      <LogoIcon className="h-6 w-6 place-self-center" />
    </div>
  );
}

export default TopHeader;
