import { Grid, Pagination } from '@mui/material';
import React from 'react';

interface TopBottomPaginationProps {
  count: number;
  page: number;
  onChange: (newPage: number) => void;
  disabled: boolean;
}

const TopBottomPagination: React.FC<TopBottomPaginationProps> = ({
  count,
  page,
  onChange,
  disabled,
  children,
}) => {
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
