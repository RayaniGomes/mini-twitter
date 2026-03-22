import { Moon, Sun1 } from "iconsax-react";
import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-nav border border-edge text-muted shadow-lg hover:scale-110 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 cursor-pointer"
    >
      {isDark ? <Sun1 size={20} color="#62748E" /> : <Moon size={20} color="#62748E" />}
    </button>
  );
}