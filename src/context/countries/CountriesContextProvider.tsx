import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Country, Region } from 'shared/types';
import { getCountries } from 'utils/requests';
import { getCountriesByName, getCountriesByRegion } from './utils/countries';
import CountriesContext from './countries-context';

interface Props {
  children: React.ReactNode;
}

const CountriesContextProvider = ({ children }: Props) => {
  const [data, setData] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // States that gets passed into value of context
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [filter, setFilter] = useState<Region>();
  const [search, setSearch] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<Country[]>([]);

  const searchParamFilter = searchParams.get('filter') as Region | null;
  const searchParamSearch = searchParams.get('search');

  const onFilter = (region?: Region) => {
    if (region) {
      setSearchParams({ filter: region });
    } else {
      setSearchParams({});
    }
  };

  const onSearchChange = (value: string) => {
    setSearch(value);
    setSearchSuggestions(getCountriesByName(filteredCountries, value));
  };

  const onSearchSubmit = (value: string) => {
    if (filter) {
      setSearchParams({ filter, search: value });
    } else {
      if (value.trim()) {
        setSearchParams({ search: value });
      } else {
        setSearchParams({});
      }
    }
  };

  useEffect(() => {
    const filter = ['flags', 'name', 'population', 'region', 'capital', 'cca3'];
    setIsDataLoading(true);
    getCountries(filter)
      .then((data) => {
        const mappedData: Country[] = data.map((item: any) => ({
          image: item.flags.svg,
          name: item.name.common,
          population: item.population,
          region: item.region,
          capital: !item.capital ? 'none' : item.capital.join(', '),
          countryCode: item.cca3,
        }));

        const transformedData = mappedData.sort((a, b) =>
          a.population > b.population ? -1 : 1
        );

        setData(transformedData);
        setCountries(transformedData);
        setFilteredCountries(transformedData);
      })
      .finally(() => setIsDataLoading(false));
  }, []);

  useEffect(() => {
    if (isDataLoading) return;
    setSearch('');

    if (searchParamFilter) {
      setFilter(searchParamFilter);
      const filtered = getCountriesByRegion(data, searchParamFilter);
      console.log(filtered);
      setCountries(filtered);
      setFilteredCountries(filtered);
    } else {
      setFilter(undefined);
      setCountries(data);
      setFilteredCountries(data);
    }
  }, [data, searchParamFilter, isDataLoading]);

  useEffect(() => {
    if (isDataLoading) return;

    if (searchParamSearch) {
      setSearch(searchParamSearch);
      setCountries(getCountriesByName(filteredCountries, searchParamSearch));
    } else {
      setSearch('');
      if (!filter) {
        setCountries(data);
      }
    }
  }, [searchParamSearch, isDataLoading, data, filteredCountries, filter]);

  return (
    <CountriesContext.Provider
      value={{
        isDataLoading,
        countries,
        filter,
        search,
        searchSuggestions,
        onFilter,
        onSearchChange,
        onSearchSubmit,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};

export default CountriesContextProvider;
