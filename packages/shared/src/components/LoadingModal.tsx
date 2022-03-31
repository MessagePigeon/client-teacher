import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

export const LoadingModal: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <Backdrop
      open={open}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 888, color: '#fff' }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
