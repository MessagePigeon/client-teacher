import { GitHub, Logout } from '@mui/icons-material';
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
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
import React, { ReactNode, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

type navigationItem = { title: string; icon: JSX.Element; path: string };

interface LayoutBaseProps {
  navigation: navigationItem[];
  isLogin?: boolean;
  logout?: () => void;
  teacherName?: string;
  MainContainer: React.FC<{ children: ReactNode }>;
}

const LayoutBase: React.FC<LayoutBaseProps> = ({
  navigation,
  isLogin,
  logout,
  teacherName,
  MainContainer,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [navCurrentPath, setNavCurrentPath] = useState<string>('');

  useEffect(() => {
    // slice `/path` to `path`
    setNavCurrentPath(location.pathname.slice(1));
  }, [location]);

  return (
    <>
      <Box component="header" sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ mr: 1 }}>
              飞鸽传书
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <IconButton
                color="inherit"
                edge="end"
                onClick={() => {
                  window.open('https://github.com/MessagePigeon');
                }}
              >
                <GitHub />
              </IconButton>
            </Box>
            {isLogin && (
              <>
                <Typography variant="subtitle1">
                  欢迎您, {teacherName}老师
                </Typography>
                <IconButton
                  color="inherit"
                  edge="end"
                  sx={{ ml: 2, display: { xs: 'block', md: 'none' } }}
                  onClick={logout}
                >
                  <Logout />
                </IconButton>
              </>
            )}
          </Toolbar>
        </AppBar>
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
              {navigation.map(({ icon, title, path }, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => navigate(path)}
                  selected={path === navCurrentPath}
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
                    onClick={logout}
                    startIcon={<Logout />}
                  >
                    退出登录
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Drawer>
      </Box>
      <MainContainer>
        <Outlet />
      </MainContainer>
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
          value={navCurrentPath}
          onChange={(_, newPath) => {
            navigate(newPath);
          }}
        >
          {navigation.map(({ title, icon, path }, index) => (
            <BottomNavigationAction
              key={index}
              label={title}
              icon={icon}
              value={path}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default LayoutBase;
