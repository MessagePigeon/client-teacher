import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ConnectionPage from './connection/connection.page';
import IndexPage from './index/index.page';
import AdminLayout from './layout/admin.layout';
import LoginLayout from './layout/login.layout';
import LoginPage from './login/login.page';
import MessagePage from './message/message.page';
import StudentPage from './student/student.page';
import TeacherPage from './teacher/teacher.page';
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
        <Route path="message" element={<MessagePage />} />
        <Route path="teacher" element={<TeacherPage />} />
        <Route path="student" element={<StudentPage />} />
        <Route path="connection" element={<ConnectionPage />} />
      </Route>
    </Routes>
  );
};

export default Routers;
