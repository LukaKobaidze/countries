import classes from '../../../styles/Main/CountryDetails/CountryBtn.module.scss';

type Props = {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
};

const CountryBtn = ({ onClick, className, children }: Props) => {
  return (
    <button
      className={`${classes['country-btn']} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CountryBtn;
