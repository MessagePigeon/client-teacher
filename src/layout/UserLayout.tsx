import {
  Devices,
  ForwardToInbox,
  History,
  ManageAccountsOutlined,
} from '@mui/icons-material';
import React from 'react';
import LayoutBase from './LayoutBase';

const UserLayout: React.FC = () => {
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
      logout={() => console.log('logout')}
      teacherName="XXX"
    />
  );
};

export default UserLayout;
