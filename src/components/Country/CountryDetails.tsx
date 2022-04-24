import { Region } from 'shared/types';
import styles from 'styles/Country/CountryDetails.module.scss';

type Props = {
  data: {
    nativeName?: string;
    population?: number;
    region?: Region;
    subregion?: string;
    capital?: string[];
    topLevelDomain?: string[];
    currencies?: string[];
    languages?: string[];
  };
};

const CountryDetails = ({ data }: Props) => {
  const {
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
  } = data;

  return (
    <>
      {data.nativeName && (
        <div className={styles['details']}>
          <div className={styles['details--div-1']}>
            <div className={styles['details__text-div']}>
              <span className="text--semibold">Native Name: </span>
              <p>{nativeName}</p>
            </div>
            <div className={styles['details__text-div']}>
              <span className="text--semibold">Population: </span>
              <p>{population?.toLocaleString()}</p>
            </div>
            <div className={styles['details__text-div']}>
              <span className="text--semibold">Region: </span>
              <p>{region}</p>
            </div>
            <div className={styles['details__text-div']}>
              <span className="text--semibold">Sub Region: </span>
              <p>{subregion}</p>
            </div>
            <div className={styles['details__text-div']}>
              <span className="text--semibold">Capital: </span>
              <p>{capital?.join(', ')}</p>
            </div>
          </div>
          <div className={styles['details--div-2']}>
            <div className={styles['details__text-div']}>
              <span className="text--semibold">Top Level Domain: </span>
              <p>{topLevelDomain?.join(', ')}</p>
            </div>
            <div className={styles['details__text-div']}>
              <span className="text--semibold">Currencies: </span>
              <p>{currencies?.join(', ')}</p>
            </div>
            <div className={styles['details__text-div']}>
              <span className="text--semibold">Languages: </span>
              <p>{languages?.join(', ')}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CountryDetails;
