import React from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import Loader from "../Loader/Loader";
import usePokemons from "../../hooks/usePokemons";

function Pokemons() {
  const {
    pokemons,
    loading,
    error,
    hasPages,
    setPage,
    handleFavoriteClick,
    handleSearch,
    setSearchTerm,
  } = usePokemons();

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="w-100 d-flex mb-5">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="btn btn-outline-success"
          type="submit"
        >
          Search
        </button>
      </div>

      {pokemons.length > 0 ? (
        pokemons.map((pokemon) => (
          <PokemonCard
            pokemon={pokemon}
            onFavoriteClick={handleFavoriteClick}
          />
        ))
      ) : (
        <div className="w-100 d-flex justify-content-center">
          <h1>No Pokemons found</h1>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        hasPages &&
        pokemons.length > 0 && (
          <div className="spinner-container d-flex justify-content-center align-items-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              Load more Pokemon
            </button>
          </div>
        )
      )}
    </>
  );
}

export default Pokemons;
