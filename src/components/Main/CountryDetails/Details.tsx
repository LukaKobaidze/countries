import { Regions } from '../Main';
import classes from '../../../styles/Main/CountryDetails/Details.module.scss';

type Props = {
  data: {
    nativeName: string | undefined;
    population: number | undefined;
    region: Regions | undefined;
    subregion: string | undefined;
    capital: string[] | undefined;
    topLevelDomain: string[] | undefined;
    currencies: string[] | undefined;
    languages: string[] | undefined;
  };
};

const Details = ({ data }: Props) => {
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
        <div className={classes['details']}>
          <div className={classes['details--div-1']}>
            <div className={classes['details__text-div']}>
              <span className="text--semibold">Native Name: </span>
              <p>{nativeName}</p>
            </div>
            <div className={classes['details__text-div']}>
              <span className="text--semibold">Population: </span>
              <p>{population?.toLocaleString()}</p>
            </div>
            <div className={classes['details__text-div']}>
              <span className="text--semibold">Region: </span>
              <p>{region}</p>
            </div>
            <div className={classes['details__text-div']}>
              <span className="text--semibold">Sub Region: </span>
              <p>{subregion}</p>
            </div>
            <div className={classes['details__text-div']}>
              <span className="text--semibold">Capital: </span>
              <p>{capital?.join(', ')}</p>
            </div>
          </div>
          <div className={classes['details--div-2']}>
            <div className={classes['details__text-div']}>
              <span className="text--semibold">Top Level Domain: </span>
              <p>{topLevelDomain?.join(', ')}</p>
            </div>
            <div className={classes['details__text-div']}>
              <span className="text--semibold">Currencies: </span>
              <p>{currencies?.join(', ')}</p>
            </div>
            <div className={classes['details__text-div']}>
              <span className="text--semibold">Languages: </span>
              <p>{languages?.join(', ')}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
