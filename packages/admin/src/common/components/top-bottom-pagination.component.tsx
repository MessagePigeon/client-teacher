import { CircularProgress, Grid, Pagination } from '@mui/material';
import React from 'react';
import { PAGE_SIZE } from '../constants';

interface TopBottomPaginationProps {
  total?: number;
  page: number;
  onChange: (newPage: number) => void;
  loading: boolean;
}

const TopBottomPagination: React.FC<TopBottomPaginationProps> = ({
  total,
  page,
  onChange,
  loading,
  children,
}) => {
  const count = Math.ceil((total || 0) / PAGE_SIZE);

  return (
    <>
      <Grid container justifyContent="center">
        <Pagination
          count={count}
          page={page}
          onChange={(_, newPage) => onChange(newPage)}
          disabled={loading}
        />
      </Grid>
      {loading ? (
        <Grid container justifyContent="center" sx={{ my: 8 }}>
          <CircularProgress />
        </Grid>
      ) : (
        children
      )}
      <Grid container justifyContent="center">
        <Pagination
          count={count}
          page={page}
          onChange={(_, newPage) => {
            onChange(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          disabled={loading}
        />
      </Grid>
    </>
  );
};

export default TopBottomPagination;
