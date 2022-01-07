import classes from '../../styles/Header/Theme.module.scss';
import Moon from '../UI/Icons/Moon';
import MoonFill from '../UI/Icons/MoonFill';

type Props = {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

const Theme = ({ onToggleTheme, theme }: Props) => {
  return (
    <button className={classes.theme} onClick={onToggleTheme}>
      {theme === 'light' && <Moon />}
      {theme === 'dark' && <MoonFill />}
      Dark Mode
    </button>
  );
};

export default Theme;
