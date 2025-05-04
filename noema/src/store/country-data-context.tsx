import { createContext } from "react";
import { Country } from "../model/country.model";
import { Currency } from "../model/currency.model";

export const CountryDataContext = createContext<{
  countries: Country[];
  currencies: Currency[];
}>({
  countries: [],
  currencies: [],
});
