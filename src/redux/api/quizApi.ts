import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://quiz-api-puce.vercel.app/api",
  }),
  tagTypes: ["Quiz"],
  endpoints: (builder) => ({
    getAllQuizzes: builder.query({
      query: () => "/quizzes",
      providesTags: ["Quiz"],
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
      invalidatesTags: ["Quiz"],
    }),
    updateQuiz: builder.mutation({
      query: ({ id, ...quiz }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: quiz,
      }),
      invalidatesTags: ["Quiz"],
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quiz"],
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
