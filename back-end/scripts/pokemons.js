const axios = require("axios");
const mongoose = require("mongoose");
const Pokemon = require("../models/Pokemon");

mongoose
  .connect("mongodb://localhost:27017/pokemondb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

async function fetchAndSavePokemon(pokemonUrl) {
  try {
    const response = await axios.get(pokemonUrl);
    const data = response.data;

    const pokemon = new Pokemon({
      name: data.name,
      height: data.height,
      weight: data.weight,
      abilities: data.abilities.map((ability) => ability.ability.name),
      sprites: {
        front_default: data.sprites.front_default,
        back_default: data.sprites.back_default,
      },
    });

    await pokemon.save();
    console.log(`Saved ${data.name} to the database`);
  } catch (error) {
    console.error(`Failed to save Pokemon from ${pokemonUrl}:`, error.message);
  }
}

async function fetchAndSaveFirst1000Pokemon() {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=1000"
    );
    const pokemonList = response.data.results;

    for (const pokemon of pokemonList) {
      await fetchAndSavePokemon(pokemon.url);
    }

    console.log("Finished saving the first 1000 Pokémon to the database");
  } catch (error) {
    console.error("Failed to fetch the Pokémon list:", error.message);
  }
}

fetchAndSaveFirst1000Pokemon();
