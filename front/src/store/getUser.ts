import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IUser } from "./reducers/user.reducer";
import { setUser } from "./reducers/user.reducer";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8077",
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<IUser, string>({
      query: (username) => ({
        url: `/users/${username}`,
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (data) {
          dispatch(setUser(data));
        }
      },
    }),
  }),
});
export const { useCreateUserMutation } = userApi;
