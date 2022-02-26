import { atom } from 'recoil';

export type ConnectedStudent = { id: string; online: boolean; remark: string };

export const connectedStudentsState = atom<ConnectedStudent[]>({
  key: 'connectedStudents',
  default: [],
});

export type PendingStudent = { requestId: string; remark: string };

export const pendingStudentsState = atom<PendingStudent[]>({
  key: 'pendingStudents',
  default: [],
});
