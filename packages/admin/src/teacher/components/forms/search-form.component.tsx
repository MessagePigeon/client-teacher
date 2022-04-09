import { useCheckPhone } from '@mpigeon/client-shared';
import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

export type SearchParams = { id: string; username: string; name: string };

interface SearchFormProps {
  onChange: (newSearchParams: SearchParams) => void;
  disabled: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onChange, disabled }) => {
  const isPhone = useCheckPhone();

  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      id: '',
      username: '',
      name: '',
    },
  });

  return (
    <Grid
      container
      spacing={2}
      component="form"
      onSubmit={handleSubmit((data) => onChange(data))}
    >
      <Grid item xs={12} md={12}>
        <Controller
          control={control}
          name="id"
          render={({ field }) => <TextField label="ID" fullWidth {...field} />}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <TextField label="Username" fullWidth {...field} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField label="Name" fullWidth {...field} />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth={isPhone}
          variant="contained"
          color="secondary"
          onClick={() => reset()}
          disabled={disabled}
        >
          Reset
        </Button>
      </Grid>
      <Grid item container xs={6} justifyContent="flex-end">
        <Button
          fullWidth={isPhone}
          type="submit"
          variant="contained"
          disabled={disabled}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchForm;