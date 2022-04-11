import { useCheckPhone } from '@mpigeon/client-shared';
import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export type SearchParams = { id: string; defaultRemark: string };

export const defaultSearchParams: SearchParams = { id: '', defaultRemark: '' };

interface SearchFormProps {
  onChange: (searchParams: SearchParams) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onChange, loading }) => {
  const { t } = useTranslation();

  const isPhone = useCheckPhone();

  const { control, reset, handleSubmit } = useForm({
    defaultValues: defaultSearchParams,
  });

  return (
    <Grid
      container
      spacing={2}
      component="form"
      onSubmit={handleSubmit((data) => onChange(data))}
    >
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="id"
          render={({ field }) => <TextField label="ID" fullWidth {...field} />}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="defaultRemark"
          render={({ field }) => (
            <TextField label={t('student.remark')} fullWidth {...field} />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth={isPhone}
          variant="contained"
          color="secondary"
          onClick={() => reset()}
          disabled={loading}
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
