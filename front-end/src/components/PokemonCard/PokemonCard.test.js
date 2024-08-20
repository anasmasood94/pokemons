import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PokemonCard from "./PokemonCard";
import { capitalizeFirstLetter } from "../../utils";

describe("PokemonCard Component", () => {
  const mockPokemon = {
    _id: "123",
    name: "pikachu",
    sprites: {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    },
    isFavorite: false,
  };

  const mockOnFavoriteClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the PokemonCard component with correct elements", () => {
    render(
      <PokemonCard
        pokemon={mockPokemon}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    expect(screen.getByAltText(mockPokemon.name)).toBeInTheDocument();
    expect(
      screen.getByText(capitalizeFirstLetter(mockPokemon.name))
    ).toBeInTheDocument();
    expect(screen.getByText("Favorite")).toBeInTheDocument();
  });

  test("applies correct styles based on favorite status", () => {
    render(
      <PokemonCard
        pokemon={mockPokemon}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const favoriteBadge = screen.getByText("Favorite");

    expect(favoriteBadge).toHaveClass("bg-light text-dark");

    render(
      <PokemonCard
        pokemon={{ ...mockPokemon, isFavorite: true }}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const secondFavoriteBadge = screen.getAllByText("Favorite")[1];
    expect(secondFavoriteBadge).toHaveClass("bg-success");
  });

  test("calls onFavoriteClick with correct arguments when the favorite badge is clicked", () => {
    render(
      <PokemonCard
        pokemon={mockPokemon}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const favoriteBadge = screen.getByText("Favorite");

    fireEvent.click(favoriteBadge);

    expect(mockOnFavoriteClick).toHaveBeenCalledWith(
      mockPokemon._id,
      mockPokemon.isFavorite
    );
  });
});
