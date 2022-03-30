import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './layout/auth.layout';
import UserLayout from './layout/user.layout';
import Login from './auth/login.page';
import Register from './auth/register.page';
import Index from './index/index.page';
import AddDevice from './add-device/add-device.page';
import History from './history/history.page';
import Settings from './settings/settings.page';
import SendMessage from './send-message/send-message.page';

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<Index />} />
      <Route element={<UserLayout />}>
        <Route path="send-message" element={<SendMessage />} />
        <Route path="history" element={<History />} />
        <Route path="add-device" element={<AddDevice />} />
        <Route path="add-device/:connectCode" element={<AddDevice />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default Routers;
