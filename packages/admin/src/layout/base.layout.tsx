import { Layout, NavigationItem } from '@mpigeon/client-shared';
import { Breakpoint } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
  const location = useLocation();
  const [navCurrentPath, setNavCurrentPath] = useState<string>('');
  useEffect(() => {
    // get `aaa` from `/aaa/bbb`
    setNavCurrentPath(location.pathname.split('/')[1]);
  }, [location]);

  return (
    <Layout
      title="Message Pigeon Admin"
      username="Admin"
      github="https://github.com/MessagePigeon/client-teacher"
      navigation={navigation}
      isLogin={isLogin}
      onNavigate={onNavigate}
      currentPath={navCurrentPath}
      onLogout={onLogout}
      mainContainerMaxWidth={mainContainerMaxWidth}
      hideNavigation={hideNavigation}
    >
      <Outlet />
    </Layout>
  );
};

export default LayoutBase;
