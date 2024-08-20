import { useState, useEffect } from "react";
import { getPokemons, toggleFavorite } from "../api";

const PER_PAGE = 20;

function usePokemons(initialPage = 1) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasPages, setHasPages] = useState(true);

  const handleFavoriteClick = async (id, isFavorite) => {
    try {
      await toggleFavorite(id, !isFavorite);
      setPokemons((prevPokemons) =>
        prevPokemons.map((pokemon) =>
          pokemon._id === id ? { ...pokemon, isFavorite: !isFavorite } : pokemon
        )
      );
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPokemons(page, PER_PAGE, searchTerm);
        if (page === 1) {
          setPokemons(data.results);
        } else {
          setPokemons((prevPokemons) => [...prevPokemons, ...data.results]);
        }

        if (data.total === page * PER_PAGE) setHasPages(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [page]);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      setPage(1);
      const data = await getPokemons(1, PER_PAGE, searchTerm);
      setPokemons(data.results);
    } catch (error) {
      setError("Failed to fetch Pokémon");
    } finally {
      setLoading(false);
    }
  };

  return {
    pokemons,
    loading,
    error,
    hasPages,
    searchTerm,
    setPage,
    handleFavoriteClick,
    handleSearch,
    setSearchTerm,
  };
}

export default usePokemons;
