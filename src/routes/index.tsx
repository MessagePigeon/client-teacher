import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import UserLayout from '../layout/UserLayout';
import AddDevice from '../pages/add-device';
import History from '../pages/history';
import Login from '../pages/login';
import PersonalSettings from '../pages/personal-settings';
import Register from '../pages/register';
import SendMessage from '../pages/send-message';

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="send-message" element={<SendMessage />} />
        <Route path="history" element={<History />} />
        <Route path="add-device" element={<AddDevice />} />
        <Route path="personal-settings" element={<PersonalSettings />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default Routers;
