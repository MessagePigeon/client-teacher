import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { toast } from 'react-toastify';
import { API } from '~/http/api';
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
  const dispatch = useAppDispatch();

  const { run } = useRequest(API.deleteStudent, {
    manual: true,
    onSuccess() {
      dispatch(connectedStudentsActions.delete({ id: studentId }));
      toast.success('Delete Student Success');
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Are you sure you want to delete <strong>{studentRemark}</strong> ?
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            run(studentId);
            onClose();
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
