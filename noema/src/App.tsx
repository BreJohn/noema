import "./App.css";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { Country } from "./model/country.model";
import { Currency } from "./model/currency.model";
import CreateRequest from "./pages/CreateRequest";
import { CountryDataContext } from "./store/country-data-context";
import { fetchCountriesAndCurrencies } from "./http";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates if component unmounts

    const fetchData = async () => {
      try {
        const res = await fetchCountriesAndCurrencies();
        if (isMounted) {
          setCountries(res?.countries || []);
          setCurrencies(res?.currencies || []);
        }
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, []);

  return (
    <CountryDataContext value={{ countries, currencies }}>
      <Header />
      <CreateRequest />
    </CountryDataContext>
  );
}

export default App;
