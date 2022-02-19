import { HistoryEdu, Login } from '@mui/icons-material';
import { Container } from '@mui/material';
import { useMount } from 'ahooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutBase from './LayoutBase';

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();

  useMount(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('send-message');
    }
  });

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
