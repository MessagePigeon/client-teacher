import { useCheckPhone } from '@mpigeon/client-shared';
import { Person } from '@mui/icons-material';
import {
  Alert,
  Button,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useRequest, useUpdateEffect } from 'ahooks';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TopBottomPagination from '~/common/components/top-bottom-pagination.component';
import { PAGE_SIZE } from '~/common/constants';
import { API } from '~/http/apis';
import DateTimePicker from './components/date-time-picker.component';

type SearchParams = {
  teacherId: string;
  studentId: string;
  startTime: string | null;
  endTime: string | null;
  message: string;
};

const defaultSearchParam: SearchParams = {
  teacherId: '',
  studentId: '',
  startTime: null,
  endTime: null,
  message: '',
};

const MessagePage: React.FC = () => {
  const isPhone = useCheckPhone();

  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] =
    useState<SearchParams>(defaultSearchParam);

  const { control, handleSubmit, reset, watch, setValue } =
    useForm<SearchParams>({
      defaultValues: defaultSearchParam,
    });
  const formStartTime = watch('startTime');
  const formEndTime = watch('endTime');

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
        Click teacher or student to set search id
      </Alert>

      <Grid
        container
        spacing={2}
        component="form"
        mb={3}
        onSubmit={handleSubmit((data) => setSearchParams(data))}
      >
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="teacherId"
            render={({ field }) => (
              <TextField label="Teacher ID" fullWidth {...field} />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="studentId"
            render={({ field }) => (
              <TextField label="Student ID" fullWidth {...field} />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="startTime"
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                label="Start Time"
                value={value}
                onChange={(newDate) => onChange(newDate)}
                maxDate={formEndTime || undefined}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="endTime"
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                label="End Time"
                value={value}
                onChange={(newDate) => onChange(newDate)}
                minDate={formStartTime || undefined}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="message"
            render={({ field }) => (
              <TextField label="Message" fullWidth multiline {...field} />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth={isPhone}
            variant="contained"
            color="secondary"
            onClick={() => reset()}
          >
            Reset
          </Button>
        </Grid>
        <Grid item container xs={6} justifyContent="flex-end">
          <Button
            fullWidth={isPhone}
            type="submit"
            variant="contained"
            disabled={loading}
          >
            Search
          </Button>
        </Grid>
      </Grid>

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
            <Chip
              label={message.teacher.name}
              icon={<Person />}
              size="small"
              sx={{ my: 1 }}
              onClick={() => setValue('teacherId', message.teacher.id)}
            />
            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
              {message.message}
            </Typography>
            {message.students.map((student) => (
              <Chip
                key={student.id}
                label={student.defaultRemark}
                size="small"
                sx={{ mr: 0.5, mt: 0.5 }}
                onClick={() => setValue('studentId', student.id)}
              />
            ))}
          </Paper>
        ))}
      </TopBottomPagination>
    </>
  );
};

export default MessagePage;
