import { Regions } from '../components/Main/Main';

export type countriesDataType = {
  image: string;
  name: string;
  population: number;
  region: Regions;
  capital: string;
  countryCode: string;
};

export type countryDetailsDataType = {
  image: string;
  name: string;
  nativeName: string;
  population: number;
  region: Regions;
  subregion: string;
  capital: string[];
  topLevelDomain: string[];
  currencies: string[] | undefined;
  languages: string[];
  borderCountries: string[];
  countryCode: string;
};
