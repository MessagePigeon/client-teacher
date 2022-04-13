import { Person } from '@mui/icons-material';
import { Alert, Paper, Typography } from '@mui/material';
import { useRequest, useUpdateEffect } from 'ahooks';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CopyableChip from '~/common/components/copyable-chip.component';
import TopBottomPagination from '~/common/components/top-bottom-pagination.component';
import { PAGE_SIZE } from '~/common/constants';
import { API } from '~/http/apis';
import SearchForm, {
  defaultSearchParams,
  SearchParams,
} from './components/search-form.component';

const MessagePage: React.FC = () => {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] =
    useState<SearchParams>(defaultSearchParams);

  const { data, loading } = useRequest(
    () =>
      API.getMessages({
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        teacherId: searchParams.teacherId || undefined,
        studentId: searchParams.studentId || undefined,
        startTime: searchParams.startTime || undefined,
        endTime: searchParams.endTime || undefined,
        message: searchParams.message || undefined,
      }),
    { refreshDeps: [searchParams, page] },
  );

  useUpdateEffect(() => setPage(1), [searchParams]);

  return (
    <>
      <Alert severity="info" sx={{ mb: 3 }}>
        {t('message.tip')}
      </Alert>

      <SearchForm onChange={setSearchParams} loading={loading} />

      <TopBottomPagination
        total={data?.data.total}
        page={page}
        onChange={setPage}
        loading={loading}
      >
        {data?.data.data.map((message) => (
          <Paper key={message.id} variant="outlined" sx={{ p: 1.5, my: 1 }}>
            <Typography color="text.secondary" variant="body2">
              <strong>ID:{message.id}</strong>{' '}
              {dayjs(message.createdAt).format('YYYY.MM.DD HH:mm:ss')}
            </Typography>
            <CopyableChip
              copyText={message.teacher.id}
              defaultIcon={<Person />}
            >
              {message.teacher.name}
            </CopyableChip>
            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
              {message.message}
            </Typography>
            {message.students.map((student) => (
              <CopyableChip key={student.id} copyText={student.id}>
                {student.defaultRemark}
              </CopyableChip>
            ))}
          </Paper>
        ))}
      </TopBottomPagination>
    </>
  );
};

export default MessagePage;
