import { Box, Checkbox, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

interface CheckBoxAndNumberFieldInSentenceProps {
  beforeText: string;
  afterText: string;
  onChange: (value: number) => void;
  defaultValue: number;
  maxValue: number;
}

const CheckBoxAndNumberFieldInSentence: React.FC<
  CheckBoxAndNumberFieldInSentenceProps
> = ({ beforeText, afterText, onChange, defaultValue, maxValue }) => {
  const [fieldNumber, setFieldNumber] = useState<number>(defaultValue);
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <Box sx={{ my: 2 }}>
      <Box sx={{ display: 'inline-flex' }}>
        <Checkbox
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            if (e.target.checked) {
              onChange(fieldNumber);
            } else {
              onChange(0);
            }
          }}
        />
        <Typography
          color={(theme) =>
            checked ? theme.palette.text.primary : theme.palette.text.secondary
          }
          component="div"
        >
          <div style={{ display: 'inline-block', paddingTop: 10 }}>
            {beforeText}
          </div>
          <TextField
            variant="standard"
            sx={{
              mx: 1,
              width: 50,
            }}
            type="number"
            value={fieldNumber}
            onChange={(e) => {
              setFieldNumber(+e.target.value);
              if (checked) {
                onChange(+e.target.value);
              }
            }}
            inputProps={{ min: 0, max: maxValue }}
            disabled={!checked}
          />
          <div style={{ display: 'inline-block', paddingTop: 10 }}>
            {afterText}
          </div>
        </Typography>
      </Box>
    </Box>
  );
};

export default CheckBoxAndNumberFieldInSentence;
