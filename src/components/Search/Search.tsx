import { useState, useRef, useEffect, useContext } from 'react';
import { CountriesContext } from 'context/countries';
import { useOutsideClick } from 'hooks';
import { ReactComponent as IconSearch } from 'assets/search.svg';
import { ReactComponent as IconClose } from 'assets/close.svg';
import { Wrapper } from 'components/UI';
import SearchSuggestions from './SearchSuggestions';
import styles from 'styles/Search/Search.module.scss';

const SUGGESTIONS_MAX = 8;

const Search = () => {
  const { search, searchSuggestions, onSearchChange, onSearchSubmit } =
    useContext(CountriesContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const { ref, clickedOutside, setClickedOutside } =
    useOutsideClick<HTMLDivElement>('mousedown');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusIndex, setFocusIndex] = useState<number>();
  const [inputValue, setInputValue] = useState('');

  const suggestionsShown = Math.min(searchSuggestions.length, SUGGESTIONS_MAX);

  useEffect(() => {
    setFocusIndex(undefined);
  }, [suggestionsShown, showSuggestions]);

  useEffect(() => {
    if (!clickedOutside) return;
    setShowSuggestions(false);
    setClickedOutside(false);
  }, [clickedOutside, setClickedOutside]);

  useEffect(() => {
    console.log(focusIndex);
    console.log(document.activeElement);

    if (
      focusIndex === undefined &&
      document.activeElement !== inputRef.current
    ) {
      setShowSuggestions(false);
    }
  }, [focusIndex]);

  const suggestionsClickHandler = () => {
    inputRef.current?.focus();
  };

  const changeFocusIndex = (index: number) => {
    if (index !== focusIndex) {
      setFocusIndex(index);
    }
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (suggestionsShown === 0) return;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      return setFocusIndex((prevState) => {
        if (!prevState) {
          return suggestionsShown - 1;
        }
        return prevState - 1;
      });
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      return setFocusIndex((prevState) => {
        if (prevState === undefined || prevState === suggestionsShown - 1) {
          return 0;
        }
        return prevState + 1;
      });
    }
  };

  const focusHandler = () => {
    setShowSuggestions(true);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearchChange(inputValue);
    }, 200);

    return () => clearTimeout(timeout);
  }, [inputValue, onSearchChange]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchSubmit(inputValue);
    inputRef.current?.blur();
    setShowSuggestions(false);
  };

  const deleteClickHandler = () => {
    setInputValue('');
    onSearchChange('');
    inputRef.current?.focus();
  };

  return (
    <Wrapper className={styles.search} ref={ref}>
      <form
        className={styles['search-div']}
        onSubmit={submitHandler}
        onKeyDown={keyDownHandler}
      >
        <div className={styles['search-div__icon-div']}>
          <IconSearch />
        </div>
        <input
          className={styles.input}
          onChange={changeHandler}
          onFocus={focusHandler}
          value={inputValue}
          ref={inputRef}
          placeholder="Search for a country..."
        />
        {inputValue.trim() !== '' && (
          <button
            type="button"
            className={styles['button-x']}
            onClick={deleteClickHandler}
          >
            <IconClose />
          </button>
        )}

        {showSuggestions &&
          searchSuggestions[0] &&
          search.trim().length > 0 && (
            <SearchSuggestions
              showMax={SUGGESTIONS_MAX}
              focusIndex={focusIndex}
              onClick={suggestionsClickHandler}
              changeFocusIndex={changeFocusIndex}
            />
          )}
      </form>
    </Wrapper>
  );
};

export default Search;
