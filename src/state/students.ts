import { atom } from 'recoil';

type Student = { id: string; online: boolean; remark: string };

export const connectedStudentsState = atom<Student[]>({
  key: 'connectedStudents',
  default: [],
});
