import { Button, Grid, Theme, useMediaQuery } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import FormTextField from '~/components/FormTextField';
import { API } from '~/services/api';
import { pendingStudentsState } from '~/state/students';

const ConnectForm = () => {
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: { connectCode: '', remark: '' },
  });

  const { connectCode: connectCodeParam } = useParams();
  setValue('connectCode', connectCodeParam || '');

  const [pendingStudents, setPendingStudents] =
    useRecoilState(pendingStudentsState);

  const { run } = useRequest(API.connectStudent, {
    manual: true,
    onSuccess(response) {
      setPendingStudents([response.data, ...pendingStudents]);
      toast.success('Send Connect Request Success');
    },
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
          autoFocus={!connectCodeParam}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <FormTextField
          control={control}
          name="remark"
          label="备注名"
          autoFocus={!!connectCodeParam}
        />
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
