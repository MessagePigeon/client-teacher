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
        mb: { xs: 10, md: 2 },
        minHeight: { xs: 'calc(100vh - 160px)', md: 0 },
        pl: { md: 30, lg: 0 },
      }}
    >
      {children}
    </Container>
  );
};

export default MainContainer;
