import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CountryDetails as CountryDetailsType } from 'shared/types';
import { getCountriesByCodes } from 'utils/requests';
import { ReactComponent as IconArrowLeft } from 'assets/arrow-left.svg';
import { LoadingSpinner } from 'components/UI';
import CountryFlag from './CountryFlag';
import CountryDetails from './CountryDetails';
import CountryBorders from './CountryBorders';
import CountryBtn from './CountryBtn';
import styles from 'styles/Country/Country.module.scss';

const getCountryDetails = (data: any): CountryDetailsType => {
  return {
    image: data.flags.svg,
    name: data.name.common,
    nativeName:
      data.name.nativeName[Object.keys(data.name.nativeName)[0]].official,
    population: data.population,
    region: data.region,
    subregion: data.subregion,
    capital: data.capital,
    topLevelDomain: data.tld,
    currencies: data.currencies ? Object.keys(data.currencies) : undefined,
    languages: Object.values(data.languages),
    borderCountries: data.borders,
    countryCode: data.cca3,
  };
};

interface Props {
  countryCode: string | undefined;
}

const Country = ({ countryCode }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [countryData, setCountryData] = useState<CountryDetailsType>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!countryCode) return;
    setIsLoading(true);
    const filter = [
      'flags',
      'name',
      'population',
      'region',
      'subregion',
      'capital',
      'tld',
      'currencies',
      'languages',
      'borders',
      'cca3',
    ];
    getCountriesByCodes(countryCode, filter).then((data) => {
      setCountryData(getCountryDetails(data));
      setIsLoading(false);
    });
  }, [countryCode]);

  const btnBackHandler = () => {
    navigate(-1);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div>
        <div className={styles['btn-div']}>
          <CountryBtn onClick={btnBackHandler} className={styles['btn-back']}>
            <IconArrowLeft />
            Back
          </CountryBtn>
        </div>
        <div className={styles.content}>
          <div className={styles['img-div']}>
            <CountryFlag image={countryData?.image} />
          </div>
          <div className={styles.text}>
            <div className={styles['h2-div']}>
              <h2 className={styles.h2}>{countryData?.name}</h2>
            </div>
            <CountryDetails
              data={{
                nativeName: countryData?.nativeName,
                population: countryData?.population,
                region: countryData?.region,
                subregion: countryData?.subregion,
                capital: countryData?.capital,
                topLevelDomain: countryData?.topLevelDomain,
                currencies: countryData?.currencies,
                languages: countryData?.languages,
              }}
            />
            {countryData?.borderCountries[0] && (
              <CountryBorders
                borderCountryCodes={countryData?.borderCountries}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Country;
