import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import { useInitialize } from "./store";
import { useEffect } from "react";

const App = () => {
  const { initialize } = useInitialize();
  useEffect(() => {
    initialize();
  }, [initialize]);
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
