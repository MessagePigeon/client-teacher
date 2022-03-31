import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddDevicePage from './add-device/add-device.page';
import LoginPage from './auth/login.page';
import RegisterPage from './auth/register.page';
import HistoryPage from './history/history.page';
import IndexPage from './index/index.page';
import AuthLayout from './layout/auth.layout';
import UserLayout from './layout/user.layout';
import SendMessagePage from './send-message/send-message.page';
import SettingsPage from './settings/settings.page';

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<IndexPage />} />
      <Route element={<UserLayout />}>
        <Route path="send-message" element={<SendMessagePage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="add-device" element={<AddDevicePage />} />
        <Route path="add-device/:connectCode" element={<AddDevicePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="" element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default Routers;
