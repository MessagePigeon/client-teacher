import { Button, Divider, Paper, Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormTextField from '~/components/FormTextField';
import { API } from '~/services/api';

const ChangePasswordForm: React.FC = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { oldPassword: '', newPassword: '' },
  });

  const navigate = useNavigate();

  const { run } = useRequest(API.modifyPassword, {
    manual: true,
    onSuccess() {
      localStorage.removeItem('token');
      navigate('/login');
      toast.success('Change Password Success. Please Login Again');
    },
  });

  return (
    <Paper
      component="form"
      sx={{ p: 2 }}
      onSubmit={handleSubmit((formData) => {
        run(formData);
        reset();
      })}
    >
      <Typography mb={1}>修改密码</Typography>
      <Divider />
      <FormTextField
        control={control}
        label="原密码"
        name="oldPassword"
        password
      />
      <FormTextField
        control={control}
        label="新密码"
        name="newPassword"
        autoComplete="new-password"
        rules={{
          minLength: { value: 5, message: '至少五个字符' },
        }}
        password
      />
      <Button fullWidth type="submit" variant="contained" sx={{ mt: 1 }}>
        确定
      </Button>
    </Paper>
  );
};

export default ChangePasswordForm;