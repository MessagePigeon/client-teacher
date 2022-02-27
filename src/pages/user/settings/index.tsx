import { Grid } from '@mui/material';
import React from 'react';
import ChangeNameForm from './components/ChangeNameForm';
import ChangePasswordForm from './components/ChangePasswordForm';

const Settings: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <ChangeNameForm />
      </Grid>
      <Grid item md={6} xs={12}>
        <ChangePasswordForm />
      </Grid>
    </Grid>
  );
};

export default Settings;
