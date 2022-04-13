import { LockOpenOutlined, LockOutlined } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  OutlinedTextFieldProps,
  TextField,
} from '@mui/material';
import React from 'react';

interface LockableTextFieldProps extends Partial<OutlinedTextFieldProps> {
  isLocked: boolean;
  onClickLock: () => void;
}

const LockableTextField: React.FC<LockableTextFieldProps> = ({
  isLocked,
  onClickLock,
  ...props
}) => {
  return (
    <TextField
      {...props}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onClickLock}>
              {isLocked ? <LockOutlined /> : <LockOpenOutlined />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default LockableTextField;
