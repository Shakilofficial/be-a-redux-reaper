import { configureStore } from "@reduxjs/toolkit";
import quizApi from "./api/quizApi";
import quizReducer from "./features/quiz/quizSlice";
export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    // other reducers
    [quizApi.reducerPath]: quizApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quizApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
