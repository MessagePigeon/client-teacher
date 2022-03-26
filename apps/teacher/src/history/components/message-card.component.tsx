import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '~/state/hooks';
import { connectedStudentsSelector } from '~/state/slices/connected-students.slice';

interface MessageCardProps {
  date: string;
  message: string;
  studentIds: string[];
  showingIds: string[];
}

const MessageCard: React.FC<MessageCardProps> = ({
  date,
  message,
  studentIds,
  showingIds,
}) => {
  const connectedStudents = useAppSelector(connectedStudentsSelector);
  const studentsStatus = studentIds
    .map((id) => {
      const remark = connectedStudents.find(
        (connectedStudent) => connectedStudent.id === id,
      )?.remark;
      const showing = showingIds.includes(id);
      return { remark, showing };
    })
    .filter(({ remark }) => !!remark);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14, mt: 1 }} color="text.secondary">
          {date}
        </Typography>
        <Typography sx={{ my: 1, whiteSpace: 'pre-wrap' }}>
          {message}
        </Typography>
        <Stack direction="row" flexWrap="wrap">
          {studentsStatus.map(({ remark, showing }, index) => (
            <Chip
              key={index}
              label={remark}
              color={showing ? 'success' : 'default'}
              sx={{ mb: 0.5, mr: 1 }}
              size="small"
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
