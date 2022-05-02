import { Alert, Backdrop } from '@mui/material';
import { useBoolean, useNetwork, useUpdateEffect } from 'ahooks';
import React from 'react';
import { useTranslation } from 'react-i18next';

const NetworkErrorModal: React.FC = () => {
  const { t } = useTranslation();

  const { online } = useNetwork();
  const [shouldRefresh, { setTrue: setShouldRefreshTrue }] = useBoolean();

  useUpdateEffect(() => {
    if (online && shouldRefresh) {
      // refresh page to avoid losing websocket message
      location.reload();
    }
    if (!online) {
      setShouldRefreshTrue();
    }
  }, [online, shouldRefresh]);

  return (
    <Backdrop
      open={!online}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 999 }}
    >
      <Alert severity="warning" variant="filled">
        {t('layout.network-offline')}
      </Alert>
    </Backdrop>
  );
};

export default NetworkErrorModal;
