import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import React from 'react';
import { API } from '~/http/api';
import { useAppDispatch, useAppSelector } from '~/state/hooks';
import {
  messagesActions,
  messagesCountSelector,
  messagesSelector,
  messagesTotalSelector,
} from '~/state/slices/messages.slice';
import MessageCard from './components/message-card.component';
import { LoadingButton } from '@mui/lab';
import { MoreTime } from '@mui/icons-material';

const History: React.FC = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(messagesSelector);
  const messagesCount = useAppSelector(messagesCountSelector);
  const messagesTotal = useAppSelector(messagesTotalSelector);

  const { loading: getMessagesLoading, run } = useRequest(API.getMessages, {
    manual: true,
    onSuccess(response) {
      dispatch(messagesActions.addMany(response.data.data));
    },
  });

  return (
    <>
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          date={dayjs(message.createdAt).format('dddd YYYY.MM.DD HH:mm:ss')}
          message={message.message}
          studentIds={message.studentIds}
          showingIds={message.showingIds}
        />
      ))}
      {messagesCount < messagesTotal && (
        <LoadingButton
          variant="contained"
          loading={getMessagesLoading}
          loadingPosition="start"
          startIcon={<MoreTime />}
          onClick={() => run({ skip: messagesCount, take: 20 })}
          sx={{ margin: '0 auto', display: 'flex' }}
        >
          Load more
        </LoadingButton>
      )}
    </>
  );
};

export default History;
