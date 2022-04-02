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
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import FormTextField from '~/common/components/form-text-field.component';
import { API } from '~/http/apis';
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
  const { t } = useTranslation();

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
      toast.success(t('add-device.toast.edit-success'));
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
          {t('add-device.dialog.edit.title-prefix')}{' '}
          <strong>{oldStudentRemark}</strong>
        </DialogTitle>
        <DialogContent>
          <FormTextField
            control={control}
            name="newRemark"
            autoFocus
            variant="standard"
            label={t('add-device.dialog.edit.label')}
            rules={{
              validate: (value) =>
                !connectedStudents
                  .map(({ remark }) => remark)
                  .includes(value) ||
                (t('add-device.form.remark.error.validate') as string),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t('add-device.dialog.cancel')}</Button>
          <Button type="submit">{t('add-device.dialog.edit.save')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditDialog;
