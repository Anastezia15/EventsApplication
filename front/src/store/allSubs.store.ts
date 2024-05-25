import { create } from "zustand";
import { IEvent } from "../components/Event";

interface CounterState {
  allSubs: IEvent[];
  setSubEvents: (allSubs: IEvent[]) => void;
}

export const useAllSubsStore = create<CounterState>((set) => ({
  allSubs: [],
  setSubEvents: (allSubs) => set(() => ({ allSubs })),
}));
