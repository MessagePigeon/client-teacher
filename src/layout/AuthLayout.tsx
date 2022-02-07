import { HistoryEdu, Login } from '@mui/icons-material';
import React from 'react';
import LayoutBase from './LayoutBase';

const AuthLayout: React.FC = () => {
  return (
    <LayoutBase
      navigation={[
        { title: '登录', icon: <Login />, path: 'login' },
        { title: '注册', icon: <HistoryEdu />, path: 'register' },
      ]}
    />
  );
};

export default AuthLayout;
