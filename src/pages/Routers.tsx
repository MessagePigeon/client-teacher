import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import UserLayout from '../layout/UserLayout';
import Login from './auth/Login';
import Register from './auth/Register';
import Index from './Index';
import AddDevice from './user/add-device';
import History from './user/history';
import PersonalSettings from './user/personal-settings';
import SendMessage from './user/send-message';

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<Index />} />
      <Route element={<UserLayout />}>
        <Route path="send-message" element={<SendMessage />} />
        <Route path="history" element={<History />} />
        <Route path="add-device" element={<AddDevice />} />
        <Route path="personal-settings" element={<PersonalSettings />} />
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
