import {
  Devices,
  ForwardToInbox,
  History,
  ManageAccountsOutlined,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingModal from '../components/LoadingModal';
import { API } from '../services/api';
import NetworkErrorModal from './components/NetworkErrorModal';
import LayoutBase from './LayoutBase';

const UserLayout: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: requestData,
    loading,
    run,
  } = useRequest(API.init, {
    onError() {
      localStorage.removeItem('token');
      navigate('/login');
    },
  });

  return (
    <>
      <LayoutBase
        navigation={[
          { title: '发送消息', icon: <ForwardToInbox />, path: 'send-message' },
          { title: '历史记录', icon: <History />, path: 'history' },
          { title: '添加设备', icon: <Devices />, path: 'add-device' },
          {
            title: '个人设置',
            icon: <ManageAccountsOutlined />,
            path: 'personal-settings',
          },
        ]}
        isLogin
        logout={() => {
          localStorage.removeItem('token');
          navigate('/login');
          toast.info('Logout Success');
        }}
        teacherName={requestData?.data.name}
        MainContainer={({ children }) => (
          <Box
            component="main"
            sx={{
              mt: 10,
              mb: { xs: 10, md: 2 },
              ml: { xs: 2, md: '216px' },
              mr: 2,
            }}
          >
            {children}
          </Box>
        )}
        navigate={(path) => {
          run();
          navigate(path);
        }}
      />
      <NetworkErrorModal />
      <LoadingModal open={loading} />
    </>
  );
};

export default UserLayout;
