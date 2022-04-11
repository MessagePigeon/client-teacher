import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useBoolean } from 'ahooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface UserNamePasswordDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  username: string;
  password: string;
}

const UserNamePasswordDialog: React.FC<UserNamePasswordDialogProps> = ({
  title,
  open,
  onClose,
  username,
  password,
}) => {
  const { t } = useTranslation();

  const [showPassword, { toggle: toggleShowPassword }] = useBoolean();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>
          <strong>{t('teacher.username')}:</strong> {username}
        </Typography>
        <Typography>
          <strong>{t('common.password')}:</strong>{' '}
          {showPassword ? password : '●●●●●●●●'}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleShowPassword}>
          {showPassword
            ? t('teacher.dialog.username-password.hide-password')
            : t('teacher.dialog.username-password.show-password')}
        </Button>
        <Button
          onClick={async () => {
            await navigator.clipboard.writeText(password);
            toast.info(t('teacher.toast.copy-password-success'));
          }}
        >
          {t('teacher.dialog.username-password.copy-password')}
        </Button>
        <Button
          onClick={async () => {
            await navigator.clipboard.writeText(`${username}\n${password}`);
            toast.info(t('teacher.toast.copy-all-success'));
          }}
        >
          {t('teacher.dialog.username-password.copy-all')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserNamePasswordDialog;
