import { useAnecdoteActions } from "../store";

const getId = () => (100000 * Math.random()).toFixed(0);
const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdoteActions();
  const addAnecdoteForm = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    addAnecdote({ content, id: getId(), votes: 0 });
    e.target.reset();
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdoteForm}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
