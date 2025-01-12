import {
  useDeleteQuizMutation,
  useGetAllQuizzesQuery,
} from "@/redux/api/quizApi";
import { QuizData, setQuiz, TQuiz } from "@/redux/features/quiz/quizSlice";
import { useAppDispatch } from "@/redux/hooks";
import { SquarePen, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Loader } from "./Loader";
import { QuizModal } from "./QuizModal";

const AllQuiz = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, error } = useGetAllQuizzesQuery(undefined);
  const [deleteQuiz, { isLoading: isDeleting }] = useDeleteQuizMutation();

  // Handle loading state
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div>
        <p>Error fetching quizzes:</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  // Data fetched successfully
  const quizzes = data?.data;

  const handleSetQuiz = (question: QuizData[]) => {
    dispatch(setQuiz(question));
  };

  const handleDeleteQuiz = async (id: string) => {
    if (confirm("Are you sure you want to delete this quiz?")) {
      try {
        await deleteQuiz(id).unwrap();
        toast.success("Quiz deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete quiz!");
        console.error(err);
      }
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center p-2 mb-2">
        <h1 className="text-xl font-bold">Available Quizzes</h1>
        <QuizModal />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz: TQuiz) => (
          <Card key={quiz._id} className="shadow-lg">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-xl font-semibold">
                {quiz.title}
              </CardTitle>
              <div className="flex gap-2">
                <Button size="icon" variant="outline">
                  <SquarePen className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDeleteQuiz(quiz._id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <span className="spinner w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{quiz.description}</p>
              <p className="text-sm text-gray-500">
                Questions: {quiz.questions.length}
              </p>
              <Button
                onClick={() => handleSetQuiz(quiz.questions)}
                className="mt-4 w-full"
                variant="default"
              >
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllQuiz;
