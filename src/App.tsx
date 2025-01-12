import AllQuiz from "./components/app/AllQuize";
import Quiz from "./components/app/Quiz";

const App = () => {
  return (
    <div className="min-h-screen p-4 max-w-5xl mx-auto">
      <div className="w-full flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-center mb-8">Quiz App</h1>
        <div className="w-full flex flex-col justify-center py-4">
          <AllQuiz />
        </div>
        <Quiz />
      </div>
    </div>
  );
};

export default App;
