import { Delete, DriveFileRenameOutline, Password } from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  Link,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useBoolean, useRequest } from 'ahooks';
import React from 'react';
import { toast } from 'react-toastify';
import CopyableChip from '~/common/components/copyable-chip.component';
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
  const [isIdCopied, { set: setIsIdCopied }] = useBoolean();
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

  return (
    <Paper sx={{ p: 2, display: 'flex' }} variant="outlined">
      <Box sx={{ flexGrow: 1 }}>
        <Box>
          <Tooltip
            title={isIdCopied ? 'Copied!' : 'Copy'}
            placement="top"
            arrow
          >
            <Link
              color="text.secondary"
              variant="caption"
              component="button"
              onClick={async () => {
                await navigator.clipboard.writeText(teacher.id);
                setIsIdCopied(true);
                setTimeout(() => setIsIdCopied(false), 1000);
              }}
            >
              {teacher.id}
            </Link>
          </Tooltip>
          <Typography
            color={teacher.online ? 'success.main' : 'error.main'}
            variant="caption"
            sx={{ ml: 0.5 }}
          >
            {teacher.online ? 'Online' : 'Offline'}
          </Typography>
        </Box>
        <Box>
          <Typography>
            <strong>Name:</strong> {teacher.name}
          </Typography>
          <Typography>
            <strong>Username:</strong> {teacher.username}
          </Typography>
        </Box>
        {teacher.students.map((student) => (
          <CopyableChip key={student.id} copyValue={student.id}>
            {student.defaultRemark}
          </CopyableChip>
        ))}
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
      <Stack
        justifyContent="center"
        divider={<Divider flexItem sx={{ my: 0.5 }} />}
      >
        <Tooltip title="Reset Password" placement="right" arrow>
          <IconButton
            onClick={() => {
              confirmToast(
                `Are you sure to reset password for ${teacher.name}`,
                () => runResetPassword({ id: teacher.id }),
              );
            }}
          >
            <Password />
          </IconButton>
        </Tooltip>
        <Tooltip title="Modify name" placement="right" arrow>
          <IconButton onClick={openRenameDialog}>
            <DriveFileRenameOutline />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement="right" arrow>
          <IconButton
            onClick={() => {
              confirmToast(`Are you sure to delete ${teacher.name}`, () =>
                runDelete({ id: teacher.id }),
              );
            }}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </Stack>
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
    </Paper>
  );
};

export default TeacherCard;
