import { useEffect, useState } from 'react';
import { ReactComponent as IconCheveronDown } from 'assets/cheveron-down.svg';
import { useOutsideClick } from 'hooks';
import Wrapper from './Wrapper';
import styles from 'styles/UI/Selection.module.scss';

interface Props {
  title: string;
  selection: any[];
  active?: any;
  onClick: (selection: any) => void;
}

const Selection = ({ title, selection, active, onClick }: Props) => {
  const [dropdown, setDropdown] = useState(false);
  const {
    ref: elementRef,
    clickedOutside,
    setClickedOutside,
  } = useOutsideClick<HTMLButtonElement>('click');

  useEffect(() => {
    if (clickedOutside) {
      setDropdown(false);
      setClickedOutside(false);
    }
  }, [clickedOutside, setClickedOutside]);

  const dropdownHandler = () => {
    setDropdown((currState) => !currState);
  };

  return (
    <div className={styles.selection}>
      <div className={styles['selection--btn-div']}>
        <div className={styles['selection-icon-div']}>
          <IconCheveronDown
            className={`${styles['selection-icon-div--icon']} ${
              dropdown ? styles['selection-icon-div--icon--active'] : ''
            }`}
          />
        </div>
        <button
          className={`element ${styles['selection--btn']}`}
          onClick={dropdownHandler}
          ref={elementRef}
        >
          {title}
        </button>
      </div>
      <Wrapper
        className={`${styles['selection__dropdown']} ${
          dropdown ? styles['selection__dropdown--active'] : ''
        }`}
      >
        {selection.map((item) => (
          <button
            key={item}
            className={`${styles['selection__dropdown--element']} ${
              item === active ? styles['element--active'] : ''
            }`}
            onClick={() => onClick(item)}
            disabled={!dropdown}
          >
            {item}
          </button>
        ))}
      </Wrapper>
    </div>
  );
};

export default Selection;
