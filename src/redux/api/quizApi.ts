import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://quiz-api-puce.vercel.app/api",
  }),
  endpoints: (builder) => ({
    getAllQuizzes: builder.query({
      query: () => "/quizzes",
    }),
    getQuiz: builder.query({
      query: (id) => `/quizzes/${id}`,
    }),
    createQuiz: builder.mutation({
      query: (quiz) => ({
        url: "/quizzes",
        method: "POST",
        body: quiz,
      }),
    }),
    updateQuiz: builder.mutation({
      query: ({ id, ...quiz }) => ({
        url: `/quizzes/${id}`,
        method: "PUT",
        body: quiz,
      }),
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllQuizzesQuery,
  useGetQuizQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} = quizApi;

export default quizApi;
