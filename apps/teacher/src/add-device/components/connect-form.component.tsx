import { Button, Grid, Theme, useMediaQuery } from '@mui/material';
import { useMount, useRequest } from 'ahooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormTextField from '~/common/components/form-text-field.component';
import { API } from '~/http/api';
import { useAppDispatch } from '~/state/hooks';
import { pendingStudentsActions } from '~/state/slices/pending-students.slice';

const ConnectForm: React.FC = () => {
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: { connectCode: '', remark: '' },
  });

  const { connectCode: connectCodeParam } = useParams();
  useMount(() => {
    setValue('connectCode', connectCodeParam || '');
  });

  const dispatch = useAppDispatch();

  const { run } = useRequest(API.connectStudent, {
    manual: true,
    onSuccess(response) {
      dispatch(pendingStudentsActions.add(response.data));
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
          label="Connect Code"
          autoFocus={!connectCodeParam}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <FormTextField
          control={control}
          name="remark"
          label="Remark"
          autoFocus={!!connectCodeParam}
        />
      </Grid>
      <Grid item container md={12} xs={12} justifyContent="end">
        <Button variant="contained" fullWidth={isXs} type="submit">
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default ConnectForm;
