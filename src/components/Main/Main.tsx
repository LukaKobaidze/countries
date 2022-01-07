import { useState, useEffect, useCallback } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { countriesDataType } from '../../data/country-data-types';
import Pagination from '../UI/Pagination/Pagination';
import Controls from './Controls/Controls';
import Countries from './Countries/Countries';
import CountryDetails from './CountryDetails/CountryDetails';
import classes from '../../styles/Main/Main.module.scss';

export enum Regions {
  Africa = 'africa',
  America = 'america',
  Asia = 'asia',
  Europe = 'europe',
  Oceania = 'oceania',
}

const Main = () => {
  const [countriesData, setCountriesData] = useState<countriesDataType[]>([]);
  const [searchedValue, setSearchedValue] = useState('');
  const [searchedResult, setSearchedResult] = useState<countriesDataType[]>([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [path, setPath] = useState({ currentPath: '', prevPath: '' });
  const location = useLocation();

  useEffect(() => {
    setPath(prevState => {
      return {
        currentPath: location.pathname,
        prevPath: prevState.currentPath,
      };
    });
  }, [location.pathname]);

  useEffect(() => {
    if (path.currentPath === '/' && !countriesData[0]) {
      setIsLoading(true);
      fetch(
        'https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital,cca3'
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Couldn't load countries, try again later.");
          }
        })
        .then(data => {
          setCountriesData(
            data.map((item: any): countriesDataType => {
              return {
                image: item.flags.svg,
                name: item.name.common,
                population: item.population,
                region: item.region,
                capital: !item.capital ? 'none' : item.capital.join(', '),
                countryCode: item.cca3,
              };
            })
          );
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
          console.error(error);
        });
    }
  }, [path.currentPath, countriesData]);

  const updateNumberOfPages = (number: number) => {
    setNumberOfPages(number);
  };

  const searchValueHandler = (enteredValue: string) => {
    setSearchedValue(enteredValue);
  };

  const searchedResultHandler = useCallback((result: countriesDataType[]) => {
    setSearchedResult(result);
  }, []);

  return (
    <main className={classes.main}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Controls
                searchValueHandler={searchValueHandler}
                searchedValue={searchedValue}
                searchedResult={searchedResult}
              />
              <Countries
                countriesData={countriesData}
                isLoadingData={isLoading}
                searchedValue={searchedValue}
                searchedResultHandler={searchedResultHandler}
                updateNumberOfPages={updateNumberOfPages}
              />
              {numberOfPages > 1 && (
                <section id="pagination">
                  <Pagination numberOfPages={numberOfPages} />
                </section>
              )}
            </>
          }
        />
        <Route
          path="/:countryCode"
          element={<CountryDetails prevPath={path.prevPath} />}
        />
      </Routes>
    </main>
  );
};

export default Main;
