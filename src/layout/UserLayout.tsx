import {
  Devices,
  ForwardToInbox,
  History,
  ManageAccountsOutlined,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutBase from './LayoutBase';

const UserLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
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
      logout={() => navigate('login')}
      teacherName="XXX"
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
    />
  );
};

export default UserLayout;
