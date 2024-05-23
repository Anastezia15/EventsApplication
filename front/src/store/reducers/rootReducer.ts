import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user.reducer";
import eventReducer from "./event.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  event:eventReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;



