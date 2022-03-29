import { HistoryEdu, Login } from '@mui/icons-material';
import { useMount } from 'ahooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LayoutBase from './base.layout';

const AuthLayout: React.FC = () => {
  const { t } = useTranslation();

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
        {
          title: t('layout.navigation.auth.login'),
          icon: <Login />,
          path: 'login',
        },
        {
          title: t('layout.navigation.auth.register'),
          icon: <HistoryEdu />,
          path: 'register',
        },
      ]}
      navigate={(path) => navigate(path)}
      mainContainerMaxWidth="xs"
    />
  );
};

export default AuthLayout;
