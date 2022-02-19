import { atom } from 'recoil';

type Student = { online: boolean; studentId: string; remark: string };

export const students = atom<Student[]>({ key: 'students', default: [] });
