import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useRequest, useUpdateEffect } from 'ahooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FormTextField from '~/common/components/form-text-field.component';
import { API } from '~/http/api';
import { useAppDispatch, useAppSelector } from '~/state/hooks';
import {
  connectedStudentsSelector,
  connectedStudentsActions,
} from '~/state/slices/connected-students.slice';

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

  const connectedStudents = useAppSelector(connectedStudentsSelector);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: { newRemark: '' },
  });

  useUpdateEffect(() => {
    setValue('newRemark', oldStudentRemark);
  }, [oldStudentRemark]);

  const { run } = useRequest(API.modifyStudentRemark, {
    manual: true,
    onSuccess(_, [body]) {
      dispatch(
        connectedStudentsActions.modifyRemark({
          id: studentId,
          newRemark: body.newRemark,
        }),
      );
      toast.success('Modify Remark Success');
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <form
        onSubmit={handleSubmit(({ newRemark }) => {
          run({ studentId, newRemark });
          onClose();
        })}
      >
        <DialogTitle>
          Edit <strong>{oldStudentRemark}</strong>
        </DialogTitle>
        <DialogContent>
          <FormTextField
            control={control}
            name="newRemark"
            autoFocus
            variant="standard"
            label="New Remark"
            rules={{
              validate: (value) =>
                !connectedStudents
                  .map(({ remark }) => remark)
                  .includes(value) || 'Remark duplicate',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditDialog;
