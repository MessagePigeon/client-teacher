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
import { useAppDispatch, useAppSelector } from '~/state/hooks';
import { nameActions, nameSelector } from '~/state/slices/name.slice';
import { unauthorizedHistoryPathActions } from '~/state/slices/unauthorized-history-path.slice';
import LoadingModal from '../common/components/loading-modal.component';
import { API } from '../http/api';
import { connectStudentsActions } from '../state/slices/connected-students.slice';
import LayoutBase from './base.layout';
import NetworkErrorModal from './components/network-error-modal.component';

const UserLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [initSuccess, { setTrue: setInitSuccessTrue }] = useBoolean();

  const dispatch = useAppDispatch();

  const name = useAppSelector(nameSelector);
  const { loading: initLoading, run } = useRequest(API.init, {
    onError() {
      localStorage.removeItem('token');
      dispatch(unauthorizedHistoryPathActions.set(location.pathname));
      navigate('/login');
    },
    onSuccess(response) {
      dispatch(nameActions.set(response.data.name));
      setInitSuccessTrue();
    },
  });

  const { loading: getStudentsLoading } = useRequest(API.getStudents, {
    ready: initSuccess,
    onSuccess(response) {
      dispatch(connectStudentsActions.set(response.data));
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
