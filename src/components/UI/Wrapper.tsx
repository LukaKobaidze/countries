import classes from '../../styles/UI/Wrapper.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  elementRef?: React.RefObject<HTMLDivElement>;
};

const Wrapper = ({ children, className, onClick, elementRef }: Props) => {
  return (
    <div
      className={`${classes.wrapper} ${className}`}
      onClick={onClick}
      ref={elementRef}
    >
      {children}
    </div>
  );
};

export default Wrapper;
