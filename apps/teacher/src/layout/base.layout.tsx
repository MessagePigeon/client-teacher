import { Layout, NavigationItem } from '@mpigeon/client-components';
import { Breakpoint } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const [navCurrentPath, setNavCurrentPath] = useState<string>('');
  useEffect(() => {
    // get `aaa` from `/aaa/bbb`
    setNavCurrentPath(location.pathname.split('/')[1]);
  }, [location]);

  return (
    <Layout
      navigation={navigation}
      title="Message Pigeon"
      isLogin={isLogin}
      username={`${teacherName}`}
      github="https://github.com/MessagePigeon/client-teacher"
      onNavigate={navigate}
      currentPath={navCurrentPath}
      onLogout={logout}
      mainContainerMaxWidth={mainContainerMaxWidth}
    >
      <Outlet />
    </Layout>
  );
};

export default LayoutBase;
