import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { indigo, pink } from '@mui/material/colors';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routers from './routers';

const theme = createTheme({ palette: { primary: indigo, secondary: pink } });

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <CssBaseline />
        <Routers />
        <ToastContainer position="top-center" theme="colored" newestOnTop />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
