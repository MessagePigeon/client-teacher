import { Delete, DriveFileRenameOutline, Password } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useBoolean, useRequest } from 'ahooks';
import React from 'react';
import { toast } from 'react-toastify';
import UserCard from '~/common/components/user-card.component';
import { confirmToast } from '~/common/helpers/confirm-toast.helper';
import { API } from '~/http/apis';
import { Teacher } from '~/http/types';
import RenameDialog from './dialogs/rename-dialog.component';
import UserNamePasswordDialog from './dialogs/username-password-dialog.component';

interface TeacherCardProps {
  teacher: Teacher;
  onRefresh: () => void;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, onRefresh }) => {
  const [
    isResetPasswordSuccessDialogOpen,
    {
      setTrue: openResetPasswordSuccessDialog,
      setFalse: closeResetPasswordSuccessDialog,
    },
  ] = useBoolean();
  const [
    isRenameDialogOpen,
    { setTrue: openRenameDialog, setFalse: closeRenameDialog },
  ] = useBoolean();

  const { data: resetPasswordData, run: runResetPassword } = useRequest(
    API.resetTeacherPassword,
    {
      manual: true,
      onSuccess() {
        openResetPasswordSuccessDialog();
      },
    },
  );

  const { run: runDelete } = useRequest(API.deleteTeacher, {
    manual: true,
    onSuccess() {
      onRefresh();
      toast.info('Delete Teacher Success');
    },
  });

  const actions = [
    {
      tooltip: 'Reset Password',
      icon: <Password />,
      onClick() {
        confirmToast(`Are you sure to reset password for ${teacher.name}`, () =>
          runResetPassword({ id: teacher.id }),
        );
      },
    },
    {
      tooltip: 'Modify Name',
      icon: <DriveFileRenameOutline />,
      onClick: openRenameDialog,
    },
    {
      tooltip: 'Delete',
      icon: <Delete />,
      onClick() {
        confirmToast(`Are you sure to delete ${teacher.name}`, () =>
          runDelete({ id: teacher.id }),
        );
      },
    },
  ];

  return (
    <>
      <UserCard
        id={teacher.id}
        online={teacher.online}
        connectedUsers={teacher.students.map((student) => ({
          id: student.id,
          name: student.defaultRemark,
        }))}
        actions={actions}
      >
        <Typography>
          <strong>Name:</strong> {teacher.name}
        </Typography>
        <Typography>
          <strong>Username:</strong> {teacher.username}
        </Typography>
      </UserCard>

      <UserNamePasswordDialog
        open={isResetPasswordSuccessDialogOpen}
        title="Reset Password Success"
        onClose={closeResetPasswordSuccessDialog}
        username={resetPasswordData?.data.username || ''}
        password={resetPasswordData?.data.newPassword || ''}
      />

      <RenameDialog
        open={isRenameDialogOpen}
        onClose={closeRenameDialog}
        id={teacher.id}
        oldName={teacher.name}
        onSuccess={() => {
          toast.success('Rename Success');
          onRefresh();
        }}
      />
    </>
  );
};

export default TeacherCard;
