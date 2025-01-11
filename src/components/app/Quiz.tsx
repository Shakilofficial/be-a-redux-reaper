import { useAppSelector } from "@/redux/hooks";
import QuizCard from "./QuizCard";
import { QuizSummary } from "./QuizSummary";

const Quiz = () => {
  const { quizCompleted } = useAppSelector((state) => state.quiz);

  return <div>{quizCompleted ? <QuizSummary /> : <QuizCard />}</div>;
};

export default Quiz;
