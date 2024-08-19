const Pokemon = require("../models/Pokemon");
const mongoose = require("mongoose");

class PokemonManager {
  constructor(user) {
    this.user = user;
  }

  async getPokemons(query, skip, perPage) {
    try {
      const [pokemons, totalCount] = await Promise.all([
        Pokemon.aggregate([
          { $match: query },
          { $skip: skip },
          { $limit: perPage },
          {
            $addFields: {
              isFavorite: {
                $in: [
                  "$_id",
                  this.user.favorites.map(
                    (fav) => new mongoose.Types.ObjectId(fav)
                  ),
                ],
              },
            },
          },
        ]),
        Pokemon.countDocuments(query),
      ]);

      return { pokemons, totalCount };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async toggleFavorite(pokemonId) {
    try {
      const pokemon = await Pokemon.findById(pokemonId);

      console.log("found the pokemon");
      if (!pokemon) {
        throw new Error("Pokemon not found");
      }

      if (this.user.favorites.includes(pokemonId)) {
        this.user.favorites = this.user.favorites.filter(
          (favId) => favId.toString() !== pokemonId
        );
      } else {
        this.user.favorites.push(pokemonId);
      }

      await this.user.save();
      return this.user.favorites;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = PokemonManager;
