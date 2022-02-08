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
import { useBoolean } from 'ahooks';
import React from 'react';

const Register: React.FC = () => {
  const [showPassword, { toggle }] = useBoolean();

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
        onSubmit={() => console.log('submit')}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="用户名"
          name="username"
          autoComplete="username"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="真实姓名"
          name="name"
          autoComplete="name"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="密码"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggle}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="re-password"
          label="重复密码"
          type={showPassword ? 'text' : 'password'}
          id="re-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggle}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="register-code"
          label="注册码"
          type="password"
          id="register-code"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          注册
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
