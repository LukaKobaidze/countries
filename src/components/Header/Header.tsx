import HeaderLogo from './HeaderLogo';
import { useContext } from 'react';
import { ThemeContext } from 'context/theme';
import HeaderTheme from './HeaderTheme';
import styles from 'styles/Header/Header.module.scss';

const Header = () => {
  const { theme, onThemeToggle } = useContext(ThemeContext);

  return (
    <header className={styles.header}>
      <HeaderLogo />
      <HeaderTheme theme={theme} onToggleTheme={onThemeToggle} />
    </header>
  );
};

export default Header;
