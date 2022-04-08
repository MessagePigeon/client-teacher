import { Box, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';

export function confirmToast(text: string, onConfirm: () => void) {
  toast.warn(
    <div>
      <Typography color="inherit" fontWeight="bold">
        {text}
      </Typography>
      <Box my={1} ml={1}>
        <Button color="inherit" variant="outlined" size="small">
          No
        </Button>
        <Button
          color="inherit"
          variant="outlined"
          onClick={onConfirm}
          size="small"
          sx={{ ml: 1 }}
        >
          Yes
        </Button>
      </Box>
    </div>,
  );
}
