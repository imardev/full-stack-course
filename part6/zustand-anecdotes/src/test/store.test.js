import { describe, beforeEach, vi, test } from "vitest";

vi.mock("./AnecdoteService", () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
  },
}));

import useAnecdoteStore, { useAnecdoteActions } from "../store";

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "" });
  vi.clearAllMocks();
});

describe("anecdote store", () => {
  test("initializes anecdotes from backend", () => {
    const initialize = useAnecdoteActions();
    console.log(initialize);
  });
});
