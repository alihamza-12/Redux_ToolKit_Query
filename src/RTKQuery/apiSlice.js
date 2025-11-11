import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://rtkq-nine.vercel.app/" }),
  //For Refresh
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      //For Refresh
      providesTags: ["Todos"],
    }),
    addTodos: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      //Refresh After ADD Todo
      invalidatesTags: ["Todos"],
    }),
    updateTodos: builder.mutation({
      query: ({ id, ...todo }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: todo,
      }),
      //Refresh After Update Todo
      invalidatesTags: ["Todos"],
    }),
    deleteTodos: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      //Refresh After DELETE Todo
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodosMutation,
  useUpdateTodosMutation,
  useDeleteTodosMutation,
} = api;
