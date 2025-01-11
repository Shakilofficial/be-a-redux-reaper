import { useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Progress } from "../ui/progress";

// Helper to get performance details
const getPerformance = (percentage: number) => {
  if (percentage >= 90) {
    return { rating: "Excellent", color: "bg-green-500" };
  } else if (percentage >= 50) {
    return { rating: "Good", color: "bg-yellow-400" };
  } else if (percentage >= 30) {
    return { rating: "Needs Improvement", color: "bg-orange-400" };
  } else {
    return { rating: "Poor", color: "bg-red-500" };
  }
};

export function QuizSummary() {
  const { quizes, userAnswers } = useAppSelector((state) => state.quiz);

  const correctAnswersCount = quizes.reduce((count, question, index) => {
    return question.correctAnswer === userAnswers[index] ? count + 1 : count;
  }, 0);

  const incorrectAnswersCount = quizes.length - correctAnswersCount;
  const correctPercentage = Math.round(
    (correctAnswersCount / quizes.length) * 100
  );

  const { rating, color } = getPerformance(correctPercentage);

  return (
    <Card className="max-w-lg mx-auto p-6 rounded-lg shadow-md">
      <CardHeader>
        <h2 className="text-2xl font-semibold">Quiz Summary</h2>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-medium mb-4">
          You answered {correctAnswersCount} out of {quizes.length} questions
          correctly!
        </h3>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={correctPercentage} className={`h-4 ${color}`} />
          <div className="flex justify-between text-sm mt-2">
            <span>{correctPercentage}%</span>
            <span>Performance: {rating}</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-2">
          <p>
            <strong>Total Questions:</strong> {quizes.length}
          </p>
          <p>
            <strong>Correct Answers:</strong> {correctAnswersCount}
          </p>
          <p>
            <strong>Incorrect Answers:</strong> {incorrectAnswersCount}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
          <Button onClick={() => window.location.href = "/"}>Home</Button>
        </div>
      </CardContent>
    </Card>
  );
}
