import {
  Box,
  Divider,
  IconButton,
  Link,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useBoolean } from 'ahooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CopyableChip from './copyable-chip.component';

type Action = {
  icon: React.ReactElement;
  tooltip: string;
  onClick: () => void;
};

interface UserCardProps {
  id: string;
  online: boolean;
  connectedUsers: Array<{ name: string; id: string }>;
  actions: Action[];
  ban: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  online,
  children,
  connectedUsers,
  actions,
  ban,
}) => {
  const { t } = useTranslation();

  const [isIdCopied, { set: setIsIdCopied }] = useBoolean();

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        borderColor: ban ? 'error.main' : undefined,
      }}
      variant="outlined"
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box>
          <Tooltip
            title={
              isIdCopied
                ? (t('common.copied') as string)
                : (t('common.copy') as string)
            }
            placement="top"
            arrow
          >
            <Link
              color="text.secondary"
              variant="caption"
              component="button"
              onClick={async () => {
                await navigator.clipboard.writeText(id);
                setIsIdCopied(true);
                setTimeout(() => setIsIdCopied(false), 1000);
              }}
            >
              {id}
            </Link>
          </Tooltip>
          <Typography
            color={online ? 'success.main' : 'error.main'}
            variant="caption"
            sx={{ ml: 0.5 }}
          >
            {online ? t('common.online') : t('common.offline')}
          </Typography>
        </Box>
        <Box>{children}</Box>
        {connectedUsers.map((user) => (
          <CopyableChip key={user.id} copyText={user.id}>
            {user.name}
          </CopyableChip>
        ))}
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
      <Stack
        justifyContent="center"
        divider={<Divider flexItem sx={{ my: 0.5 }} />}
      >
        {actions.map(({ tooltip, icon, onClick }, index) => (
          <Tooltip key={index} title={tooltip} placement="right" arrow>
            <IconButton onClick={onClick}>{icon}</IconButton>
          </Tooltip>
        ))}
      </Stack>
    </Paper>
  );
};

export default UserCard;
