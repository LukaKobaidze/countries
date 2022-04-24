import { useContext } from 'react';
import { CountriesContext } from 'context/countries';
import { Region } from 'shared/types';
import { Selection } from 'components/UI';
import FilterRemove from './FilterRemove';
import styles from 'styles/Filter/Filter.module.scss';

const regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const Filter = () => {
  const { filter, onFilter } = useContext(CountriesContext);

  return (
    <div className={styles.container}>
      {filter && <FilterRemove />}
      <Selection
        title="Filter by Region"
        selection={regions}
        active={filter}
        onClick={onFilter}
      />
    </div>
  );
};

export default Filter;
