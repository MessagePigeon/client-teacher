import { GitHub, Language, Logout } from '@mui/icons-material';
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface HeaderProps {
  title: string;
  github?: string;
  username?: string;
  welcomeText?: string;
  isLogin?: boolean;
  onLogout?: () => void;
  languageMenu?: LanguageMenuItem[];
  currentLanguage?: string;
  onChangeLanguage?: (language: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  github,
  username,
  welcomeText,
  isLogin,
  onLogout,
  languageMenu,
  currentLanguage,
  onChangeLanguage,
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<any>(null);

  return (
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
                sx={{ display: { xs: 'none', md: 'block' } }}
              >
                <GitHub />
              </IconButton>
            )}
          </Box>
          {languageMenu && (
            <>
              <IconButton
                color="inherit"
                edge="end"
                sx={{ mr: 1 }}
                onClick={(event) => setMenuAnchorEl(event.currentTarget)}
              >
                <Language />
              </IconButton>
              <Menu
                id="language-menu"
                open={!!menuAnchorEl}
                onClose={() => setMenuAnchorEl(null)}
                anchorEl={menuAnchorEl}
              >
                {languageMenu.map(({ text, language }) => (
                  <MenuItem
                    key={language}
                    selected={language === currentLanguage}
                    onClick={() => {
                      if (onChangeLanguage && language !== currentLanguage) {
                        onChangeLanguage(language);
                      }
                      setMenuAnchorEl(null);
                    }}
                  >
                    {text}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
          {isLogin && (
            <>
              {username && (
                <Typography
                  variant="subtitle1"
                  sx={{ display: { xs: 'none', md: 'block' } }}
                >
                  {welcomeText}, {username}
                </Typography>
              )}
              <IconButton
                color="inherit"
                edge="end"
                sx={{ display: { xs: 'block', md: 'none' } }}
                onClick={onLogout}
              >
                <Logout />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
