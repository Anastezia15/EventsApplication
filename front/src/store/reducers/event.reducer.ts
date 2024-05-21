import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IEvent } from "../../components/Event";


const initialState: IEvent[] = [];

const eventSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEvent: (state, action: PayloadAction<IEvent[]>) => {
      return action.payload;
    },
    
  },
});

export const { setEvent } = eventSlice.actions;

export default eventSlice.reducer;
