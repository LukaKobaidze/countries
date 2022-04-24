import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Country } from 'shared/types';
import { Wrapper } from 'components/UI';
import styles from 'styles/Countries/CountriesItem.module.scss';

interface Props {
  data: Country;
}
type Ref = HTMLDivElement;

const CountriesItem = forwardRef<Ref, Props>(({ data }, ref) => {
  return (
    <Wrapper ref={ref} className={styles.item}>
      <Link className={styles.anchor} to={data.countryCode}>
        <img src={data.image} alt={`${data.name} flag`} />
      </Link>
      <div className={styles['text-div']}>
        <Link to={data.countryCode}>
          <h2>{data.name}</h2>
        </Link>
        <ul>
          <li>
            <p>
              <span className={styles.span}>Population: </span>
              {data.population.toLocaleString()}
            </p>
          </li>
          <li>
            <p>
              <span className={styles.span}>Region: </span>
              {data.region}
            </p>
          </li>
          <li>
            <p>
              <span className={styles.span}>Capital: </span>
              {data.capital}
            </p>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
});

export default CountriesItem;
