import {
  Devices,
  ForwardToInbox,
  History,
  ManageAccountsOutlined,
} from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import LoadingModal from '../components/LoadingModal';
import { API } from '../services/api';
import { connectedStudentsState } from '../state/students';
import NetworkErrorModal from './components/NetworkErrorModal';
import LayoutBase from './LayoutBase';

const UserLayout: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: initData,
    loading: initLoading,
    run,
  } = useRequest(API.init, {
    onError() {
      localStorage.removeItem('token');
      navigate('/login');
    },
  });

  const setStudents = useSetRecoilState(connectedStudentsState);
  const { loading: getStudentsLoading } = useRequest(API.getStudents, {
    onSuccess(response) {
      setStudents(response.data);
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
            path: 'settings',
          },
        ]}
        isLogin
        logout={() => {
          localStorage.removeItem('token');
          navigate('/login');
          toast.info('Logout Success');
        }}
        teacherName={initData?.data.name}
        MainContainer={({ children }) => (
          <Box
            component="main"
            sx={{
              mt: 10,
              mb: { xs: 10, md: 2 },
              ml: { md: '200px' },
            }}
          >
            <Container maxWidth="md">{children}</Container>
          </Box>
        )}
        navigate={(path) => {
          run();
          navigate(path);
        }}
      />
      <NetworkErrorModal />
      <LoadingModal open={initLoading || getStudentsLoading} />
    </>
  );
};

export default UserLayout;
