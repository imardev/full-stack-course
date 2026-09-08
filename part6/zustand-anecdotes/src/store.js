import { create } from "zustand";
import { getAll, createNew, addVote, deleteAnecdote } from "./AnecdoteService";

// Estado de notificaciones
const useNotificationStore = create((set) => ({
  notification: "",
  actions: {
    setNotification: (message) => {
      set(() => ({ notification: message }));
    },
  },
}));

// Estado de anecdotas y filtros
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
      useNotificationStore
        .getState()
        .actions.setNotification(`You voted '${votedAnecdote.content}'`);
      setTimeout(() => {
        useNotificationStore.getState().actions.setNotification("");
      }, 5000);
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id ? votedAnecdote : anecdote,
        ),
      }));
    },

    addAnecdote: async (anecdote) => {
      const newAnecdote = await createNew(anecdote);
      useNotificationStore
        .getState()
        .actions.setNotification(`You added '${newAnecdote.content}'`);
      setTimeout(() => {
        useNotificationStore.getState().actions.setNotification("");
      }, 5000);
      set((state) => ({ anecdotes: state.anecdotes.concat(newAnecdote) }));
    },

    setFilter: (value) => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await getAll();
      set(() => ({ anecdotes }));
    },
    setDeleteAnecdota: async (id) => {
      const anecdote = useAnecdoteStore
        .getState()
        .anecdotes.find((n) => n.id === id);
      if (anecdote.votes === 0) {
        await deleteAnecdote(id);
        // notificacion
        useNotificationStore
          .getState()
          .actions.setNotification(`You deleted '${anecdote.content}'`);
        setTimeout(() => {
          useNotificationStore.getState().actions.setNotification("");
        }, 5000);
        set((state) => ({
          anecdotes: state.anecdotes.filter((anecdote) => anecdote.id !== id),
        }));
      } else {
        useNotificationStore
          .getState()
          .actions.setNotification(
            `You can't delete '${anecdote.content}' because it has votes.`,
          );
        setTimeout(() => {
          useNotificationStore.getState().actions.setNotification("");
        }, 5000);
      }
    },
  },
}));

// exports de useAnecdoteStore
export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes);
export const useFilter = () => useAnecdoteStore((state) => state.filter);
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
export const useInitialize = () => useAnecdoteStore((state) => state.actions);
export default useAnecdoteStore;

// exports de useNotificationStorage

export const useNotification = () =>
  useNotificationStore((state) => state.notification);
export const useNotificationAction = () =>
  useNotificationStore((state) => state.actions);
