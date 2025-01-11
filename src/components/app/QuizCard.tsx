import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import QuizControll from "./QuizControll";

const QuizCard = () => {
  return (
    <Card className="sm:w-[420px] w-full">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Project name</p>
      </CardContent>
      <QuizControll />
    </Card>
  );
};

export default QuizCard;
