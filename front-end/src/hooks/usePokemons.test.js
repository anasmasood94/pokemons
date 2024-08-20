import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import usePokemons from "../hooks/usePokemons";

jest.mock("../api");
const mockGetPokemons = jest.spyOn(require("../api"), "getPokemons");

beforeEach(() => {
  jest.clearAllMocks();
});

const TestComponent = ({ initialPage }) => {
  const hook = usePokemons(initialPage);
  return (
    <div>
      <input
        placeholder="Search"
        value={hook.searchTerm}
        onChange={(e) => hook.setSearchTerm(e.target.value)}
      />
      <button onClick={hook.handleSearch}>Search</button>
      {hook.loading && <div>Loading...</div>}
      {hook.error && <div>Error: {hook.error}</div>}
      {hook.pokemons.length === 0 && <div>No Pokemons found</div>}
      {hook.pokemons.map((pokemon) => (
        <div key={pokemon._id}>{pokemon.name}</div>
      ))}
      {hook.hasPages && (
        <button onClick={() => hook.setPage((prev) => prev + 1)}>
          Load more
        </button>
      )}
    </div>
  );
};

describe("usePokemons hook", () => {
  it("should fetch and display pokemons", async () => {
    mockGetPokemons.mockResolvedValue({
      results: [{ _id: "1", name: "Pikachu" }],
      total: 1,
    });

    render(<TestComponent initialPage={1} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await screen.findByText("Pikachu");
  });

  it("should handle search and update pokemons", async () => {
    mockGetPokemons.mockResolvedValue({
      results: [{ _id: "1", name: "Pikachu" }],
      total: 1,
    });

    render(<TestComponent initialPage={1} />);

    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "Pikachu" },
    });
    fireEvent.click(screen.getByText("Search"));

    await screen.findByText("Pikachu");
  });

  it("should handle error state", async () => {
    mockGetPokemons.mockRejectedValue(new Error("Failed to fetch"));

    render(<TestComponent initialPage={1} />);

    await screen.findByText("Error: Failed to fetch");
  });
});
