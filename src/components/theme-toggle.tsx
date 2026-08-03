import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative grid size-10 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
      aria-label="Toggle theme"
    >
      {/* Sun Icon */}
      <span className="transition-all duration-300 transform dark:-rotate-90 dark:scale-0 rotate-0 scale-100">
        <Sun className="size-5" strokeWidth={1.75} />
      </span>

      {/* Moon Icon */}
      <span className="absolute transition-all duration-300 transform dark:rotate-0 dark:scale-100 rotate-90 scale-0">
        <Moon className="size-5" strokeWidth={1.75} />
      </span>
    </button>
  );
}
