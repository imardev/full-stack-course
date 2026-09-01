import { create } from "zustand";
import { getAll } from "./AnecdoteService";

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
    addVote: (id) =>
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote,
        ),
      })),
    addAnecdote: (anecdote) =>
      set((state) => ({ anecdotes: state.anecdotes.concat(anecdote) })),
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
