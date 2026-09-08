import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act, render } from "@testing-library/react";

vi.mock("../AnecdoteService", () => ({
  getAll: vi.fn(),
  createNew: vi.fn(),
  addVote: vi.fn(),
  deleteAnecdote: vi.fn(),
}));

import { getAll, addVote } from "../AnecdoteService";
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from "../store";
import AnecdoteList from "../components/AnecdoteList";

// cada inicio de cada test resetea el estado y filtro
beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "" });
  vi.clearAllMocks();
});

describe("anecdote store", () => {
  it("initializes anecdotes from backend", async () => {
    const mockAnecdote = [
      {
        content: "If it hurts, do it more often",
        id: "47145",
        votes: 1,
      },
    ];
    // añadimos que el resultado esperado de getAll sea el el anecdota
    getAll.mockResolvedValue(mockAnecdote);

    const { result } = renderHook(() => useAnecdoteActions());
    //obtenemos la accion de initialize
    await act(async () => {
      await result.current.initialize();
    });
    // ejecuta el hook de useAnecdotes mediante renderHook y guardamso la propiedad en result renombrandola como anecdotesResult
    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual(mockAnecdote);
  });
  it("renders anecdotes ordered by votes", async () => {
    // añadimos al estado dos anecdotas nuevos
    useAnecdoteStore.setState({
      anecdotes: [
        {
          content: "test1",
          id: 1,
          votes: 0,
        },
        {
          content: "test2",
          id: 2,
          votes: 0,
        },
      ],
      filter: "",
    });

    // asignamos a la constante result los actions de los anecdotas
    const { result } = renderHook(() => useAnecdoteActions());
    // Añadimos el resultado esperado del mock en el addVote
    addVote.mockResolvedValue({
      content: "test2",
      id: "2",
      votes: 1,
    });
    // Añadimos el voto al anecdota con id 2
    await result.current.addVote(2);
    // render del componente
    const renderListAnecdotes = render(
      <div className="anecdotes">
        <AnecdoteList />
      </div>,
    );
    // buscamos todos lo que contega el clasName de anecdote-[algo] ej: anecdote-567
    const elementos = renderListAnecdotes.container.querySelectorAll(
      '[class^="anecdote-"]',
    );
    // esperamos que el primer elemento contenga la palabra test2
    expect(elementos[0].textContent).toContain("test2");
  });
});
