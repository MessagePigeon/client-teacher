import { toast } from 'react-toastify';
import { connectStudentsActions } from '~/state/slices/connected-students.slice';
import { pendingStudentsActions } from '~/state/slices/pending-students.slice';
import { store } from '~/state/store';

let state: ReturnType<typeof store.getState>;
store.subscribe(() => {
  state = store.getState();
});

export const websocketEvents = {
  'student-online': ({ studentId }: { studentId: string }) => {
    store.dispatch(connectStudentsActions.setOnline({ id: studentId }));
  },
  'student-offline': ({ studentId }: { studentId: string }) => {
    store.dispatch(connectStudentsActions.setOffline({ id: studentId }));
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
    store.dispatch(connectStudentsActions.add({ id, remark, online: true }));
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
      connectStudentsActions.add({ id: studentId, remark, online }),
    );
  },
  'student-disconnect-by-admin': ({ studentId }: { studentId: string }) => {
    store.dispatch(connectStudentsActions.delete({ id: studentId }));
  },
};
