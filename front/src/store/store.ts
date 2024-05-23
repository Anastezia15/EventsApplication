// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { createUserApi } from "./createUser";
import { userApi } from "./getUser";
import { getEventsApi } from "./getEvent";
import userReducer from "./reducers/user.reducer";
import eventReducer from "./reducers/event.reducer";
import { getMyEventsApi } from "./MyEvents";
import { setSub } from "./Subscribe";
import { getSub } from "./getSubs";

const store = configureStore({
  reducer: {
    [createUserApi.reducerPath]: createUserApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [getEventsApi.reducerPath]: getEventsApi.reducer,
    [getMyEventsApi.reducerPath]: getMyEventsApi.reducer,
    [setSub.reducerPath]: setSub.reducer,
    [getSub.reducerPath]: getSub.reducer,
    user: userReducer,
    event: eventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      createUserApi.middleware,
      userApi.middleware,
      getEventsApi.middleware,
      getMyEventsApi.middleware,
      setSub.middleware,
      getSub.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;
