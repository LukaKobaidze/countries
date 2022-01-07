import { useSearchParams } from 'react-router-dom';
import classes from '../../../styles/UI/Pagination/PaginationButton.module.scss';

type Props = {
  toPage?: number;
  pageMax?: number;
  className?: string;
  children?: React.ReactNode;
};

const PaginationButton = ({ toPage, pageMax, className, children }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearchParams = Object.fromEntries(
    new URLSearchParams(searchParams)
  );

  const clickHandler = () => {
    if (!toPage) return;
    if ((pageMax && toPage > pageMax) || toPage < 1) return;

    currentSearchParams.page = toPage + '';
    setSearchParams(currentSearchParams);
  };

  return (
    <button
      className={`${classes['pagination-button']} ${className}`}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
