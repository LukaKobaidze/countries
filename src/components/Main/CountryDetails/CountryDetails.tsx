import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { countryDetailsDataType } from '../../../data/country-data-types';
import { borderCountriesType } from './CountryBorders';
import LoadingSpinner from '../../UI/LoadingSpinner';
import ArrowLeft from '../../UI/Icons/ArrowLeft';
import CountryFlag from './CountryFlag';
import Details from './Details';
import CountryBorders from './CountryBorders';
import CountryBtn from './CountryBtn';
import classes from '../../../styles/Main/CountryDetails/CountryDetails.module.scss';

const getCountryDetails = (data: any): countryDetailsDataType => {
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

type Props = {
  prevPath: string;
};
const CountryDetails = ({ prevPath }: Props) => {
  const { countryCode } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [countryData, setCountryData] = useState<countryDetailsDataType>();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}?fields=flags,name,population,region,subregion,capital,tld,currencies,languages,borders,cca3`
    )
      .then(response => response.json())
      .then(data => {
        setCountryData(getCountryDetails(data));
        setIsLoading(false);
      });
  }, [countryCode]);

  const btnBackHandler = () => {
    if (!prevPath) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div>
        <div className={classes['country-page__btn-div']}>
          <CountryBtn
            onClick={btnBackHandler}
            className={classes['country-page--btn-back']}
          >
            <ArrowLeft />
            Back
          </CountryBtn>
        </div>
        <div className={classes['country-page__content']}>
          <div className={classes['country-page__content-img-div']}>
            <CountryFlag image={countryData?.image} />
          </div>
          <div className={classes['country-page__content__text']}>
            <div className={classes['country-page__content-h2-div']}>
              <h2 className={classes['country-page__content--h2']}>
                {countryData?.name}
              </h2>
            </div>
            <Details
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
            <CountryBorders borderCountryCodes={countryData?.borderCountries} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryDetails;
