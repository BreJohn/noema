import { OPEC_COUNTRY_CODES } from "./data/opecCountriesCodes";
import { FinancingRequestFormData } from "./model/financingRequestFormData.model";

export async function fetchCountriesAndCurrencies() {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,cca2,currencies"
  );
  const resData = await response.json();
  if (!resData) return;

  const countries = resData.map((country: any) => ({
    name: country.name?.common,
    code: country.cca2,
    opec: OPEC_COUNTRY_CODES.includes(country.cca2),
  }));
  const currencies = resData.map((country: any) => {
    const code = Object.keys(country.currencies)[0];
    return { code, symbol: country.currencies[code]?.symbol ?? "" };
  });
  return { countries, currencies };
}

export async function sendFinancingRequest(request: FinancingRequestFormData) {
  const response = await fetch(
    "http://test-noema-api.azurewebsites.net/api/requests",
    {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
}
