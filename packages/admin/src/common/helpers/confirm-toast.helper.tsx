import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Content: React.FC<{ text: string; onConfirm: () => void }> = ({
  text,
  onConfirm,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography color="inherit" fontWeight="bold">
        {text}
      </Typography>
      <Box my={1} ml={1}>
        <Button color="inherit" variant="outlined" size="small">
          {t('common.no')}
        </Button>
        <Button
          color="inherit"
          variant="outlined"
          onClick={onConfirm}
          size="small"
          sx={{ ml: 1 }}
        >
          {t('common.yes')}
        </Button>
      </Box>
    </>
  );
};

export function confirmToast(text: string, onConfirm: () => void) {
  toast.warn(<Content text={text} onConfirm={onConfirm} />);
}
