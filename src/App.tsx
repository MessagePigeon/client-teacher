import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { indigo, pink } from '@mui/material/colors';
import React from 'react';
import Routers from './routes';

const theme = createTheme({ palette: { primary: indigo, secondary: pink } });

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
};

export default App;
