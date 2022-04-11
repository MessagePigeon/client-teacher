import { Box, Button, TextField } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '~/http/apis';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: { password: '' },
  });

  const { run, loading } = useRequest(API.login, {
    manual: true,
    onSuccess(response) {
      localStorage.setItem('token', response.data.token);
      navigate('/connection');
      toast.success(t('login.toast.success'));
    },
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => {
        run(data);
      })}
      mt={30}
    >
      <Controller
        control={control}
        name="password"
        rules={{ required: true }}
        render={({ field, fieldState: { invalid } }) => (
          <TextField
            label={t('common.password')}
            fullWidth
            type="password"
            error={invalid}
            disabled={loading}
            {...field}
          />
        )}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
        {t('login.login')}
      </Button>
    </Box>
  );
};

export default LoginPage;
