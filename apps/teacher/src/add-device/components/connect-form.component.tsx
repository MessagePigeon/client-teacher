import { Button, Grid } from '@mui/material';
import { useMount, useRequest } from 'ahooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormTextField from '~/common/components/form-text-field.component';
import { useCheckPhone } from '~/common/hooks/use-check-phone.hook';
import { API } from '~/http/api';
import { useAppDispatch, useAppSelector } from '~/state/hooks';
import { connectedStudentsSelector } from '~/state/slices/connected-students.slice';
import { pendingStudentsActions } from '~/state/slices/pending-students.slice';

const ConnectForm: React.FC = () => {
  const { t } = useTranslation();

  const isPhone = useCheckPhone();

  const connectedStudents = useAppSelector(connectedStudentsSelector);

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
      toast.info(t('add-device.toast.send-request-success'));
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
          label={t('add-device.form.connect-code.label')}
          autoFocus={!connectCodeParam}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <FormTextField
          control={control}
          name="remark"
          label={t('add-device.form.remark.label')}
          autoFocus={!!connectCodeParam}
          rules={{
            validate: (value) =>
              !connectedStudents.map(({ remark }) => remark).includes(value) ||
              (t('add-device.form.remark.error.validate') as string),
          }}
        />
      </Grid>
      <Grid item container md={12} xs={12} justifyContent="end">
        <Button variant="contained" fullWidth={isPhone} type="submit">
          {t('add-device.form.submit')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ConnectForm;
