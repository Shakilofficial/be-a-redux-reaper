import {
  selectCurrentAnswer,
  selectCurrentQuiz,
  setAnswer,
} from "@/redux/features/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import QuizControll from "./QuizControll";

const QuizCard = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectCurrentQuiz);
  const currentAnswer = useAppSelector(selectCurrentAnswer);

  const handleAnswer = (option: string) => {
    dispatch(setAnswer(option));
  };
  return (
    <Card className="sm:w-[420px] w-full mx-auto shadow-sm rounded-lg">
      <CardHeader className="text-center text-lg p-4">
        <CardTitle className="text-base font-medium">
          {data?.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 px-4">
        {data?.options.map((option, index) => (
          <button
            key={index}
            className={`w-full text-left justify-start h-auto py-3 px-4 break-words rounded-lg border transition-all duration-300 ease-in-out
                ${
                  currentAnswer === option
                    ? "font-semibold bg-gray-200 text-gray-900 border-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-500"
                    : "font-normal bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:border-gray-500"
                }`}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </CardContent>
      <QuizControll />
    </Card>
  );
};

export default QuizCard;
