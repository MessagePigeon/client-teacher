import { useCheckPhone } from '@mpigeon/client-shared';
import { Button, Grid, TextField } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { API } from '~/http/apis';

const ConnectionPage: React.FC = () => {
  const isPhone = useCheckPhone();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { teacherId: '', studentId: '' },
  });

  const { run } = useRequest(API.modifyConnection, {
    manual: true,
    onFinally() {
      reset();
    },
    onSuccess() {
      toast.success('Modify Connection Success');
    },
  });

  return (
    <Grid container spacing={2} component="form">
      <Grid item xs={12}>
        <Controller
          control={control}
          name="teacherId"
          rules={{ required: true }}
          render={({ field, fieldState: { invalid } }) => (
            <TextField
              label="Teacher ID"
              error={invalid}
              fullWidth
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          control={control}
          name="studentId"
          rules={{ required: true }}
          render={({ field, fieldState: { invalid } }) => (
            <TextField
              label="Student ID"
              error={invalid}
              fullWidth
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Button
          type="submit"
          variant="contained"
          fullWidth={isPhone}
          onClick={handleSubmit((data) => run(data, 'disconnect'))}
        >
          Disconnect
        </Button>
      </Grid>
      <Grid item container xs={6} justifyContent="flex-end">
        <Button
          type="submit"
          variant="contained"
          fullWidth={isPhone}
          onClick={handleSubmit((data) => run(data, 'connect'))}
        >
          Connect
        </Button>
      </Grid>
    </Grid>
  );
};

export default ConnectionPage;
