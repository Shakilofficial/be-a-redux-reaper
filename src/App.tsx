import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-10">Counter App with Redux</h1>
        <Button>Increment</Button>
        <div className="my-4">0</div>
        <Button>Decrement</Button>
      </div>
    </>
  );
}

export default App;
