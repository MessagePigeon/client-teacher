import { LoadingModal } from '@mpigeon/client-shared';
import { Mood } from '@mui/icons-material';
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
        navigation={[{ title: 'Welcome', icon: <Mood />, path: 'welcome' }]}
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
