import { useRequest } from 'ahooks';
import { API } from '~/http/api';
import { useAppDispatch } from '~/state/hooks';
import { connectedStudentsActions } from '~/state/slices/connected-students.slice';
import { messagesActions } from '~/state/slices/messages.slice';

export function useInitUserData({ ready }: { ready: boolean }) {
  const dispatch = useAppDispatch();

  const { loading: getStudentsLoading } = useRequest(API.getStudents, {
    ready,
    onSuccess(response) {
      dispatch(connectedStudentsActions.set(response.data));
    },
  });

  const { loading: getMessagesLoading } = useRequest(API.getMessages, {
    ready,
    defaultParams: [{ skip: 0, take: 20 }],
    onSuccess(response) {
      dispatch(messagesActions.set(response.data.data));
      dispatch(messagesActions.setTotal(response.data.total));
    },
  });

  const loading = getStudentsLoading || getMessagesLoading;
  return { loading };
}
