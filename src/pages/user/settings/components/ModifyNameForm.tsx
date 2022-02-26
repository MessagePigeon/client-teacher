import { Button, Divider, Paper, Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FormTextField from '~/components/FormTextField';
import { API } from '~/services/api';
import { useSetRecoilState } from 'recoil';
import { nameState } from '~/state/name';

const ModifyNameForm: React.FC = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { newName: '' },
  });

  const setName = useSetRecoilState(nameState);

  const { run } = useRequest(API.modifyName, {
    manual: true,
    onSuccess(_, [body]) {
      setName(body.newName);
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
      />
      <Button fullWidth type="submit" variant="contained" sx={{ mt: 1 }}>
        确定
      </Button>
    </Paper>
  );
};

export default ModifyNameForm;
