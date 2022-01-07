import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { Regions } from '../Main';
import Wrapper from '../../UI/Wrapper';
import CheveronDown from '../../UI/Icons/CheveronDown';
import FilterRemove from './FilterRemove';
import classes from '../../../styles/Main/Controls/Filter.module.scss';

const Filter = () => {
  const [dropdown, setDropdown] = useState(false);
  const {
    ref: elementRef,
    clickedOutside,
    setClickedOutside,
  } = useOutsideClick<HTMLButtonElement>('click');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentRegion = searchParams.get('region');

  useEffect(() => {
    if (clickedOutside) {
      setDropdown(false);
      setClickedOutside(false);
    }
  }, [clickedOutside, setClickedOutside]);

  const dropdownHandler = () => {
    setDropdown(currState => !currState);
  };

  const filterHandler = (region: Regions) => {
    if (currentRegion === region) return;
    navigate({
      search: `?region=${region}`,
    });
  };

  const removeFilterHandler = () => {
    navigate({
      search: '',
    });
  };

  return (
    <div className={classes.container}>
      {currentRegion && (
        <FilterRemove
          filter={currentRegion}
          removeFilterHandler={removeFilterHandler}
        />
      )}
      <div className={classes.filter}>
        <div className={classes['filter--btn-div']}>
          <div className={classes['filter-icon-div']}>
            <CheveronDown
              className={`${classes['filter-icon-div--icon']} ${
                dropdown ? classes['filter-icon-div--icon--active'] : ''
              }`}
            />
          </div>
          <button
            className={`element ${classes['filter--btn']}`}
            onClick={dropdownHandler}
            ref={elementRef}
          >
            Filter by Region
          </button>
        </div>
        <Wrapper
          className={`${classes['filter__dropdown']} ${
            dropdown ? classes['filter__dropdown--active'] : ''
          }`}
        >
          {Object.values(Regions).map(region => (
            <button
              key={region}
              className={`${classes['filter__dropdown--element']} ${
                region === currentRegion ? classes['element--active'] : ''
              }`}
              onClick={filterHandler.bind(null, region)}
            >
              {region}
            </button>
          ))}
        </Wrapper>
      </div>
    </div>
  );
};

export default Filter;
