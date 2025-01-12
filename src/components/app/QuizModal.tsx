/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateQuizMutation } from "@/redux/api/quizApi";
import { useState } from "react";
import { toast } from "sonner";

type QuizData = {
  title: string;
  description: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
};

export default function QuizModal() {
  const [addQuiz, { isLoading, isError, isSuccess }] = useCreateQuizMutation();
  const [step, setStep] = useState(1);
  const [addQuestionStep, setAddQuestionStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>({
    title: "",
    description: "",
    questions: [],
  });
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });
  const [openAddQuestionModal, setOpenAddQuestionModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof QuizData | "question" | "option",
    optionIndex?: number
  ) => {
    const { value } = e.target;

    if (field === "title" || field === "description") {
      setQuizData((prev) => ({ ...prev, [field]: value }));
    } else if (field === "question") {
      setNewQuestion((prev) => ({ ...prev, question: value }));
    } else if (field === "option" && optionIndex !== undefined) {
      const updatedOptions = [...newQuestion.options];
      updatedOptions[optionIndex] = value;
      setNewQuestion((prev) => ({ ...prev, options: updatedOptions }));
    }
  };

  // Handle correct answer selection
  const handleCorrectAnswerSelect = (answer: string) => {
    setNewQuestion((prev) => ({ ...prev, correctAnswer: answer }));
  };

  // Add a question to the quiz
  const addQuestion = () => {
    if (
      newQuestion.question &&
      newQuestion.correctAnswer &&
      newQuestion.options.every((option) => option)
    ) {
      setQuizData((prev) => ({
        ...prev,
        questions: [...prev.questions, newQuestion],
      }));
      setNewQuestion({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      });
      setOpenAddQuestionModal(false);
      setAddQuestionStep(1);
    } else {
      toast.error("Please complete the question and its options.");
    }
  };

  // Remove a question from the quiz
  const removeQuestion = (index: number) => {
    const updatedQuestions = quizData.questions.filter((_, i) => i !== index);
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  // Navigate to the next step in the modal
  const nextStep = () => setStep((prev) => prev + 1);
  // Navigate to the previous step in the modal
  const prevStep = () => setStep((prev) => prev - 1);

  // Handle quiz submission
  const handleSubmit = async () => {
    if (quizData.title && quizData.description && quizData.questions.length) {
      try {
        await addQuiz(quizData);
        toast.success("Quiz added successfully");
        // Reset all states after successful submission
        resetModalState();
      } catch (error) {
        toast.error("There was an error adding the quiz.");
      }
    } else {
      toast.error("Please complete all fields before submitting.");
    }
  };

  // Reset modal and form state after submission
  const resetModalState = () => {
    setQuizData({
      title: "",
      description: "",
      questions: [],
    });
    setNewQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
    setStep(1); // Reset the step to the first step
    setAddQuestionStep(1); // Reset question addition step
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="my-6">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">Add Quiz</Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-[90vw] sm:max-w-[400px] md:max-w-[600px] p-6 md:p-8 rounded-md">
          <DialogHeader>
            <DialogTitle>Create New Quiz</DialogTitle>
            <DialogDescription>
              {step === 1 && "Step 1: Enter Quiz Details"}
              {step === 2 && "Step 2: Add Questions"}
              {step === 3 && "Step 3: Submit"}
            </DialogDescription>
          </DialogHeader>

          {/* Step 1: Quiz Details */}
          {step === 1 && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={quizData.title}
                  onChange={(e) => handleInputChange(e, "title")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={quizData.description}
                  onChange={(e) => handleInputChange(e, "description")}
                  className="col-span-3"
                />
              </div>
            </div>
          )}

          {/* Step 2: Add Questions */}
          {step === 2 && (
            <div className="grid gap-4 py-4">
              {quizData.questions.map((q, index) => (
                <div key={index} className="border p-4 rounded-lg relative">
                  <Label className="text-right">
                    Q{index + 1}: {q.question}
                  </Label>
                  <Button
                    onClick={() => removeQuestion(index)}
                    variant="outline"
                    className="absolute top-2 right-2"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                onClick={() => setOpenAddQuestionModal(true)}
                className="mt-4 w-full"
              >
                Add Another Question
              </Button>
            </div>
          )}

          <DialogFooter className="flex gap-2 justify-between">
            {step > 1 && (
              <Button disabled={isSuccess} variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            {step < 3 && <Button onClick={nextStep}>Next</Button>}
            {step === 3 && (
              <Button
                disabled={isSuccess || isLoading}
                onClick={handleSubmit}
                className="bg-green-500"
              >
                Submit Quiz
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Question Modal */}
      <Dialog
        open={openAddQuestionModal}
        onOpenChange={setOpenAddQuestionModal}
      >
        <DialogContent className="w-full max-w-[90vw] sm:max-w-[400px] md:max-w-[600px] p-6 md:p-8 rounded-md">
          <DialogHeader>
            <DialogTitle>Add New Question</DialogTitle>
            <DialogDescription>
              Step {addQuestionStep}:{" "}
              {addQuestionStep === 1 ? "Enter Question" : "Add Options"}
            </DialogDescription>
          </DialogHeader>

          {addQuestionStep === 1 && (
            <Input
              placeholder="Enter question"
              value={newQuestion.question}
              onChange={(e) => handleInputChange(e, "question")}
            />
          )}

          {addQuestionStep === 2 &&
            newQuestion.options.map((option, i) => (
              <Input
                key={i}
                placeholder={`Option ${i + 1}`}
                value={option}
                onChange={(e) => handleInputChange(e, "option", i)}
              />
            ))}

          {addQuestionStep === 3 && (
            <div>
              <Label>Correct Answer</Label>
              <select
                value={newQuestion.correctAnswer}
                onChange={(e) => handleCorrectAnswerSelect(e.target.value)}
                className="w-full p-2 mt-2 border rounded-md"
              >
                {newQuestion.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          <DialogFooter className="flex gap-2 justify-between">
            {addQuestionStep > 1 && (
              <Button
                variant="outline"
                onClick={() => setAddQuestionStep(addQuestionStep - 1)}
              >
                Back
              </Button>
            )}
            {addQuestionStep < 3 && (
              <Button onClick={() => setAddQuestionStep(addQuestionStep + 1)}>
                Next
              </Button>
            )}
            {addQuestionStep === 3 && (
              <Button onClick={addQuestion} disabled={isLoading}>
                Add Question
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
