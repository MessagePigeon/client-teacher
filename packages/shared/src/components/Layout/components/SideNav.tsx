import { Logout } from '@mui/icons-material';
import {
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import React from 'react';
import { NavigationItem } from '../Layout';

interface SideNavProps {
  drawerWidth?: number;
  navigation: NavigationItem[];
  onNavigate?: (path: string) => void;
  currentPath: string;
  isLogin?: boolean;
  onLogout?: () => void;
  logoutText?: string;
}

const SideNav: React.FC<SideNavProps> = ({
  drawerWidth,
  navigation,
  onNavigate,
  currentPath,
  isLogin,
  onLogout,
  logoutText,
}) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        display: { xs: 'none', lg: 'block' },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
        component="aside"
      >
        <List>
          {navigation.map(({ icon, title, path }, index) => (
            <ListItemButton
              key={index}
              onClick={() => onNavigate && onNavigate(path)}
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
  );
};

export default SideNav;
