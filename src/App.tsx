import { Button } from "./components/ui/button";
import { decrement, increment } from "./redux/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hook";

function App() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.count);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-10">Counter App with Redux</h1>
        <Button onClick={handleIncrement}>Increment</Button>
        <div className="my-4 text-4xl font-semibold">{count}</div>
        <Button onClick={handleDecrement}>Decrement</Button>
      </div>
    </>
  );
}

export default App;
