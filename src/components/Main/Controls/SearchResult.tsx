import { Link } from 'react-router-dom';
import { countriesDataType } from '../../../data/country-data-types';
import Wrapper from '../../UI/Wrapper';
import classes from '../../../styles/Main/Controls/SearchResult.module.scss';

type Props = {
  searchedResult: countriesDataType[];
  onClick: () => void;
};

const SearchResult = ({ searchedResult, onClick }: Props) => {
  const renderSearchedCountries = () => {
    return searchedResult.slice(0, 8).map(item => (
      <li className={classes['search-result__list--li']} key={item.name}>
        <Link
          className={classes['search-result__list--link']}
          to={item.countryCode}
        >
          <img src={item.image} />
          <p className={classes['search-result--text-country']}>{item.name}</p>
          <p className={classes['search-result--text-region']}>{item.region}</p>
        </Link>
      </li>
    ));
  };

  return (
    <Wrapper className={classes['search-result']}>
      <div
        className={`${classes['result-div']} ${classes['result-div--border-bottom']}`}
      >
        <p>Results: {searchedResult.length}</p>
      </div>
      <ul className={classes['search-result__list']}>
        {renderSearchedCountries()}
      </ul>
      {searchedResult.length > 8 && (
        <div
          className={`${classes['result-div']} ${classes['result-div--border-top']} ${classes['result-div--more']}`}
          onClick={onClick}
        >
          <p>More...</p>
        </div>
      )}
    </Wrapper>
  );
};

export default SearchResult;
