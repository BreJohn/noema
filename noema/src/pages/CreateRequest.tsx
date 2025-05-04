import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  addDays,
  addYears,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
import { useState } from "react";
import styled from "styled-components";

function CreateRequest() {
  const PaymentContainer = styled.div`
    display: flex;
    & .amount {
      flex: 3;
    }
    & .currency {
      flex: 1;
    }
  `;

  const today = new Date();
  const minStartDate = addDays(today, 15); // 15 days from now
  const maxEndDate = addYears(today, 3); // 3 years from now

  const [formData, setFormData] = useState({
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

  const handleChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProjectCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    // Extract only valid letters and numbers
    const letters = input.slice(0, 4).replace(/[^A-Z]/g, "");
    const numbers = input.slice(4, 8).replace(/[^1-9]/g, "");

    let formatted = letters;
    if (letters.length === 4) {
      formatted += "-" + numbers;
    }

    setFormData((prev) => ({
      ...prev,
      projectCode: formatted,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // You can add validation or send to API here
    console.log("Form submitted:", formData);
  };

  const handleStartDateChange = (newStart: Date | null) => {
    setFormData((prev: any) => {
      if (!newStart) {
        return { ...prev };
      }
      const validityPeriodEnd =
        differenceInYears(
          prev.validityPeriodEnd,
          formData.validityPeriodStart
        ) < 1
          ? addDays(newStart, 15)
          : prev.validityPeriodEnd;

      return {
        ...prev,
        validityPeriodStart: newStart,
        validityPeriodEnd,
      };
    });
  };

  const handleEndDateChange = (newEnd: Date | null) => {
    if (newEnd && differenceInYears(newEnd, formData.validityPeriodStart) < 1) {
      alert("Validity period must be at least 1 year!");
      return;
    }

    setFormData((prev: any) => ({
      ...prev,
      validityPeriodEnd: newEnd,
    }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" align="center">
        Create Request
      </Typography>

      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <TextField
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
        <MenuItem value="bug" key="bug">
          Bug Report
        </MenuItem>
        <MenuItem value="feature" key="feature">
          Feature Request
        </MenuItem>
        <MenuItem value="other" key="other">
          Other
        </MenuItem>
      </TextField>

      <TextField
        placeholder="ABCD-9999"
        label="Project Code"
        variant="outlined"
        fullWidth
        value={formData.projectCode}
        onChange={handleProjectCodeChange}
        inputProps={{ maxLength: 9 }}
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start Date"
          value={formData.validityPeriodStart}
          onChange={handleStartDateChange}
          minDate={minStartDate}
          maxDate={maxEndDate}
        />
        <DatePicker
          label="End Date"
          value={formData.validityPeriodEnd}
          onChange={handleEndDateChange}
          disabled={!formData.validityPeriodStart}
          minDate={
            formData.validityPeriodStart
              ? addYears(formData.validityPeriodStart, 1)
              : minStartDate
          }
          maxDate={
            formData.validityPeriodStart
              ? addYears(formData.validityPeriodStart, 3)
              : maxEndDate
          }
        />
      </LocalizationProvider>

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows="3"
        fullWidth
        required
        slotProps={{ htmlInput: { maxLength: 150 } }}
      />
      <PaymentContainer>
        <TextField
          className="amount"
          label="Payment amount"
          type="number"
          name="paymentAmount"
          value={formData.paymentAmount}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          className="currency"
          label="Currency"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          select
          required
        >
          <MenuItem value="bug" key="bug">
            Bug Report
          </MenuItem>
          <MenuItem value="feature" key="feature">
            Feature Request
          </MenuItem>
          <MenuItem value="other" key="other">
            Other
          </MenuItem>
        </TextField>
      </PaymentContainer>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
}

export default CreateRequest;
