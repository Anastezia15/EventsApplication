import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ICategories {
  name: string;
  description: string;
}
export const createCategoriesApi = createApi({
  reducerPath: "createUserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8077",
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<ICategories, Partial<ICategories>>({
      query: (userData) => ({
        url: "/categories/admin",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});
export const { useCreateUserMutation } = createCategoriesApi;
