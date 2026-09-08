import { describe, it, expect, beforeEach, vi, test } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("../AnecdoteService", () => ({
  getAll: vi.fn(),
  createNew: vi.fn(),
  addVote: vi.fn(),
  deleteAnecdote: vi.fn(),
}));

import { getAll } from "../AnecdoteService";
import useAnecdoteStore, {
  useAnecdotes,
  useFilter,
  useAnecdoteActions,
} from "../store";

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
    getAll.mockResolvedValue(mockAnecdote);

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual(mockAnecdote);
  });
});
