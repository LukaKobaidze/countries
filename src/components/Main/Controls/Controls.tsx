import Search from './Search';
import Filter from './Filter';
import classes from '../../../styles/Main/Controls/Controls.module.scss';
import { countriesDataType } from '../../../data/country-data-types';

type Props = {
  searchedValue: string;
  searchValueHandler: (enteredValue: string) => void;
  searchedResult: countriesDataType[];
};

const Controls = (props: Props) => {
  const { searchValueHandler, searchedValue, searchedResult } = props;

  return (
    <section id="controls" className={classes.controls}>
      <Search
        searchValueHandler={searchValueHandler}
        searchedValue={searchedValue}
        searchedResult={searchedResult}
      />
      <Filter />
    </section>
  );
};

export default Controls;
