import { useCheckPhone } from '@mpigeon/client-shared';
import { Clear, Person } from '@mui/icons-material';
import {
  Alert,
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useRequest, useUpdateEffect } from 'ahooks';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PAGE_SIZE } from '~/common/constants';
import { API } from '~/http/apis';
import DateTimePicker from './components/date-time-picker.component';

type SearchParams = {
  teacherId: string;
  studentId: string;
  startTime: string | null;
  endTime: string | null;
};

const MessagePage: React.FC = () => {
  const isPhone = useCheckPhone();

  const [page, setPage] = useState<number>(1);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    teacherId: '',
    studentId: '',
    startTime: null,
    endTime: null,
  });

  const { control, handleSubmit, reset, resetField, watch, setValue } =
    useForm<SearchParams>({
      defaultValues: {
        teacherId: '',
        studentId: '',
        startTime: null,
        endTime: null,
      },
    });
  const formStartTime = watch('startTime');
  const formEndTime = watch('endTime');

  const { run, data, loading } = useRequest(API.getMessages, {
    defaultParams: [{ skip: 0, take: PAGE_SIZE }],
  });

  useUpdateEffect(() => {
    run({
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      teacherId: searchParams.teacherId ? searchParams.teacherId : undefined,
      studentId: searchParams.studentId ? searchParams.studentId : undefined,
      startTime: searchParams.startTime ? searchParams.startTime : undefined,
      endTime: searchParams.endTime ? searchParams.endTime : undefined,
    });
  }, [page, searchParams]);

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
              <TextField
                label="Teacher ID"
                fullWidth
                InputProps={{
                  endAdornment: field.value ? (
                    <InputAdornment position="end">
                      <IconButton onClick={() => resetField('teacherId')}>
                        <Clear />
                      </IconButton>
                    </InputAdornment>
                  ) : undefined,
                }}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="studentId"
            render={({ field }) => (
              <TextField
                label="Student ID"
                fullWidth
                InputProps={{
                  endAdornment: field.value ? (
                    <InputAdornment position="end">
                      <IconButton onClick={() => resetField('studentId')}>
                        <Clear />
                      </IconButton>
                    </InputAdornment>
                  ) : undefined,
                }}
                {...field}
              />
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
                maxDate={formEndTime ? formEndTime! : undefined}
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
                minDate={formStartTime ? formStartTime! : undefined}
              />
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
          <Button fullWidth={isPhone} type="submit" variant="contained">
            Search
          </Button>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" mb={2}>
        <Pagination
          count={Math.floor((data?.data.total || 0) / PAGE_SIZE)}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          disabled={loading}
        />
      </Grid>

      {data?.data.data.map((message) => (
        <Paper key={message.id} variant="outlined" sx={{ p: 1.5, mb: 1 }}>
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

      <Grid container justifyContent="center">
        <Pagination
          count={Math.floor((data?.data.total || 0) / PAGE_SIZE)}
          page={page}
          onChange={(_, newPage) => {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          disabled={loading}
        />
      </Grid>
    </>
  );
};

export default MessagePage;
