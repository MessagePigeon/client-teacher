import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './index/index.page';
import AdminLayout from './layout/admin.layout';
import LoginLayout from './layout/login.layout';
import LoginPage from './login/login.page';
import WelcomePage from './welcome/welcome.page';

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<IndexPage />} />
      <Route element={<LoginLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="welcome" element={<WelcomePage />} />
      </Route>
    </Routes>
  );
};

export default Routers;
