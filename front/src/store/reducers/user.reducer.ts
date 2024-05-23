import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IUser {
  id: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  role: string;
}
const initialState: IUser = {
  id: "",
  password: "",
  email: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
     console.log(action.payload);
    
      return action.payload; 
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
