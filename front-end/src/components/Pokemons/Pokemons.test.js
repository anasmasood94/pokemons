import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pokemons from "./Pokemons";
import usePokemons from "../../hooks/usePokemons";

jest.mock("../../hooks/usePokemons");

describe("Pokemons Component", () => {
  test("renders the search input and button", () => {
    usePokemons.mockReturnValue({
      pokemons: [],
      loading: false,
      error: null,
      hasPages: false,
      setPage: jest.fn(),
      handleFavoriteClick: jest.fn(),
      handleSearch: jest.fn(),
      setSearchTerm: jest.fn(),
    });

    render(<Pokemons />);

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("shows a loading spinner when loading", () => {
    usePokemons.mockReturnValue({
      pokemons: [],
      loading: true,
      error: null,
      hasPages: false,
      setPage: jest.fn(),
      handleFavoriteClick: jest.fn(),
      handleSearch: jest.fn(),
      setSearchTerm: jest.fn(),
    });

    render(<Pokemons />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("displays an error message when there is an error", () => {
    usePokemons.mockReturnValue({
      pokemons: [],
      loading: false,
      error: { message: "Failed to fetch Pokemons" },
      hasPages: false,
      setPage: jest.fn(),
      handleFavoriteClick: jest.fn(),
      handleSearch: jest.fn(),
      setSearchTerm: jest.fn(),
    });

    render(<Pokemons />);

    expect(
      screen.getByText(/error: failed to fetch pokemons/i)
    ).toBeInTheDocument();
  });

  test("renders Pokemon cards when there are pokemons", () => {
    const mockPokemons = [
      {
        _id: 1,
        name: "Pikachu",
        isFavorite: false,
        sprites: { front_default: "", back_default: "" },
      },
      {
        _id: 2,
        name: "Bulbasaur",
        isFavorite: false,
        sprites: { front_default: "", back_default: "" },
      },
    ];

    usePokemons.mockReturnValue({
      pokemons: mockPokemons,
      loading: false,
      error: null,
      hasPages: false,
      setPage: jest.fn(),
      handleFavoriteClick: jest.fn(),
      handleSearch: jest.fn(),
      setSearchTerm: jest.fn(),
    });

    render(<Pokemons />);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });

  test('displays "No Pokemons found" when there are no pokemons', () => {
    usePokemons.mockReturnValue({
      pokemons: [],
      loading: false,
      error: null,
      hasPages: false,
      setPage: jest.fn(),
      handleFavoriteClick: jest.fn(),
      handleSearch: jest.fn(),
      setSearchTerm: jest.fn(),
    });

    render(<Pokemons />);

    expect(screen.getByText(/no pokemons found/i)).toBeInTheDocument();
  });

  test("calls setSearchTerm and handleSearch on search input and button click", () => {
    const mockSetSearchTerm = jest.fn();
    const mockHandleSearch = jest.fn();

    usePokemons.mockReturnValue({
      pokemons: [],
      loading: false,
      error: null,
      hasPages: false,
      setPage: jest.fn(),
      handleFavoriteClick: jest.fn(),
      handleSearch: mockHandleSearch,
      setSearchTerm: mockSetSearchTerm,
    });

    render(<Pokemons />);

    const searchInput = screen.getByPlaceholderText(/search/i);
    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.change(searchInput, { target: { value: "Pikachu" } });
    fireEvent.click(searchButton);

    expect(mockSetSearchTerm).toHaveBeenCalledWith("Pikachu");
    expect(mockHandleSearch).toHaveBeenCalled();
  });

  test('renders "Load more Pokemon" button and calls setPage when clicked', () => {
    const mockSetPage = jest.fn();

    usePokemons.mockReturnValue({
      pokemons: [
        {
          _id: 1,
          name: "Pikachu",
          isFavorite: false,
          sprites: { front_default: "", back_default: "" },
        },
      ],
      loading: false,
      error: null,
      hasPages: true,
      setPage: mockSetPage,
      handleFavoriteClick: jest.fn(),
      handleSearch: jest.fn(),
      setSearchTerm: jest.fn(),
    });

    render(<Pokemons />);

    const loadMoreButton = screen.getByTestId("load-more-pokemons");
    expect(loadMoreButton).toBeInTheDocument();

    fireEvent.click(loadMoreButton);

    expect(mockSetPage).toHaveBeenCalledWith(expect.any(Function));
  });
});
