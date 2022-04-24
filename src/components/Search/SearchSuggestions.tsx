import { useContext } from 'react';
import { CountriesContext } from 'context/countries';
import { Wrapper } from 'components/UI';
import styles from 'styles/Search/SearchSuggestions.module.scss';
import { useNavigate } from 'react-router-dom';

interface Props {
  showMax: number;
  focusIndex: number | undefined;
  onClick: () => void;
  changeFocusIndex: (index: number) => void;
}

const SearchSuggestions = (props: Props) => {
  const { showMax, focusIndex, onClick, changeFocusIndex } = props;
  const { searchSuggestions, filter } = useContext(CountriesContext);
  const navigate = useNavigate();

  return (
    <Wrapper className={styles.suggestions} onClick={onClick}>
      <div className={styles.wrapper}>
        <p>
          Results{filter ? ` in ${filter}` : ''}: {searchSuggestions.length}
        </p>
      </div>
      <ul className={styles.list}>
        {searchSuggestions.slice(0, showMax).map((item, index) => (
          <li className={styles['list-item']} key={item.name}>
            <button
              type="button"
              className={`${styles.button} ${styles['list-item-button']}`}
              onClick={() => navigate(`/${item.countryCode}`)}
              onFocus={() => changeFocusIndex(index)}
              ref={(button) => index === focusIndex && button?.focus()}
            >
              <img src={item.image} alt="" />
              <p className={styles['text-country']}>{item.name}</p>
              <p className={styles['text-region']}>{item.region}</p>
            </button>
          </li>
        ))}
      </ul>
      {searchSuggestions.length > showMax && (
        <button className={`${styles.wrapper} ${styles.button}`} type="submit">
          {searchSuggestions.length - showMax} More...
        </button>
      )}
    </Wrapper>
  );
};

export default SearchSuggestions;
