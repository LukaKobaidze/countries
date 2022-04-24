import Countries from 'components/Countries';
import Filter from 'components/Filter';
import Search from 'components/Search';
import styles from 'styles/pages/PageRoot.module.scss';

const PageRoot = () => {
  return (
    <>
      <div className={styles.controls}>
        <Search />
        <Filter />
      </div>
      <Countries />
    </>
  );
};

export default PageRoot;
