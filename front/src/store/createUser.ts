import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, setUser } from "./reducers/user.reducer";

export const createUserApi = createApi({
    reducerPath: "createUserApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:8077",
    }),
    endpoints: (builder) => ({
      createUser: builder.mutation<IUser, Partial<IUser>>({
        query: (userData) => ({
          url: "/users/create",
          method: "POST",
          body: userData,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const { data } = await queryFulfilled;
          if (data) {
            console.log(data);
            
            dispatch(setUser(data));
          }
        },
      }),
    }),
  });
export const { useCreateUserMutation } = createUserApi;
