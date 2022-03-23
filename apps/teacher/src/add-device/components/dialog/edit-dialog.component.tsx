import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useRequest, useUpdateEffect } from 'ahooks';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { API } from '~/http/api';
import { useAppDispatch } from '~/state/hooks';
import { connectStudentsActions } from '~/state/slices/connected-students.slice';

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  studentId: string;
  oldStudentRemark: string;
}

const EditDialog: React.FC<EditDialogProps> = ({
  open,
  onClose,
  studentId,
  oldStudentRemark,
}) => {
  const dispatch = useAppDispatch();

  const [newRemark, setNewRemark] = useState<string>('');
  useUpdateEffect(() => {
    setNewRemark(oldStudentRemark);
  }, [oldStudentRemark]);

  const { run } = useRequest(API.modifyStudentRemark, {
    manual: true,
    onSuccess() {
      dispatch(connectStudentsActions.editRemark({ id: studentId, newRemark }));
      toast.success('Modify Remark Success');
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>编辑 {oldStudentRemark}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="新备注"
          id="newRemark"
          value={newRemark}
          onChange={(event) => setNewRemark(event.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button
          onClick={() => {
            run({ studentId, newRemark });
            onClose();
          }}
          disabled={newRemark === '' || newRemark === oldStudentRemark}
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
