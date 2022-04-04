import { useCheckPhone } from '@mpigeon/client-shared';
import { ContentCopy, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useRequest } from 'ahooks';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import TopBottomPagination from '~/common/components/top-bottom-pagination.component';
import { PAGE_SIZE } from '~/common/constants';
import { API } from '~/http/apis';

const RegisterCodePage: React.FC = () => {
  const isPhone = useCheckPhone();

  const [page, setPage] = useState<number>(1);

  const { control, handleSubmit } = useForm({ defaultValues: { count: 1 } });

  const {
    data,
    loading: getLoading,
    refresh: getRefresh,
  } = useRequest(
    () =>
      API.getRegisterCodes({ skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE }),
    {
      refreshDeps: [page],
    },
  );

  const { run: runDelete, loading: deleteLoading } = useRequest(
    API.deleteRegisterCodes,
    {
      manual: true,
      onSuccess() {
        getRefresh();
      },
    },
  );

  const { run: runGenerate, loading: generateLoading } = useRequest(
    API.generateRegisterCodes,
    {
      manual: true,
      onSuccess() {
        getRefresh();
      },
    },
  );

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit((data) => runGenerate(data))}
      >
        <Controller
          control={control}
          name="count"
          render={({ field: { onChange, value } }) => (
            <TextField
              label="Count"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              fullWidth
              onChange={(e) => onChange(+e.target.value)}
              value={value}
            />
          )}
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth={isPhone}
          sx={{ my: 2 }}
          disabled={generateLoading || getLoading}
        >
          Generate
        </Button>
      </Box>
      <TopBottomPagination
        count={Math.ceil((data?.data.total || 0) / PAGE_SIZE)}
        page={page}
        onChange={(newPage) => setPage(newPage)}
        disabled={getLoading}
      >
        <Table>
          <TableBody>
            {data?.data.data.map(({ id, code }) => (
              <TableRow key={id}>
                <TableCell align="left">
                  <Typography
                    noWrap
                    sx={{
                      width: { xs: 180, md: 400 },
                      textOverflow: 'ellipsis',
                      fontFamily: 'monospace',
                    }}
                  >
                    {code}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Copy" arrow placement="left">
                    <IconButton
                      size="small"
                      onClick={async () => {
                        await navigator.clipboard.writeText(code);
                        toast.success('Copy Register Code Success');
                      }}
                      disabled={deleteLoading}
                    >
                      <ContentCopy fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" arrow placement="right">
                    <IconButton
                      size="small"
                      onClick={() => runDelete({ id: `${id}` })}
                      disabled={deleteLoading}
                    >
                      <Delete fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TopBottomPagination>
    </>
  );
};

export default RegisterCodePage;
