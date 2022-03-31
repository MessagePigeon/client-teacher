import {
  Devices,
  ForwardToInbox,
  History,
  ManageAccountsOutlined,
} from '@mui/icons-material';
import { useBoolean, useRequest } from 'ahooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '~/state/hooks';
import { nameActions, nameSelector } from '~/state/slices/name.slice';
import { unauthorizedHistoryPathActions } from '~/state/slices/unauthorized-history-path.slice';
import { useAppWebsocket } from '~/websocket/use-app-websocket.hook';
import LoadingModal from '../common/components/loading-modal.component';
import { API } from '../http/api';
import LayoutBase from './base.layout';
import NetworkErrorModal from './components/network-error-modal.component';
import { useInitUserData } from './helpers/init-user-data.helper';

const UserLayout: React.FC = () => {
  const { t } = useTranslation();

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

  const { loading: initUserDataLoading } = useInitUserData({
    ready: initSuccess,
  });

  useAppWebsocket({ ready: initSuccess });

  return (
    <>
      <LayoutBase
        navigation={[
          {
            title: t('layout.navigation.user.send-message'),
            icon: <ForwardToInbox />,
            path: 'send-message',
          },
          {
            title: t('layout.navigation.user.history'),
            icon: <History />,
            path: 'history',
          },
          {
            title: t('layout.navigation.user.add-device'),
            icon: <Devices />,
            path: 'add-device',
          },
          {
            title: t('layout.navigation.user.settings'),
            icon: <ManageAccountsOutlined />,
            path: 'settings',
          },
        ]}
        isLogin
        logout={() => {
          localStorage.removeItem('token');
          navigate('/login');
          toast.info(t('layout.toast.logout'));
        }}
        teacherName={name}
        navigate={(path) => {
          run();
          navigate(path);
        }}
      />
      <NetworkErrorModal />
      <LoadingModal open={initLoading || initUserDataLoading} />
    </>
  );
};

export default UserLayout;
