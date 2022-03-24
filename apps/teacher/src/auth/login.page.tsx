import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormTextField from '~/common/components/form-text-field.component';
import { API } from '~/http/api';
import { useAppDispatch, useAppSelector } from '~/state/hooks';
import {
  unauthorizedHistoryPathActions,
  unauthorizedHistoryPathSelector,
} from '~/state/slices/unauthorized-history-path.slice';

const Login: React.FC = () => {
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
      toast.success('Login Success');
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
        Login
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
          label="Username"
          autoComplete="username"
          autoFocus
        />
        <FormTextField
          name="password"
          control={control}
          label="Password"
          autoComplete="current-password"
          defaultHelperText="Forgot your password? Contact admin to reset"
          password
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
          disabled={loading}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
