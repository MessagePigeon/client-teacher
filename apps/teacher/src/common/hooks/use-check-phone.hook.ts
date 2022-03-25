import { Theme, useMediaQuery } from '@mui/material';

export function useCheckPhone() {
  return useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
}
