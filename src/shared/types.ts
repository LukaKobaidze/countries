type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

type Country = {
  image: string;
  name: string;
  population: number;
  region: Region;
  capital: string;
  countryCode: string;
};

type CountryDetails = {
  image: string;
  name: string;
  nativeName: string;
  population: number;
  region: Region;
  subregion: string;
  capital: string[];
  topLevelDomain: string[];
  currencies: string[] | undefined;
  languages: string[];
  borderCountries: string[];
  countryCode: string;
};

export type { Region, Country, CountryDetails };
