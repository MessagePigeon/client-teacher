import { Done } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { useBoolean } from 'ahooks';
import React from 'react';

interface CopyableChipProps {
  copyValue: string;
  children: string;
}

const CopyableChip: React.FC<CopyableChipProps> = ({ copyValue, children }) => {
  const [isCopied, { set: setIsCopied }] = useBoolean();

  return (
    <Chip
      label={children}
      size="small"
      sx={{ mr: 0.5, mt: 0.5 }}
      icon={isCopied ? <Done /> : undefined}
      onClick={async () => {
        await navigator.clipboard.writeText(copyValue);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
      }}
    />
  );
};

export default CopyableChip;
