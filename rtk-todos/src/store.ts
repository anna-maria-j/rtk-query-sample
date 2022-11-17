import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getAll: builder.query<Todo[], void>({
      query: () => "todos",
      providesTags: [{ type: "Todos", id: "LIST" }],
    }),
    addTodo: builder.mutation<string, string>({
      query(text) {
        return {
          url: "todos",
          method: "POST",
          body: { text },
        };
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    updateTodo: builder.mutation<Todo, Todo>({
      query(todo) {
        return {
          url: `todos/${todo.id}`,
          method: "PATCH",
          body: todo,
        };
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    deleteTodo: builder.mutation<boolean, string>({
      query(id) {
        return {
          url: `todos/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
  }),
});