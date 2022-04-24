import { Country, Region } from 'shared/types';

const getCountriesByRegion = (countries: Country[], region: Region) => {
  return countries.filter((country) => country.region.toLowerCase() === region.toLowerCase());
};

const getCountriesByName = (countries: Country[], name: string) => {
  return countries.filter((country) =>
    country.name.toLowerCase().includes(name.trim().toLowerCase())
  );
};

export { getCountriesByRegion, getCountriesByName };
