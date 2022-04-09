import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { API } from '~/http/apis';

interface RenameDialogProps {
  open: boolean;
  id: string;
  oldName: string;
  onClose: () => void;
  refresh: () => void;
}

const RenameDialog: React.FC<RenameDialogProps> = ({
  open,
  id,
  oldName,
  onClose,
  refresh,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { newName: oldName },
  });

  const { run, loading } = useRequest(API.renameTeacher, {
    manual: true,
    onSuccess() {
      onClose();
      refresh();
      toast.success('Rename Success');
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit((data) => run({ id, ...data }))}>
        <DialogTitle>Rename</DialogTitle>
        <DialogContent>
          <Controller
            control={control}
            name="newName"
            rules={{ required: true, validate: (value) => value !== oldName }}
            render={({ field, fieldState: { invalid } }) => (
              <TextField
                label="New Name"
                variant="standard"
                error={invalid}
                fullWidth
                {...field}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            Rename
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RenameDialog;
