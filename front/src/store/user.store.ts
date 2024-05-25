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
  user: IUser;
  setUser: (newUser: IUser) => void;
}

export const useUserStore = create<CounterState>((set) => ({
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set(() => ({ user }));
  },
}));
