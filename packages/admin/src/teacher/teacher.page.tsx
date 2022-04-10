import { Delete, DriveFileRenameOutline, Password } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Alert, Grid, Tab, Typography } from '@mui/material';
import { useBoolean, useRequest, useUpdateEffect } from 'ahooks';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import TopBottomPagination from '~/common/components/top-bottom-pagination.component';
import UserCard from '~/common/components/user-card.component';
import { PAGE_SIZE } from '~/common/constants';
import { confirmToast } from '~/common/helpers/confirm-toast.helper';
import { API } from '~/http/apis';
import RenameDialog from './components/dialogs/rename-dialog.component';
import UserNamePasswordDialog from './components/dialogs/username-password-dialog.component';
import CreateForm from './components/forms/create-form.component';
import SearchForm, {
  SearchParams,
} from './components/forms/search-form.component';

const TeacherPage: React.FC = () => {
  const [formTab, setFormTab] = useState<'search' | 'create'>('search');

  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    id: '',
    name: '',
    username: '',
  });
  useUpdateEffect(() => setPage(1), [searchParams]);
  const {
    data: teachersData,
    loading,
    refresh,
  } = useRequest(
    () =>
      API.getTeachers({
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        id: searchParams.id || undefined,
        username: searchParams.username || undefined,
        name: searchParams.name || undefined,
      }),
    { refreshDeps: [page, searchParams] },
  );

  const [
    isResetPasswordSuccessDialogOpen,
    {
      setTrue: openResetPasswordSuccessDialog,
      setFalse: closeResetPasswordSuccessDialog,
    },
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
      refresh();
      toast.info('Delete Teacher Success');
    },
  });

  const [renameTeacher, setRenameTeacher] = useState<{
    id: string;
    oldName: string;
  }>({ id: '', oldName: '' });
  const [
    isRenameDialogOpen,
    { setTrue: openRenameDialog, setFalse: closeRenameDialog },
  ] = useBoolean();

  return (
    <>
      <Alert severity="info" sx={{ mb: 3 }}>
        Click student to copy its id
      </Alert>

      <TabContext value={formTab}>
        <TabList onChange={(_, newTab) => setFormTab(newTab)} centered>
          <Tab label="Search" value="search" />
          <Tab label="Create" value="create" />
        </TabList>
        <TabPanel value="search">
          <SearchForm onChange={setSearchParams} disabled={loading} />
        </TabPanel>
        <TabPanel value="create">
          <CreateForm onSuccess={refresh} />
        </TabPanel>
      </TabContext>

      <TopBottomPagination
        page={page}
        loading={loading}
        onChange={(newPage) => setPage(newPage)}
        total={teachersData?.data.total}
      >
        <Grid container spacing={2} sx={{ my: 2 }}>
          {teachersData?.data.data.map((teacher) => (
            <Grid item key={teacher.id} xs={12} md={6}>
              <UserCard
                id={teacher.id}
                online={teacher.online}
                connectedUsers={teacher.students.map((student) => ({
                  id: student.id,
                  name: student.defaultRemark,
                }))}
                actions={[
                  {
                    tooltip: 'Reset Password',
                    icon: <Password />,
                    onClick() {
                      confirmToast(
                        `Are you sure to reset password for ${teacher.name}`,
                        () => runResetPassword({ id: teacher.id }),
                      );
                    },
                  },
                  {
                    tooltip: 'Modify Name',
                    icon: <DriveFileRenameOutline />,
                    async onClick() {
                      setRenameTeacher({
                        id: teacher.id,
                        oldName: teacher.name,
                      });
                      openRenameDialog();
                    },
                  },
                  {
                    tooltip: 'Delete',
                    icon: <Delete />,
                    onClick() {
                      confirmToast(
                        `Are you sure to delete ${teacher.name}`,
                        () => runDelete({ id: teacher.id }),
                      );
                    },
                  },
                ]}
              >
                <Typography>
                  <strong>Name:</strong> {teacher.name}
                </Typography>
                <Typography>
                  <strong>Username:</strong> {teacher.username}
                </Typography>
              </UserCard>
            </Grid>
          ))}
        </Grid>
      </TopBottomPagination>

      <UserNamePasswordDialog
        open={isResetPasswordSuccessDialogOpen}
        title="Reset Password Success"
        onClose={closeResetPasswordSuccessDialog}
        username={resetPasswordData?.data.username || ''}
        password={resetPasswordData?.data.newPassword || ''}
      />

      {isRenameDialogOpen && (
        <RenameDialog
          open
          onClose={closeRenameDialog}
          id={renameTeacher.id}
          oldName={renameTeacher.oldName}
          refresh={refresh}
        />
      )}
    </>
  );
};

export default TeacherPage;
