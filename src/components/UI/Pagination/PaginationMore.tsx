import PaginationButton from './PaginationButton';
import Wrapper from '../Wrapper';
import classes from '../../../styles/UI/Pagination/PaginationMore.module.scss';

type Props = {
  buttons: [start: number, end: number];
};

const PaginationMore = ({ buttons }: Props) => {
  const [start, end] = buttons;
  const renderButtons = () =>
    Array(end - start + 1 || 1)
      .fill(0)
      .map((_, index) => {
        const number = start + index;

        return (
          <PaginationButton key={number} toPage={number}>
            {number}
          </PaginationButton>
        );
      });

  return (
    <div className={classes['pagination-more']}>
      <Wrapper className={classes['pagination-more__buttons']}>
        {renderButtons()}
      </Wrapper>
      <PaginationButton className={classes['pagination-more--btn-more']}>
        ...
      </PaginationButton>
    </div>
  );
};

export default PaginationMore;
