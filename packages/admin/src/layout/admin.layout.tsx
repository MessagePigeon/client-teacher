import { LoadingModal } from '@mpigeon/client-shared';
import {
  Badge,
  ConnectWithoutContact,
  Message,
  ReceiptLong,
  SupervisorAccount,
} from '@mui/icons-material';
import { useRequest } from 'ahooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '~/http/apis';
import LayoutBase from './base.layout';

const AdminLayout: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { run, loading } = useRequest(API.init, {
    onError() {
      localStorage.removeItem('token');
      navigate('/login');
    },
  });

  return (
    <>
      <LayoutBase
        navigation={[
          {
            title: t('layout.navigation.connection'),
            icon: <ConnectWithoutContact />,
            path: 'connection',
          },
          {
            title: t('layout.navigation.message'),
            icon: <Message />,
            path: 'message',
          },
          {
            title: t('layout.navigation.teacher'),
            icon: <SupervisorAccount />,
            path: 'teacher',
          },
          {
            title: t('layout.navigation.student'),
            icon: <Badge />,
            path: 'student',
          },
          {
            title: t('layout.navigation.register-code'),
            icon: <ReceiptLong />,
            path: 'register-code',
          },
        ]}
        onLogout={() => {
          localStorage.removeItem('token');
          navigate('/login');
          toast.info(t('layout.toast.logout-success'));
        }}
        onNavigate={(path) => {
          run();
          navigate(path);
        }}
        isLogin
      />
      <LoadingModal open={loading} />
    </>
  );
};

export default AdminLayout;
