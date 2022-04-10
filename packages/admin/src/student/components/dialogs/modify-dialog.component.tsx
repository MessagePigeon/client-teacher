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

interface ModifyDialogProps {
  id: string;
  oldRemark: string;
  onClose: () => void;
  refresh: () => void;
}

const ModifyDialog: React.FC<ModifyDialogProps> = ({
  id,
  oldRemark,
  onClose,
  refresh,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { defaultRemark: oldRemark, key: '' },
  });

  const { run, loading } = useRequest(API.modifyStudent, {
    manual: true,
    onSuccess() {
      onClose();
      refresh();
      toast.success('Modify Student Success');
    },
  });

  return (
    <Dialog open onClose={onClose}>
      <form
        onSubmit={handleSubmit((data) => {
          if (data.defaultRemark === oldRemark && !data.key) return onClose();
          run({
            id,
            defaultRemark:
              data.defaultRemark === oldRemark ? undefined : data.defaultRemark,
            key: data.key || undefined,
          });
        })}
      >
        <DialogTitle>Modify</DialogTitle>
        <DialogContent>
          <Controller
            control={control}
            name="defaultRemark"
            render={({ field }) => (
              <TextField
                label="Remark"
                variant="standard"
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="key"
            render={({ field }) => (
              <TextField
                label="Key"
                variant="standard"
                fullWidth
                sx={{ mt: 1 }}
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
            Modify
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ModifyDialog;
