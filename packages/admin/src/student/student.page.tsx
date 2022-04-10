import {
  Delete,
  DriveFileRenameOutline,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Alert, Grid, Tab, Typography } from '@mui/material';
import { useBoolean, useRequest, useSet, useUpdateEffect } from 'ahooks';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import TopBottomPagination from '~/common/components/top-bottom-pagination.component';
import UserCard from '~/common/components/user-card.component';
import { PAGE_SIZE } from '~/common/constants';
import { confirmToast } from '~/common/helpers/confirm-toast.helper';
import { API } from '~/http/apis';
import ModifyDialog from './components/dialogs/modify-dialog.component';
import CreateForm from './components/forms/create-form.component';
import SearchForm, {
  defaultSearchParams,
  SearchParams,
} from './components/forms/search-form.component';

const StudentPage: React.FC = () => {
  const [formTab, setFormTab] = useState<'search' | 'create'>('search');

  const [
    showingKeyIds,
    { add: addShowingKeyIds, remove: removeShowingKeyIds },
  ] = useSet<string>();

  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] =
    useState<SearchParams>(defaultSearchParams);
  useUpdateEffect(() => setPage(1), [searchParams]);
  const {
    data: studentsData,
    loading,
    refresh,
  } = useRequest(
    () =>
      API.getStudents({
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        id: searchParams.id || undefined,
        defaultRemark: searchParams.defaultRemark || undefined,
      }),
    { refreshDeps: [page, searchParams] },
  );

  const { run: runDelete } = useRequest(API.deleteStudent, {
    manual: true,
    onSuccess() {
      refresh();
      toast.info('Delete Student Success');
    },
  });

  const [
    isModifyDialogOpen,
    { setTrue: openModifyDialog, setFalse: closeModifyDialog },
  ] = useBoolean();
  const [modifyStudent, setModifyStudent] = useState<{
    id: string;
    oldRemark: string;
  }>({ id: '', oldRemark: '' });

  return (
    <>
      <Alert severity="info" sx={{ mb: 3 }}>
        Click teacher to copy id
      </Alert>

      <TabContext value={formTab}>
        <TabList onChange={(_, newTab) => setFormTab(newTab)} centered>
          <Tab label="Search" value="search" />
          <Tab label="Create" value="create" />
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
        total={studentsData?.data.total}
      >
        <Grid container spacing={2} sx={{ my: 2 }}>
          {studentsData?.data.data.map((student) => (
            <Grid item key={student.id} xs={12} md={6}>
              <UserCard
                id={student.id}
                online={student.online}
                connectedUsers={student.teachers}
                actions={[
                  {
                    tooltip: showingKeyIds.has(student.id)
                      ? 'Hide Key'
                      : 'Show Key',
                    icon: showingKeyIds.has(student.id) ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    ),
                    onClick() {
                      if (showingKeyIds.has(student.id)) {
                        removeShowingKeyIds(student.id);
                      } else {
                        addShowingKeyIds(student.id);
                      }
                    },
                  },
                  {
                    tooltip: 'Modify',
                    icon: <DriveFileRenameOutline />,
                    onClick() {
                      setModifyStudent({
                        id: student.id,
                        oldRemark: student.defaultRemark,
                      });
                      openModifyDialog();
                    },
                  },
                  {
                    tooltip: 'Delete',
                    icon: <Delete />,
                    onClick() {
                      confirmToast(
                        `Are you sure to delete ${student.defaultRemark}`,
                        () => runDelete({ id: student.id }),
                      );
                    },
                  },
                ]}
              >
                <Typography>
                  <strong>Remark:</strong> {student.defaultRemark}
                </Typography>
                <Typography>
                  <strong>Key:</strong>{' '}
                  {showingKeyIds.has(student.id) ? student.key : '●●●●●●●●'}
                </Typography>
              </UserCard>
            </Grid>
          ))}
        </Grid>
      </TopBottomPagination>

      {isModifyDialogOpen && (
        <ModifyDialog
          onClose={closeModifyDialog}
          refresh={refresh}
          {...modifyStudent}
        />
      )}
    </>
  );
};

export default StudentPage;
