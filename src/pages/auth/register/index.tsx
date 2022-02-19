import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormTextField from '../../../components/FormTextField';
import { API } from '../../../services/api';

const Register: React.FC = () => {
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
      navigate('login');
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
        <FormTextField
          name="username"
          label="用户名"
          control={control}
          rules={{
            pattern: {
              value: /^([a-zA-Z]+[0-9-_]*)+$/,
              message: '请使用大小写字母、数字、中划线、下划线',
            },
          }}
          autoFocus
          autoComplete="username"
          defaultHelperText="注册后无法修改"
        />
        <FormTextField
          name="name"
          label="真实姓名"
          control={control}
          autoComplete="name"
          defaultHelperText="将用于显示在消息标题中"
        />
        <FormTextField
          name="password"
          label="密码"
          control={control}
          rules={{
            minLength: { value: 5, message: '至少五个字符' },
          }}
          autoComplete="new-password"
          password
        />
        <FormTextField
          name="rePassword"
          label="重复密码"
          control={control}
          rules={{
            validate: (value) =>
              value === watchOriginPassword || '重复密码不正确',
          }}
          password
        />
        <FormTextField
          name="registerCode"
          label="注册码"
          control={control}
          rules={{
            minLength: { value: 32, message: '注册码长度需32位' },
            maxLength: { value: 32, message: '注册码长度仅32位' },
          }}
          password
          defaultHelperText="联系管理员可获取注册码"
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
