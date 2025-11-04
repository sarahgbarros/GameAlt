// src/contexts/ThemeContext.tsx
import { 
  createContext, 
  useContext, 
  useState, 
  useEffect 
} from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      return storedTheme;
    }
    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    return userMedia.matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = { theme, setTheme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }

  return context;
};