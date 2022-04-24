const getCountries = async (filter?: string[]) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/all${
      filter ? `?fields=${filter.join(',')}` : ''
    }`
  );

  return response.json();
};

const getCountriesByCodes = async (
  codes: string | string[],
  filter?: string[]
) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha${
      !Array.isArray(codes) ? `/${codes}` : `?codes=${codes.join(',')}`
    }${
      filter
        ? `${Array.isArray(codes) ? '&' : '?'}fields=${filter.join(',')}`
        : ''
    }`
  );

  return response.json();
};

export { getCountries, getCountriesByCodes };
