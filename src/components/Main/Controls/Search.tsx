import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { countriesDataType } from '../../../data/country-data-types';
import IconSearch from '../../UI/Icons/IconSearch';
import Wrapper from '../../UI/Wrapper';
import SearchResult from './SearchResult';
import classes from '../../../styles/Main/Controls/Search.module.scss';

type Props = {
  searchValueHandler: (enteredValue: string) => void;
  searchedValue: string;
  searchedResult: countriesDataType[];
};

const Search = (props: Props) => {
  const { searchValueHandler, searchedValue, searchedResult } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [enteredValue, setEnteredValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const {
    ref: elementRef,
    clickedOutside,
    setClickedOutside,
  } = useOutsideClick<HTMLDivElement>('mousedown');
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearchParams = Object.fromEntries(
    new URLSearchParams(searchParams)
  );

  useEffect(() => {
    setEnteredValue('');
  }, [currentSearchParams.region]);

  useEffect(() => {
    setEnteredValue(currentSearchParams.search || '');
    setShowResult(false);
    inputRef.current?.blur();
  }, [currentSearchParams.search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchValueHandler(enteredValue);
    }, 500);

    return () => clearTimeout(timeout);
  }, [enteredValue, searchValueHandler]);

  useEffect(() => {
    if (!clickedOutside) return;
    setShowResult(false);
    setClickedOutside(false);
  }, [clickedOutside, setClickedOutside]);

  const inputFocusHandler = () => {
    setShowResult(true);
  };

  const enteredValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };

  const addSearchQueryParams = () => {
    if (enteredValue.trim().length === 0) return;
    currentSearchParams.search = enteredValue.trim();
    delete currentSearchParams.page;
    setSearchParams(currentSearchParams);
  };

  const inputSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addSearchQueryParams();
  };

  const searchIconHandler = () => {
    inputRef.current?.focus();
    addSearchQueryParams();
  };

  return (
    <Wrapper className={classes.search} elementRef={elementRef}>
      <form className={classes['search-div']} onSubmit={inputSubmitHandler}>
        <div
          className={classes['search-div__icon-div']}
          onClick={searchIconHandler}
        >
          <IconSearch />
        </div>
        <input
          className={classes['search-div--input']}
          onChange={enteredValueHandler}
          onFocus={inputFocusHandler}
          value={enteredValue}
          ref={inputRef}
          placeholder="Search for a country..."
        />
      </form>

      {showResult && searchedResult[0] && searchedValue.trim().length > 0 && (
        <SearchResult
          searchedResult={searchedResult}
          onClick={addSearchQueryParams}
        />
      )}
    </Wrapper>
  );
};

export default Search;
