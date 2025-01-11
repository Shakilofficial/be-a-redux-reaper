import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";

const QuizControll = () => {
  return (
    <CardFooter className="flex justify-between">
      <Button variant="outline">Prev</Button>
      <Button>Next</Button>
    </CardFooter>
  );
};

export default QuizControll;
