import { useTheme } from "next-themes";
import { Sun, Moon } from "~/icons";

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-full"
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      {theme === "dark" ? (
        <Sun className="h-8 w-8 stroke-white" />
      ) : (
        <Moon className="h-8 w-8 stroke-black" />
      )}
    </button>
  );
}

export default ThemeSwitch;
