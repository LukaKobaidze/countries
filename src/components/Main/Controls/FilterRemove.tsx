import classes from '../../../styles/Main/Controls/FilterRemove.module.scss';

type Props = {
  filter: string;
  removeFilterHandler: () => void;
};

const FilterRemove = ({ filter, removeFilterHandler }: Props) => {
  return (
    <button
      className={`element ${classes['filter-remove']}`}
      onClick={removeFilterHandler}
    >
      <p>{filter}</p>
      <div>x</div>
    </button>
  );
};

export default FilterRemove;
