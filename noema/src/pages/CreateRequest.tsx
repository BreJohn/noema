import {
  Alert,
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { addDays, addYears } from "date-fns";
import { ChangeEvent, use, useCallback, useState } from "react";
import { CountryDataContext } from "../store/country-data-context";
import { PaymentContainer } from "../styles";
import { sendFinancingRequest } from "../http";
import { FinancingRequestFormData } from "../model/financingRequestFormData.model";
import { ProjectCodeInput } from "../components/ProjectCodeInput";
import { DateRangePicker } from "../components/DateRangePicker";
import { InputField } from "../components/InputField";

function CreateRequest() {
  const countryDataCtx = use(CountryDataContext);

  const [formData, setFormData] = useState<FinancingRequestFormData>({
    name: "",
    surname: "",
    country: "",
    projectCode: "",
    validityPeriodStart: addDays(new Date(), 15),
    validityPeriodEnd: addYears(addDays(new Date(), 15), 1),
    description: "",
    paymentAmount: 0,
    currency: "",
  });
  const [currencyDisabled, setCurrencyDisabled] = useState(false);
  const [message, setMessage] = useState({
    success: true,
    show: false,
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.name === "country") {
        const isOPEC = countryDataCtx.countries.find(
          (country) => country.code === e.target.value && country.opec
        );
        if (isOPEC)
          setFormData((prev) => ({
            ...prev,
            currency: "USD",
          }));
        setCurrencyDisabled(!!isOPEC);
      }

      setFormData((prev) => ({
        ...prev,
        [e.target.name]:
          e.target.type === "number"
            ? parseFloat(e.target.value)
            : e.target.value,
      }));
    },
    [countryDataCtx.countries]
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await sendFinancingRequest(formData);
    console.log(response);
    setMessage({
      success: response.status === 201,
      show: true,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        px: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" align="center">
        Create Request
      </Typography>

      <InputField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <InputField
        label="Surname"
        name="surname"
        value={formData.surname}
        onChange={handleChange}
        required
      />

      <TextField
        label="Country"
        name="country"
        value={formData.country}
        onChange={handleChange}
        select
        required
      >
        {countryDataCtx.countries.map((country, index) => (
          <MenuItem value={country.code} key={index}>
            {country.name}
          </MenuItem>
        ))}
      </TextField>

      <ProjectCodeInput
        value={formData.projectCode}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, projectCode: value }))
        }
      />

      <DateRangePicker
        startDateLabel="Validity Period Start"
        endDateLabel="Validity Period End"
        startDate={formData.validityPeriodStart}
        endDate={formData.validityPeriodEnd}
        onStartDateChange={(date) =>
          setFormData((prev) => ({ ...prev, validityPeriodStart: date }))
        }
        onEndDateChange={(date) =>
          setFormData((prev) => ({ ...prev, validityPeriodEnd: date }))
        }
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows="3"
        fullWidth
        slotProps={{ htmlInput: { maxLength: 150 } }}
        required
      />
      <PaymentContainer>
        <TextField
          className="amount"
          label="Payment amount"
          name="paymentAmount"
          value={formData.paymentAmount}
          onChange={handleChange}
          slotProps={{
            htmlInput: {
              type: "number",
              pattern: "^\\d*\\.?\\d{0,2}$",
            },
          }}
          fullWidth
          required
        />
        <TextField
          className="currency"
          label="Currency"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          select
          disabled={currencyDisabled}
          required
        >
          {countryDataCtx.currencies.map((currency, index) => (
            <MenuItem value={currency.code} key={index}>
              {currency.symbol}
            </MenuItem>
          ))}
        </TextField>
      </PaymentContainer>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      {!message.success ? (
        <Alert severity="success">Request sent successfully!</Alert>
      ) : (
        <Alert severity="error">Request wasn't sent because of an error!</Alert>
      )}
    </Box>
  );
}

export default CreateRequest;
