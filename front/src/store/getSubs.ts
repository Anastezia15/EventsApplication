import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setEvent } from "./reducers/event.reducer";
import { IEvent } from "../components/Event";

export const getSub = createApi({
  reducerPath: "getSub",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8077",
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<IEvent[], Partial<{ userId: string }>>({
      query: (id) => ({
        url: `/events/user_subscriptions/${id.userId}`,
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
export const { useCreateUserMutation } = getSub;
