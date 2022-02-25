import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { API } from '../../../../../services/api';
import { connectedStudentsState } from '../../../../../state/students';
import getDeleteArrayByIndex from '../../../../../utils/getDeleteArrayByIndex';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  studentId: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  onClose,
  studentId,
}) => {
  const [students, setStudents] = useRecoilState(connectedStudentsState);

  const student = students.find(({ id }) => id === studentId);

  const { run } = useRequest(API.deleteStudent, {
    manual: true,
    onSuccess() {
      const index = students.findIndex(({ id }) => id === studentId);
      setStudents(getDeleteArrayByIndex(students, index));
      toast.success('Delete Student Success');
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>确认删除 {student?.remark} 吗?</DialogTitle>
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
