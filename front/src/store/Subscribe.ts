import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const setSub = createApi({
  reducerPath: "setSub",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8077",
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<
      [],
      Partial<{ userId: string; eventId: string }>
    >({
      query: (id) => ({
        url: `/users/subscribe/${id.userId}/${id.eventId}`,
        method: "POST",
      }),
    }),
  }),
});
export const { useCreateUserMutation } = setSub;
