import { Chip, Paper, Stack, Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import React from 'react';
import { API } from '~/http/apis';
import { useAppDispatch, useAppSelector } from '~/state/hooks';
import { connectedStudentsSelector } from '~/state/slices/connected-students.slice';
import { messagesActions } from '~/state/slices/messages.slice';

interface MessageCardProps {
  messageId: number;
  date: string;
  message: string;
  studentIds: string[];
  showingIds: string[];
}

const MessageCard: React.FC<MessageCardProps> = ({
  messageId,
  date,
  message,
  studentIds,
  showingIds,
}) => {
  const dispatch = useAppDispatch();
  const connectedStudents = useAppSelector(connectedStudentsSelector);

  const studentsStatus = studentIds
    .map((id) => {
      const remark = connectedStudents.find(
        (connectedStudent) => connectedStudent.id === id,
      )?.remark;
      const showing = showingIds.includes(id);
      return { remark, showing, id };
    })
    .filter(({ remark }) => !!remark);

  const { run, loading: closeMessageLoading } = useRequest(API.closeMessage, {
    manual: true,
    onSuccess(_, [body]) {
      dispatch(messagesActions.close(body));
    },
  });

  return (
    <Paper sx={{ p: 2, mb: 1 }}>
      <Typography sx={{ fontSize: 14 }} color="text.secondary">
        {date}
      </Typography>
      <Typography sx={{ my: 1, whiteSpace: 'pre-wrap' }}>{message}</Typography>
      <Stack direction="row" flexWrap="wrap">
        {studentsStatus.map(({ remark, showing, id }) => (
          <Chip
            key={id}
            label={remark}
            color={showing ? 'success' : 'default'}
            sx={{ mt: 0.5, mr: 1 }}
            size="small"
            onDelete={
              showing ? () => run({ messageId, studentId: id }) : undefined
            }
            disabled={showing && closeMessageLoading}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default MessageCard;
