const express = require("express");
const router = express.Router();
const Users = require("../middlewares/Users");
const Pagination = require("../middlewares/Pagination");
const PokemonManager = require("../managers/Pokemon");

router.use(Users);

router.get("/", Pagination, async (req, res) => {
  const { skip, perPage } = req.pagination;
  const searchTerm = req.query.searchTerm || "";
  const query = searchTerm
    ? { name: { $regex: searchTerm, $options: "i" } }
    : {};

  try {
    const pokemonManager = new PokemonManager(req.user);
    const { pokemons, totalCount } = await pokemonManager.getPokemons(
      query,
      skip,
      perPage
    );

    res.json({ total: totalCount, results: pokemons });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id/favorite", async (req, res, next) => {
  const { id } = req.params;

  try {
    const pokemonManager = new PokemonManager(req.user);
    const updatedFavorites = await pokemonManager.toggleFavorite(id);

    res.json(updatedFavorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
