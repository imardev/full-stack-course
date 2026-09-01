import { create } from "zustand";
import { getAll, createNew, addVote } from "./AnecdoteService";

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => ({
//   content: anecdote,
//   id: getId(),
//   votes: 0,
// });

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    addVote: async (id) => {
      const anecdote = useAnecdoteStore
        .getState()
        .anecdotes.find((n) => n.id === id);
      const votedAnecdote = await addVote(
        { ...anecdote, votes: anecdote.votes + 1 },
        id,
      );
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id ? votedAnecdote : anecdote,
        ),
      }));
    },

    addAnecdote: async (anecdote) => {
      const newAnecdote = await createNew(anecdote);
      set((state) => ({ anecdotes: state.anecdotes.concat(newAnecdote) }));
    },

    setFilter: (value) => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await getAll();
      set(() => ({ anecdotes }));
    },
  },
}));

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes);
export const useFilter = () => useAnecdoteStore((state) => state.filter);
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
export const useFilterAction = () =>
  useAnecdoteStore((state) => state.actions.setFilter);
export const useInitialize = () => useAnecdoteStore((state) => state.actions);
