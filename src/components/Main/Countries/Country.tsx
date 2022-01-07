import { Link } from 'react-router-dom';
import Wrapper from '../../UI/Wrapper';
import classes from '../../../styles/Main/Countries/Country.module.scss';
import { countriesDataType } from '../../../data/country-data-types';

type Props = countriesDataType;

const Country = (props: Props) => {
  const { image, name, population, region, capital, countryCode } = props;

  return (
    <Wrapper className={classes.country}>
      <Link className={classes['country-img-link']} to={countryCode}>
        <img src={image} alt={`${name} flag`} />
      </Link>
      <div className={classes['country-text-div']}>
        <Link to={countryCode}>
          <h2>{name}</h2>
        </Link>
        <ul>
          <li>
            <p>
              <span className="text--semibold">Population: </span>
              {population.toLocaleString()}
            </p>
          </li>
          <li>
            <p>
              <span className="text--semibold">Region: </span>
              {region}
            </p>
          </li>
          <li>
            <p>
              <span className="text--semibold">Capital: </span>
              {capital}
            </p>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

export default Country;
