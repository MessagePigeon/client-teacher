import { Login } from '@mui/icons-material';
import { useMount } from 'ahooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutBase from './base.layout';

const LoginLayout: React.FC = () => {
  const navigate = useNavigate();

  useMount(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/connection');
    }
  });

  return (
    <LayoutBase
      navigation={[{ title: 'Login', icon: <Login />, path: 'login' }]}
      hideNavigation
      mainContainerMaxWidth="xs"
    />
  );
};

export default LoginLayout;
