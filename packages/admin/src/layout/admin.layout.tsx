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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '~/http/api';
import LayoutBase from './base.layout';

const AdminLayout: React.FC = () => {
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
            title: 'Register Code',
            icon: <ReceiptLong />,
            path: 'register-code',
          },
          {
            title: 'Message',
            icon: <Message />,
            path: 'message',
          },
          { title: 'Teacher', icon: <SupervisorAccount />, path: 'teacher' },
          { title: 'Student', icon: <Badge />, path: 'student' },
          {
            title: 'Connection',
            icon: <ConnectWithoutContact />,
            path: 'connection',
          },
        ]}
        onLogout={() => {
          localStorage.removeItem('token');
          navigate('/login');
          toast.info('Logout Success');
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
