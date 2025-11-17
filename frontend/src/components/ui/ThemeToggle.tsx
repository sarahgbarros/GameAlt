
import { useTheme } from "../../contexts/ThemeContext"; 
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        fixed bottom-4 right-4 z-50 
        p-3 rounded-full shadow-lg
        ${theme === 'light' ? 'bg-white text-gray-700 hover:bg-gray-100' : 'bg-gray-800 text-gray-200 hover:bg-gray-700'}
        transition-all duration-300
      `}
      aria-label="Mudar tema"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}