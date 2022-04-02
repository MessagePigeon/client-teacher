import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormTextField from '~/common/components/form-text-field.component';
import { API } from '~/http/apis';

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      username: '',
      name: '',
      password: '',
      confirmPassword: '',
      registerCode: '',
    },
  });
  const watchOriginPassword = watch('password');

  const navigate = useNavigate();
  const { run, loading } = useRequest(API.register, {
    manual: true,
    onSuccess() {
      toast.success(t('register.toast.register-success'));
      navigate('/login');
    },
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t('register.title')}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(({ confirmPassword, ...formData }) =>
          run(formData),
        )}
        noValidate
        sx={{ mt: 1 }}
      >
        <FormTextField
          name="username"
          label={t('register.form.username.label')}
          control={control}
          rules={{
            pattern: {
              value: /^([a-zA-Z]+[0-9-_]*)+$/,
              message: t('register.form.username.error.pattern'),
            },
          }}
          autoFocus
          autoComplete="username"
          defaultHelperText={t('register.form.username.helper-text')}
        />
        <FormTextField
          name="name"
          label={t('register.form.name.label')}
          control={control}
          autoComplete="name"
          defaultHelperText={t('register.form.name.helper-text')}
        />
        <FormTextField
          name="password"
          label={t('register.form.password.label')}
          control={control}
          rules={{
            minLength: {
              value: 5,
              message: t('register.form.password.error.min-length'),
            },
          }}
          autoComplete="new-password"
          password
        />
        <FormTextField
          name="confirmPassword"
          label={t('register.form.confirm-password.label')}
          control={control}
          rules={{
            validate: (value) =>
              value === watchOriginPassword ||
              (t('register.form.confirm-password.error.validate') as string),
          }}
          password
        />
        <FormTextField
          name="registerCode"
          label={t('register.form.register-code.label')}
          control={control}
          rules={{
            minLength: {
              value: 32,
              message: t('register.form.register-code.error.min-length'),
            },
            maxLength: {
              value: 32,
              message: t('register.form.register-code.error.max-length'),
            },
          }}
          password
          defaultHelperText={t('register.form.register-code.helper-text')}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
          disabled={loading}
        >
          {t('register.form.submit')}
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
