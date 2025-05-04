import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { addDays, addYears, differenceInYears } from "date-fns";
import { ReactNode } from "react";

interface DateRangePickerProps {
  startDateLabel: string;
  endDateLabel: string;
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  minStartDate?: Date;
  maxEndDate?: Date;
  children?: ReactNode;
}

export const DateRangePicker = ({
  startDateLabel,
  endDateLabel,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  minStartDate = addDays(new Date(), 15),
  maxEndDate = addYears(new Date(), 3),
  ...props
}: DateRangePickerProps) => {
  const handleStartDateChange = (newStart: Date | null) => {
    if (!newStart) {
      onStartDateChange(null);
      return;
    }

    const newEndDate =
      endDate && differenceInYears(endDate, startDate || new Date()) < 1
        ? addYears(newStart, 1)
        : endDate;

    onStartDateChange(newStart);
    if (newEndDate) {
      onEndDateChange(newEndDate);
    }
  };

  const handleEndDateChange = (newEnd: Date | null) => {
    if (newEnd && startDate && differenceInYears(newEnd, startDate) < 1) {
      alert("Validity period must be at least 1 year!");
      return;
    }
    onEndDateChange(newEnd);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={startDateLabel}
        value={startDate}
        onChange={handleStartDateChange}
        minDate={minStartDate}
        maxDate={maxEndDate}
      />
      <DatePicker
        label={endDateLabel}
        value={endDate}
        onChange={handleEndDateChange}
        disabled={!startDate}
        minDate={startDate ? addYears(startDate, 1) : minStartDate}
        maxDate={startDate ? addYears(startDate, 3) : maxEndDate}
      />
      {props.children}
    </LocalizationProvider>
  );
};
