import { useAnecdotes, useAnecdoteActions, useFilter } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { addVote } = useAnecdoteActions();
  const filtro = useFilter();

  const vote = (id) => {
    addVote(id);
  };

  const anecdotesFiltered = anecdotes.filter((ordenatedAnecdotes) =>
    ordenatedAnecdotes.content.includes(filtro),
  );

  const ordenatedAnecdotesList = anecdotesFiltered.toSorted(
    (a, b) => b.votes - a.votes,
  );
  return (
    <>
      {ordenatedAnecdotesList.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
