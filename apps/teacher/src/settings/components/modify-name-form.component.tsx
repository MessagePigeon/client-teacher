import { Button, Divider, Paper, Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FormTextField from '~/common/components/form-text-field.component';
import { API } from '~/http/api';
import { useAppDispatch, useAppSelector } from '~/state/hooks';
import { modifyName, nameSelector } from '~/state/slices/name.slice';

const ModifyNameForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const name = useAppSelector(nameSelector);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { newName: '' },
  });

  const { run } = useRequest(API.modifyName, {
    manual: true,
    onSuccess(_, [body]) {
      dispatch(modifyName(body.newName));
      toast.success('Modify Name Success');
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
      <Typography mb={1}>修改姓名</Typography>
      <Divider />
      <FormTextField
        control={control}
        label="新姓名"
        name="newName"
        autoComplete="name"
        rules={{ validate: (value) => value !== name || '与原姓名相同' }}
      />
      <Button fullWidth type="submit" variant="contained" sx={{ mt: 1 }}>
        确定
      </Button>
    </Paper>
  );
};

export default ModifyNameForm;
