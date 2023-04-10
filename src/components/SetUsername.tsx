import React, { useRef, useState } from "react";
import { api } from "~/utils/api";

function SetUsername() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");

  const ctx = api.useContext();

  const {
    mutate,
    isLoading: isUpdating,
    error,
  } = api.user.update.useMutation({
    networkMode: "always",
    onSuccess() {
      void ctx.user.info.invalidate();
    },
  });

  return (
    <div className="x-border absolute inset-0 z-20 flex h-full w-full justify-center bg-gray-100  dark:bg-black">
      <div className="m-6 self-center rounded-lg bg-gray-300 p-6 shadow-md dark:bg-zinc-900  dark:shadow-neutral-800">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const name = username.trim();
            setUsername("");
            if (name.includes("@")) {
              console.log(name);
              return;
            }
            if (name) {
              mutate({ username: name });
            }
          }}
        >
          <div className="mb-2 flex flex-col gap-2">
            <label htmlFor="username">Please enter your username</label>
            <div className="flex items-center rounded-full bg-gray-400 px-6 py-3 dark:bg-[#383838]">
              <span>@</span>
              <input
                className="w-full bg-transparent outline-none "
                type="text"
                id="username"
                name="username"
                ref={usernameRef}
                disabled={isUpdating}
                onBlur={() =>
                  setUsername(
                    usernameRef.current?.value ? usernameRef.current?.value : ""
                  )
                }
              />
            </div>
            <p className="text-sm font-bold text-red-600">
              {error &&
                error.message.includes(
                  "Unique constraint failed on the fields: (`username`)"
                ) &&
                "Invalid username, please create a unique one"}
            </p>
          </div>
          <button
            className="btn-lg-primary"
            type="submit"
            disabled={isUpdating}
          >
            {isUpdating ? "Updtading" : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetUsername;
