import { HistoryEdu, Login } from '@mui/icons-material';
import { Container } from '@mui/material';
import React from 'react';
import LayoutBase from './LayoutBase';

const AuthLayout: React.FC = () => {
  return (
    <LayoutBase
      navigation={[
        { title: '登录', icon: <Login />, path: 'login' },
        { title: '注册', icon: <HistoryEdu />, path: 'register' },
      ]}
      MainContainer={({ children }) => (
        <Container
          component="main"
          maxWidth="xs"
          sx={{ mt: 10, mb: { xs: 10, md: 2 } }}
        >
          {children}
        </Container>
      )}
    />
  );
};

export default AuthLayout;
