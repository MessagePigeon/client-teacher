import {
  Devices,
  ForwardToInbox,
  History,
  ManageAccountsOutlined,
} from '@mui/icons-material';
import { useBoolean, useRequest } from 'ahooks';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { nameState } from '~/state/name.state';
import { connectedStudentsState } from '~/state/students.state';
import { unauthorizedHistoryPathState } from '~/state/unauthorized-history-path.state';
import LoadingModal from '../common/components/loading-modal.component';
import { API } from '../http/api';
import NetworkErrorModal from './components/network-error-modal.component';
import LayoutBase from './base.layout';

const UserLayout: React.FC = () => {
  const navigate = useNavigate();

  const [initSuccess, { setTrue: setInitSuccessTrue }] = useBoolean();

  const [name, setName] = useRecoilState(nameState);
  const location = useLocation();
  const setUnauthorizedHistoryPath = useSetRecoilState(
    unauthorizedHistoryPathState,
  );
  const { loading: initLoading, run } = useRequest(API.init, {
    onError() {
      setUnauthorizedHistoryPath(location.pathname);
      localStorage.removeItem('token');
      navigate('/login');
    },
    onSuccess(response) {
      setName(response.data.name);
      setInitSuccessTrue();
    },
  });

  const setStudents = useSetRecoilState(connectedStudentsState);
  const { loading: getStudentsLoading } = useRequest(API.getStudents, {
    ready: initSuccess,
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
        teacherName={name}
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
