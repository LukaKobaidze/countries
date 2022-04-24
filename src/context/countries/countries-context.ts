import { createContext } from 'react';
import { Country, Region } from 'shared/types';

interface Context {
  isDataLoading: boolean;
  countries: Country[];
  filter?: Region;
  search: string;
  searchSuggestions: Country[];
  onFilter: (region?: Region) => void;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (value: string) => void;
}

const CountriesContext = createContext<Context>({
  isDataLoading: false,
  countries: [],
  filter: undefined,
  search: '',
  searchSuggestions: [],
  onFilter: () => {},
  onSearchChange: () => {},
  onSearchSubmit: () => {},
});

export default CountriesContext;
