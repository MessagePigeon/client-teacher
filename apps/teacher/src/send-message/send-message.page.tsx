import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank,
} from '@mui/icons-material';
import { Autocomplete, Button, Checkbox, TextField } from '@mui/material';
import { useRequest, useUpdateEffect } from 'ahooks';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormTextField from '~/common/components/form-text-field.component';
import { useCheckPhone } from '~/common/hooks/use-check-phone.hook';
import { API } from '~/http/api';
import { onlineStudentsSelector } from '~/state/slices/connected-students.slice';
import CheckBoxAndNumberFieldInSentence from './components/checkbox-and-number-field-in-sentence.component';

const SendMessage: React.FC = () => {
  const isPhone = useCheckPhone();

  const onlineStudents = useSelector(onlineStudentsSelector);

  const { control, handleSubmit, setValue, watch } = useForm<{
    studentIds: string[];
    message: string;
    tts: number;
    closeDelay: number;
  }>({ defaultValues: { studentIds: [], message: '', tts: 0, closeDelay: 0 } });

  // Delete the selected user if it is offline
  const watchStudentIds = watch('studentIds');
  useUpdateEffect(() => {
    watchStudentIds.forEach((studentId, index) => {
      const isStudentOnline = onlineStudents
        .map(({ id }) => id)
        .includes(studentId);
      if (!isStudentOnline) {
        setValue('studentIds', [
          ...watchStudentIds.slice(0, index),
          ...watchStudentIds.slice(index + 1),
        ]);
      }
    });
  }, [onlineStudents]);

  const { run } = useRequest(API.sendMessage, {
    manual: true,
    onSuccess(response) {
      console.log(response.data);
      toast.success('Send Message Success');
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        run(data);
        // Reset
        setValue('studentIds', []);
        setValue('message', '');
      })}
    >
      <Controller
        name="studentIds"
        control={control}
        rules={{ required: 'Required' }}
        render={({
          field: { onChange, value },
          fieldState: { invalid, error },
        }) => (
          <Autocomplete
            multiple
            // Prevent Mui warnings caused by undefined options when the user is selected offline
            options={[...onlineStudents, undefined]}
            renderOption={(props, option, { selected }) =>
              option && (
                <li {...props}>
                  <Checkbox
                    icon={<CheckBoxOutlineBlank fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option?.remark}
                </li>
              )
            }
            disableCloseOnSelect
            getOptionLabel={(option) => option?.remark || ''}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Devices"
                error={invalid}
                helperText={invalid && error?.message}
              />
            )}
            noOptionsText="Devices Not Found"
            onChange={(_, values) =>
              onChange(values.map((student) => student?.id))
            }
            value={
              value.map((selectedId) =>
                onlineStudents.find(({ id }) => id === selectedId),
              )!
            }
          />
        )}
      />
      <FormTextField
        control={control}
        name="message"
        label="Message"
        multiline
        rows={5}
      />
      <Controller
        control={control}
        name="tts"
        render={({ field: { onChange } }) => (
          <CheckBoxAndNumberFieldInSentence
            beforeText="Voice broadcast"
            afterText="times"
            onChange={onChange}
            defaultValue={3}
            maxValue={30}
          />
        )}
      />
      <Controller
        control={control}
        name="closeDelay"
        render={({ field: { onChange } }) => (
          <CheckBoxAndNumberFieldInSentence
            beforeText="Message can be closed after"
            afterText="seconds"
            onChange={onChange}
            defaultValue={10}
            maxValue={3600}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth={isPhone}
        sx={{ mt: 1, display: 'block' }}
      >
        Send
      </Button>
    </form>
  );
};

export default SendMessage;
