import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import React from 'react';
import { NavigationItem } from '../Layout';

interface BottomNavProps {
  currentPath: string;
  onNavigate?: (path: string) => void;
  navigation: NavigationItem[];
}

const BottomNav: React.FC<BottomNavProps> = ({
  currentPath,
  onNavigate,
  navigation,
}) => {
  return (
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
          onNavigate && onNavigate(newPath);
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
  );
};

export default BottomNav;
