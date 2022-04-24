import { useStorageState } from 'hooks';
import { useEffect } from 'react';
import ThemeContext from './theme-context';

const changeTheme = (theme: Theme) => {
  const prevTheme = theme === 'light' ? 'dark' : 'light';
  document.body.classList.remove(`theme--${prevTheme}`);
  document.body.classList.add(`theme--${theme}`);
};

type Theme = 'light' | 'dark';
interface Props {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useStorageState<Theme>('theme', 'light');

  const onThemeToggle = () => {
    setTheme((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, onThemeToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
