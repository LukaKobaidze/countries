import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { countriesDataType } from '../../../data/country-data-types';
import LoadingSpinner from '../../UI/LoadingSpinner';
import Country from './Country';
import classes from '../../../styles/Main/Countries/Countries.module.scss';

const COUNTRIES_PER_PAGE = 24;

type Props = {
  countriesData: countriesDataType[];
  isLoadingData: boolean;
  searchedValue: string;
  searchedResultHandler: (result: countriesDataType[]) => void;
  updateNumberOfPages: (number: number) => void;
};

const Countries = (props: Props) => {
  const {
    countriesData,
    isLoadingData,
    searchedValue,
    searchedResultHandler,
    updateNumberOfPages,
  } = props;
  const [searchParams] = useSearchParams();
  const currentRegion = searchParams.get('region');
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentEnteredSearch = searchParams.get('search');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const filteredCountriesData = useMemo(() => {
    return currentRegion
      ? countriesData.filter(country =>
          country.region.toLowerCase().includes(currentRegion)
        )
      : countriesData;
  }, [countriesData, currentRegion]);

  const searchEnteredData = currentEnteredSearch
    ? filteredCountriesData.filter(country =>
        country.name
          .toLowerCase()
          .includes(currentEnteredSearch.trim().toLowerCase())
      )
    : undefined;

  useEffect(() => {
    if (searchedValue === '') {
      searchedResultHandler([]);
      return;
    }
    const result = filteredCountriesData.filter(country =>
      country.name.toLowerCase().includes(searchedValue.trim().toLowerCase())
    );
    searchedResultHandler(result);
  }, [
    searchedValue,
    currentRegion,
    searchedResultHandler,
    filteredCountriesData,
  ]);

  useEffect(() => {
    const dataCountries = searchEnteredData || filteredCountriesData;
    updateNumberOfPages(
      Math.floor(dataCountries.length / COUNTRIES_PER_PAGE) + 1
    );
  }, [filteredCountriesData, searchEnteredData, updateNumberOfPages]);

  const renderCountries = () => {
    const dataCountries = searchEnteredData || filteredCountriesData;

    if (dataCountries.length === 0 && !isLoadingData) {
      return <h2>No countries found.</h2>;
    }
    const renderPageData = dataCountries.slice(
      0 + COUNTRIES_PER_PAGE * (currentPage - 1),
      COUNTRIES_PER_PAGE + COUNTRIES_PER_PAGE * (currentPage - 1)
    );
    return (
      renderPageData[0] &&
      renderPageData.map(country => (
        <Country
          key={country.name}
          image={country.image}
          name={country.name}
          population={country.population}
          region={country.region}
          capital={country.capital}
          countryCode={country.countryCode}
        />
      ))
    );
  };

  return (
    <div id="countries" className={classes.countries}>
      {isLoadingData && <LoadingSpinner />}
      {renderCountries()}
    </div>
  );
};

export default Countries;
