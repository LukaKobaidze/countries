import { Link } from 'react-router-dom';
import styles from 'styles/Header/HeaderLogo.module.scss';

interface Props {}

const HeaderLogo = (props: Props) => {
  return (
    <Link to="/" className={styles.anchor}>
      <h1 className={styles.heading}>Where in the world?</h1>
    </Link>
  );
};

export default HeaderLogo;
