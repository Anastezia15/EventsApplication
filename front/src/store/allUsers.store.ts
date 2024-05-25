import { create } from "zustand";

interface IUser {
  username: string;
  email: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  password: string;
  id: string;
  role: string;
}

interface CounterState {
  allUsers: IUser[];
  setUser: (allUsers: IUser[]) => void;
}

export const useAllUsersStore = create<CounterState>((set) => ({
  allUsers: [],
  setUser: (allUsers) => {
    set(() => ({ allUsers }));
  },
}));
