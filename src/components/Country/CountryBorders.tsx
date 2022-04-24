import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCountriesByCodes } from 'utils/requests';
import { LoadingSpinner } from 'components/UI';
import CountryBtn from './CountryBtn';
import styles from 'styles/Country/CountryBorders.module.scss';

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
    setBorderCountriesData([]);

    getCountriesByCodes(borderCountryCodes, ['name', 'cca3']).then((data) => {
      const transformedData = data.map((item: any) => {
        return {
          name: item.name.common,
          countryCode: item.cca3,
        };
      });
      setBorderCountriesData(transformedData);
    });
  }, [borderCountryCodes]);

  return (
    <div className={styles.borders}>
      <span className={`text--semibold ${styles.text}`}>Border Countries:</span>
      <div className={styles.buttons}>
        {borderCountriesData[0] ? (
          borderCountryCodes?.map((countryCode) => {
            const countryName = borderCountriesData.find(
              (country) => country.countryCode === countryCode
            )?.name;

            return (
              <CountryBtn
                onClick={() => navigate(`/${countryCode}`)}
                key={countryCode}
              >
                {countryName}
              </CountryBtn>
            );
          })
        ) : (
          <LoadingSpinner className={styles.spinner} center={false} />
        )}
      </div>
    </div>
  );
};

export default CountryBorders;
