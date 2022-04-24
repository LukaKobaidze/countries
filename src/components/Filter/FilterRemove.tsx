import { useContext } from 'react';
import { CountriesContext } from 'context/countries';
import styles from 'styles/Filter/FilterRemove.module.scss';

const FilterRemove = () => {
  const { filter, onFilter } = useContext(CountriesContext);

  return (
    <button
      className={`element ${styles['filter-remove']}`}
      onClick={() => onFilter()}
    >
      {filter}
      <span className={styles['filter-remove--cross']}>x</span>
    </button>
  );
};

export default FilterRemove;
