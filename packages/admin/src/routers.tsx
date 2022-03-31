import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginLayout from './layout/login.layout';
import Login from './login/login.page';

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route element={<LoginLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default Routers;
