import { signOut } from "next-auth/react";
import { CloseIcon, AccordionChevron } from "~/icons";
import AccountInfo from "./AccountInfo";
import MenuNavigation from "./MenuNavigation";

interface Props {
  isMenuOpen: boolean;
  onSetMenuOpen: () => void;
}

function Drawer({ isMenuOpen, onSetMenuOpen }: Props) {
  return (
    <div
      className={`fixed inset-0 ${
        !isMenuOpen ? "right-full -left-full" : ""
      } z-20 bg-black bg-opacity-80 transition-all dark:bg-gray-800 dark:bg-opacity-80`}
    >
      <div
        className={`absolute inset-0 right-[12%] z-30 bg-white dark:bg-black`}
      >
        <div className="flex items-center justify-between p-3">
          <h2 className="font-bold">Account info</h2>
          <div onClick={() => onSetMenuOpen()}>
            <CloseIcon className="h-5 w-5 fill-black dark:fill-white" />
          </div>
        </div>
        <div className="h-full overflow-y-scroll p-3 ">
          <AccountInfo />
          <MenuNavigation />
          <div>
            <div className="flex justify-between py-4">
              <p>Creator Studio</p>
              <AccordionChevron className="fill-black dark:fill-white" />
            </div>
            <div className="flex justify-between py-4">
              <p>Professional Tools</p>
              <AccordionChevron className="fill-black dark:fill-white" />
            </div>
            <div className="flex justify-between py-4">
              <p>Settings and Support</p>
              <AccordionChevron className="fill-black dark:fill-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
