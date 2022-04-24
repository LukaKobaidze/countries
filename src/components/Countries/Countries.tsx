import { useContext, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CountriesContext } from 'context/countries';
import { LoadingSpinner } from 'components/UI';
import CountriesItem from './CountriesItem';
import styles from 'styles/Countries/Countries.module.scss';

const Countries = () => {
  const { countries, isDataLoading } = useContext(CountriesContext);
  const [lastCountryRef, inView] = useInView();
  const [renderedCount, setRenderedCount] = useState(20);

  useEffect(() => {
    if (!inView) return;

    setRenderedCount((prevState) => Math.min(prevState + 20, countries.length));
  }, [inView, countries.length]);

  useEffect(() => {
    setRenderedCount(20);
  }, [countries]);

  const countriesRender = countries.slice(0, renderedCount);

  return (
    <div id="countries" className={styles.countries}>
      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        countriesRender
          .slice(0, renderedCount)
          .map((country, index) => (
            <CountriesItem
              ref={
                index === countriesRender.length - 1
                  ? lastCountryRef
                  : undefined
              }
              key={country.countryCode}
              data={country}
            />
          ))
      )}
    </div>
  );
};

export default Countries;
