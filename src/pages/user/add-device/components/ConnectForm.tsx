import { Button, Grid, Theme, useMediaQuery } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import FormTextField from '../../../../components/FormTextField';
import { API } from '../../../../services/api';

const ConnectForm = () => {
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));

  const { run } = useRequest(API.connectStudent, { manual: true });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { connectCode: '', remark: '' },
  });

  return (
    <Grid
      container
      spacing={1}
      sx={{ mb: 4 }}
      component="form"
      onSubmit={handleSubmit((formData) => {
        run(formData);
        reset();
      })}
    >
      <Grid item md={6} xs={12}>
        <FormTextField
          control={control}
          name="connectCode"
          label="设备代码"
          autoFocus
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <FormTextField control={control} name="remark" label="备注名" />
      </Grid>
      <Grid item container md={12} xs={12} justifyContent="end">
        <Button variant="contained" fullWidth={isXs} type="submit">
          添加
        </Button>
      </Grid>
    </Grid>
  );
};

export default ConnectForm;
