import { atom } from 'recoil';

export const nameState = atom<string>({ key: 'name', default: '' });
