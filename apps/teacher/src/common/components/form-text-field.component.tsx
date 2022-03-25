import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField as MuiTextField,
} from '@mui/material';
import { useBoolean } from 'ahooks';
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

type Rules<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
  RegisterOptions<TFieldValues, TName>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

interface FormTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  label: string;
  control: Control<TFieldValues>;
  rules?: Rules<TFieldValues, TName>;
  defaultHelperText?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  password?: boolean;
  variant?: 'standard' | 'filled' | 'outlined';
  multiline?: boolean;
  rows?: number;
}

const FormTextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  control,
  rules,
  defaultHelperText,
  autoComplete,
  autoFocus,
  password,
  variant,
  multiline,
  rows,
}: FormTextFieldProps<TFieldValues, TName>) => {
  const [showPassword, { toggle: toggleShowPassword }] = useBoolean();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: 'Required', ...rules }}
      render={({ field, fieldState: { invalid, error } }) => (
        <MuiTextField
          margin="normal"
          fullWidth
          label={label}
          id={name}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          error={invalid}
          helperText={invalid ? error?.message : defaultHelperText}
          type={password ? (showPassword ? 'text' : 'password') : undefined}
          variant={variant}
          multiline={multiline}
          rows={rows}
          InputProps={
            password
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : undefined
          }
          {...field}
        />
      )}
    />
  );
};

export default FormTextField;
