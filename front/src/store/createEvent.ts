import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IEvent } from "../components/Event";

interface ICreateIvent {
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  date: string;
  time: string;
  category: string;
}
export const createEventApi = createApi({
  reducerPath: "createEventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8077",
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<IEvent, Partial<ICreateIvent>>({
      query: (userData) => ({
        url: "/events",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});
export const { useCreateUserMutation  } = createEventApi;
