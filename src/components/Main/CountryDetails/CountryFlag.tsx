import classes from '../../../styles/Main/CountryDetails/CountryFlag.module.scss';

type Props = {
  image: string | undefined;
};

const CountryFlag = ({ image }: Props) => {
  return <img className={classes.flag} src={image} />;
};

export default CountryFlag;
