import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'context/theme';
import { PageCountry, PageRoot } from 'pages';
import { CountriesContextProvider } from 'context/countries';
import Header from 'components/Header';
import styles from 'styles/App.module.scss';

const App = () => {
  const root = (
    <CountriesContextProvider>
      <PageRoot />
    </CountriesContextProvider>
  );

  return (
    <ThemeProvider>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={root} />
          <Route path="/:countryCode" element={<PageCountry />} />
        </Routes>
      </main>
    </ThemeProvider>
  );
};

export default App;
