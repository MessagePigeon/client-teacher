import { MoreTime } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { API } from '~/http/apis';
import { useAppDispatch, useAppSelector } from '~/state/hooks';
import {
  messagesActions,
  messagesCountSelector,
  messagesSelector,
  messagesTotalSelector,
} from '~/state/slices/messages.slice';
import MessageCard from './components/message-card.component';

const HistoryPage: React.FC = () => {
  const { t } = useTranslation();

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

  if (messages.length === 0) {
    return (
      <Typography align="center" color="text.secondary" variant="h4">
        {t('history.empty')}
      </Typography>
    );
  }

  return (
    <>
      {messages.map((message) => {
        const createdDate = dayjs(message.createdAt);
        const day = (t('history.week', { returnObjects: true }) as string[])[
          createdDate.day()
        ];
        const time = dayjs(message.createdAt).format('YYYY.MM.DD HH:mm:ss');
        const date = `${day} ${time}`;
        return <MessageCard key={message.id} {...message} date={date} />;
      })}
      {messagesCount < messagesTotal && (
        <LoadingButton
          variant="contained"
          loading={getMessagesLoading}
          loadingPosition="start"
          startIcon={<MoreTime />}
          onClick={() => run({ skip: messagesCount, take: 20 })}
          sx={{ margin: '0 auto', display: 'flex' }}
        >
          {t('history.load-more')}
        </LoadingButton>
      )}
    </>
  );
};

export default HistoryPage;
