import { Breakpoint } from '@mui/material';
import React from 'react';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import MainContainer from './components/MainContainer';
import SideNav from './components/SideNav';

export type NavigationItem = { title: string; icon: JSX.Element; path: string };

export type LanguageMenuItem = { text: string; language: string };

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
  onNavigate?: (path: string) => void;
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
  /** i18n language change button and menu in app bar */
  languageMenu?: LanguageMenuItem[];
  /** when click language menu item */
  onChangeLanguage?: (language: string) => void;
  /** `language` field in language menu item */
  currentLanguage?: string;
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
  languageMenu,
  onChangeLanguage,
  currentLanguage,
  children,
}) => {
  return (
    <>
      <Header
        {...{
          title,
          github,
          isLogin,
          username,
          onLogout,
          welcomeText,
          languageMenu,
          currentLanguage,
          onChangeLanguage,
        }}
      />
      {!hideNavigation && (
        <SideNav
          {...{
            drawerWidth,
            navigation,
            onNavigate,
            currentPath,
            isLogin,
            onLogout,
            logoutText,
          }}
        />
      )}
      <MainContainer maxWidth={mainContainerMaxWidth}>{children}</MainContainer>
      {!hideNavigation && (
        <BottomNav {...{ currentPath, onNavigate, navigation }} />
      )}
    </>
  );
};
