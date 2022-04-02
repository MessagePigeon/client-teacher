import { DateTimePicker as MuiDateTimePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

interface DateTimePickerProps {
  value: any;
  onChange: (newDate: string) => void;
  label: string;
  maxDate?: string;
  minDate?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  label,
  maxDate,
  minDate,
}) => {
  return (
    <MuiDateTimePicker
      label={label}
      renderInput={(params) => (
        <TextField
          fullWidth
          onKeyDown={(e) => e.preventDefault()}
          sx={{ caretColor: 'transparent' }}
          {...params}
        />
      )}
      inputFormat="YYYY.MM.DD HH:mm:ss"
      value={value}
      onChange={(newDate) => {
        if (newDate !== null) {
          onChange((newDate as unknown as Dayjs).format());
        }
      }}
      disableFuture
      maxDate={maxDate ? dayjs(maxDate) : undefined}
      minDate={minDate ? dayjs(minDate) : undefined}
    />
  );
};

export default DateTimePicker;
