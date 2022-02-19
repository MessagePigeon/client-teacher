import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { indigo, pink } from '@mui/material/colors';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routers from './pages/Routers';
import { RecoilRoot } from 'recoil';

const theme = createTheme({ palette: { primary: indigo, secondary: pink } });

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routers />
        <ToastContainer position="top-center" theme="colored" newestOnTop />
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
