import {
  completeQuiz,
  nextQuiz,
  prevQuiz,
} from "@/redux/features/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";

const QuizControll = () => {
  const dispatch = useAppDispatch();
  const { currentQuizIndex, quizes } = useAppSelector((state) => state.quiz);

  const handleNext = () => {
    if (currentQuizIndex < quizes.length - 1) {
      dispatch(nextQuiz());
    } else {
      dispatch(completeQuiz());
    }
  };

  const handlePrev = () => {
    if (currentQuizIndex > 0) {
      dispatch(prevQuiz());
    }
  };

  return (
    <CardFooter className="flex justify-between">
      <Button
        variant="outline"
        onClick={handlePrev}
        disabled={currentQuizIndex === 0}
      >
        Prev
      </Button>
      <Button onClick={handleNext}>
        {currentQuizIndex === quizes.length - 1 ? "Complete Quiz" : "Next"}
      </Button>
    </CardFooter>
  );
};

export default QuizControll;
