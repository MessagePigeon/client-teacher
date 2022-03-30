import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

interface LoadingModalProps {
  open: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ open }) => {
  return (
    <Backdrop
      open={open}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 888, color: '#fff' }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingModal;
