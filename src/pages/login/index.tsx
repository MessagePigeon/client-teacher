import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useBoolean, useRequest } from 'ahooks';
import { AxiosResponse } from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API, LoginResponse } from '../../services/api';

const Login: React.FC = () => {
  const [showPassword, { toggle: toggleShowPassword }] = useBoolean();
  const [rememberMe, { toggle: toggleRememberMe }] = useBoolean(true);

  const { control, handleSubmit } = useForm({
    defaultValues: { username: '', password: '', rememberMe: true },
  });

  const navigate = useNavigate();

  const onRequestSuccess = (response: AxiosResponse<LoginResponse, any>) => {
    if (rememberMe) {
      localStorage.setItem('token', response.data.token);
    }
    toast.success('Login Success');
    navigate('/send-message');
  };

  const { run, loading } = useRequest(API.login, {
    manual: true,
    onSuccess: onRequestSuccess,
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
        登录
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((formData) => run(formData))}
        noValidate
        sx={{ mt: 1 }}
      >
        <Controller
          name="username"
          control={control}
          rules={{ required: '必填' }}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="用户名"
              autoComplete="username"
              autoFocus
              error={invalid}
              helperText={invalid && error?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: '必填' }}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              margin="normal"
              fullWidth
              label="密码"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={invalid}
              helperText={invalid ? error?.message : '忘记密码? 联系管理员重置'}
              {...field}
            />
          )}
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={rememberMe}
              onChange={toggleRememberMe}
            />
          }
          label="记住我"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
          disabled={loading}
        >
          登录
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
