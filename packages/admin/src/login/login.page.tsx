import { Button, TextField } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '~/http/api';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: { password: '' },
  });

  const { run, loading } = useRequest(API.login, {
    manual: true,
    onSuccess(response) {
      localStorage.setItem('token', response.data.token);
      navigate('/welcome');
      toast.success('Login Success');
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        run(data);
      })}
    >
      <Controller
        control={control}
        name="password"
        rules={{ required: true }}
        render={({ field, fieldState: { invalid } }) => (
          <TextField
            label="Password"
            fullWidth
            type="password"
            error={invalid}
            disabled={loading}
            {...field}
          />
        )}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
        Login
      </Button>
    </form>
  );
};

export default LoginPage;
