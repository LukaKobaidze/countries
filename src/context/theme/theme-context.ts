import { createContext } from 'react';

interface Context {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

const ThemeContext = createContext<Context>({
  theme: 'light',
  onThemeToggle: () => {},
});

export default ThemeContext