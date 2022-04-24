import { ReactComponent as IconMoon } from 'assets/moon.svg';
import { ReactComponent as IconMoonFill } from 'assets/moon-fill.svg';
import styles from 'styles/Header/HeaderTheme.module.scss';

type Props = {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

const Theme = ({ onToggleTheme, theme }: Props) => {
  return (
    <button className={styles.theme} onClick={onToggleTheme}>
      {theme === 'light' ? <IconMoon /> : <IconMoonFill />}
      Dark Mode
    </button>
  );
};

export default Theme;
