import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Alert, Grid, Tab } from '@mui/material';
import { useRequest, useUpdateEffect } from 'ahooks';
import React, { useState } from 'react';
import TopBottomPagination from '~/common/components/top-bottom-pagination.component';
import { PAGE_SIZE } from '~/common/constants';
import { API } from '~/http/apis';
import CreateForm from './components/forms/create-form.component';
import SearchForm, {
  SearchParams,
} from './components/forms/search-form.component';
import TeacherCard from './components/teacher-card.component';

const TeacherPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [formTab, setFormTab] = useState<'search' | 'create'>('search');

  const [searchParams, setSearchParams] = useState<SearchParams>({
    id: '',
    name: '',
    username: '',
  });

  const { data, loading, refresh } = useRequest(
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

  useUpdateEffect(() => setPage(1), [searchParams]);

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
        total={data?.data.total}
      >
        <Grid container spacing={2} sx={{ my: 2 }}>
          {data?.data.data.map((teacher) => (
            <Grid item key={teacher.id} xs={12} md={6}>
              <TeacherCard teacher={teacher} onRefresh={refresh} />
            </Grid>
          ))}
        </Grid>
      </TopBottomPagination>
    </>
  );
};

export default TeacherPage;
