import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { indigo, pink } from '@mui/material/colors';
import { useTitle } from 'ahooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routers from './routers';

const theme = createTheme({ palette: { primary: indigo, secondary: pink } });

const App: React.FC = () => {
  const { t } = useTranslation();

  useTitle(t('layout.title'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routers />
      <ToastContainer position="top-center" theme="colored" newestOnTop />
    </ThemeProvider>
  );
};

export default App;
