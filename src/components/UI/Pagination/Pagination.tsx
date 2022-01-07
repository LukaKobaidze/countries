import { Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import KeyboardArrowLeft from '../Icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../Icons/KeyboardArrowRight';
import Wrapper from '../Wrapper';
import PaginationButton from './PaginationButton';
import PaginationMore from './PaginationMore';
import classes from '../../../styles/UI/Pagination/Pagination.module.scss';

type Props = {
  numberOfPages: number;
};

const Pagination = ({ numberOfPages }: Props) => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const renderButton = (number: number) => {
    return (
      <PaginationButton
        toPage={number}
        className={`${classes['pagination-btn']} ${
          classes['pagination-btn--num']
        } ${
          number === currentPage ? classes['pagination-btn--num--active'] : ''
        }`}
        key={number}
      >
        {number}
      </PaginationButton>
    );
  };

  const renderPaginationButtons = () => {
    return Array(numberOfPages + 1)
      .fill(0)
      .slice(currentPage - 1, currentPage + 2)
      .map((_, index) => {
        let page = currentPage + (index - 1);
        if (currentPage === 1 && numberOfPages > 2) page += 1;
        return (
          <Fragment key={index}>
            {numberOfPages > 3 &&
              currentPage > 2 &&
              index === 0 &&
              renderButton(1)}

            {currentPage > 3 && numberOfPages !== 4 && index === 0 && (
              <PaginationMore
                buttons={[
                  2,
                  currentPage - (currentPage === numberOfPages ? 3 : 2),
                ]}
              />
            )}

            {numberOfPages > 2 &&
              currentPage === numberOfPages &&
              index === 0 &&
              renderButton(numberOfPages - 2)}

            {page !== 0 && renderButton(page)}
            {currentPage < numberOfPages - 2 &&
              numberOfPages !== 4 &&
              index === 2 && (
                <PaginationMore
                  buttons={[
                    currentPage + (currentPage === 1 ? 3 : 2),
                    numberOfPages - 1,
                  ]}
                />
              )}
            {numberOfPages > 3 &&
              currentPage < numberOfPages - 1 &&
              index === 2 &&
              renderButton(numberOfPages)}
          </Fragment>
        );
      });
  };

  return (
    <Wrapper className={classes.pagination}>
      <div className={classes['pagination__div-left']}>
        <PaginationButton
          toPage={currentPage - 1}
          className={classes['pagination-btn']}
        >
          <KeyboardArrowLeft className={classes['pagination--icon-left']} />
        </PaginationButton>
      </div>
      <div className={classes['pagination__pages-div']}>
        {renderPaginationButtons()}
      </div>
      <div className={classes['pagination__div-right']}>
        <PaginationButton
          toPage={currentPage + 1}
          pageMax={numberOfPages}
          className={classes['pagination-btn']}
        >
          <KeyboardArrowRight className={classes['pagination--icon-right']} />
        </PaginationButton>
      </div>
    </Wrapper>
  );
};

export default Pagination;
