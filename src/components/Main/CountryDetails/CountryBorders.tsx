import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountryBtn from './CountryBtn';
import classes from '../../../styles/Main/CountryDetails/CountryBorders.module.scss';

export type borderCountriesType = {
  name: string;
  countryCode: string;
};

type Props = {
  borderCountryCodes: string[] | undefined;
};

const CountryBorders = ({ borderCountryCodes }: Props) => {
  const [borderCountriesData, setBorderCountriesData] = useState<
    borderCountriesType[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!borderCountryCodes || !borderCountryCodes[0]) return;
    fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCountryCodes?.join(
      ','
    )}
    `)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const transformedData = data.map((item: any) => {
          return {
            name: item.name.common,
            countryCode: item.cca3,
          };
        });
        setBorderCountriesData(transformedData);
      });
  }, [borderCountryCodes]);

  const renderBorderCountries = () => {
    return borderCountryCodes?.map(code => {
      const countryCode = code;
      const countryName =
        borderCountriesData.find(country => country.countryCode === countryCode)
          ?.name || countryCode;

      return (
        <CountryBtn
          onClick={() => navigate(`/${countryCode}`)}
          key={countryCode}
        >
          <p>{countryName}</p>
        </CountryBtn>
      );
    });
  };

  return (
    <div className={classes['country-borders']}>
      <span className={`text--semibold ${classes['country-borders-text']}`}>
        Border Countries:
      </span>
      <div className={classes['country-borders-btn-div']}>
        {renderBorderCountries()}
      </div>
    </div>
  );
};

export default CountryBorders;
