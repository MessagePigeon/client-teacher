import { Grid } from '@mui/material';
import React from 'react';
import ModifyNameForm from './components/ModifyNameForm';
import ModifyPasswordForm from './components/ModifyPasswordForm';

const Settings: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <ModifyNameForm />
      </Grid>
      <Grid item md={6} xs={12}>
        <ModifyPasswordForm />
      </Grid>
    </Grid>
  );
};

export default Settings;
