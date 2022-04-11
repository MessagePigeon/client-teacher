import { useCheckPhone } from '@mpigeon/client-shared';
import { Button, Grid, TextField } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { API } from '~/http/apis';

interface CreateFormProps {
  refresh: () => void;
}

const CreateForm: React.FC<CreateFormProps> = ({ refresh }) => {
  const { t } = useTranslation();

  const isPhone = useCheckPhone();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { defaultRemark: '', key: '' },
  });

  const { run, loading } = useRequest(API.createStudent, {
    manual: true,
    onSuccess() {
      refresh();
      toast.success(t('student.toast.create-success'));
    },
  });

  return (
    <>
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={handleSubmit((data) => {
          run({
            defaultRemark: data.defaultRemark,
            key: data.key || undefined,
          });
          reset();
        })}
      >
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="defaultRemark"
            rules={{ required: true }}
            render={({ field, fieldState: { invalid } }) => (
              <TextField
                label={t('student.remark')}
                fullWidth
                error={invalid}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="key"
            render={({ field }) => (
              <TextField
                label="Key"
                fullWidth
                helperText={t('student.form.create.tip')}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item container xs={12}>
          <Button
            fullWidth={isPhone}
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {t('common.create')}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateForm;
