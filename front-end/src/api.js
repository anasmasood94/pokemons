import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const API_BASE_URL = "http://localhost:3001";

const getUserId = () => {
  let uuid = localStorage.getItem("uuid");

  if (!uuid) {
    uuid = uuidv4();
    localStorage.setItem("uuid", uuid);
  }

  return uuid;
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-User-UUID": getUserId(),
  },
});

export const getPokemons = async (page = 1, perPage = 20, searchTerm) => {
  try {
    const response = await apiClient.get(`${API_BASE_URL}/pokemons`, {
      params: { page, perPage, searchTerm },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemons:", error);
    throw error;
  }
};

export const toggleFavorite = async (id, isFavorite) => {
  try {
    const response = await apiClient.put(
      `${API_BASE_URL}/pokemons/${id}/favorite`,
      {
        favorite: isFavorite,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error toggling favorite status:", error);
    throw error;
  }
};
