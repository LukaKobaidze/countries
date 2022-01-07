import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

const changeTheme = (theme: 'light' | 'dark') => {
  const prevTheme = theme === 'light' ? 'dark' : 'light';
  document.body.classList.remove(`theme--${prevTheme}`);
  document.body.classList.add(`theme--${theme}`);
};

function App() {
  const initialTheme = () =>
    JSON.parse(window.localStorage.getItem('theme')!) || 'light';
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme());

  useEffect(() => {
    window.localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const toggleThemeHandler = () => {
    setTheme(curTheme => (curTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Header theme={theme} onToggleTheme={toggleThemeHandler} />
      <Main />
    </BrowserRouter>
  );
}

export default App;
