import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps,
} from '@mui/material';
import { useBoolean } from 'ahooks';
import {
  Control,
  Controller,
  FieldPath,
  FieldValues as HookFormFieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Rules<
  FieldValues extends HookFormFieldValues = HookFormFieldValues,
  Name extends FieldPath<FieldValues> = FieldPath<FieldValues>,
> = Omit<
  RegisterOptions<FieldValues, Name>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

type FormTextFieldProps<
  FieldValues extends HookFormFieldValues = HookFormFieldValues,
  Name extends FieldPath<FieldValues> = FieldPath<FieldValues>,
> = {
  name: Name;
  control: Control<FieldValues>;
  rules?: Rules<FieldValues, Name>;
  defaultHelperText?: string;
  password?: boolean;
} & TextFieldProps;

const FormTextField = <
  FieldValues extends HookFormFieldValues = HookFormFieldValues,
  Name extends FieldPath<FieldValues> = FieldPath<FieldValues>,
>({
  name,
  control,
  rules,
  defaultHelperText,
  password,
  ...props
}: FormTextFieldProps<FieldValues, Name>) => {
  const { t } = useTranslation();

  const [showPassword, { toggle: toggleShowPassword }] = useBoolean();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: t('components.form-text-field.required') as string,
        ...rules,
      }}
      render={({ field, fieldState: { invalid, error } }) => (
        <MuiTextField
          {...props}
          margin="normal"
          fullWidth
          id={name}
          error={invalid}
          helperText={invalid ? error?.message : defaultHelperText}
          type={password ? (showPassword ? 'text' : 'password') : undefined}
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
