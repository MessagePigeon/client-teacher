import { toast } from 'react-toastify';
import { connectedStudentsActions } from '~/state/slices/connected-students.slice';
import { messagesActions } from '~/state/slices/messages.slice';
import { pendingStudentsActions } from '~/state/slices/pending-students.slice';
import { store } from '~/state/store';

let state: ReturnType<typeof store.getState>;
store.subscribe(() => {
  state = store.getState();
});

export const websocketEvents = {
  'student-online': ({ studentId }: { studentId: string }) => {
    store.dispatch(connectedStudentsActions.setOnline({ id: studentId }));
  },
  'student-offline': ({ studentId }: { studentId: string }) => {
    store.dispatch(connectedStudentsActions.setOffline({ id: studentId }));
  },
  'reject-connect-request': ({ requestId }: { requestId: string }) => {
    const { remark } = state.pendingStudents.students.find(
      ({ requestId: originRequestId }) => originRequestId === requestId,
    )!;
    store.dispatch(pendingStudentsActions.remove({ requestId }));
    toast.warn(`${remark} Reject Connection`);
  },
  'accept-connect-request': ({ requestId }: { requestId: string }) => {
    const { studentId: id, remark } = state.pendingStudents.students.find(
      ({ requestId: originRequestId }) => originRequestId === requestId,
    )!;
    store.dispatch(pendingStudentsActions.remove({ requestId }));
    store.dispatch(connectedStudentsActions.add({ id, remark, online: true }));
    toast.success(`${remark} Accept Connection`);
  },
  'student-connect-by-admin': ({
    studentId,
    remark,
    online,
  }: {
    studentId: string;
    remark: string;
    online: boolean;
  }) => {
    store.dispatch(
      connectedStudentsActions.add({ id: studentId, remark, online }),
    );
  },
  'student-disconnect-by-admin': ({ studentId }: { studentId: string }) => {
    store.dispatch(connectedStudentsActions.delete({ id: studentId }));
  },
  logout: () => {
    localStorage.removeItem('token');
    location.reload();
  },
  'message-close': (data: { messageId: number; studentId: string }) => {
    store.dispatch(messagesActions.close(data));
  },
};
