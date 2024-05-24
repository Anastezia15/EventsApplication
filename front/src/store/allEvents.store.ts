import { create } from "zustand";
import { IEvent } from "../components/Event";


interface CounterState {
  allEvents: IEvent[];
  setAllEvents: (newUser: IEvent[]) => void;
}

export const useAllEventsStore = create<CounterState>((set) => ({
  allEvents: [],
  setAllEvents: (allEvents) => set(() => ({ allEvents })),
}));
