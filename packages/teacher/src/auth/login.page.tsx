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
import { useAppDispatch, useAppSelector } from '~/state/hooks';
import {
  unauthorizedHistoryPathActions,
  unauthorizedHistoryPathSelector,
} from '~/state/slices/unauthorized-history-path.slice';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm({
    defaultValues: { username: '', password: '' },
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const unauthorizedHistoryPath = useAppSelector(
    unauthorizedHistoryPathSelector,
  );

  const { run, loading } = useRequest(API.login, {
    manual: true,
    onSuccess(response) {
      localStorage.setItem('token', response.data.token);
      toast.success(t('login.toast.login-success'));
      navigate(unauthorizedHistoryPath);
      dispatch(unauthorizedHistoryPathActions.set('/send-message'));
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
        {t('login.title')}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((formData) => run(formData))}
        noValidate
        sx={{ mt: 1 }}
      >
        <FormTextField
          name="username"
          control={control}
          label={t('login.form.username.label')}
          autoComplete="username"
          autoFocus
        />
        <FormTextField
          name="password"
          control={control}
          label={t('login.form.password.label')}
          autoComplete="current-password"
          defaultHelperText={t('login.form.password.helper-text')}
          password
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
          disabled={loading}
        >
          {t('login.form.submit')}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
