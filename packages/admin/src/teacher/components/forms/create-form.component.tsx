import { useCheckPhone } from '@mpigeon/client-shared';
import { Button, Grid, TextField } from '@mui/material';
import { useBoolean, useRequest } from 'ahooks';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { API } from '~/http/apis';
import UserNamePasswordDialog from '../dialogs/username-password-dialog.component';

interface CreateFormProps {
  onSuccess: () => void;
}

const CreateForm: React.FC<CreateFormProps> = ({ onSuccess }) => {
  const isPhone = useCheckPhone();

  const [isDialogOpen, { setTrue: openDialog, setFalse: closeDialog }] =
    useBoolean();
  const [newTeacher, setNewTeacher] = useState<{
    username: string;
    password: string;
  }>({ username: '', password: '' });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { username: '', name: '' },
  });

  const { run, loading } = useRequest(API.createTeacher, {
    manual: true,
    onSuccess(response, [body]) {
      setNewTeacher({
        username: body.username,
        password: response.data.password,
      });
      openDialog();
      onSuccess();
    },
  });

  return (
    <>
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={handleSubmit((data) => {
          run(data);
          reset();
        })}
      >
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <TextField label="Username" fullWidth {...field} />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField label="Name" fullWidth {...field} />
            )}
          />
        </Grid>
        <Grid item container xs={12}>
          <Button
            fullWidth={isPhone}
            type="submit"
            variant="contained"
            disabled={loading}
          >
            Create
          </Button>
        </Grid>
      </Grid>
      <UserNamePasswordDialog
        title="Create Success"
        open={isDialogOpen}
        onClose={closeDialog}
        {...newTeacher}
      />
    </>
  );
};

export default CreateForm;
