import QuizCard from "./components/app/QuizCard";

const App = () => {
  return (
    <div className="min-h-screen flex justify-center p-4 max-w-md mx-auto">
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-center mb-8">Quiz App</h1>
        <QuizCard />
      </div>
    </div>
  );
};

export default App;
