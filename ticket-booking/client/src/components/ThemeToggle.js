import { useTheme } from '../ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="ml-4 p-2 rounded bg-gray-300 dark:bg-gray-700"
    >
      {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
