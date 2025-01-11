import { quizData } from "@/components/app/quizData";
import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

interface QuizState {
  quizes: typeof quizData;
  currentQuizIndex: number;
  userAnswers: (string | null)[];
  quizCompleted: boolean;
}

const initialState: QuizState = {
  quizes: quizData,
  currentQuizIndex: 0,
  userAnswers: Array(quizData.length).fill(null),
  quizCompleted: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      state.userAnswers[state.currentQuizIndex] = action.payload;
    },
    nextQuiz: (state) => {
      state.currentQuizIndex += 1;
    },
    prevQuiz: (state) => {
      state.currentQuizIndex -= 1;
    },
    completeQuiz: (state) => {
      state.quizCompleted = true;
    },
  },
});

// Selectors
export const selectQuizes = (state: RootState) => state.quiz.quizes;
export const selectCurrentQuiz = (state: RootState) =>
  state.quiz.quizes[state.quiz.currentQuizIndex];
export const selectCurrentAnswer = (state: RootState) =>
  state.quiz.userAnswers[state.quiz.currentQuizIndex];
export const selectQuizCompleted = (state: RootState) =>
  state.quiz.quizCompleted;

export const { setAnswer, nextQuiz, prevQuiz, completeQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
