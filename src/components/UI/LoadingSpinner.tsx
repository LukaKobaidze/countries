import styles from 'styles/UI/LoadingSpinner.module.scss';

interface Props {
  center?: boolean;
  className?: string;
}

const LoadingSpinner = ({ center = true, className }: Props) => {
  return (
    <div
      className={`${styles.spinner} ${
        center ? styles.center : ''
      } ${className}`}
    />
  );
};

export default LoadingSpinner;
