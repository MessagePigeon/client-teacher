import { Block, DriveFileRenameOutline, Password } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Alert, Grid, Tab, Typography } from '@mui/material';
import { useBoolean, useRequest, useUpdateEffect } from 'ahooks';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  defaultSearchParams,
  SearchParams,
} from './components/forms/search-form.component';

const TeacherPage: React.FC = () => {
  const { t } = useTranslation();

  const [formTab, setFormTab] = useState<'search' | 'create'>('search');

  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] =
    useState<SearchParams>(defaultSearchParams);
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

  const { run: runBan } = useRequest(API.banTeacher, {
    manual: true,
    onSuccess(_, [body]) {
      toast.info(
        body.ban
          ? t('teacher.toast.ban-success')
          : t('teacher.toast.unban-success'),
      );
      refresh();
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
        {t('teacher.tip')}
      </Alert>

      <TabContext value={formTab}>
        <TabList onChange={(_, newTab) => setFormTab(newTab)} centered>
          <Tab label={t('common.search')} value="search" />
          <Tab label={t('common.create')} value="create" />
        </TabList>
        <TabPanel value="search">
          <SearchForm onChange={setSearchParams} loading={loading} />
        </TabPanel>
        <TabPanel value="create">
          <CreateForm refresh={refresh} />
        </TabPanel>
      </TabContext>

      <TopBottomPagination
        page={page}
        loading={loading}
        onChange={setPage}
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
                ban={teacher.ban}
                actions={[
                  {
                    tooltip: t('teacher.actions.reset-password'),
                    icon: <Password />,
                    onClick() {
                      confirmToast(
                        t('teacher.toast.reset-password-confirm', {
                          name: teacher.name,
                        }),
                        () => runResetPassword({ id: teacher.id }),
                      );
                    },
                  },
                  {
                    tooltip: t('teacher.actions.modify-name'),
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
                    tooltip: teacher.ban ? t('common.unban') : t('common.ban'),
                    icon: <Block />,
                    onClick() {
                      runBan({ id: teacher.id, ban: !teacher.ban });
                    },
                  },
                ]}
              >
                <Typography>
                  <strong>{t('teacher.name')}:</strong> {teacher.name}
                </Typography>
                <Typography>
                  <strong>{t('teacher.username')}:</strong> {teacher.username}
                </Typography>
              </UserCard>
            </Grid>
          ))}
        </Grid>
      </TopBottomPagination>

      <UserNamePasswordDialog
        open={isResetPasswordSuccessDialogOpen}
        title={t('teacher.dialog.username-password.title.reset')}
        onClose={closeResetPasswordSuccessDialog}
        username={resetPasswordData?.data.username || ''}
        password={resetPasswordData?.data.newPassword || ''}
      />

      {isRenameDialogOpen && (
        <RenameDialog
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
