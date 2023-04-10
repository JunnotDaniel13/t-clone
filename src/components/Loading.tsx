import React from "react";
import { LogoIcon } from "~/icons";

function Loading() {
  return (
    <div className="absolute z-20 flex h-screen w-full items-center justify-center bg-white dark:bg-black">
      <LogoIcon className="h-16 w-16" />
    </div>
  );
}

export default Loading;
