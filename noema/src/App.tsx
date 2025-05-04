import "./App.css";
import Header from "./components/Header";
import AppRoutes from "./AppRoutes";
import { useEffect, useState } from "react";
import { Country } from "./model/country.model";
import { Currency } from "./model/currency.model";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2,currencies")
      .then((response) => {
        return response.json();
      })
      .then((res: any[]) => {
        if (!res) return;
        const countries = res.map((country) => ({
          name: country.name?.common,
          code: country.cca2,
        }));
        const currencies = res.map((country) => {
          const code = Object.keys(country.currencies)[0];
          return { code, symbol: country.currencies[code]?.symbol ?? "" };
        });
        setCountries(countries);
        setCurrencies(currencies);
      });
  }, []);

  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;
