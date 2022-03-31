import { Login } from '@mui/icons-material';
import React from 'react';
import LayoutBase from './base.layout';

const LoginLayout: React.FC = () => {
  return (
    <LayoutBase
      navigation={[{ title: 'Login', icon: <Login />, path: 'login' }]}
      hideNavigation
      mainContainerMaxWidth="xs"
    />
  );
};

export default LoginLayout;
