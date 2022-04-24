import { useParams } from 'react-router-dom';
import Country from 'components/Country';

const PageCountry = () => {
  const { countryCode } = useParams();

  return (
    <>
      <Country countryCode={countryCode} />
    </>
  );
};

export default PageCountry;
