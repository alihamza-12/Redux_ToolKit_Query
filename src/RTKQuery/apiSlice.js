import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
    }),
    addTodos: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
    }),
    updateTodos: builder.mutation({
      query: ({ id, ...todo }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: todo,
      }),
    }),
    deleteTodos: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodosMutation,
  useUpdateTodosMutation,
  useDeleteTodosMutation,
} = api;
