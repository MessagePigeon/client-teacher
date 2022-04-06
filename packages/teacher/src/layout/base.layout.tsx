import { Layout, NavigationItem } from '@mpigeon/client-shared';
import { Breakpoint } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LayoutBaseProps {
  navigation: NavigationItem[];
  isLogin?: boolean;
  logout?: () => void;
  teacherName?: string;
  navigate: (path: string) => void;
  mainContainerMaxWidth?: Breakpoint;
}

const LayoutBase: React.FC<LayoutBaseProps> = ({
  navigation,
  navigate,
  isLogin,
  logout,
  teacherName,
  mainContainerMaxWidth,
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
      navigation={navigation}
      title={t('layout.title')}
      isLogin={isLogin}
      username={teacherName}
      github="https://github.com/MessagePigeon/client-teacher"
      onNavigate={navigate}
      currentPath={navCurrentPath}
      onLogout={logout}
      mainContainerMaxWidth={mainContainerMaxWidth}
      welcomeText={t('layout.welcome')}
      logoutText={t('layout.logout')}
      languageMenu={[
        { text: '中文', language: 'zh' },
        { text: 'English', language: 'en' },
      ]}
      onChangeLanguage={(language) => i18n.changeLanguage(language)}
      currentLanguage={i18n.language}
    >
      <Outlet />
    </Layout>
  );
};

export default LayoutBase;
