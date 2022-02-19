import { Alert, Backdrop } from '@mui/material';
import { useBoolean, useNetwork, useUpdateEffect } from 'ahooks';
import React from 'react';

const NetworkErrorModal: React.FC = () => {
  const { online } = useNetwork();
  const [shouldRefresh, { set: setShouldRefresh }] = useBoolean();

  useUpdateEffect(() => {
    if (online && shouldRefresh) {
      // refresh page to avoid losing websocket message
      location.reload();
    }
    if (!online) {
      setShouldRefresh(true);
    }
  }, [online, shouldRefresh]);

  return (
    <Backdrop
      open={!online}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 999 }}
    >
      <Alert severity="warning" variant="filled">
        Network Offline
      </Alert>
    </Backdrop>
  );
};

export default NetworkErrorModal;
