import { Button, Divider, Paper, Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormTextField from '~/common/components/form-text-field.component';
import { API } from '~/http/api';

const ChangePasswordForm: React.FC = () => {
  const { t } = useTranslation();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { oldPassword: '', newPassword: '' },
  });

  const navigate = useNavigate();

  const { run, loading } = useRequest(API.modifyPassword, {
    manual: true,
    onSuccess() {
      localStorage.removeItem('token');
      navigate('/login');
      toast.success(t('settings.change-password.toast.success'));
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
      <Typography mb={1}>{t('settings.change-password.title')}</Typography>
      <Divider />
      <FormTextField
        control={control}
        label={t('settings.change-password.form.old-password.label')}
        name="oldPassword"
        password
      />
      <FormTextField
        control={control}
        label={t('settings.change-password.form.new-password.label')}
        name="newPassword"
        autoComplete="new-password"
        rules={{
          minLength: {
            value: 5,
            message: t(
              'settings.change-password.form.new-password.error.min-length',
            ) as string,
          },
        }}
        password
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

export default ChangePasswordForm;
