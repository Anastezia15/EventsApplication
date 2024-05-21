import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setEvent } from "./reducers/event.reducer";
import { IEvent } from "../components/Event";

export const getEventsApi = createApi({
  reducerPath: "getEventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8077",
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<IEvent[], Partial<IEvent[]>>({
      query: () => ({
        url: "/events/admin",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (data) {
          dispatch(setEvent(data));
        }
      },
    }),
  }),
});
export const { useCreateUserMutation } = getEventsApi;
