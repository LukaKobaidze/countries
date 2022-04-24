import styles from 'styles/Country/CountryBtn.module.scss';

type Props = {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
};

const CountryBtn = ({ onClick, className, children }: Props) => {
  return (
    <button
      className={`${styles['country-btn']} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CountryBtn;
