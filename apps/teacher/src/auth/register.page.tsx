import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormTextField from '~/common/components/form-text-field.component';
import { API } from '~/http/api';

const Register: React.FC = () => {
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
        Register
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
          label="Username"
          control={control}
          rules={{
            pattern: {
              value: /^([a-zA-Z]+[0-9-_]*)+$/,
              message:
                'Please use upper and lower case letters, numbers, underscores and underlines',
            },
          }}
          autoFocus
          autoComplete="username"
          defaultHelperText="Cannot be modified after registration"
        />
        <FormTextField
          name="name"
          label="Name"
          control={control}
          autoComplete="name"
          defaultHelperText="Will be used to display in the message header"
        />
        <FormTextField
          name="password"
          label="Password"
          control={control}
          rules={{
            minLength: { value: 5, message: 'At least five characters' },
          }}
          autoComplete="new-password"
          password
        />
        <FormTextField
          name="confirmPassword"
          label="Confirm Password"
          control={control}
          rules={{
            validate: (value) =>
              value === watchOriginPassword || 'Confirm password incorrect',
          }}
          password
        />
        <FormTextField
          name="registerCode"
          label="Register Code"
          control={control}
          rules={{
            minLength: { value: 32, message: '32 characters required' },
            maxLength: { value: 32, message: '32 characters only' },
          }}
          password
          defaultHelperText="Contact admin to obtain a registration code"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
          disabled={loading}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
