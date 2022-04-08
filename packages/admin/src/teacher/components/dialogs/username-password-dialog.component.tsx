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
  const [showPassword, { toggle: toggleShowPassword }] = useBoolean();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>
          <strong>Username:</strong> {username}
        </Typography>
        <Typography>
          <strong>Password:</strong> {showPassword ? password : '●●●●●●●●'}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleShowPassword}>
          {showPassword ? 'Hide Password' : 'Show Password'}
        </Button>
        <Button
          onClick={async () => {
            await navigator.clipboard.writeText(password);
          }}
        >
          Copy Password
        </Button>
        <Button
          onClick={async () => {
            await navigator.clipboard.writeText(`${username}\n${password}`);
          }}
        >
          Copy All
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserNamePasswordDialog;
