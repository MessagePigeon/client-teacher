import { Layout, NavigationItem } from '@mpigeon/client-shared';
import { Breakpoint } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';

interface LayoutBaseProps {
  navigation: NavigationItem[];
  isLogin?: boolean;
  onLogout?: () => void;
  onNavigate?: (path: string) => void;
  mainContainerMaxWidth?: Breakpoint;
  hideNavigation?: boolean;
}

const LayoutBase: React.FC<LayoutBaseProps> = ({
  navigation,
  isLogin,
  onLogout,
  onNavigate,
  mainContainerMaxWidth,
  hideNavigation,
}) => {
  const { t, i18n } = useTranslation();

  const location = useLocation();
  const [navCurrentPath, setNavCurrentPath] = useState('');
  useEffect(() => {
    // get `aaa` from `/aaa/bbb`
    setNavCurrentPath(location.pathname.split('/')[1]);
  }, [location]);

  return (
    <Layout
      title={t('layout.title')}
      username={t('layout.username')}
      github="https://github.com/MessagePigeon/client-teacher"
      navigation={navigation}
      isLogin={isLogin}
      onNavigate={onNavigate}
      currentPath={navCurrentPath}
      onLogout={onLogout}
      mainContainerMaxWidth={mainContainerMaxWidth}
      hideNavigation={hideNavigation}
      welcomeText={t('layout.welcome')}
      logoutText={t('layout.logout')}
      languageMenu={[
        { text: '中文', language: 'zh' },
        { text: 'English', language: 'en' },
      ]}
      onChangeLanguage={i18n.changeLanguage}
      currentLanguage={i18n.language}
    >
      <Outlet />
    </Layout>
  );
};

export default LayoutBase;
