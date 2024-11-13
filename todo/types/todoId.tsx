import { atom } from 'recoil';

export const lastTodoId = atom<number>({
    key: "lastTodoId",
    default: 0,
});