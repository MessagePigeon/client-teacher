import { Button, Divider, Paper, Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import FormTextField from '~/common/components/form-text-field.component';
import { API } from '~/services/api';
import { nameState } from '~/state/name.state';

const ModifyNameForm: React.FC = () => {
  const [name, setName] = useRecoilState(nameState);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { newName: name },
  });

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
        rules={{ validate: (value) => value !== name || '与原姓名相同' }}
      />
      <Button fullWidth type="submit" variant="contained" sx={{ mt: 1 }}>
        确定
      </Button>
    </Paper>
  );
};

export default ModifyNameForm;