import styles from 'styles/Country/CountryFlag.module.scss';

type Props = {
  image: string | undefined;
};

const CountryFlag = ({ image }: Props) => {
  return <img className={styles.flag} alt="" src={image} />;
};

export default CountryFlag;
