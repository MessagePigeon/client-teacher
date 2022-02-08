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
import { useBoolean } from 'ahooks';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const Login: React.FC = () => {
  const [showPassword, { toggle }] = useBoolean();

  const { control, handleSubmit } = useForm({
    defaultValues: { username: '', password: '', rememberMe: true },
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
        onSubmit={handleSubmit((data) => console.log(data))}
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
                    <IconButton onClick={toggle}>
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
        <Controller
          name="rememberMe"
          control={control}
          render={({ field: { value, ...field } }) => (
            <FormControlLabel
              control={<Checkbox color="primary" checked={value} {...field} />}
              label="记住我"
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
        >
          登录
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
