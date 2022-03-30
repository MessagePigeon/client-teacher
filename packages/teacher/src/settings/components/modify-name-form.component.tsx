import { Button, Divider, Paper, Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import FormTextField from '~/common/components/form-text-field.component';
import { API } from '~/http/api';
import { useAppDispatch, useAppSelector } from '~/state/hooks';
import { nameActions, nameSelector } from '~/state/slices/name.slice';

const ModifyNameForm: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const name = useAppSelector(nameSelector);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { newName: '' },
  });

  const { run, loading } = useRequest(API.modifyName, {
    manual: true,
    onSuccess(_, [body]) {
      dispatch(nameActions.set(body.newName));
      toast.success(t('settings.modify-name.toast.success'));
    },
  });

  return (
    <Paper
      component="form"
      sx={{ p: 2 }}
      onSubmit={handleSubmit((formData) => {
        run(formData);
        reset();
      })}
    >
      <Typography mb={1}>{t('settings.modify-name.title')}</Typography>
      <Divider />
      <FormTextField
        control={control}
        label={t('settings.modify-name.form.new-name.label')}
        name="newName"
        autoComplete="name"
        rules={{
          validate: (value) =>
            value !== name ||
            (t('settings.modify-name.form.new-name.error.validate') as string),
        }}
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{ mt: 1 }}
        disabled={loading}
      >
        {t('settings.change-password.form.submit')}
      </Button>
    </Paper>
  );
};

export default ModifyNameForm;
