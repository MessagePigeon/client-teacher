import { useCheckPhone } from '@mpigeon/client-shared';
import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import DateTimePicker from './date-time-picker.component';

export type SearchParams = {
  teacherId: string;
  studentId: string;
  startTime: string | null;
  endTime: string | null;
  message: string;
};

export const defaultSearchParams: SearchParams = {
  teacherId: '',
  studentId: '',
  startTime: null,
  endTime: null,
  message: '',
};

interface SearchFormProps {
  onChange: (searchParams: SearchParams) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onChange, loading }) => {
  const isPhone = useCheckPhone();

  const { control, handleSubmit, reset, watch } = useForm<SearchParams>({
    defaultValues: defaultSearchParams,
  });
  const formStartTime = watch('startTime');
  const formEndTime = watch('endTime');

  return (
    <Grid
      container
      spacing={2}
      component="form"
      mb={3}
      onSubmit={handleSubmit((data) => onChange(data))}
    >
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="teacherId"
          render={({ field }) => (
            <TextField label="Teacher ID" fullWidth {...field} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="studentId"
          render={({ field }) => (
            <TextField label="Student ID" fullWidth {...field} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="startTime"
          render={({ field: { onChange, value } }) => (
            <DateTimePicker
              label="Start Time"
              value={value}
              onChange={(newDate) => onChange(newDate)}
              maxDate={formEndTime || undefined}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="endTime"
          render={({ field: { onChange, value } }) => (
            <DateTimePicker
              label="End Time"
              value={value}
              onChange={(newDate) => onChange(newDate)}
              minDate={formStartTime || undefined}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          control={control}
          name="message"
          render={({ field }) => (
            <TextField label="Message" fullWidth multiline {...field} />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth={isPhone}
          variant="contained"
          color="secondary"
          onClick={() => reset()}
        >
          Reset
        </Button>
      </Grid>
      <Grid item container xs={6} justifyContent="flex-end">
        <Button
          fullWidth={isPhone}
          type="submit"
          variant="contained"
          disabled={loading}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchForm;
