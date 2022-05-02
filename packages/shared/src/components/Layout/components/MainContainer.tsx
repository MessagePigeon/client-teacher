import { Breakpoint, Container } from '@mui/material';
import React from 'react';

const MainContainer: React.FC<{ maxWidth?: Breakpoint }> = ({
  children,
  maxWidth,
}) => {
  return (
    <Container
      component="main"
      maxWidth={maxWidth}
      sx={{
        mt: 10,
        mb: { xs: 10, lg: 2 },
        minHeight: { xs: 'calc(100vh - 160px)', lg: 0 },
      }}
    >
      {children}
    </Container>
  );
};

export default MainContainer;
