import { Link } from 'react-router-dom';
import Heading from '../UI/Heading';
import Theme from './Theme';
import classes from '../../styles/Header/Header.module.scss';

type Props = {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

const Header = (props: Props) => {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes['header--heading-a']}>
        <Heading className={classes['header--h1']}>Where in the world?</Heading>
      </Link>
      <Theme theme={props.theme} onToggleTheme={props.onToggleTheme} />
    </header>
  );
};

export default Header;
