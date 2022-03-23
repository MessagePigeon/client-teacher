import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { toast } from 'react-toastify';
import { API } from '~/http/api';
import { useAppDispatch } from '~/state/hooks';
import { deleteConnectedStudent } from '~/state/slices/connected-students.slice';

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
      dispatch(deleteConnectedStudent({ id: studentId }));
      toast.success('Delete Student Success');
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>确认删除 {studentRemark} 吗?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button
          onClick={() => {
            run(studentId);
            onClose();
          }}
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
