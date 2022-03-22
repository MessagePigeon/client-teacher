import { HistoryEdu, Login } from '@mui/icons-material';
import { useMount } from 'ahooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutBase from './LayoutBase';

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();

  useMount(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/send-message');
    }
  });

  return (
    <LayoutBase
      navigation={[
        { title: '登录', icon: <Login />, path: 'login' },
        { title: '注册', icon: <HistoryEdu />, path: 'register' },
      ]}
      navigate={(path) => navigate(path)}
      mainContainerMaxWidth="xs"
    />
  );
};

export default AuthLayout;
