import { useCheckPhone } from '@mpigeon/client-shared';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useBoolean, useRequest } from 'ahooks';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { API } from '~/http/apis';
import UserNamePasswordDialog from '../dialogs/username-password-dialog.component';

interface CreateFormProps {
  refresh: () => void;
}

const CreateForm: React.FC<CreateFormProps> = ({ refresh }) => {
  const { t } = useTranslation();

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
      refresh();
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
        <Grid item container xs={12}>
          <Typography variant="caption" color="text.secondary">
            {t('teacher.form.create.tip')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="username"
            rules={{ required: true }}
            render={({ field, fieldState: { invalid } }) => (
              <TextField
                label={t('teacher.username')}
                fullWidth
                error={invalid}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field, fieldState: { invalid } }) => (
              <TextField
                label={t('teacher.name')}
                fullWidth
                error={invalid}
                {...field}
              />
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
            {t('common.create')}
          </Button>
        </Grid>
      </Grid>
      <UserNamePasswordDialog
        title={t('teacher.dialog.username-password.title.create')}
        open={isDialogOpen}
        onClose={closeDialog}
        {...newTeacher}
      />
    </>
  );
};

export default CreateForm;
