import { useAnecdotes, useAnecdoteActions } from "./store";

const App = () => {
  const anecdotes = useAnecdotes();
  const { addVote, addAnecdote } = useAnecdoteActions();

  const getId = () => (100000 * Math.random()).toFixed(0);
  const vote = (id) => {
    addVote(id);
  };

  const addAnecdoteForm = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    addAnecdote({ content, id: getId(), votes: 0 });
    e.target.reset();
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdoteForm}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
