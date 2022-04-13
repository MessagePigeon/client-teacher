import { useCheckPhone } from '@mpigeon/client-shared';
import { Alert, Button, Grid } from '@mui/material';
import { useBoolean, useRequest, useUnmount } from 'ahooks';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { API } from '~/http/apis';
import LockableTextField from './components/lockable-text-field.component';
import { LockedIdsContext } from './context/locked-ids.context';

const ConnectionPage: React.FC = () => {
  const { t } = useTranslation();

  const isPhone = useCheckPhone();

  const { lockedIds, setLockedStudentId, setLockedTeacherId } =
    useContext(LockedIdsContext);

  const [isTeacherLocked, { toggle: toggleIsTeacherLocked }] = useBoolean(
    !!lockedIds.teacher,
  );
  const [isStudentLocked, { toggle: toggleIsStudentLocked }] = useBoolean(
    !!lockedIds.student,
  );

  const { control, handleSubmit, resetField, getValues } = useForm({
    defaultValues: {
      teacherId: lockedIds.teacher,
      studentId: lockedIds.student,
    },
  });

  useUnmount(() => {
    if (isTeacherLocked) {
      setLockedTeacherId(getValues('teacherId'));
    } else {
      setLockedTeacherId('');
    }
    if (isStudentLocked) {
      setLockedStudentId(getValues('studentId'));
    } else {
      setLockedStudentId('');
    }
  });

  const { run } = useRequest(API.modifyConnection, {
    manual: true,
    onFinally() {
      if (!isTeacherLocked) resetField('teacherId');
      if (!isStudentLocked) resetField('studentId');
    },
    onSuccess(_, [, action]) {
      if (action === 'connect') {
        toast.success(t('connection.toast.connect-success'));
      } else {
        toast.info(t('connection.toast.disconnect-success'));
      }
    },
  });

  return (
    <>
      <Alert severity="info" sx={{ mb: 3 }}>
        {t('connection.tip')}
      </Alert>
      <Grid container spacing={2} component="form">
        <Grid item xs={12}>
          <Controller
            control={control}
            name="teacherId"
            rules={{ required: true }}
            render={({
              field: { value, onChange },
              fieldState: { invalid },
            }) => (
              <LockableTextField
                value={value}
                onChange={onChange}
                label={t('common.teacher-id')}
                error={invalid}
                isLocked={isTeacherLocked}
                onClickLock={toggleIsTeacherLocked}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="studentId"
            rules={{ required: true }}
            render={({
              field: { value, onChange },
              fieldState: { invalid },
            }) => (
              <LockableTextField
                value={value}
                onChange={onChange}
                label={t('common.student-id')}
                error={invalid}
                isLocked={isStudentLocked}
                onClickLock={toggleIsStudentLocked}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            type="submit"
            variant="contained"
            fullWidth={isPhone}
            onClick={handleSubmit((data) => run(data, 'disconnect'))}
          >
            {t('connection.disconnect')}
          </Button>
        </Grid>
        <Grid item container xs={6} justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            fullWidth={isPhone}
            onClick={handleSubmit((data) => run(data, 'connect'))}
          >
            {t('connection.connect')}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ConnectionPage;
