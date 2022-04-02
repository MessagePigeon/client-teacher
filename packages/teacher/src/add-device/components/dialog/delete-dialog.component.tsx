import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { API } from '~/http/apis';
import { useAppDispatch } from '~/state/hooks';
import { connectedStudentsActions } from '~/state/slices/connected-students.slice';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  studentId: string;
  studentRemark: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  onClose,
  studentId,
  studentRemark,
}) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { run } = useRequest(API.deleteStudent, {
    manual: true,
    onSuccess() {
      dispatch(connectedStudentsActions.delete({ id: studentId }));
      toast.info(t('add-device.toast.delete-success'));
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {t('add-device.dialog.delete.title-prefix')}{' '}
        <strong>{studentRemark}</strong> ?
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>{t('add-device.dialog.cancel')}</Button>
        <Button
          onClick={() => {
            run(studentId);
            onClose();
          }}
        >
          {t('add-device.dialog.delete.delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
