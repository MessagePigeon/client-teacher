import { useCheckPhone } from '@mpigeon/client-shared';
import { Clear } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useRequest, useUpdateEffect } from 'ahooks';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { API } from '~/http/apis';
import DateTimePicker from './components/date-time-picker.component';

type Teacher = Record<'id' | 'name', string>;
type Student = Record<'id' | 'defaultRemark', string>;
type SearchParams = Record<'teacherId' | 'studentId' | 'startTime' | 'endTime', string>;

const MessagePage: React.FC = () => {
  const isPhone = useCheckPhone();
  const [pageSize, setPageSize] = useState<number>(25);
  const [page, setPage] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    teacherId: '',
    studentId: '',
    startTime: '',
    endTime: '',
  });

  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  const { control, handleSubmit, reset, setValue, resetField, watch } = useForm<SearchParams>({
    defaultValues: {
      teacherId: '',
      studentId: '',
      startTime: null,
      endTime: null,
    },
  });
  const formStartTime = watch('startTime');
  const formEndTime = watch('endTime');

  const { data, run, loading } = useRequest(API.getMessages, {
    defaultParams: [{ skip: page * pageSize, take: pageSize }],
  });

  useUpdateEffect(() => {
    const { teacherId, studentId, startTime, endTime } = searchParams;
    run({ skip: page * pageSize, take: pageSize, teacherId, studentId, startTime, endTime });
  }, [pageSize, page, searchParams]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 180,
      valueFormatter: params => dayjs(params.value as string).format('YYYY.MM.DD HH:mm:ss'),
    },
    { field: 'message', headerName: 'Message', width: 300 },
    {
      field: 'teacher',
      headerName: 'Teacher',
      renderCell: (params: GridRenderCellParams<Teacher>) => (
        <Link component="button" onClick={() => setValue('teacherId', params.value.id)}>
          {params.value.name}
        </Link>
      ),
    },
    {
      field: 'students',
      headerName: 'Students',
      minWidth: 200,
      renderCell: (params: GridRenderCellParams<Student[]>) =>
        params.value.map(student => (
          <Chip
            key={student.id}
            label={student.defaultRemark}
            size="small"
            sx={{ mr: 0.3 }}
            onClick={() => {
              setValue('studentId', student.id);
            }}
          />
        )),
    },
  ];

  return (
    <>
      <Alert severity="info" sx={{ mb: 3 }}>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>
            When you select a row in the table, the full message will be displayed at the bottom
          </li>
          <li>Click teacher or student to set search id</li>
        </ul>
      </Alert>
      <Grid container spacing={2} component="form" mb={3} onSubmit={handleSubmit(setSearchParams)}>
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
                      <IconButton
                        onClick={() => {
                          resetField('teacherId');
                        }}
                      >
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
                      <IconButton
                        onClick={() => {
                          resetField('studentId');
                        }}
                      >
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
                onChange={onChange}
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
                onChange={onChange}
                minDate={formStartTime ? formStartTime! : undefined}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth={isPhone} variant="contained" color="secondary" onClick={reset}>
            Reset
          </Button>
        </Grid>
        <Grid item container xs={6} justifyContent="flex-end">
          <Button fullWidth={isPhone} type="submit" variant="contained">
            Search
          </Button>
        </Grid>
      </Grid>

      <DataGrid
        loading={loading}
        rows={data?.data.data || []}
        columns={columns.map(data => ({ ...data, sortable: false }))}
        autoHeight
        disableColumnMenu
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        rowCount={data?.data.total || 0}
        page={page}
        onPageChange={setPage}
        scrollbarSize={20}
        onSelectionModelChange={newSelectionModel => {
          setSelectedId(newSelectionModel[0] as number | undefined);
        }}
      />

      {selectedId && (
        <Paper sx={{ mt: 3, p: 2 }} variant="outlined">
          <Typography variant="caption" color="text.secondary" mb={2}>
            Full Message
          </Typography>
          <Box sx={{ whiteSpace: 'pre-wrap' }}>
            {data?.data.data.find(({ id }) => id === selectedId)?.message}
          </Box>
        </Paper>
      )}
    </>
  );
};

export default MessagePage;
