import { Done } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { useBoolean } from 'ahooks';
import React from 'react';

interface CopyableChipProps {
  copyText: string;
  children: string;
  defaultIcon?: React.ReactElement;
}

const CopyableChip: React.FC<CopyableChipProps> = ({
  copyText,
  children,
  defaultIcon,
}) => {
  const [isCopied, { set: setIsCopied }] = useBoolean();

  return (
    <Chip
      label={children}
      size="small"
      sx={{ mr: 0.5, mt: 0.5 }}
      icon={isCopied ? <Done /> : defaultIcon}
      onClick={async () => {
        await navigator.clipboard.writeText(copyText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
      }}
    />
  );
};

export default CopyableChip;
