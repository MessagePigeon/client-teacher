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
import React from 'react';

export type NavigationItem = { title: string; icon: JSX.Element; path: string };

export interface LayoutProps {
  /** app bar title */
  title: string;
  /** github repo link, displayed on the app bar as a github button */
  github?: string;
  /** navigation for routers */
  navigation: NavigationItem[];
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
  /**
   * @default 220
   */
  drawerWidth?: number;
}

export const Layout: React.FC<LayoutProps> = ({
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
  drawerWidth = 220,
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
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
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
      )}
    </>
  );
};
