import { useCheckPhone } from '@mpigeon/client-shared';
import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
            <TextField label={t('common.teacher-id')} fullWidth {...field} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="studentId"
          render={({ field }) => (
            <TextField label={t('common.student-id')} fullWidth {...field} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="startTime"
          render={({ field: { onChange, value } }) => (
            <DateTimePicker
              label={t('message.form.start-time')}
              value={value}
              onChange={onChange}
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
              label={t('message.form.end-time')}
              value={value}
              onChange={onChange}
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
            <TextField
              label={t('message.form.message')}
              fullWidth
              multiline
              {...field}
            />
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
          {t('common.reset')}
        </Button>
      </Grid>
      <Grid item container xs={6} justifyContent="flex-end">
        <Button
          fullWidth={isPhone}
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {t('common.search')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchForm;
