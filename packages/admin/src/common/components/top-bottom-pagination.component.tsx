import { Grid, Pagination } from '@mui/material';
import React from 'react';
import { PAGE_SIZE } from '../constants';

interface TopBottomPaginationProps {
  total?: number;
  page: number;
  onChange: (newPage: number) => void;
  disabled: boolean;
}

const TopBottomPagination: React.FC<TopBottomPaginationProps> = ({
  total,
  page,
  onChange,
  disabled,
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
          disabled={disabled}
        />
      </Grid>
      {children}
      <Grid container justifyContent="center">
        <Pagination
          count={count}
          page={page}
          onChange={(_, newPage) => {
            onChange(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          disabled={disabled}
        />
      </Grid>
    </>
  );
};

export default TopBottomPagination;
