import { create } from "zustand";
import { IEvent } from "../components/Event";

interface CounterState {
  myEvents: IEvent[];
  setMyEvents: (allSubs: IEvent[]) => void;
}

export const useMyEventsStore = create<CounterState>((set) => ({
  myEvents: [],
  setMyEvents: (myEvents) => set(() => ({ myEvents })),
}));
