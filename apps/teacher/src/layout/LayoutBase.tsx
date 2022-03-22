import { GitHub, Logout } from '@mui/icons-material';
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Breakpoint,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

type navigationItem = { title: string; icon: JSX.Element; path: string };

interface LayoutProps {
  /** app bar title */
  title: string;
  /** github repo link, displayed on the app bar as a github button */
  github?: string;
  /** navigation for routers */
  navigation: navigationItem[];
  /** hide navigation drawer (and bottom navigation bar for responsive) */
  hideNavigation?: boolean;
  /** current navigation path (a.k.a. selected navigation item path) */
  currentPath: string;
  /** show username and logout button */
  isLogin?: boolean;
  /** logged in username, show on the right side of app bar */
  username?: string;
  /**
   * main container max width responsive breakpoint
   * @default 'md'
   */
  mainContainerMaxWidth?: Breakpoint;
  /** when click logout button */
  onLogout?: () => void;
  /** when click navigation list item */
  onNavigate: (path: string) => void;
  /**
   * displayed before username
   * @default 'Welcome'
   */
  welcomeText?: string;
  /**
   * logout button text at bottom of drawer
   * @default 'Logout'
   */
  logoutText?: string;
}

const Layout: React.FC<LayoutProps> = ({
  title,
  github,
  navigation,
  hideNavigation,
  currentPath,
  isLogin,
  username,
  mainContainerMaxWidth = 'md',
  onLogout,
  onNavigate,
  logoutText = 'Logout',
  welcomeText = 'Welcome',
  children,
}) => {
  return (
    <>
      <Box component="header" sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ mr: 1 }}>
              {title}
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              {github && (
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={() => {
                    window.open(github);
                  }}
                >
                  <GitHub />
                </IconButton>
              )}
            </Box>
            {isLogin && (
              <>
                {username && (
                  <Typography variant="subtitle1">
                    {welcomeText}, {username}
                  </Typography>
                )}
                <IconButton
                  color="inherit"
                  edge="end"
                  sx={{ ml: 2, display: { xs: 'block', md: 'none' } }}
                  onClick={onLogout}
                >
                  <Logout />
                </IconButton>
              </>
            )}
          </Toolbar>
        </AppBar>
        {!hideNavigation && (
          <Drawer
            variant="permanent"
            sx={{
              width: 200,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: 200,
                boxSizing: 'border-box',
              },
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Toolbar />
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              <List>
                {navigation!.map(({ icon, title, path }, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => onNavigate(path)}
                    selected={path === currentPath}
                    sx={{
                      '&.Mui-selected': {
                        color: 'primary.main',
                        '& .MuiListItemIcon-root': { color: 'primary.main' },
                      },
                    }}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={title} />
                  </ListItemButton>
                ))}
              </List>
              {isLogin && (
                <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
                  <Box sx={{ mx: 1, mb: 2 }}>
                    <Button
                      variant="contained"
                      sx={{ width: '100%' }}
                      onClick={onLogout}
                      startIcon={<Logout />}
                    >
                      {logoutText}
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Drawer>
        )}
      </Box>
      <Container
        component="main"
        maxWidth={mainContainerMaxWidth}
        sx={{ mt: 10, mb: { xs: 10, md: 2 } }}
      >
        {children}
      </Container>
      {!hideNavigation && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            display: { xs: 'block', md: 'none' },
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={currentPath}
            onChange={(_, newPath) => {
              onNavigate(newPath);
            }}
          >
            {navigation!.map(({ title, icon, path }, index) => (
              <BottomNavigationAction
                key={index}
                label={title}
                icon={icon}
                value={path}
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}
    </>
  );
};

interface LayoutBaseProps {
  navigation: navigationItem[];
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
      title="飞鸽传书"
      isLogin={isLogin}
      username={`${teacherName}老师`}
      github="https://github.com/MessagePigeon/client-teacher"
      onNavigate={navigate}
      currentPath={navCurrentPath}
      onLogout={logout}
      logoutText="退出登录"
      welcomeText="欢迎您"
      mainContainerMaxWidth={mainContainerMaxWidth}
    >
      <Outlet />
    </Layout>
  );
};

export default LayoutBase;
