import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useBoolean, useRequest } from 'ahooks';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../../../services/api';

const Register: React.FC = () => {
  const [showPassword, { toggle: toggleShowPassword }] = useBoolean();
  const [showRegisterCode, { toggle: toggleShowRegisterCode }] = useBoolean();

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      username: '',
      name: '',
      password: '',
      rePassword: '',
      registerCode: '',
    },
  });
  const watchOriginPassword = watch('password');

  const navigate = useNavigate();
  const { run, loading } = useRequest(API.register, {
    manual: true,
    onSuccess() {
      toast.success('Register Success. Please Login');
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
        注册
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(({ rePassword, ...formData }) => run(formData))}
        noValidate
        sx={{ mt: 1 }}
      >
        <Controller
          name="username"
          control={control}
          rules={{
            required: '必填',
            pattern: {
              value: /^([a-zA-Z]+[0-9-_]*)+$/,
              message: '请使用大小写字母、数字、中划线、下划线',
            },
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="用户名"
              autoComplete="username"
              autoFocus
              error={invalid}
              helperText={invalid ? error?.message : '注册后无法修改'}
              {...field}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          rules={{ required: '必填' }}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="真实姓名"
              autoComplete="name"
              error={invalid}
              helperText={invalid ? error?.message : '将用于显示在消息标题中'}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: '必填',
            minLength: { value: 5, message: '至少五个字符' },
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              margin="normal"
              fullWidth
              label="密码"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
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
              helperText={invalid && error?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="rePassword"
          control={control}
          rules={{
            required: '必填',
            validate: (value) =>
              value === watchOriginPassword || '重复密码不正确',
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              margin="normal"
              fullWidth
              label="重复密码"
              type={showPassword ? 'text' : 'password'}
              id="re-password"
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
              helperText={invalid && error?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="registerCode"
          control={control}
          rules={{
            required: '必填',
            minLength: { value: 32, message: '注册码长度需32位' },
            maxLength: { value: 32, message: '注册码长度仅32位' },
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              margin="normal"
              fullWidth
              label="注册码"
              type={showRegisterCode ? 'text' : 'password'}
              id="register-code"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowRegisterCode}>
                      {showRegisterCode ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={invalid}
              helperText={
                invalid
                  ? error?.message
                  : field.value.length === 0 && '联系管理员可获取注册码'
              }
              {...field}
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
          disabled={loading}
        >
          注册
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
