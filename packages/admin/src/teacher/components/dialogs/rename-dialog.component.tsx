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
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { API } from '~/http/apis';

interface RenameDialogProps {
  id: string;
  oldName: string;
  onClose: () => void;
  refresh: () => void;
}

const RenameDialog: React.FC<RenameDialogProps> = ({
  id,
  oldName,
  onClose,
  refresh,
}) => {
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm({
    defaultValues: { newName: oldName },
  });

  const { run, loading } = useRequest(API.renameTeacher, {
    manual: true,
    onSuccess() {
      onClose();
      refresh();
      toast.success(t('teacher.toast.rename-success'));
    },
  });

  return (
    <Dialog open onClose={onClose}>
      <form onSubmit={handleSubmit((data) => run({ id, ...data }))}>
        <DialogTitle>{t('teacher.dialog.rename.rename')}</DialogTitle>
        <DialogContent>
          <Controller
            control={control}
            name="newName"
            rules={{ required: true, validate: (value) => value !== oldName }}
            render={({ field, fieldState: { invalid } }) => (
              <TextField
                label={t('teacher.dialog.rename.new-name')}
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
            {t('common.cancel')}
          </Button>
          <Button type="submit" disabled={loading}>
            {t('teacher.dialog.rename.rename')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RenameDialog;
