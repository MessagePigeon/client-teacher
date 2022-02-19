import { atom } from 'recoil';

type Student = { id: string; online: boolean; remark: string };

export const studentsState = atom<Student[]>({ key: 'students', default: [] });
