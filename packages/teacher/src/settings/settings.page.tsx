import { Grid } from '@mui/material';
import React from 'react';
import ModifyNameForm from './components/modify-name-form.component';
import ChangePasswordForm from './components/change-password-form.component';

const SettingsPage: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <ModifyNameForm />
      </Grid>
      <Grid item md={6} xs={12}>
        <ChangePasswordForm />
      </Grid>
    </Grid>
  );
};

export default SettingsPage;
